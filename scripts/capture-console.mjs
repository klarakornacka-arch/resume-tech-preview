import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const chrome = process.env.BROWSER_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const targetUrl = process.argv[2] ?? process.env.CAPTURE_URL ?? "http://127.0.0.1:3001/works/longqi-ip-toy";
const screenshotPath = process.argv[3] ?? process.env.CAPTURE_SCREENSHOT ?? "audit-screenshots/liquid-background.png";
const port = Number(process.argv[4] ?? process.env.CDP_PORT ?? 9333);
const viewportWidth = Number(process.argv[5] ?? 1440);
const viewportHeight = Number(process.argv[6] ?? 1100);
const reducedMotion = process.argv[7] === "reduce";
const bloomProgress = Number(process.argv[8] ?? 0);
const profile = join(tmpdir(), `resume-tech-cdp-${port}`);
mkdirSync(profile, { recursive: true });
mkdirSync(dirname(screenshotPath), { recursive: true });

const child = spawn(
  chrome,
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-extensions",
    "--enable-unsafe-swiftshader",
    "--use-angle=swiftshader",
    `--window-size=${viewportWidth},${viewportHeight}`,
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank"
  ],
  { stdio: "ignore" }
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url, tries = 40) {
  for (let index = 0; index < tries; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      await sleep(250);
    }
  }
  throw new Error(`Unable to fetch ${url}`);
}

let ws;

