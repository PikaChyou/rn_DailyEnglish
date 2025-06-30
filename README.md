# 项目说明
采用ReactNative框架与react-native-paper组件库搭建的每日英语单词学习app  

##  项目结构

```
Demo/
├── .bundle/                          # Bundle 配置
├── .eslintrc.js                      # ESLint 配置
├── .git/                             # Git 版本控制
├── .gitignore                        # Git 忽略文件配置
├── .prettierrc.js                    # Prettier 代码格式化配置
├── .vscode/                          # VS Code 配置
├── .watchmanconfig                   # Watchman 配置
├── android/                          # Android 原生代码
├── ios/                              # iOS 原生代码
├── node_modules/                     # 依赖包
├── __tests__/                        # 测试文件
├── assets/                           # 静态资源
│   ├── CET4.json                     # CET4 词汇数据
│   ├── CET6.json                     # CET6 词汇数据
│   ├── Kaoyan.json                   # 考研词汇数据
│   ├── SAT.json                      # SAT 词汇数据
│   ├── TOEFL.json                    # TOEFL 词汇数据
│   └── ktn.jpg                       # 图片资源
├── src/                              # 源代码目录
│   ├── contexts/                     # React Context
│   │   └── StoreContext.tsx          # MobX Store 上下文
│   ├── screens/                      # 页面组件
│   │   ├── CalendarScreen.tsx        # 日历页面
│   │   ├── CardScreen.tsx            # 单词卡片页面
│   │   ├── ProfileScreen.tsx         # 个人信息页面
│   │   ├── ReviewScreen.tsx          # 复习页面
│   │   └── index.ts                  # 页面导出文件
│   ├── stores/                       # MobX 状态管理
│   │   ├── RootStore.ts              # 根 Store
│   │   ├── SettingsStore.ts          # 设置 Store
│   │   ├── WordHistoryStore.ts       # 单词历史 Store
│   │   └── index.ts                  # Store 导出文件
│   ├── styles/                       # 样式文件
│   │   ├── appStyles.ts              # 应用主样式
│   │   ├── commonStyles.ts           # 通用样式
│   │   └── index.ts                  # 样式导出文件
│   ├── utils/                        # 工具函数
│   │   └── wordUtils.ts              # 单词相关工具函数
│   └── README.md                     # 项目说明文档
├── App.tsx                           # 应用根组件
├── index.js                          # 应用入口文件
├── app.json                          # 应用配置
├── babel.config.js                   # Babel 配置
├── jest.config.js                    # Jest 测试配置
├── metro.config.js                   # Metro 打包配置
├── tsconfig.json                     # TypeScript 配置
├── package.json                      # 项目依赖配置
├── package-lock.json                 # 依赖锁定文件
├── Gemfile                           # Ruby 依赖（iOS）
└── README.md                         # 项目根说明文档
```

## 实现功能

- 卡片式单词学习
- 用户个人信息设置
- 每日学习单词数量设置
- 学习词汇类型选择
- 活跃日期展示
- 单词复习功能（？）

## 未实现功能

- 无效的卡片按钮（无法区分学习状态）
- 复习单词不一定出现在已学习列表当中
- 用户登录系统缺失（写不完了算了）
