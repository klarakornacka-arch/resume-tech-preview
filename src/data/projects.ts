export type ProjectCategory =
  | "Product Design"
  | "AI Visual"
  | "AI Animation"
  | "IP Design"
  | "Sketch"
  | "Brand Identity";

export type ProjectProcessStep = {
  title: string;
  text: string;
};

export type ProjectCaseMedia = {
  src: string;
  alt: string;
  ratio?: string;
  caption?: string;
};

export type ProjectCaseBlock = {
  eyebrow: string;
  title: string;
  body: string[];
  media?: ProjectCaseMedia[];
  bullets?: string[];
  layout?: "wide" | "split" | "gallery" | "stack" | "editorial";
};

export type ProjectCaseStudy = {
  positioning: string;
  background: string[];
  painPoints: string[];
  goals: string[];
  responsibilities: string[];
  blocks: ProjectCaseBlock[];
  value: string[];
  summary: string[];
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  category: ProjectCategory;
  year: string;
  description: string;
  cover: string;
  video?: string;
  role: string[];
  tools: string[];
  overview: string;
  challenge: string;
  process: ProjectProcessStep[];
  gallery: string[];
  result: string;
  reflection: string;
  accent: string;
  caseStudy?: ProjectCaseStudy;
};

export const categories: Array<ProjectCategory | "All"> = [
  "All",
  "Product Design",
  "AI Visual",
  "AI Animation",
  "IP Design",
  "Sketch",
  "Brand Identity"
];

