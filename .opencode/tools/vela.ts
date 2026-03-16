import { tool } from '@opencode-ai/plugin';
import fs from 'fs';
import path from 'path';

const DOCS_BASE = 'vela_dev_guide';

export const velaApi = tool({
  description: '查询 Vela 开发 API 参考文档',
  args: {
    api: tool.schema.string().describe('API 名称，如 router, storage, file, sensor'),
  },
  async execute({ api }) {
    const apiMap = {
      router: {
        file: 'vela-dev-guide.md',
        desc: '路由跳转',
        code: `import router from '@system.router';
router.push({ uri: 'pages/detail/detail' });
router.back();`
      },
      storage: {
        file: 'vela-dev-guide.md', 
        desc: '本地存储',
        code: `import storage from '@system.storage';
storage.get({ key: 'setting' });
storage.set({ key: 'setting', value: JSON.stringify(data) });`
      },
      file: {
        file: 'vela-dev-guide.md',
        desc: '文件操作',
        code: `import file from '@system.file';
file.readText({ uri: 'internal://files/book.txt' });
file.readArrayBuffer({ uri: 'internal://files/book.txt', position: 0, length: 1000 });`
      },
      sensor: {
        file: 'vela-dev-guide.md',
        desc: '传感器',
        code: `import sensor from '@system.sensor';
sensor.subscribe({ sensor: 'stepCounter' });`
      }
    };
    
    const info = apiMap[api.toLowerCase()];
    if (!info) {
      return { error: `未知 API: ${api}，可选: ${Object.keys(apiMap).join(', ')}` };
    }
    
    return info;
  }
});

export const velaTemplate = tool({
  description: '获取 Vela 项目模板代码',
  args: {
    type: tool.schema.string().describe('模板类型: page, component, manifest'),
  },
  async execute({ type }) {
    const templates = {
      page: `// pages/index/index.ux
<template>
  <div class="page">
    <text>Hello Vela</text>
  </div>
</template>

<script>
export default {
  private: {
    message: 'Hello'
  },
  onInit() {
    console.log('Page initialized');
  }
}
</script>

<style>
.page {
  width: 336px;
  height: 480px;
  flex-direction: column;
  background-color: #000000;
}
</style>`,
      
      component: `// components/MyComponent/MyComponent.ux
<template>
  <div class="component">
    <text>{{text}}</text>
  </div>
</template>

<script>
export default {
  props: {
    text: { default: 'Default' }
  }
}
</script>

<style>
.component {
  background-color: #262626;
}
</style>`,
      
      manifest: `{
  "package": "com.example.app",
  "name": "MyApp",
  "versionName": "1.0.0",
  "versionCode": 1,
  "pages": [
    { "src": "pages/index/index.ux" }
  ],
  "config": {
    "designWidth": 336
  }
}`
    };
    
    return { template: templates[type] || '未知模板类型' };
  }
});

export const velaUi = tool({
  description: '获取 Vela UI 开发规范',
  args: {
    item: tool.schema.string().describe('查询项: colors, fonts, spacing, components'),
  },
  async execute({ item }) {
    const ui = {
      colors: '背景:#000000 卡片:#262626 强调:#0D6EFF 文字:#FFFFFF 次级:rgba(255,255,255,0.6)',
      fonts: '大标题:32px 标题:24px 正文:28-30px 辅助:20-24px',
      spacing: 'xs:2-4 s:6 m:10-14 l:20 xl:24 xxl:36-48',
      components: '列表项:100%x112px 圆角:36px 按钮:72x72px 封面:64x84px'
    };
    
    return { result: ui[item] || '未知项，可选: colors, fonts, spacing, components' };
  }
});

export const velaQuickRef = tool({
  description: '获取 Vela 开发快速参考',
  args: {
    topic: tool.schema.string().describe('主题: diff, lifecycle, devices, tips'),
  },
  async execute({ topic }) {
    const ref = {
      diff: 'localStorage→@system.storage, Vue Router→manifest.json+router.push(), import→<import>标签',
      lifecycle: 'onInit→初始化, onShow→显示, onHide→隐藏, onDestroy→销毁',
      devices: '圆屏:480 方屏:336 胶囊:192',
      tips: '1.内存限制需global.runGC() 2.用rpx适配 3.图片用internal://协议 4.打包需证书'
    };
    
    return { result: ref[topic] || '未知主题' };
  }
});