try {
  const tabs = await getJson(`http://127.0.0.1:${port}/json`);
  const tab = tabs.find((item) => item.type === "page") ?? tabs[0];
  ws = new WebSocket(tab.webSocketDebuggerUrl);

  let nextId = 1;
  const pending = new Map();
  const events = [];
  const thirdPartySceneRequests = [];

  function send(method, params = {}) {
    const id = nextId;
    nextId += 1;
    ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  }

  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const item = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) item.reject(message.error);
      else item.resolve(message.result);
      return;
    }

    if (message.method === "Runtime.exceptionThrown") {
      events.push({
        type: "exception",
        text: message.params.exceptionDetails?.text,
        description: message.params.exceptionDetails?.exception?.description
      });
    }

    if (message.method === "Runtime.consoleAPICalled") {
      const level = message.params.type;
      if (["error", "warning", "assert"].includes(level)) {
        events.push({
          type: "console",
          level,
          args: message.params.args?.map((arg) => arg.value ?? arg.description)
        });
      }
    }

    if (message.method === "Network.responseReceived") {
      const url = message.params.response?.url ?? "";
      if (/unicorn\.studio|unicornstudio|jsdelivr\.net/i.test(url)) {
        thirdPartySceneRequests.push({ url, status: message.params.response.status });
      }
    }
  });

  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
  await send("Runtime.enable");
  await send("Page.enable");
  await send("Network.enable");
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: reducedMotion ? "reduce" : "no-preference" }]
  });
  await send("Emulation.setDeviceMetricsOverride", {
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 1,
    mobile: viewportWidth < 1024
  });
  await send("Page.navigate", { url: targetUrl });

  let liquidState;
  for (let index = 0; index < 40; index += 1) {
    const result = await send("Runtime.evaluate", {
      expression: `(() => {
        const host = document.querySelector('[data-liquid-background]');
        const canvas = host?.querySelector('canvas');
        const parent = host?.parentElement;
        return {
          present: Boolean(host),
          ready: host?.dataset.ready || null,
          parentOpacity: parent ? getComputedStyle(parent).opacity : null,
          width: host?.getBoundingClientRect().width || 0,
          height: host?.getBoundingClientRect().height || 0,
          canvasCount: host?.querySelectorAll('canvas').length || 0,
          canvasWidth: canvas?.width || 0,
          canvasHeight: canvas?.height || 0,
          pointerX: host?.dataset.pointerX || null,
          pointerY: host?.dataset.pointerY || null
        };
      })()`,
      returnByValue: true
    });
    liquidState = result.result.value;
    if (
      liquidState.ready === "true" &&
      liquidState.canvasCount === 1 &&
      Number(liquidState.parentOpacity) > 0.99
    ) break;
    await sleep(250);
  }

  let lanyardState = null;
  for (let index = 0; index < 40; index += 1) {
    const result = await send("Runtime.evaluate", {
      expression: `(() => {
        const host = document.querySelector('[data-home-lanyard]');
        const canvas = host?.querySelector('canvas');
        const rect = host?.getBoundingClientRect();
        return {
          present: Boolean(host),
          ready: host?.dataset.ready || null,
          canvasCount: host?.querySelectorAll('canvas').length || 0,
          canvasWidth: canvas?.width || 0,
          canvasHeight: canvas?.height || 0,
          rect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null
        };
      })()`,
      returnByValue: true
    });
    lanyardState = result.result.value;
    if (!lanyardState.present || (lanyardState.ready === "true" && lanyardState.canvasCount === 1)) break;
    await sleep(250);
  }

  let bloomState = null;
  for (let index = 0; index < 240; index += 1) {
    const result = await send("Runtime.evaluate", {
      expression: `(() => {
        const host = document.querySelector('[data-bloom-experience]');
        const canvas = host?.querySelector('canvas');
        const features = host?.querySelector('[data-bloom-features]');
        const loading = host?.querySelector('[data-bloom-loading]');
        return {
          present: Boolean(host),
          ready: host?.dataset.ready || null,
          failed: host?.dataset.failed || null,
          progress: host?.dataset.progress || null,
          featureOpacity: features ? getComputedStyle(features).opacity : null,
          loadingOpacity: loading ? getComputedStyle(loading).opacity : null,
          scrollY,
          canvasWidth: canvas?.width || 0,
          canvasHeight: canvas?.height || 0
        };
      })()`,
      returnByValue: true
    });
    bloomState = result.result.value;
    if (bloomState.present && bloomState.ready === "true") break;
    if (!bloomState.present && index >= 3) break;
    await sleep(250);
  }
  if (bloomState?.present) await sleep(700);
  if (bloomState?.present && bloomProgress > 0) {
    await send("Runtime.evaluate", {
      expression: `(() => {
        const host = document.querySelector('[data-bloom-experience]');
        if (!host) return;
        const distance = Math.max(1, host.offsetHeight - innerHeight);
        scrollTo(0, host.offsetTop + distance * ${Math.min(1, Math.max(0, bloomProgress))});
      })()`
    });
    await sleep(1200);
  }
  if (!bloomState?.present && bloomProgress > 0) {
    await send("Runtime.evaluate", {
      expression: `scrollTo(0, Math.max(0, document.documentElement.scrollHeight - innerHeight) * ${Math.min(1, Math.max(0, bloomProgress))})`
    });
    await sleep(900);
  }

  let lanyardInteraction = { hitPoint: null, hoverCursor: "", pressedCursor: "", dragResponse: false };
  if (lanyardState?.present && lanyardState.rect) {
    const { x, y, width, height } = lanyardState.rect;
    const xFractions = [0.35, 0.5, 0.65, 0.8];
    const yFractions = [0.35, 0.48, 0.6, 0.72, 0.84];

    for (const yFraction of yFractions) {
      for (const xFraction of xFractions) {
        const point = { x: Math.round(x + width * xFraction), y: Math.round(y + height * yFraction) };
        await send("Input.dispatchMouseEvent", { type: "mouseMoved", ...point });
        await sleep(45);
        const cursorResult = await send("Runtime.evaluate", {
          expression: "document.body.style.cursor || ''",
          returnByValue: true
        });
        if (cursorResult.result.value === "grab") {
          lanyardInteraction.hitPoint = point;
          lanyardInteraction.hoverCursor = "grab";
          break;
        }
      }
      if (lanyardInteraction.hitPoint) break;
    }

    if (lanyardInteraction.hitPoint) {
      const start = lanyardInteraction.hitPoint;
      const end = { x: start.x + 72, y: start.y + 36 };
      await send("Input.dispatchMouseEvent", { type: "mousePressed", ...start, button: "left", clickCount: 1 });
      await sleep(80);
      const pressed = await send("Runtime.evaluate", {
        expression: "document.body.style.cursor || ''",
        returnByValue: true
      });
      lanyardInteraction.pressedCursor = pressed.result.value;
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", ...end, button: "left", buttons: 1 });
      await sleep(240);
      await send("Input.dispatchMouseEvent", { type: "mouseReleased", ...end, button: "left", clickCount: 1 });
      lanyardInteraction.dragResponse = lanyardInteraction.pressedCursor === "grabbing";
    }
  }

  const beforeX = liquidState.pointerX;
  const beforeY = liquidState.pointerY;
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 180, y: 220 });
  await sleep(300);

  const afterPointer = await send("Runtime.evaluate", {
    expression: `(() => {
      const host = document.querySelector('[data-liquid-background]');
      return {
        pointerX: host?.dataset.pointerX || null,
        pointerY: host?.dataset.pointerY || null
      };
    })()`,
    returnByValue: true
  });

  const ambientBefore = await send("Runtime.evaluate", {
    expression: `(() => {
      const root = document.querySelector('.longfu-ambient-bg');
      const layer = root?.querySelector('.will-change-transform');
      return { present: Boolean(root), transform: layer?.style.transform || '' };
    })()`,
    returnByValue: true
  });

  const monitorBefore = await send("Runtime.evaluate", {
    expression: `(() => {
      const monitor = document.querySelector('[data-monitor-follow]');
      return { present: Boolean(monitor), transform: monitor ? getComputedStyle(monitor).transform : '' };
    })()`,
    returnByValue: true
  });

  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1180, y: 780 });
  await sleep(500);

  if (!bloomState?.present && bloomProgress > 0) {
    await send("Runtime.evaluate", {
      expression: `scrollTo(0, Math.max(0, document.documentElement.scrollHeight - innerHeight) * ${Math.min(1, Math.max(0, bloomProgress))})`
    });
    await sleep(700);
  }

  const pageResult = await send("Runtime.evaluate", {
    expression: `(() => {
      const bodyText = document.body.innerText;
      const root = document.getElementById('root');
      const stage = document.querySelector('[data-bloom-experience]');
      const rootRect = root?.getBoundingClientRect();
      const stageRect = stage?.getBoundingClientRect();
      const ambientLayer = document.querySelector('.longfu-ambient-bg .will-change-transform');
      const monitor = document.querySelector('[data-monitor-follow]');
      const bloomHost = document.querySelector('[data-bloom-experience]');
      const bloomFeatures = bloomHost?.querySelector('[data-bloom-features]');
      const bloomFeatureRect = bloomFeatures?.getBoundingClientRect();
      const hero = document.querySelector('[data-cinematic-hero]');
      const heroPanel = hero?.querySelector('.cinematic-glass');
      const panelRect = heroPanel?.getBoundingClientRect();
      return {
        title: document.title,
        pathname: location.pathname,
        rootChildren: document.getElementById('root')?.children.length || 0,
        bodyLength: bodyText.length,
        styleSheets: document.styleSheets.length,
        bodyWidth: document.body.getBoundingClientRect().width,
        rootRect: rootRect ? { width: rootRect.width, height: rootRect.height, x: rootRect.x, y: rootRect.y } : null,
        stageRect: stageRect ? { width: stageRect.width, height: stageRect.height, x: stageRect.x, y: stageRect.y } : null,
        stagePosition: stage ? getComputedStyle(stage).position : null,
        containsUnicornText: /unicorn|liquid\\.ui/i.test(bodyText),
        ambientTransform: ambientLayer?.style.transform || '',
        monitorTransform: monitor ? getComputedStyle(monitor).transform : '',
        bloomProgress: bloomHost?.dataset.progress || null,
        bloomFeatureOpacity: bloomFeatures ? getComputedStyle(bloomFeatures).opacity : null,
        bloomFeatureState: bloomFeatures ? {
          display: getComputedStyle(bloomFeatures).display,
          visibility: getComputedStyle(bloomFeatures).visibility,
          transform: getComputedStyle(bloomFeatures).transform,
          zIndex: getComputedStyle(bloomFeatures).zIndex,
          rect: bloomFeatureRect ? { x: bloomFeatureRect.x, y: bloomFeatureRect.y, width: bloomFeatureRect.width, height: bloomFeatureRect.height } : null,
          firstCardOpacity: bloomFeatures.firstElementChild ? getComputedStyle(bloomFeatures.firstElementChild).opacity : null,
          firstCardColor: bloomFeatures.firstElementChild ? getComputedStyle(bloomFeatures.firstElementChild).color : null
        } : null,
        hero: {
          present: Boolean(hero),
          scrollY: window.scrollY,
          panelPresent: Boolean(heroPanel),
          panelOpacity: heroPanel ? getComputedStyle(heroPanel).opacity : null,
          panelVisibility: heroPanel ? getComputedStyle(heroPanel).visibility : null,
          panelRect: panelRect ? {
            x: panelRect.x,
            y: panelRect.y,
            width: panelRect.width,
            height: panelRect.height
          } : null
        }
      };
    })()`,
    returnByValue: true
  });

  const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  writeFileSync(screenshotPath, Buffer.from(screenshot.data, "base64"));

  const after = afterPointer.result.value;
  const ambient = ambientBefore.result.value;
  const monitor = monitorBefore.result.value;
  console.log(
    JSON.stringify(
      {
        url: targetUrl,
        viewport: { width: viewportWidth, height: viewportHeight, reducedMotion },
        events,
        page: pageResult.result.value,
        liquid: {
          ...liquidState,
          pointerAfter: after,
          pointerResponse: beforeX !== after.pointerX || beforeY !== after.pointerY
        },
        lanyard: {
          ...lanyardState,
          ...lanyardInteraction
        },
        bloom: bloomState,
        ambient: {
          ...ambient,
          transformAfterPointer: pageResult.result.value.ambientTransform,
          pointerResponse: !ambient.present || ambient.transform !== pageResult.result.value.ambientTransform
        },
        monitor: {
          ...monitor,
          transformAfterPointer: pageResult.result.value.monitorTransform,
          pointerResponse: !monitor.present || monitor.transform !== pageResult.result.value.monitorTransform
        },
        thirdPartySceneRequests,
        screenshotPath
      },
      null,
      2
    )
  );
} finally {
  ws?.close();
  child.kill();
}