export const projects: Project[] = [
  {
    id: "p-001",
    slug: "longqi-ip-toy",
    title: "龙福潮翁",
    titleEn: "Longfu Chao Weng",
    category: "IP Design",
    year: "2024",
    description: "以东方祈福文化为叙事核心的潮玩 IP 角色与盲盒商业化系统。",
    cover: "/images/longqi/character-01.png",
    role: ["IP concept", "Character system", "AI visual iteration", "Product extension"],
    tools: ["Sketching", "Midjourney", "Photoshop", "AI Rendering"],
    overview:
      "龙福潮翁围绕“福气、长者、醒狮、龙文化”建立角色世界，将东方祈福语义转译为亲和、喜庆、可收藏的潮玩 IP。",
    challenge:
      "项目需要在传统文化符号和年轻潮玩审美之间取得平衡，让角色既有春节祈福的文化识别，也具备盲盒产品的商业延展性。",
    process: [
      {
        title: "Research",
        text: "梳理龙、醒狮、福袋、春节街巷和潮玩盲盒的视觉语义，建立“喜庆、亲和、收藏感”的关键词。"
      },
      {
        title: "Concept Development",
        text: "从手绘线稿出发，确定短身比例、笑脸长者、醒狮杖和竹篮背包等核心识别点。"
      },
      {
        title: "Design Development",
        text: "通过 AI 多轮生成和人工筛选，统一角色表情、服饰纹样、材质细节和盲盒陈列语言。"
      }
    ],
    gallery: [
      "/images/longqi/character-01.png",
      "/images/longqi/design-system-01.png",
      "/images/longqi/blind-box-01.png"
    ],
    result:
      "输出 IP 主形象、角色结构拆解、材质展示、盲盒系列、开盒展示和衍生品视觉，形成从概念到商业陈列的完整作品链路。",
    reflection:
      "这组项目证明了我可以把传统文化符号转译为当代潮玩产品，并用 AI 工具完成高一致性的视觉扩展。",
    accent: "#D94A3A",
    caseStudy: {
      positioning:
        "东方祈福文化潮玩 IP。以“龙福潮翁”为主角，构建可用于盲盒、摆件、包装、文创周边和节庆视觉传播的角色资产。",
      background: [
        "春节、醒狮、龙纹、福袋和长者形象都具有强烈的东方文化记忆，但传统符号如果直接搬进潮玩产品，容易显得厚重、老派或只停留在装饰层。",
        "项目希望把“福气降临、笑口常开、潮流长者”变成一个更年轻、更亲和、更适合收藏的 IP 角色，让传统节庆语义进入当代潮玩语境。"
      ],
      painPoints: [
        "传统祈福视觉常被处理成平面装饰，缺少可被记住的角色性格。",
        "年轻消费者喜欢潮玩比例和情绪价值，但不希望文化符号过于严肃。",
        "单个角色如果没有结构、材质和衍生品规划，很难形成商业系列。"
      ],
      goals: [
        "建立一个一眼可识别的主角色轮廓。",
        "把醒狮、龙纹、福袋、竹篮、眼镜、长袍等元素转化为角色结构。",
        "形成盲盒系列、材质细节和文创衍生的完整视觉系统。"
      ],
      responsibilities: [
        "完成项目定位、角色设定、草图探索和视觉方向收敛。",
        "使用 AI 工具生成多轮角色、场景、材质与衍生品方案。",
        "对输出图进行筛选、统一、重组和作品集化叙事排版。",
        "搭建从主视觉到盲盒系列、开盒展示、文创周边的商业化表达链路。"
      ],
      blocks: [
        {
          eyebrow: "Project Background",
          title: "从\u201c福气\u201d出发，而不是从装饰纹样出发",
          body: [
            "项目名称\u201c龙福潮翁\u201d把龙文化、福运祝愿和潮流长者结合在一起。主角不是传统意义上的神仙或吉祥物，而是一个带着醒狮杖、笑口常开、背着竹篮行走在节庆街巷中的福气老人。",
            "这种设定让角色同时具备亲切感、故事感和陈列感。场景中的牌匾、灯笼、春联、桃花和石板路强化东方节庆氛围，但视觉焦点始终落在角色本身。"
          ],
          media: [
            {
              src: "/images/longqi/character-01.png",
              alt: "龙福潮翁主角色形象",
              ratio: "aspect-[4/5]",
              caption: "主角色承担项目第一印象，适合作为详情页首屏和作品集封面。"
            }
          ],
          layout: "wide"
        },
        {
          eyebrow: "Character System",
          title: "六个角色变体，构建完整的IP角色家族",
          body: [
            "围绕主角色延伸出六种角色变体，包含不同表情、动作姿态和配饰变化。每个角色保留核心识别点（醒狮杖、竹篮、福袋、长袍），同时通过姿态、道具和色彩微调形成可区分的角色个性。",
            "角色系统不只是换色，而是让每个角色拥有独立的情绪和故事：有的手持放大镜做研究状，有的展开卷轴呈祝福态，有的抱拳作揖传递福运。"
          ],
          media: [
            { src: "/images/longqi/character-02.png", alt: "龙福潮翁角色一：核心主形象", ratio: "aspect-[3/4]", caption: "核心主形象，展示角色基础形态" },
            { src: "/images/longqi/character-03.png", alt: "龙福潮翁角色二：研究姿态", ratio: "aspect-[3/4]", caption: "手持放大镜做研究状" },
            { src: "/images/longqi/character-04.png", alt: "龙福潮翁角色三：祝福姿态", ratio: "aspect-[3/4]", caption: "背着挎包，传递祝福" },
            { src: "/images/longqi/character-05.png", alt: "龙福潮翁角色四：冰箱贴延展", ratio: "aspect-[3/4]", caption: "角色四变体展示" },
            { src: "/images/longqi/character-06.png", alt: "龙福潮翁角色五：手机壳延展", ratio: "aspect-[3/4]", caption: "角色五变体展示" },
            { src: "/images/longqi/character-07.png", alt: "龙福潮翁角色六：完整角色集合", ratio: "aspect-[3/4]", caption: "完整角色集合，展现家族力量" }
          ],
          bullets: [
            "角色一: 核心主形象",
            "角色二: 研究姿态 + 放大镜",
            "角色三: 祝福姿态 + 挎包",
            "角色四: 冰箱贴延展",
            "角色五: 手机壳延展",
            "角色六: 完整角色集合"
          ],
          layout: "gallery"
        },
        {
          eyebrow: "Design System",
          title: "角色被拆解为可生产、可替换、可系列化的结构模块",
          body: [
            "结构拆解围绕头部、胡须、眼镜、长袍、内衫、裤装、鞋履、竹篮、醒狮杖和手部进行。每个部件都不是单纯装饰，而是承担角色识别或系列变体的功能。",
            "设计系统图展示角色正面、侧面、背面三视图及关键部件标注，为后续盲盒生产、3D建模和衍生品开发提供规范参考。"
          ],
          media: [
            { src: "/images/longqi/design-system-01.png", alt: "龙福潮翁角色结构拆解一", ratio: "aspect-[16/9]", caption: "三视图与部件标注，建立生产规范" },
            { src: "/images/longqi/design-system-02.png", alt: "龙福潮翁角色结构拆解二", ratio: "aspect-[16/9]", caption: "角色分解与部件说明" }
          ],
          bullets: [
            "头部与胡须: 建立角色年龄感",
            "醒狮杖: 提供文化记忆点",
            "竹篮与福袋: 强化祈福叙事",
            "鞋履与短身比例: 保持潮玩亲和度"
          ],
          layout: "stack"
        },
        {
          eyebrow: "Detail & Material",
          title: "材质特写验证 PVC、植绒、透明件和刺绣纹样的真实触感",
          body: [
            "CMF方向不是追求复杂，而是让不同材料服务角色性格。胡须和皮肤使用光滑PVC保持玩具亲和感，醒狮头和服饰纹样加入磨砂喷涂与刺绣质感，红色透明件用于制造节庆光泽。",
            "细节特写从多个角度展示角色头部、胡须、福袋、服饰材质和面部表情，证明角色在放大后仍然保持精致度和收藏品质。"
          ],
          media: [
            { src: "/images/longqi/detail-01.png", alt: "龙福潮翁细节特写一", ratio: "aspect-square", caption: "正面细节展示面部亲和表情与头部结构" },
            { src: "/images/longqi/detail-02.png", alt: "龙福潮翁细节特写二", ratio: "aspect-square", caption: "侧身视角展示服饰纹样与道具关系" },
            { src: "/images/longqi/detail-03.png", alt: "龙福潮翁细节展示", ratio: "aspect-square", caption: "细节展示" },
            { src: "/images/longqi/detail-04.png", alt: "龙福潮翁细节特写四", ratio: "aspect-square", caption: "角色正面展示服饰色彩与纹样层次" },
            { src: "/images/longqi/detail-fudai.png", alt: "龙福潮翁福袋细节", ratio: "aspect-square", caption: "福袋细节承担好运叙事" },
            { src: "/images/longqi/detail-beard.png", alt: "龙福潮翁胡须细节", ratio: "aspect-square", caption: "胡须细节强化长者识别和产品精致度" },
          ],
          bullets: [
            "PVC光滑面: 皮肤与面部亲和触感",
            "刺绣纹样: 长袍福字与祥云细节",
            "植绒效果: 醒狮毛发装饰",
            "红色透明件: 节庆光泽与福袋质感"
          ],
          layout: "gallery"
        },
        {
          eyebrow: "Final Results",
          title: "从单一角色延展为盲盒系列和完整文创周边系统",
          body: [
            "最终效果不只是一张角色图，而是覆盖盲盒系列、包装展示、开盒展示、全角色阵列和衍生品的完整系统。这样可以让项目更接近真实商业提案，而不是停留在概念渲染。",
            "衍生品选择围绕日常使用场景展开，包括冰箱贴、手机壳、茶具、贴纸等，让IP从收藏柜进入真实生活。"
          ],
                    media: [
            { src: "/images/longqi/blind-box-01.png", alt: "龙福潮翁盲盒系列一", ratio: "aspect-[16/10]", caption: "盲盒系列展示角色变体、包装与产品阵列" },
            { src: "/images/longqi/blind-box-02.png", alt: "龙福潮翁保温杯", ratio: "aspect-[16/10]", caption: "保温杯将IP融入生活方式" },
            { src: "/images/longqi/unboxing.png", alt: "龙福潮翁开盒展示", ratio: "aspect-[5/4]", caption: "开盒展示" },
            { src: "/images/longqi/fridge-magnet-01.png", alt: "龙福潮翁冰箱贴", ratio: "aspect-[3/4]", caption: "冰箱贴衍生品" },
            { src: "/images/longqi/phone-case.png", alt: "龙福潮翁手机壳", ratio: "aspect-[3/4]", caption: "手机壳衍生品" },
            { src: "/images/longqi/derivative-01.png", alt: "龙福潮翁周边衍生品一", ratio: "aspect-[3/4]", caption: "周边衍生品展示" },
            { src: "/images/longqi/derivative-02.png", alt: "龙福潮翁周边衍生品二", ratio: "aspect-[3/4]", caption: "" },
            { src: "/images/longqi/derivative-03.png", alt: "龙福潮翁周边衍生品三", ratio: "aspect-[3/4]", caption: "" },
            { src: "/images/longqi/derivative-04.png", alt: "龙福潮翁周边衍生品四", ratio: "aspect-[3/4]", caption: "" },
            { src: "/images/longqi/derivative-05.png", alt: "龙福潮翁周边衍生品五", ratio: "aspect-[3/4]", caption: "" },
            { src: "/images/longqi/series-overview.png", alt: "龙福潮翁全系列展示", ratio: "aspect-[16/10]", caption: "全系列衍生品一览" },
          ],
          layout: "stack"
        }
      ],
      value: [
        "项目建立了从角色概念、结构拆解、CMF 设定到商业周边的完整 IP 产品链路。",
        "通过 AI 生成与人工筛选结合，提高了视觉探索效率，同时保持了角色风格一致性。",
        "作品能够展示 IP 设计、产品化思维、AI 视觉控制和作品集叙事整合能力。"
      ],
      summary: [
        "龙福潮翁不是单一吉祥物，而是一次把东方祈福文化转译为潮玩产品系统的练习。",
        "这个项目最有价值的部分，是让文化符号从平面装饰变成角色性格、结构模块、材料语言和商业延展。"
      ]
    }
  },
  {
    id: "p-002",
    slug: "student-portable-device",
    title: "智能升降收纳",
    titleEn: "Infinite Loop Desktop Organizer",
    category: "Product Design",
    year: "2024",
    description: "让约 20 支常用笔具完成循环入仓、智能管理与自动升降取用的可视化桌面收纳系统。",
    cover: "/images/projects/infinite-loop/cover.png",
    role: ["User research", "Structure logic", "Product design", "Interaction system"],
    tools: ["Figma", "Rhino", "KeyShot", "Photoshop"],
    overview:
      "Infinite Loop 面向学生与创意工作者的高频桌面场景，把散落笔具转化为垂直循环收纳，并用透明结构展示物品入仓与升降取用的机械过程。",
    challenge:
      "项目需要在 143 × 108 × 263 mm 的紧凑体积中整合约 20 支笔的收纳容量、自动升降、轨道循环、状态灯效与 App 管理，同时保持结构关系可读。",
    process: [
      {
        title: "User Research",
        text: "观察大学生桌面使用状态，提炼笔具散落、分类单一、空间占用和寻找物品打断专注四类问题。"
      },
      {
        title: "Mechanism Development",
        text: "以垂直螺旋轨道、笔槽模块和弹簧升降机构建立循环收纳逻辑，并用透明外壳呈现内部运动。"
      },
      {
        title: "Experience Integration",
        text: "整合前部快速取用按键、App 指定取笔、物品管理、灯效控制和使用统计，形成软硬件一致的体验。"
      }
    ],
    gallery: [
      "/images/projects/infinite-loop/interaction.png",
      "/images/projects/infinite-loop/exploded.png",
      "/images/projects/infinite-loop/cmf.png"
    ],
    result:
      "完成从用户研究、机制草图、结构爆炸、尺寸定义、CMF 到 App 交互的系统化概念方案，建立一套可继续进行工程样机验证的桌面收纳产品提案。",
    reflection:
      "这个项目证明了机械可视化可以同时承担功能解释和情绪价值；下一阶段需要通过样机验证轨道容错、升降噪声、不同笔径兼容与长期循环可靠性。",
    accent: "#FF9A3C",
    caseStudy: {
      positioning:
        "面向学生与创意工作者的智能桌面笔具收纳系统。通过透明螺旋轨道、约 20 支笔容量、自动识别与升降取用，把杂乱的横向桌面转化为可视、可管理的垂直收纳体验。",
      background: [
        "学习和创作桌面往往同时容纳书本、电脑、绘图工具与不同类型的笔具。常用物品会随手散落，传统笔筒又只能把所有笔混放在一起。",
        "Infinite Loop 试图把收纳从一个静态容器变成连续的产品行为：放入、记录、循环入仓、指定取用，每一步都能被用户理解。"
      ],
      painPoints: [
        "笔具无序堆放，占用有限桌面空间并制造持续的视觉噪声。",
        "传统笔筒缺少分类能力，寻找特定笔具会中断学习或创作节奏。",
        "普通收纳工具只隐藏物品，无法反馈库存、使用频率与取用状态。",
        "机械功能如果被完全包裹，用户很难理解产品为什么值得占据桌面。"
      ],
      goals: [
        "用垂直结构提高单位桌面面积的收纳容量。",
        "建立清晰的放入、管理和取用流程，让第一次使用也能理解。",
        "把轨道与升降过程转化为产品识别，而不是遮蔽在外壳内部。",
        "让物理按键与 App 都能完成取笔，兼顾快速操作和精确选择。"
      ],
      responsibilities: [
        "完成大学生桌面场景观察、问题归纳和产品定位。",
        "推进形态草图、轨道方案、笔槽结构与升降机制的概念设计。",
        "定义尺寸、容量、模块关系、CMF 与状态灯效。",
        "设计设备连接、物品管理、指定取笔、灯效控制和使用统计界面。"
      ],
      blocks: [
        {
          eyebrow: "User Research",
          title: "真正的问题不是没有笔筒，而是桌面缺少高效的取用秩序。",
          body: [
            "调研从大学生日常书桌开始。画笔、中性笔、记号笔与修正工具同时出现时，物品会围绕当前任务临时堆积；当任务切换，桌面很快失去秩序。",
            "传统笔筒虽然能集中物品，却仍然需要翻找，也不能告诉用户某类笔具还有多少。项目因此把目标从“多装一些”改为“更快找到、更少占地、状态可知”。"
          ],
          media: [
            {
              src: "/images/projects/infinite-loop/research.png",
              alt: "大学生桌面收纳使用研究",
              ratio: "aspect-[1400/1143]",
              caption: "真实桌面观察将问题归纳为杂乱、工具单一、空间有限与寻找效率低。"
            }
          ],
          bullets: ["高频用户: 学生、插画师与创意工作者", "核心对象: 中性笔、铅笔、马克笔等长条笔具", "关键指标: 桌面占地、取用速度、分类清晰度"],
          layout: "wide"
        },
        {
          eyebrow: "Design Strategy",
          title: "把横向杂乱折叠成一条向上的循环路径。",
          body: [
            "方案以 143 × 108 mm 的桌面投影建立垂直仓体，利用螺旋轨道延长内部运动路径。物品不再平铺在桌面，而是在透明仓体中完成收纳与展示。",
            "透明外壳不是装饰。它让用户看见轨道、金属中柱、笔槽与升降机构之间的关系，也让机械过程成为 Infinite Loop 最重要的产品识别。"
          ],
          media: [
            {
              src: "/images/projects/infinite-loop/concept.png",
              alt: "Infinite Loop 智能升降收纳概念主视觉",
              ratio: "aspect-square",
              caption: "垂直仓体把约 20 支笔的容量压缩进更小的桌面占地。"
            }
          ],
          bullets: ["垂直收纳: 减少桌面占地", "循环轨道: 延长内部路径并形成视觉记忆", "透明结构: 让功能逻辑能够被直接理解", "状态灯效: 反馈运行、等待和完成状态"],
          layout: "split"
        },
        {
          eyebrow: "Interaction Flow",
          title: "按下、升起、取走，三步完成一次无须翻找的取笔。",
          body: [
            "快速模式下，用户按下前部启动键，设备调用最近使用的笔具；内部电机与升降导向结构启动，将目标物品送到顶部取用位置。",
            "需要精确选择时，用户可以在 App 中查看库存与数量，指定笔型和数量后执行取出。物理按键负责低成本高频操作，App 负责更细的管理。"
          ],
          media: [
            {
              src: "/images/projects/infinite-loop/interaction.png",
              alt: "智能升降收纳三步取笔流程",
              ratio: "aspect-[1309/1200]",
              caption: "前部按键启动设备，升降模块将目标笔具送至取用位置。"
            }
          ],
          bullets: ["01 按下启动键或在 App 中选择", "02 系统识别目标笔具并启动升降", "03 笔具到达取用位置后完成操作"],
          layout: "split"
        },
        {
          eyebrow: "Sketch Exploration",
          title: "草图不是表现终点，而是用来消除结构矛盾。",
          body: [
            "草图阶段同步探索圆柱与方柱仓体、单轨与螺旋轨道、笔槽数量、顶部入口和底部驱动模块。每组形态都围绕桌面占地、内部容量与可解释性进行比较。",
            "最终选择圆角矩形外壳，使产品更适合靠近电脑与书本摆放；内部保留螺旋轨道，使运动方向在正面和侧面都可被观察。"
          ],
          media: [
            {
              src: "/images/projects/infinite-loop/sketches.png",
              alt: "智能升降收纳形态与机构草图",
              ratio: "aspect-[1309/1200]",
              caption: "形态、轨道、笔槽和升降机构在同一轮草图中协同推进。"
            }
          ],
          layout: "wide"
        },
        {
          eyebrow: "Structure Logic",
          title: "十三个模块共同回答：物品如何进入、停留并再次被送出。",
          body: [
            "上部 LED 模块与透明盖板形成入口和状态反馈；螺旋轨道围绕金属中柱组织物品路径；透明亚克力外壳负责防护与展示。",
            "底部由笔槽模块、弹簧升降、导向结构、电机、主控板和防滑底座组成。模块化拆分让机械、电子和外观件拥有更清晰的装配边界。"
          ],
          media: [
            {
              src: "/images/projects/infinite-loop/exploded.png",
              alt: "Infinite Loop 十三模块结构爆炸图",
              ratio: "aspect-[1198/1319]",
              caption: "爆炸图明确轨道、中柱、升降、驱动、控制与灯光模块的装配关系。"
            }
          ],
          bullets: ["上部: 顶盖灯光与透明入口", "中部: 螺旋轨道、金属中柱与透明仓体", "下部: 笔槽、弹簧升降、电机与主控板", "接触面: 防滑脚垫与 Type-C 供电"],
          layout: "split"
        },
        {
          eyebrow: "Engineering Definition",
          title: "用明确尺度约束容量，而不是用效果图回避产品体积。",
          body: [
            "产品尺寸定义为 143 × 108 × 263 mm，重量约 1.2 kg，收纳容量约 20 支笔，使用 Type-C 5V/2A 供电。",
            "这个尺度让设备可以放在显示器、笔记本电脑或绘图板旁边，同时为内部轨道、驱动和升降结构保留必要空间。"
          ],
          media: [
            {
              src: "/images/projects/infinite-loop/dimensions.png",
              alt: "智能升降收纳三视图与规格参数",
              ratio: "aspect-square",
              caption: "三视图给出真实占地、整体高度、容量、重量和供电条件。"
            }
          ],
          layout: "wide"
        },
        {
          eyebrow: "CMF Direction",
          title: "透明不是轻飘的未来感，而是让结构成为产品表面。",
          body: [
            "CMF 以透明亚克力、透明 PC、阳极氧化铝、ABS 工程塑料和金属弹簧构成。透明件负责展示，金属件提供结构可信度，深灰底座压住整体重心。",
            "橙色灯带用于状态反馈和运动路径提示，与冷色环境光形成对比。灯光不承担装饰性外发光，而是帮助用户判断设备是否正在运行。"
          ],
          media: [
            {
              src: "/images/projects/infinite-loop/cmf.png",
              alt: "Infinite Loop CMF 材质与工艺研究",
              ratio: "aspect-[1309/1209]",
              caption: "透明、金属、深灰工程塑料与橙色灯带共同建立机械可视化语言。"
            }
          ],
          layout: "wide"
        },
        {
          eyebrow: "Digital Experience",
          title: "App 不复制物理按钮，而是补足库存与精确选择。",
          body: [
            "App 首页用于查看连接和设备状态；物品管理记录笔型与数量；智能取笔支持指定物品和数量；灯效控制负责颜色、亮度和模式。",
            "使用统计、设备设置与固件更新放在低频层级，避免干扰核心取笔任务。完整流程保持在连接设备、选择功能、执行操作与完成取出四个阶段。"
          ],
          media: [
            {
              src: "/images/projects/infinite-loop/app.png",
              alt: "Infinite Loop 智能控制 App 界面系统",
              ratio: "aspect-[1309/1200]",
              caption: "App 将库存、指定取笔、灯效和设备状态组织成一套完整管理界面。"
            }
          ],
          bullets: ["设备连接与运行状态", "笔具分类、数量与库存管理", "指定取笔与执行反馈", "灯效模式、亮度和颜色控制", "使用统计与固件更新"],
          layout: "wide"
        }
      ],
      value: [
        "项目把用户研究、垂直收纳策略、机械结构、产品造型、CMF 与数字界面组织在同一条设计链路中。",
        "透明螺旋轨道让机械过程成为差异化识别，同时帮助用户理解产品状态与内部逻辑。",
        "完整的结构、尺寸和交互证据，使项目不只是一组未来感效果图，而是一套可继续样机验证的产品概念。"
      ],
      summary: [
        "Infinite Loop 不是一个自动发光的笔筒，而是把放入、管理和取用重新组织成循环系统的桌面产品。",
        "下一阶段应围绕不同笔径兼容、轨道卡滞、运行噪声、升降速度和长期耐久性制作功能样机并完成验证。"
      ]
    }
  },
  {
    id: "p-003",
    slug: "portable-camping-light",
    title: "智能家居氛围灯设计",
    titleEn: "Luna Loop Smart Ambient Mirror Lamp",
    category: "Product Design",
    year: "2025",
    description: "将镜面、环形柔光与环境感知整合为一体，让家居照明主动回应人在不同时间与状态下的需求。",
    cover: "/images/projects/luna-loop/cover.png",
    role: ["User insight", "Product design", "Interaction system", "Structure & CMF"],
    tools: ["Rhino", "KeyShot", "Figma", "Photoshop"],
    overview:
      "Luna Loop 是一款壁挂式智能氛围镜灯。它通过人体与环境感知自动判断照明时机，并以 2700K–6500K 可调环形柔光覆盖阅读、休息、观影与夜间陪伴等家居场景。",
    challenge:
      "传统家居灯光往往要求用户主动寻找开关、反复调节亮度，且单一色温难以同时照顾工作效率、夜间放松与睡眠准备。设计需要在智能感知、舒适光线、镜面功能和空间装饰之间建立统一体验。",
    process: [
      {
        title: "Scenario Research",
        text: "从夜间疲惫、回家过渡、阅读观影和睡前陪伴等场景中，提炼主动开灯、眩光与模式切换成本。"
      },
      {
        title: "Sensing Strategy",
        text: "构建 PIR、毫米波与环境光传感器协同的感知链路，让灯光随接近、时间和环境亮度自适应变化。"
      },
      {
        title: "Design Development",
        text: "以环形光带包围高透镜面，完成形态、光学层、壁挂结构、触控与 App 交互的系统化设计。"
      }
    ],
    gallery: [
      "/images/projects/luna-loop/working-principle.png",
      "/images/projects/luna-loop/sketches.png",
      "/images/projects/luna-loop/interaction.png"
    ],
    result:
      "形成一套包含感知逻辑、环形镜灯造型、光学结构、壁挂安装、触控与 App 体验的智能家居照明方案。",
    reflection:
      "项目让我从单一灯具造型进一步走向系统体验设计：真正的智能不是增加控制入口，而是让正确的光在正确的时刻自然出现。",
    accent: "#D6B27A",
    caseStudy: {
      positioning:
        "面向卧室、客厅、玄关与酒店空间的智能壁挂氛围镜灯，以环形柔光、镜面反射和主动感知建立兼具功能照明与空间情绪的家居视觉焦点。",
      background: [
        "人在夜间回到家、从工作切换到休息或准备入睡时，照明需求会快速变化。固定亮度和单一色温无法持续匹配这些状态，频繁寻找开关与调节参数又增加了操作负担。",
        "Luna Loop 将灯、镜与智能感知整合在同一圆形界面中，让产品从被动执行命令的灯具，转变为理解接近、环境亮度与生活节奏的空间伴侣。"
      ],
      painPoints: [
        "夜间强光突然开启容易造成眩光，也会打断从活动到休息的情绪过渡。",
        "传统灯具需要主动寻找开关或手机，无法在双手被占用、疲惫或夜间起身时自然响应。",
        "照明、镜面与装饰通常各自占据墙面，空间信息分散且缺少统一焦点。",
        "智能照明常堆叠复杂设置，但没有把感知结果转化为真正可感知的舒适体验。"
      ],
      goals: [
        "用连续环形柔光形成清晰而克制的产品识别。",
        "通过人体与环境感知减少开关和调节动作，让照明主动出现。",
        "覆盖 2700K–6500K 色温与多种情境模式，兼顾专注、休闲、观影和睡眠。",
        "把镜面、光学层、电子模块和壁挂结构整合为可解释、可安装的产品系统。"
      ],
      responsibilities: [
        "梳理目标场景与夜间照明痛点，定义产品定位和体验目标。",
        "完成环形形态、比例、镜面关系、草图探索与最终造型收敛。",
        "规划 PIR、毫米波、环境光传感器与控制芯片组成的感知逻辑。",
        "完成结构爆炸、尺寸参数、触控方式、App 功能与情境模式表达。"
      ],
      blocks: [
        {
          eyebrow: "Project Background",
          title: "让灯光在用户意识到需要之前，先完成回应。",
          body: [
            "夜间家居照明的核心问题并非缺少亮度，而是灯光与人的状态不同步。疲惫回家、短暂休息、沉浸观影和准备入睡，需要完全不同的亮度、色温与开启方式。",
            "项目因此把重点从“如何控制一盏灯”转向“如何让空间理解此刻需要怎样的光”。"
          ],
          media: [
            {
              src: "/images/projects/luna-loop/pain-point.png",
              alt: "夜间疲惫状态下的家居照明使用场景",
              ratio: "aspect-square",
              caption: "夜间疲惫与操作负担共同构成主动感知照明的设计起点。"
            }
          ],
          layout: "wide"
        },
        {
          eyebrow: "Design Strategy",
          title: "镜面是空间的中心，光环负责建立情绪与时间感。",
          body: [
            "圆形语言弱化设备感，中心镜面延展空间，外围连续光环提供均匀、柔和且方向明确的照明。产品既能作为日常镜灯，也能在关闭时保留完整的墙面装饰属性。",
            "800 × 800 × 80 mm 的薄型壁挂结构让产品具备足够视觉存在感，同时避免成为厚重的智能设备。"
          ],
          media: [
            {
              src: "/images/projects/luna-loop/cover.png",
              alt: "Luna Loop 智能家居氛围镜灯空间效果",
              ratio: "aspect-[16/9]",
              caption: "环形柔光与镜面共同成为空间中的视觉焦点。"
            }
          ],
          bullets: ["环形柔光: 低眩光、均匀扩散", "中心镜面: 日常功能与空间延展", "薄型壁挂: 减少体量侵入", "统一圆形界面: 建立产品记忆点"],
          layout: "wide"
        },
        {
          eyebrow: "Sketch Exploration",
          title: "从光环、镜面与墙体的三层关系收敛产品比例。",
          body: [
            "草图阶段围绕圆环厚度、镜面直径、侧面曲率和壁挂距离展开多轮探索，并同步考虑导光板、LED 灯带与后壳结构的空间。",
            "最终方案保留完整光环与大面积镜面，通过窄边框和隐藏式安装让光看起来像从墙面自然生长出来。"
          ],
          media: [
            {
              src: "/images/projects/luna-loop/sketches.png",
              alt: "Luna Loop 形态与结构草图探索",
              ratio: "aspect-square",
              caption: "草图同时验证正面识别、侧面厚度、光学层与壁挂关系。"
            }
          ],
          layout: "wide"
        },
        {
          eyebrow: "Sensing Logic",
          title: "接近、识别、调节，形成无需寻找开关的照明闭环。",
          body: [
            "PIR 人体感应负责快速发现移动，毫米波传感器补充静止状态识别，环境光传感器判断当前空间亮度。信息进入控制芯片后，系统决定是否开启以及输出何种亮度与色温。",
            "白天以自然白补光，傍晚逐步转为约 3000K 暖光，睡眠时降低至约 2000K，让智能逻辑最终体现为连续而舒适的光线变化。"
          ],
            media: [
              {
                src: "/images/projects/luna-loop/working-principle.png",
                alt: "Luna Loop 智能感知与自适应照明工作原理",
                ratio: "aspect-square",
                caption: "人体检测、环境分析与自适应输出构成系统工作流程。"
              },
              {
                src: "/images/projects/luna-loop/sensing-sequence.png",
                alt: "Luna Loop 从接近感知到暖光开启的夜间使用过程",
                ratio: "aspect-[16/9]",
                caption: "同一空间的连续状态展示灯光如何随人的接近逐步响应，而不是突然点亮。"
              }
            ],
          bullets: ["人体接近后自动唤醒", "环境光识别避免无效开启", "静止状态持续检测", "昼夜节律驱动色温与亮度"],
          layout: "wide"
        },
        {
          eyebrow: "Structure & Engineering",
          title: "把柔光、镜面、控制与安装压缩进 80 mm 厚度。",
          body: [
            "结构由光学扩散罩、高透镜面、LED 环形模组、阳极氧化铝合金框、导光板、智能控制主板、后壳、电源驱动与壁挂支架组成。模块分层便于说明光路，也为后期维护与装配留下清晰路径。",
            "整机尺寸为 800 × 800 × 80 mm，镜面直径 500 mm，额定功率 24W，显色指数 Ra > 90，并支持 100–240V 宽电压输入。"
          ],
          media: [
            {
              src: "/images/projects/luna-loop/exploded.png",
              alt: "Luna Loop 结构爆炸图",
              ratio: "aspect-square",
              caption: "十个结构层级解释光学、电子与壁挂安装关系。"
            },
              {
                src: "/images/projects/luna-loop/dimensions.png",
                alt: "Luna Loop 三视图、剖面与产品参数",
                ratio: "aspect-square",
                caption: "三视图与剖面验证外形尺寸、壁挂厚度和内部层级。"
              },
              {
                src: "/images/projects/luna-loop/installation.png",
                alt: "Luna Loop 壁挂支架、隐藏走线与安装流程",
                ratio: "aspect-[16/9]",
                caption: "四步安装流程补充支架固定、走线、对位和贴墙完成状态。"
              }
            ],
            layout: "editorial"
          },
          {
            eyebrow: "CMF Direction",
            title: "让光的柔和度来自真实材料，而不是后期发光效果。",
            body: [
              "CMF 以宣纸纹理光学扩散罩、深灰色阳极氧化铝框、高透镜面、磨砂亚克力导光板和 2700K 暖色 LED 为核心。暖白光面与深灰金属形成克制对比，使产品在关闭和开启状态下都能融入家居空间。",
              "材料板负责说明规格与工艺，微距图进一步展示扩散纹理、金属细砂、镜面收边和灯带层级，让产品的高级感建立在可制造的细节上。"
            ],
            media: [
              {
                src: "/images/projects/luna-loop/cmf-board.png",
                alt: "Luna Loop 材料研究、配色方案与表面处理设计板",
                ratio: "aspect-[16/9]",
                caption: "CMF 主板集中说明材料规格、表面处理、光学结构与细节工艺。"
              },
              {
                src: "/images/projects/luna-loop/cmf-details.png",
                alt: "Luna Loop 扩散罩、铝框、镜面与导光板材质微距",
                ratio: "aspect-[16/9]",
                caption: "材质微距强化宣纸纹理、阳极氧化金属和暖色导光的触觉层次。"
              }
            ],
            bullets: ["宣纸纹理扩散罩: 柔化光线", "阳极氧化铝框: 稳定与耐久", "高透镜面: 清晰反射与安全收边", "磨砂导光板: 均匀控制光斑", "2700K LED: 建立夜间舒适感"],
            layout: "editorial"
          },
        {
          eyebrow: "Interaction Design",
          title: "自动感知是默认体验，触摸、App 与语音负责精细控制。",
          body: [
            "灯体侧边保留直接触控：短按开关、长按调光、双击切换模式、三击进入夜灯。App 用于色温、情绪模式、睡眠模式和定时设置，让高频操作保持即时，低频配置保持完整。",
            "六种预设覆盖自然白、暖白、暖黄、阅读、电影和睡眠模式；记忆功能保留上一次偏好，减少重复设置。"
          ],
          media: [
            {
              src: "/images/projects/luna-loop/interaction.png",
              alt: "Luna Loop 触控、App 与灯光模式交互设计",
              ratio: "aspect-square",
              caption: "交互层将感知自动化与用户主动控制组合为完整体验。"
            }
          ],
          bullets: ["短按开关 / 长按调光", "双击模式切换 / 三击夜灯", "2700K–6500K 连续色温调节", "定时、睡眠与偏好记忆"],
          layout: "wide"
        },
        {
          eyebrow: "Final Effect",
          title: "一面镜子，一圈光，也是一段从清醒走向休息的空间过渡。",
          body: [
            "最终方案不以炫技式智能为卖点，而是让感知、光学与圆形镜面共同服务日常情绪。产品可以出现在客厅、卧室、玄关、茶室或酒店中，并通过不同色温适应空间用途。",
            "关闭时，它是一面克制的圆镜；开启时，连续光环改变墙面层次，也让用户在夜间获得更温和的陪伴。"
          ],
          media: [
            {
              src: "/images/projects/luna-loop/cover.png",
              alt: "Luna Loop 在家居空间中的最终效果",
              ratio: "aspect-[16/9]",
              caption: "最终效果强调产品与建筑界面、家具和夜间光环境的关系。"
            }
          ],
          layout: "wide"
        }
      ],
      value: [
        "把单一灯具设计扩展为涵盖场景洞察、感知逻辑、结构工程与数字交互的完整产品系统。",
        "以镜面和环形柔光同时解决功能照明、空间装饰与情绪氛围，减少墙面设备的分散感。",
        "用自动感知承担高频决策，用触控、App 与语音保留用户控制权，建立自然且可解释的智能体验。"
      ],
      summary: [
        "Luna Loop 的核心不是让灯拥有更多模式，而是让照明理解时间、环境与人的状态。",
        "下一阶段将重点验证毫米波误触发、镜面眩光、灯带散热、壁挂承重与 App/语音响应延迟，让概念进一步走向可制造产品。"
      ]
    }
  },
  {
    id: "p-004",
    slug: "off-road-motorcycle-boots",
    title: "越野摩托车靴设计",
    titleEn: "MX-R01 Motocross Racing Boots",
    category: "Product Design",
    year: "2025",
    description: "以胫骨抗冲击、踝关节抗扭转和可控屈曲为核心的专业越野骑行护靴。",
    cover: "/images/projects/mx-r01/scenario.png",
    role: ["User & risk research", "Protection architecture", "Footwear design", "CMF strategy"],
    tools: ["Sketching", "Photoshop", "Blender", "AI Visualization"],
    overview:
      "MX-R01 面向越野摩托训练与竞赛场景，以分区式 TPU 护甲、踝关节旋转支点、多点锁扣和高抓地橡胶外底，建立保护、活动与操控之间的平衡。",
    challenge:
      "越野骑行需要靴筒抵御飞石、车体挤压与落地冲击，同时保留换挡、制动和站姿骑行所需的踝部活动，保护结构不能以牺牲操控感为代价。",
    process: [
      {
        title: "Risk Mapping",
        text: "梳理飞石撞击、侧向挤压、踝部扭转和落地冲击，建立胫骨、踝关节、前掌与足底的保护优先级。"
      },
      {
        title: "Protection Architecture",
        text: "以分区 TPU 外骨骼、圆形踝轴、屈曲波纹和五点锁扣构成连续但可活动的保护系统。"
      },
      {
        title: "Fit & Validation",
        text: "通过多视图、爆炸结构、CMF 与骑行场景检查包覆关系、耐磨区域、操控姿态和品牌识别。"
      }
    ],
    gallery: [
      "/images/projects/mx-r01/right-view.png",
      "/images/projects/mx-r01/exploded.png",
      "/images/projects/mx-r01/details.png"
    ],
    result:
      "形成从风险洞察、草图推演、保护分区到结构拆解、CMF 与真实骑行验证的完整鞋靴设计提案。",
    reflection:
      "项目让我把运动鞋靴的机械视觉转化为可解释的保护逻辑，并进一步建立结构、材料、人体活动与品牌语言之间的统一关系。",
    accent: "#F36A21",
    caseStudy: {
      positioning:
        "MX-R01 是一款面向越野摩托训练与竞赛的高筒专业骑行靴。它不是普通户外靴的强化版本，而是一套围绕胫骨冲击、踝部扭转、车体夹持与脚踏操控建立的穿戴式保护系统。",
      background: [
        "越野摩托骑手需要在碎石、泥地和连续跳跃中反复完成站立、压弯、换挡与制动。靴子既要承受飞石撞击和车辆侧向挤压，也要在落地时吸收冲击。",
        "传统高保护方案容易造成踝部僵硬、重量集中和穿脱繁琐。项目因此把问题定义为：如何让保护结构跟随人体运动，而不是限制骑手操控。"
      ],
      painPoints: [
        "胫骨和脚踝暴露在飞石、车体和落地冲击的复合风险中。",
        "过硬的靴筒会限制背屈与跖屈，影响换挡、制动和站姿骑行。",
        "泥沙环境下，锁扣、缝线和外底需要兼顾可靠闭合、清洁与耐磨。",
        "保护模块如果缺少连续关系，容易形成局部应力集中和视觉噪音。"
      ],
      goals: [
        "建立从胫骨到脚背的连续抗冲击外骨骼。",
        "限制危险侧向扭转，同时保留前后方向的可控活动。",
        "让五点锁扣快速调节不同腿围，并在泥沙环境中保持稳定。",
        "用清晰的 CMF 分区表达功能等级与竞速识别。"
      ],
      responsibilities: [
        "完成骑行风险研究、功能定义、草图探索与外观收敛。",
        "规划胫骨护甲、踝轴、屈曲区、锁扣和外底的结构关系。",
        "制定深海军蓝、竞速白与能量橙的 CMF 策略。",
        "组织多视图、爆炸图、细节图和场景图，完成案例叙事。"
      ],
      blocks: [
        {
          eyebrow: "01 / Riding Context",
          title: "真正的起点，是失控瞬间脚部会承受什么。",
          body: [
            "高速过弯时，骑手的小腿需要夹持车身，脚掌持续在脚踏、换挡杆和制动杆之间切换；落地和打滑又会把冲击与扭矩迅速传到胫骨和踝关节。",
            "因此 MX-R01 将保护重点放在四个区域：胫骨正面抗冲击、踝关节侧向抗扭、脚背与鞋头耐磨包覆，以及足底抓地与落地缓冲。"
          ],
          media: [
            {
              src: "/images/projects/mx-r01/scenario.png",
              alt: "MX-R01 越野摩托骑行场景与上脚效果",
              ratio: "aspect-[16/9]",
              caption: "真实骑行姿态用于验证靴筒包覆、脚踏接触和运动识别。"
            }
          ],
          bullets: ["正面冲击：飞石与车体碰撞", "侧向风险：踝关节扭转与挤压", "操控需求：换挡、制动与站姿屈曲"],
          layout: "wide"
        },
        {
          eyebrow: "02 / Sketch Development",
          title: "先画运动边界，再决定护甲的形状。",
          body: [
            "草图从脚踝旋转中心、胫骨护板覆盖范围和前掌弯折线出发，而不是先做装饰。六个阶段依次完成概念发散、结构探索、方案深化、细节设计、马克笔表达与最终定型。",
            "最终方案把大面积护甲拆成相互咬合的模块，并用黑色屈曲波纹连接刚性分区，使靴子在视觉上有速度感，在结构上也保留运动余量。"
          ],
          media: [
            {
              src: "/images/projects/mx-r01/sketch-process.png",
              alt: "MX-R01 从概念草图到最终方案的设计过程",
              ratio: "aspect-[6/5]",
              caption: "从形态发散到结构收敛，所有线条都对应保护或活动需求。"
            }
          ],
          layout: "wide"
        },
        {
          eyebrow: "03 / Protection Architecture",
          title: "四层保护逻辑，让冲击被分散，让危险扭转被限制。",
          body: [
            "高模量 TPU 胫骨壳承担正面冲击；踝部圆形支点与侧向骨架限制内外翻；脚背分片与屈曲波纹保留换挡所需的前后活动；高抓地橡胶外底稳定脚踏接触。",
            "护甲边缘采用叠片关系分散应力，橙色功能件标出锁扣与通风区，让骑手快速理解可操作部位。"
          ],
          media: [
            {
              src: "/images/projects/mx-r01/protection-map.png",
              alt: "MX-R01 胫骨、踝关节、屈曲区与外底保护分区图",
              ratio: "aspect-[16/10]",
              caption: "保护分区对应胫骨冲击、踝关节抗扭转、前掌屈曲与足底抓地。"
            }
          ],
          bullets: ["TPU 胫骨护甲：分散正面撞击", "双侧踝轴：限制危险内外翻", "屈曲波纹：保留背屈与跖屈", "橡胶外底：提高脚踏与泥地抓地"],
          layout: "wide"
        },
        {
          eyebrow: "04 / Mobility & Fit",
          title: "高保护不等于僵硬，活动方向必须被精确管理。",
          body: [
            "多视图检查靴筒前后包覆、脚背高度与小腿围关系；活动性分析则聚焦前倾、后伸和自然站立三种状态。圆形踝轴允许前后方向转动，同时由外侧骨架抑制危险的横向折转。",
            "五点微调锁扣从小腿到前掌逐级收紧，使刚性护甲贴合不同腿围，并让穿脱动作保持直观。"
          ],
          media: [
            {
              src: "/images/projects/mx-r01/mobility-views.png",
              alt: "MX-R01 多视图与踝关节活动性分析",
              ratio: "aspect-[16/10]",
              caption: "多视图与三种活动状态共同检查包覆、屈曲和侧向稳定。"
            },
            {
              src: "/images/projects/mx-r01/right-view.png",
              alt: "MX-R01 右侧完整产品视图",
              ratio: "aspect-[5/4]",
              caption: "侧视图呈现五点锁扣、踝轴和连续外骨骼关系。"
            }
          ],
          layout: "editorial"
        },
        {
          eyebrow: "05 / Structure",
          title: "从外壳到足底，每一层都承担不同的力。",
          body: [
            "爆炸结构将靴子拆分为外部 TPU 护甲、柔性内靴、可替换锁扣、踝轴模块、缓冲鞋垫、中底承托层与橡胶外底。刚性件负责抗冲击，柔性层负责贴合与吸湿，足底层负责缓冲和抓地。",
            "模块化拆分也为维修提供可能：高磨损锁扣与外部护片可单独替换，延长整双靴子的使用周期。"
          ],
          media: [
            {
              src: "/images/projects/mx-r01/exploded.png",
              alt: "MX-R01 越野摩托车靴爆炸结构图",
              ratio: "aspect-[5/6]",
              caption: "外骨骼、内靴、闭合系统和多层鞋底形成完整保护链。"
            }
          ],
          bullets: ["外层：抗冲击 TPU 壳体", "内层：透气网布与缓冲内靴", "闭合：铝合金锁扣与可调节带", "足底：鞋垫、中底与高抓地橡胶外底"],
          layout: "wide"
        },
        {
          eyebrow: "06 / CMF Strategy",
          title: "颜色不是装饰，而是功能层级和赛道识别。",
          body: [
            "深海军蓝承担主体护甲，竞速白标识高保护骨架，能量橙集中在锁扣、通风和鞋头等操作与警示部位。碳黑用于屈曲区和外底，降低泥污视觉干扰。",
            "材料组合包括高抗冲 TPU、耐磨超纤皮革、透气网布、铝合金锁扣与橡胶外底。亮面壳体、哑光皮革和纹理橡胶形成清晰触感层次。"
          ],
          media: [
            {
              src: "/images/projects/mx-r01/cmf.png",
              alt: "MX-R01 颜色材料工艺设计板",
              ratio: "aspect-[6/5]",
              caption: "TPU、超纤皮革、透气网布、铝合金与橡胶构成耐久 CMF 系统。"
            }
          ],
          layout: "wide"
        },
        {
          eyebrow: "07 / Detail Resolution",
          title: "把可靠性落到锁扣、屈曲、通风与纹路这些毫米级细节。",
          body: [
            "锁扣使用大面积橙色操作片，戴手套时也便于识别；脚背波纹降低屈曲阻力；三角通风件引导空气进入内靴；外底深纹针对泥地排泥和脚踏咬合设计。",
            "圆形踝轴通过明确的旋转中心传达结构可信度，护甲边缘和车缝线则保持连续，避免复杂分件变成无意义装饰。"
          ],
          media: [
            {
              src: "/images/projects/mx-r01/details.png",
              alt: "MX-R01 护甲纹理、锁扣、屈曲区、通风、外底与踝轴细节",
              ratio: "aspect-[6/5]",
              caption: "六个关键细节共同完成操控、散热、闭合、抓地与抗扭转。"
            }
          ],
          layout: "wide"
        }
      ],
      value: [
        "将骑行风险转化为清晰的分区保护结构，使外观语言建立在真实功能之上。",
        "用踝轴、屈曲区和多点闭合平衡保护强度与骑行操控。",
        "通过完整的草图、结构、CMF、细节和场景证据，形成可被面试者快速理解的产品案例。"
      ],
      summary: [
        "MX-R01 展示的不是一双机械感鞋靴，而是一套围绕人体运动组织的防护系统。",
        "项目最终把胫骨保护、踝关节抗扭转、穿戴调节、材料耐久和竞速识别统一为一个可解释、可延展的产品语言。"
      ]
    }
  },
  {
    id: "p-005",
    slug: "hand-digital-painting",
    title: "手绘与板绘作品",
    titleEn: "Hand & Digital Painting Collection",
    category: "Sketch",
    year: "2025",
    description: "从东方宗教叙事、厚涂情绪绘画到自然主题动物角色的跨媒介创作合集。",
    cover: "/images/projects/drawing-works/oil-buddha.jpg",
    role: ["Traditional drawing", "Oil painting", "Digital illustration", "Character design"],
    tools: ["Traditional media", "Oil paint", "Digital painting", "Photoshop"],
    overview:
      "这组作品把手绘、厚涂与板绘放在同一条视觉研究线上：从传统题材中的线条、构图与色彩秩序出发，再转向更强调情绪、肌理和角色识别的当代表达。",
    challenge:
      "不同媒介拥有完全不同的叙事密度与观看距离。项目需要保留每幅作品的原始质感，同时让传统绘画、抽象厚涂和动物角色系列在同一作品集中形成清晰层级。",
    process: [
      {
        title: "Observation & Composition",
        text: "从人物姿态、传统纹样、自然形态和动物特征中提取轮廓关系，先建立画面的视觉重心与阅读动线。"
      },
      {
        title: "Color & Material",
        text: "通过彩铅、油画厚涂和数字笔刷测试冷暖对比、颜料肌理与色块节奏，让媒介本身参与情绪表达。"
      },
      {
        title: "Character System",
        text: "为动物板绘建立统一的圆形互动道具、品牌标签、背景色块和拟人动作，使单幅插画能够扩展为连续角色系列。"
      }
    ],
    gallery: [
      "/images/projects/drawing-works/traditional-buddha.jpg",
      "/images/projects/drawing-works/oil-figure.jpg",
      "/images/projects/drawing-works/animal-09.jpg"
    ],
    result:
      "形成包含 4 幅传统与厚涂作品、12 幅自然主题动物板绘的视觉档案，集中展示构图、色彩、线条、厚涂肌理和系列化角色设计能力。",
    reflection:
      "跨媒介练习让我更清楚地理解：视觉风格并不来自固定滤镜，而来自对轮廓、节奏、情绪和叙事目标的持续判断。",
    accent: "#D9A56D",
    caseStudy: {
      positioning:
        "跨媒介绘画与角色设计作品集。以东方叙事、情绪厚涂和自然主题动物 IP 为三条线索，呈现从观察、手绘到数字化系列表达的视觉能力。",
      background: [
        "绘画是产品与视觉设计之外持续进行的基础训练。它帮助我建立对轮廓、比例、色彩关系和画面节奏的直觉，也让设计表达不只停留在软件技巧层面。",
        "这组作品跨度较大，因此详情页不按时间顺序堆放图片，而是按照媒介和视觉目标重新编辑，让每一组作品都回答一个明确问题。"
      ],
      painPoints: [
        "传统题材信息密度高，容易在小尺寸展示中失去线条与纹样细节。",
        "厚涂作品依赖真实颜料肌理和色层，网页展示需要保留笔触而避免过度裁切。",
        "动物板绘数量多，如果只做规则网格，会削弱角色差异和系列叙事。"
      ],
      goals: [
        "展示传统手绘中的造型、线条与复杂构图能力。",
        "呈现厚涂作品对色彩、肌理和情绪氛围的控制。",
        "证明角色能够在统一系统中保持物种特征、动作变化和系列一致性。"
      ],
      responsibilities: [
        "独立完成选题、构图、绘制、色彩调整与作品整理。",
        "提炼动物特征并转译为亲和、易识别的拟人角色。",
        "建立角色系列的背景色、互动道具、标签位置和视觉节奏。",
        "完成作品筛选、分析文案与网页中的编辑式排版。"
      ],
      blocks: [
        {
          eyebrow: "01 / Visual Statement",
          title: "以平静的凝视和高密度笔触，建立整组作品的第一记忆。",
          body: [
            "封面作品采用近似正中的人物构图。闭合的眼神、向上的莲瓣与向外扩散的云团形成三个稳定层级，让画面在高饱和色彩中仍然保持安静。",
            "暖橙与朱红集中在面部和莲花，冷蓝、灰白云纹包围主体。厚涂笔触没有被磨平，而是保留颜料堆叠的方向，使光线、云气与人物情绪在同一肌理中发生联系。"
          ],
          media: [
            {
              src: "/images/projects/drawing-works/oil-buddha.jpg",
              alt: "莲花与云气环绕的佛像厚涂作品",
              ratio: "aspect-square",
              caption: "近对称构图、冷暖色域与可见笔触共同建立安静而有力量的视觉中心。"
            }
          ],
          bullets: ["构图：近对称中心式结构", "色彩：冷云与暖莲形成主次", "肌理：保留厚涂方向和颜料厚度"],
          layout: "wide"
        },
        {
          eyebrow: "02 / Traditional Narrative",
          title: "用长线条组织动作，让传统人物在复杂画面中保持流动。",
          body: [
            "这幅传统题材手绘以人物躯干为核心，飘带、莲花和周围小像围绕主角建立环形动线。青绿色飘带反复穿越暖金背景，在高密度细节中持续提示观看方向。",
            "人物服饰、花瓣和云纹使用更细的线条控制边界，背景则保留纸面与叠色质感。线条不仅描边，也负责区分前后空间、材质和动作速度。"
          ],
          media: [
            {
              src: "/images/projects/drawing-works/traditional-buddha.jpg",
              alt: "传统宗教人物与莲花主题手绘作品",
              ratio: "aspect-[9/16]",
              caption: "飘带形成连续视线，人物、莲花与周围小像构成纵向叙事。"
            }
          ],
          bullets: ["线条：用粗细变化区分主体与纹样", "构图：纵向中心与环形飘带并置", "色彩：金色底调统一多组局部色彩"],
          layout: "wide"
        },
        {
          eyebrow: "03 / Oil & Emotion",
          title: "从具象人物转向情绪场，让颜色和笔触先于故事发生。",
          body: [
            "侧影作品用深色人物压住画面中心，外围高明度黄、红、蓝、绿笔触沿圆周运动，形成接近风暴的情绪包围。人物不依赖五官，而通过剪影与色流之间的张力被识别。",
            "绿色作品则反向处理：复杂肌理向中心收拢，白色人物被暖金色光圈包围。两幅画一张向外爆发、一张向内沉静，展示同一厚涂语言在不同情绪强度下的变化。"
          ],
          media: [
            {
              src: "/images/projects/drawing-works/oil-figure.jpg",
              alt: "彩色旋涡包围人物侧影的厚涂作品",
              ratio: "aspect-[4/5]",
              caption: "旋转笔触与黑色侧影建立高对比的情绪场。"
            },
            {
              src: "/images/projects/drawing-works/oil-light.jpg",
              alt: "绿色肌理与中央白色人物的厚涂作品",
              ratio: "aspect-square",
              caption: "中央光圈、低饱和绿色与厚重肌理形成内向的观看体验。"
            }
          ],
          bullets: ["厚涂：利用堆叠方向组织动势", "明度：用极暗与极亮确定人物", "情绪：以色场代替具象环境"],
          layout: "editorial"
        },
        {
          eyebrow: "04 / Character Language",
          title: "先保留物种特征，再用动作与表情建立亲和角色。",
          body: [
            "第一组角色覆盖旱獭、扬子鳄、滇金丝猴、藏狐、斑头雁和野牦牛。设计没有把动物统一成同一种身体模板，而是保留长吻、角、翅膀、尾巴和脸部花纹等关键识别点。",
            "圆盘既是每个角色的共同互动道具，也是连接动作的视觉锚点。跳跃、投掷、托举和飞行让角色从静态图鉴转变为具有轻运动感的品牌插画。"
          ],
          media: [
            { src: "/images/projects/drawing-works/animal-01.jpg", alt: "旱獭动物角色板绘", ratio: "aspect-square", caption: "旱獭：圆形身体与张开的动作强化亲和感。" },
            { src: "/images/projects/drawing-works/animal-02.jpg", alt: "扬子鳄动物角色板绘", ratio: "aspect-square", caption: "扬子鳄：长吻、鳞纹和低重心保留物种特征。" },
            { src: "/images/projects/drawing-works/animal-03.jpg", alt: "滇金丝猴动物角色板绘", ratio: "aspect-square", caption: "滇金丝猴：夸张面部特征与上抛动作建立记忆点。" },
            { src: "/images/projects/drawing-works/animal-04.jpg", alt: "藏狐动物角色板绘", ratio: "aspect-square", caption: "藏狐：方形脸部与克制表情形成反差。" },
            { src: "/images/projects/drawing-works/animal-05.jpg", alt: "斑头雁动物角色板绘", ratio: "aspect-square", caption: "斑头雁：用水平飞行动势延展画面。" },
            { src: "/images/projects/drawing-works/animal-06.jpg", alt: "野牦牛动物角色板绘", ratio: "aspect-square", caption: "野牦牛：角与鬃毛构成稳定而有重量的轮廓。" }
          ],
          bullets: ["角色：保留物种独有轮廓", "动作：围绕同一道具设计变化", "系列化：统一标签和背景色块"],
          layout: "gallery"
        },
        {
          eyebrow: "05 / Series Expansion",
          title: "用一致的规则容纳不同性格，让十二个角色成为完整系列。",
          body: [
            "第二组包含貉、雪豹、熊猫、棕熊、梅花鹿和江豚。色彩不追求统一主色，而是根据物种和情绪选择蓝、粉、紫、橙、黄等背景，使角色可以单独识别，也能在并列时形成明快节奏。",
            "每幅画都保留角色名称、英文信息和品牌标识区，说明该系列具有图鉴、活动视觉、社交贴图和周边延展的基础。统一系统控制整体，表情与动作负责个体差异。"
          ],
          media: [
            { src: "/images/projects/drawing-works/animal-07.jpg", alt: "貉动物角色板绘", ratio: "aspect-square", caption: "貉：转体投掷形成清晰对角线。" },
            { src: "/images/projects/drawing-works/animal-08.jpg", alt: "雪豹动物角色板绘", ratio: "aspect-square", caption: "雪豹：长尾与低伏身体构成大弧线。" },
            { src: "/images/projects/drawing-works/animal-09.jpg", alt: "熊猫动物角色板绘", ratio: "aspect-square", caption: "熊猫：黑白轮廓与向上动作强化识别。" },
            { src: "/images/projects/drawing-works/animal-10.jpg", alt: "棕熊动物角色板绘", ratio: "aspect-square", caption: "棕熊：柔和体块与跑动姿态呈现憨厚性格。" },
            { src: "/images/projects/drawing-works/animal-11.jpg", alt: "梅花鹿动物角色板绘", ratio: "aspect-square", caption: "梅花鹿：斑点、鹿角和腾跃动作形成轻盈节奏。" },
            { src: "/images/projects/drawing-works/animal-12.jpg", alt: "江豚动物角色板绘", ratio: "aspect-square", caption: "江豚：圆润体态和水中抛接动作保持系列趣味。" }
          ],
          bullets: ["构图：主体与圆盘形成对角关系", "色彩：背景色服务角色气质", "延展：适配图鉴、活动物料与周边"],
          layout: "gallery"
        },
        {
          eyebrow: "06 / Artwork Analysis",
          title: "媒介可以变化，但判断画面的方法保持一致。",
          body: [
            "传统手绘依赖线条和复杂叙事，厚涂依赖色层、触感与情绪，板绘角色依赖轮廓、表情和系列规则。三种路径看似分散，核心都在处理同一件事：让观看者先感受到重点，再逐步读到细节。",
            "这组作品也构成了我进行产品草图、IP 角色、CMF 配色和 AI 视觉筛选时的基础。绘画能力最终服务的不是单幅画面，而是对形态、色彩和叙事的持续判断。"
          ],
          bullets: ["造型：轮廓先于装饰细节", "色彩：用冷暖与明度建立主次", "叙事：通过动线和重复元素组织阅读", "系列：在统一规则中保留个体差异"],
          layout: "wide"
        }
      ],
      value: [
        "完整展示从传统线描、厚涂肌理到数字角色的跨媒介表达范围。",
        "动物系列证明单个角色可以在统一规则下扩展为具有识别度的视觉资产。",
        "构图、色彩和叙事训练可直接迁移到产品设计、IP 设计、CMF 和 AI 视觉方向。"
      ],
      summary: [
        "这不是一组按照软件或年份分类的练习，而是一份关于观察、情绪和角色表达的视觉档案。",
        "作品从传统人物的复杂线条走向厚涂色场，再走向清晰、亲和、可系列化的数字角色，呈现出我在不同媒介中寻找合适视觉语言的过程。"
      ]
    }
  },
  {
    id: "p-006",
    slug: "ai-brand-visual-experiment",
    title: "AI品牌视觉实验",
    titleEn: "AI Brand Visual Experiment",
    category: "AI Visual",
    year: "2026",
    description: "以 AI 工具探索品牌视觉世界、关键海报和动态叙事方向。",
    cover: "/images/projects/ai-visual.jpg",
    video: "/videos/ai-brand-motion.mp4",
    role: ["AI visual direction", "Prompt system", "Motion storyboard", "Brand atmosphere"],
    tools: ["Midjourney", "Runway", "After Effects", "Photoshop"],
    overview:
      "项目以虚构品牌为对象，探索 AI 参与下的视觉世界建立方式，覆盖主视觉、影像气质和动态节奏。",
    challenge:
      "AI 生成容易出现风格漂移，关键在于建立稳定的提示词系统、色彩规则和视觉判断标准。",
    process: [
      {
        title: "Research",
        text: "拆解高端科技品牌的影像语言、材质表现、留白比例和叙事节奏。"
      },
      {
        title: "Concept Development",
        text: "建立关键词组、负面提示词和参考矩阵，控制光线、材质和构图一致性。"
      },
      {
        title: "Design Development",
        text: "筛选可品牌化的视觉方向，并扩展为静帧、短动画和社媒传播画面。"
      }
    ],
    gallery: [
      "/images/project-ai-brand-01.png",
      "/images/project-ai-brand-02.png",
      "/images/project-ai-brand-03.png"
    ],
    result:
      "形成一套可复用 AI 视觉流程，帮助品牌更快建立高一致性的概念视觉。",
    reflection:
      "这组实验展示了我不是单纯生成图片，而是在用设计判断管理 AI 输出。",
    accent: "#AFC7FF"
  }
];

export function getProjectBySlug(slug?: string) {
  return projects.find((project) => project.slug === slug);
}
