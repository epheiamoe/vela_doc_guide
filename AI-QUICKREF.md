# AI开发者Vela应用开发速查

> 最小上下文占用，快速上手Vela应用开发

## 核心概念速记

```javascript
// 页面结构 (.ux文件)
export default {
  data() { return { } },           // 可选: 页面数据
  private: { key: value },         // 页面私有数据
  protected: { },                   // 可被子组件访问
  public: { },                     // 公开数据
  onInit() { },                    // 页面初始化
  onReady() { },                   // 渲染完成
  onShow() { },                    // 页面显示
  onHide() { },                    // 页面隐藏
}
```

## 关键API速查

### 路由导航
```javascript
import router from '@system.router';
router.push({ uri: 'pages/detail/detail' });
router.back();
```

### 存储
```javascript
import storage from '@system.storage';
storage.get({ key: 'name' });
storage.set({ key: 'name', value: 'test' });
```

### 网络请求
```javascript
import fetch from '@system.fetch';
fetch.fetch({ url: 'api.example.com/data' });
```

### 传感器
```javascript
import sensor from '@system.sensor';
sensor.subscribe({ sensor: 'stepCounter' });
```

## 项目结构

```
src/
├── pages/
│   └── index/
│       └── index.ux          # 页面文件
├── components/                # 自定义组件
├── utils/                      # 工具函数
├── i18n/                      # 国际化
├── manifest.json              # 应用配置
└── config-watch.json          # 设备配置
```

## manifest.json基础配置

```json
{
  "package": "com.example.app",
  "name": "MyApp",
  "versionName": "1.0.0",
  "versionCode": 1,
  "pages": [
    { "src": "pages/index/index.ux" }
  ],
  "permissions": [
    { "origin": "*", "ubus": ["**"] }
  ]
}
```

## 屏幕适配关键

| 设备 | designWidth | 屏幕尺寸 |
|------|-------------|----------|
| 圆屏 | 480 | 454x454 |
| 方屏 | 336 | 336x336 |
| 胶囊 | 192 | 390x312 |

使用 `rpx` 单位实现自适应

## 重要差异（vs Web）

1. **存储**: `@system.storage` 而非 `localStorage`
2. **文件**: `@system.file` 仅支持 `internal://` 协议
3. **路由**: 需在manifest.json声明页面
4. **组件**: 使用 `<import>` 而非 `import`
5. **样式**: Flex为主，部分CSS属性不支持

## 参考文档

- 开发指南: `./vela-dev-guide.md`
- 输入法组件: `./input-method-guide.md`
- 实战项目: `./ebook-app-tutorial.md`
- 官方文档: `./VelaDocs/docs/zh/`
