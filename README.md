# Vela 手表应用开发文档指南

> 整合小米官方文档、第三方组件、实战项目，助力开发者快速上手 Vela 应用开发

## 快速导航

| 文档 | 说明 |
|------|------|
| [开发指南](./vela-dev-guide.md) | 官方API整理、环境搭建、常见问题 |
| [UI开发指南](./vela-ui-guide.md) | 通用UI设计规范、代码模板、素材 |
| [输入法组件](./input-method-guide.md) | 第三方输入法组件使用 |
| [实战教程](./ebook-app-tutorial.md) | 复杂项目完整分析 |
| [AI速查](./AI-QUICKREF.md) | 最小上下文快速入口 |

## 项目结构

```
vela_doc_guide/
├── docs-official/            # 小米官方文档 (GPL-3.0)
│   └── docs/zh/             
│
├── archive/                  # 源码示例
│   ├── ebook-app/           # 电子书阅读器 (AGPL-3.0)
│   └── input-method/       # 输入法组件 (MIT)
│
└── 文档 (根目录)
    ├── LICENSE              # 许可证 (CC BY-SA 4.0)
    ├── README.md            # 本文件
    ├── AI-QUICKREF.md       
    ├── vela-dev-guide.md    
    ├── vela-ui-guide.md     # UI开发指南
    ├── input-method-guide.md 
    └── ebook-app-tutorial.md 
```

## 许可证

本项目文档采用 **CC BY-SA 4.0** 许可证，详见 [LICENSE](LICENSE) 文件。

## 参考来源

本文档在编写过程中参考了以下开源项目：

| 项目 | 原许可证 | 用途 |
|------|---------|------|
| [VelaDocs](https://github.com/CheongSzesuen/VelaDocs) | GPL-3.0 | 官方API文档 |
| [Vela_input_method](https://github.com/NEORUAA/Vela_input_method) | MIT | 输入法组件 |
| [com.bandbbs.ebook](https://github.com/youshen2/com.bandbbs.ebook) | AGPL-3.0 | 电子书阅读器 |

## 资源链接

- 官方文档: https://iot.mi.com/vela/quickapp/zh/guide/
- AIoT-IDE: https://iot.mi.com/vela/quickapp/zh/guide/start/use-ide.html
