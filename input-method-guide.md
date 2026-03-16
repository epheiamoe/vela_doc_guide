# Vela 输入法组件开发指南

> 基于 [Vela_input_method](https://github.com/NEORUAA/Vela_input_method) (MIT License)
> 本文档采用 CC BY-SA 4.0 许可证

## 目录

1. 组件概述
2. 实现原理
3. 安装使用方法
4. API参考
5. 使用示例
6. 注意事项
7. 常见问题

---

## 1. 组件概述

### 1.1 基本信息

| 项目 | 说明 |
|------|------|
| 组件名称 | input-method |
| 源码位置 | components/InputMethod/InputMethod.ux |
| 适用平台 | Vela（小米穿戴应用） |

### 1.2 功能特性

- 多语言支持：中文（拼音输入）、英文、数字符号输入
- 多种键盘布局：QWERTY全键盘布局、T9九键布局
- 多屏幕适配：圆屏（circle）、方屏（rect）、胶囊屏（pill-shaped）
- 智能候选词：基于6763个常用汉字的拼音匹配
- 震动反馈：支持长振动、短振动模式
- 大小写切换：英文输入时支持大小写切换

### 1.3 适用设备

- 圆屏设备（circle）：designWidth=480
- 方屏设备（rect）：designWidth>=336
- 胶囊屏设备（pill-shaped）：designWidth>=192

---

## 2. 实现原理

### 2.1 整体架构

组件由模板层、脚本层、样式层和资源文件组成。

### 2.2 词典机制

#### dic.js

词典文件收录了6763个常用汉字，按使用频率排序，支持多音字。

#### dicUtil.js

提供SimpleInputMethod模块进行拼音匹配：

- initDict() 初始化词典
- getHanzi(pinyin) 获取汉字候选列表

采用最长前缀匹配策略：从最长6个字符开始递减尝试匹配。

### 2.3 UI渲染机制

| 屏幕类型 | 尺寸 | 布局特点 |
|---------|------|----------|
| circle | 480x321px | 圆屏专用布局 |
| rect | 100%x255px | 方屏横向滚动 |
| pill-shaped | 100%x305px | 胶囊屏弧形指示器 |

### 2.4 状态管理

核心状态：cval（拼音串）、resultList（候选列表）、lang（语言）、numFlag（数字模式）、upperFlag（大写）

---

## 3. 安装使用方法

### 3.1 手动安装

1. 下载：git clone https://github.com/NEORUAA/Vela_input_method.git
2. 拷贝components文件夹到目标项目的src目录
3. 在页面中引用：

<import name=input-method src=../../components/InputMethod/InputMethod.ux></import>

### 3.2 项目集成示例

参见第5节使用示例

---

## 4. API参考

### 4.1 属性（Props）

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|--------|------|--------|------|------|
| hide | boolean | true | 是 | 控制键盘显示/隐藏 |
| keyboardtype | string | QWERTY | 否 | 键盘布局类型 |
| maxlength | number | 5 | 否 | 候选词数量 |
| vibratemode | string |  | 否 | 震动模式 |
| screentype | string | circle | 否 | 屏幕类型 |

#### keyboardtype
- QWERTY：全键盘布局
- T9：九键布局（胶囊屏不支持）

#### vibratemode
- ：不震动
- long：长振动
- short：短振动

#### screentype
- circle：圆屏
- rect：方屏
- pill-shaped：胶囊屏

### 4.2 事件（Events）

| 事件名 | 参数 | 说明 |
|--------|------|------|
| complete | { detail: { content } } | 选中候选词时触发 |
| delete | - | 删除字符时触发 |
| keyDown | { detail: { content } } | 按键时触发 |
| visibilityChange | { detail: { visible } } | 显示状态变化时触发 |

---

## 5. 使用示例

### 5.1 基础用法

<import name=input-method src=../../components/InputMethod/InputMethod.ux></import>
<template>
  <div class=container>
    <text>{{inputText}}</text>
    <input-method hide={{keyboardVisible}} keyboardtype=QWERTY maxlength=5 vibratemode=short screentype=circle @complete=onComplete @delete=onDelete></input-method>
  </div>
</template>
<script>
export default {
  data: { inputText: , keyboardVisible: false },
  onComplete(evt) { this.inputText += evt.detail.content; },
  onDelete() { this.inputText = this.inputText.slice(0, -1); },
};
</script>

### 5.2 方屏九键

<input-method hide={{hide}} keyboardtype=T9 screentype=rect maxlength=6></input-method>

### 5.3 不同屏幕配置

圆屏：{ screentype: circle, keyboardtype: QWERTY, maxlength: 5 }
方屏：{ screentype: rect, keyboardtype: T9, maxlength: 6 }
胶囊屏：{ screentype: pill-shaped, keyboardtype: QWERTY, maxlength: 4 }

---

## 6. 注意事项

### 6.1 屏幕适配

确保根据实际设备设置正确的screentype属性。胶囊屏仅支持QWERTY全键盘布局。

### 6.2 性能优化

组件使用if条件渲染处理大量候选词列表，避免使用show。

### 6.3 使用限制

- 胶囊屏不支持T9九键布局
- 仅支持6763个常用汉字
- 不支持声调

### 6.4 资源文件路径

assets/
- full/ 圆屏全键盘图片
- t9/ 圆屏九键图片
- horizontal/ 方屏图片
- arc/ 胶囊屏图片

---

## 7. 常见问题

Q1: 如何隐藏/显示键盘？
this.hide = true; // 隐藏
this.hide = false; // 显示

Q2: 如何获取用户输入的字符？
onComplete(evt) { this.inputText += evt.detail.content; }

Q3: 候选词数量太少？
调整maxlength属性：<input-method maxlength=10></input-method>

Q4: 胶囊屏无法使用九键？
这是设计限制，胶囊屏仅支持QWERTY全键盘。

Q5: 输入拼音后没有候选词？
1. 确认使用内置词典中的汉字
2. 检查lang属性是否为cn
3. 确认numFlag为false

Q6: 如何实现自定义候选词？
需要修改dic.js词典文件。

---

## 附录

### A. 词典覆盖范围

6763个常用汉字，涵盖GB2312一二级汉字及常用异体字和多音字。

### B. 键盘布局

圆屏全键盘：W E R T Y U I O / S D F G H J K / X C V B N
圆屏九键：abc def / ghi jkl mno / pqrs tuv wxyz
方屏全键盘：Q W E R T Y U I O P / A S D F G H J K L / Z X C V B N M

---

文档版本: 1.0
最后更新: 2024年
组件来源: Vela_input_method
