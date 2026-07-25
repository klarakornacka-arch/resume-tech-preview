# Zhang Zhenyuan Portfolio 结构文档

## 1. 项目定位

站点名称: Zhang Zhenyuan Portfolio / 张振源个人作品集

身份定位: AI Product & Visual Designer / AI 产品与视觉设计师

品牌概念: Oriental Digital Craftsmanship

核心表达: Blending Oriental craftsmanship with AI-driven creativity.

目标用户:

- 招聘方: 快速判断设计能力、项目质量和岗位匹配度。
- 设计负责人: 查看设计思路、项目逻辑、视觉判断和交付成熟度。
- 商业合作方: 理解个人风格、可合作方向和联系路径。

视觉方向:

- 深色数字展厅。
- Apple / Vision Pro 式克制科技感。
- 冷色低饱和点缀，主要使用冰蓝、银灰、雾黑。
- 页面主版心控制在约 1700px，PC 端优先。
- 大留白、大字号、低噪声、高质感动效。

## 2. 页面结构

### Home 首页

作用:

首页用于建立第一印象，必须在首屏同时传达身份、审美、作品集方向和下一步动作。

适合放的内容:

- 姓名: Zhang Zhenyuan / 张振源。
- 身份: AI Product & Visual Designer。
- 核心口号: Designing the Future with Intelligence and Emotion.
- 品牌概念短句。
- IP 角色或个人形象图。
- 进入作品、联系、下载简历三个主要操作。

当前实现:

- 全屏 Hero。
- 视频背景叠加 WebGL 互动背景。
- IP 角色悬浮动效。
- Explore My Works / Contact Me / Download Resume 按钮。

### Works 作品展示区

作用:

作品展示区用于让访问者快速理解作品类型、项目质量和能力覆盖面，是作品集最核心的转换区域。

适合放的内容:

- 4 到 6 个精选项目优先展示。
- 项目分类: Product Design、AI Visual、AI Animation、IP Design、Sketch、Brand Identity。
- 每张卡片包含项目名、英文名、类别、简介、工具和封面。
- 强项目放大展示，弱项目不要进入第一屏。

当前项目样例:

- 龙祈潮玩 IP 潮玩设计。
- 智能大学生便携设备。
- 便携式露营灯设计。
- 越野摩托车靴设计。
- 家校联通感统训练系统。
- AI 品牌视觉实验。

### Project Detail 项目详情页

作用:

项目详情页用于说明项目不是图片堆叠，而是有研究、策略、推导、设计发展和结果反思的完整案例。

适合放的内容:

- 项目 Hero: 项目名称、类别、年份、主视觉。
- Overview: 项目是什么，为什么重要。
- Research: 用户、场景、竞品、文化或品牌研究。
- Concept Development: 草图、方向探索、关键词、概念迭代。
- Design Development: 结构、CMF、界面、动效、细节优化。
- Final Results: 最终渲染、展板、视频、样机或落地效果。
- Reflection: 项目证明了什么能力，下一步如何优化。

当前实现:

- `/works/:slug` 动态详情页。
- 所有内容来自 `src/data/projects.ts`。
- 图片缺失时自动使用高级暗色占位视觉，方便后续替换真实素材。

### About 个人介绍区

作用:

个人介绍区用于建立可信度和记忆点，让招聘方知道你是谁、擅长什么、为什么适合继续看。

适合放的内容:

- 个人定位。
- 设计方向。
- 设计观或一句话态度。
- 人物照或 IP 角色图。
- 工具能力、经历背景、联系方式和简历下载。

当前实现:

- 以张振源为核心，不再出现错误的学校身份。
- 强调 AI 产品与视觉设计师定位。
- 结合 IP 角色视觉与个人介绍。

### Capabilities 个人优势区

作用:

个人优势区用于将能力从空泛标签变成可判断的设计能力维度。

适合放的内容:

- Product Design Thinking。
- AI Visual Exploration。
- Cross-domain Integration。
- Oriental Cultural Expression。
- Visual Storytelling。
- Rapid Prototyping。

写法建议:

- 每项能力都对应真实项目证据。
- 不写泛泛的“学习能力强”“沟通能力强”。
- 用作品集语言描述方法、判断和输出。

### Process 设计流程区

作用:

设计流程区用于说明你的工作方法，帮助设计负责人判断你是否能稳定推进项目。

适合放的内容:

- Discover。
- Research。
- Define。
- Concept。
- AI Exploration。
- Develop。
- Deliver。

写法建议:

- 每一步只写一句清晰解释。
- 后续可以链接到具体项目中的对应阶段。

### Contact 联系收尾页

作用:

联系页用于完成整站转化，让访问者在看完作品后知道如何联系你。

适合放的内容:

- 大标题: LET'S CREATE SOMETHING MEANINGFUL.
- 邮箱。
- 电话。
- 下载简历。
- 商业合作或面试邀约入口。
- 页脚版权信息。

当前实现:

- 整屏收尾页。
- Send an Email 与 Download CV 两个主操作。
- 邮箱与电话卡片。

## 3. 数据结构

项目数据位于:

`src/data/projects.ts`

每个项目包含:

- `id`: 唯一 ID。
- `slug`: 详情页路径。
- `title`: 中文标题。
- `titleEn`: 英文标题。
- `category`: 项目分类。
- `year`: 年份。
- `description`: 卡片简介。
- `cover`: 封面图路径。
- `video`: 可选视频路径。
- `role`: 个人职责。
- `tools`: 使用工具。
- `overview`: 项目概述。
- `challenge`: 项目挑战。
- `process`: 研究、概念、发展阶段。
- `gallery`: 详情页图片。
- `result`: 最终结果。
- `reflection`: 项目反思。
- `accent`: 项目点缀色。

## 4. 素材放置规范

推荐路径:

- IP 角色: `public/images/ip-character.png`
- 个人照片: `public/profile.png`
- 项目封面: `public/images/project-*.png`
- 项目视频: `public/videos/*.mp4`
- 简历文件: `public/resume/zhang-zhenyuan-cv.pdf`

如果素材暂时缺失:

- 页面会显示暗色科技占位图。
- 后续只需要保持文件名一致即可替换。

## 5. 后续开发建议

- 替换真实项目封面、过程图、渲染图和视频。
- 为每个重点项目补完整研究图和推导图。
- 增加简历 PDF 文件。
- 加入作品详情页的视频模块。
- 增加 SEO meta、OG image 和部署路由 fallback。
- 对移动端做第二轮视觉适配。
