# 项目结构说明

## 目录结构

```text
src/
├── components/          # 可复用组件
├── screens/            # 页面组件
│   ├── CardScreen.tsx     # 卡片页面
│   ├── CalendarScreen.tsx # 日历页面
│   ├── ProfileScreen.tsx  # 个人信息页面
│   └── index.ts          # screens导出文件
├── navigation/         # 导航相关
│   └── BottomNavigationContainer.tsx # 底部导航容器
├── styles/            # 样式文件
│   ├── appStyles.ts      # 应用主样式
│   ├── commonStyles.ts   # 通用样式
│   └── index.ts         # 样式导出文件
└── utils/             # 工具函数（预留）
```

## 功能特性

- ✅ 底部导航栏（三个页面）
- ✅ 页面切换动画（淡入淡出效果）
- ✅ 卡片页面（单张卡片展示）
- ✅ 日历页面（可选择日期）
- ✅ 个人信息页面（用户资料和设置）
- ✅ Material Design 3风格UI
- ✅ 模块化代码结构

## 使用的第三方库

- `react-native-paper` - Material Design 3组件库
- `react-native-calendars` - 日历组件
- `react-native-reanimated` - 动画库
- `react-navigation` - 导航框架
