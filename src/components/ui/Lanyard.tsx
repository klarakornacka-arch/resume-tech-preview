/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import type { ReactThreeFiber, ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint
} from "@react-three/rapier";
import type { RapierRigidBody, RigidBodyProps } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ReactThreeFiber.BufferGeometryNode<MeshLineGeometry, typeof MeshLineGeometry>;
      meshLineMaterial: ReactThreeFiber.MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
  }
}

type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
  onReady?: () => void;
};

type BandProps = Pick<
  LanyardProps,
  "frontImage" | "backImage" | "imageFit" | "lanyardImage" | "lanyardWidth" | "onReady"
> & {
  maxSpeed?: number;
  minSpeed?: number;
};

type LanyardRigidBody = RapierRigidBody & {
  lerped?: THREE.Vector3;
};

type CardModel = {
  nodes: {
    card: THREE.Mesh;
    clip: THREE.Mesh;
    clamp: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
  };
};

type DrawableTextureImage = CanvasImageSource & {
  width: number;
  height: number;
};

const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const CARD_MODEL_URL = "/lanyard/card.glb";
const LANYARD_TEXTURE_URL = "/lanyard/lanyard.png";
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({
  position = [0, 0, 24],
  gravity = [0, -36, 0],
  fov = 22,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  onReady
}: LanyardProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={hostRef}
      data-home-lanyard
      data-ready="false"
      aria-hidden="true"
      className="relative h-full w-full touch-none overflow-visible"
    >
      <Canvas
        camera={{ position, fov }}
        dpr={[1, 1.5]}
        gl={{ alpha: transparent, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI * 0.82} />
          <Physics gravity={gravity} timeStep={1 / 60}>
            <Band
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
              onReady={() => {
                if (hostRef.current) hostRef.current.dataset.ready = "true";
                onReady?.();
              }}
            />
          </Physics>
          <Environment blur={0.72}>
            <Lightformer
              intensity={2.2}
              color="#f5f3f7"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.12, 1]}
            />
            <Lightformer
              intensity={3}
              color="#ffffff"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={2.6}
              color="#cb8dff"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={8}
              color="#ffffff"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  onReady
}: BandProps) {
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const joint1 = useRef<LanyardRigidBody>(null!);
  const joint2 = useRef<LanyardRigidBody>(null!);
  const joint3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const vec = useMemo(() => new THREE.Vector3(), []);
  const angularVelocity = useMemo(() => new THREE.Vector3(), []);
  const rotation = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const resolution = useMemo(() => new THREE.Vector2(1000, 1000), []);
  const repeat = useMemo(() => new THREE.Vector2(-4, 1), []);
  const segmentProps: RigidBodyProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(CARD_MODEL_URL) as unknown as CardModel;
  const texture = useTexture(lanyardImage || LANYARD_TEXTURE_URL);
  const frontTexture = useTexture(frontImage || BLANK_PIXEL);
  const backTexture = useTexture(backImage || BLANK_PIXEL);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!baseMap || (!frontImage && !backImage)) return baseMap;

    const baseImage = baseMap.image as DrawableTextureImage;
    const canvas = document.createElement("canvas");
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    const context = canvas.getContext("2d");
    if (!context) return baseMap;

    context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    const drawFitted = (image: DrawableTextureImage, rect: typeof FRONT_UV_RECT) => {
      const x = rect.x * canvas.width;
      const y = rect.y * canvas.height;
      const width = rect.w * canvas.width;
      const height = rect.h * canvas.height;
      const fit = imageFit === "contain" ? Math.min : Math.max;
      const scale = fit(width / image.width, height / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const drawX = x + (width - drawWidth) / 2;
      const drawY = y + (height - drawHeight) / 2;

      context.save();
      context.beginPath();
      context.rect(x, y, width, height);
      context.clip();
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      context.restore();
    };

    if (frontImage && frontTexture.image) {
      drawFitted(frontTexture.image as DrawableTextureImage, FRONT_UV_RECT);
    }
    if (backImage && backTexture.image) {
      drawFitted(backTexture.image as DrawableTextureImage, BACK_UV_RECT);
    }

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 8;
    composite.needsUpdate = true;
    return composite;
  }, [backImage, backTexture, frontImage, frontTexture, imageFit, materials.base.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      ])
  );
  const [dragOffset, setDragOffset] = useState<false | THREE.Vector3>(false);
  const [hovered, setHovered] = useState(false);

  useRopeJoint(fixed, joint1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(joint1, joint2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(joint2, joint3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(joint3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useEffect(() => {
    if (cardMap === materials.base.map) return;
    return () => cardMap?.dispose();
  }, [cardMap, materials.base.map]);

  useEffect(() => {
    if (!hovered) return;
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = dragOffset ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = previousCursor;
    };
  }, [dragOffset, hovered]);

  const getLerped = (body: LanyardRigidBody) => {
    if (!body.lerped) body.lerped = new THREE.Vector3().copy(body.translation());
    return body.lerped;
  };

  useFrame((state, delta) => {
    if (dragOffset) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      direction.copy(vec).sub(state.camera.position).normalize();
      vec.add(direction.multiplyScalar(state.camera.position.length()));
      [card, joint1, joint2, joint3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragOffset.x,
        y: vec.y - dragOffset.y,
        z: vec.z - dragOffset.z
      });
    }

    if (!fixed.current) return;
    [joint1, joint2].forEach((ref) => {
      const lerped = getLerped(ref.current);
      const distance = Math.max(0.1, Math.min(1, lerped.distanceTo(ref.current.translation())));
      lerped.lerp(ref.current.translation(), delta * (minSpeed + distance * (maxSpeed - minSpeed)));
    });

    curve.points[0].copy(joint3.current.translation());
    curve.points[1].copy(getLerped(joint2.current));
    curve.points[2].copy(getLerped(joint1.current));
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(32));
    angularVelocity.copy(card.current.angvel());
    rotation.copy(card.current.rotation());
    card.current.setAngvel(
      { x: angularVelocity.x, y: angularVelocity.y - rotation.y * 0.25, z: angularVelocity.z },
      true
    );
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[-1, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={joint1} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={joint2} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={joint3} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragOffset ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(event: ThreeEvent<PointerEvent>) => {
              const target = event.target as Element;
              if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
              setDragOffset(false);
            }}
            onPointerDown={(event: ThreeEvent<PointerEvent>) => {
              (event.target as Element).setPointerCapture(event.pointerId);
              setDragOffset(
                new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.82}
                metalness={0.62}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.28} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#f2f3f5"
          depthTest={false}
          resolution={resolution}
          useMap={1}
          map={texture}
          repeat={repeat}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_MODEL_URL);
useTexture.preload(LANYARD_TEXTURE_URL);
