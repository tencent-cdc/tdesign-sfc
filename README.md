# TDesign

基于 SFCJS 的 TDesign 版本，帮助你在你的项目中立即使用 tdesign.

## 快速使用

```html
<!-- 引入库文件 -->
<script src="https://unpkg.com/tdesign-sfc"></script>

<!-- 使用 tdesign 的按钮 -->
<t-button>确定</t-button>
```

## 引入库文件

你有多种方法使用tdesign-sfc的库文件。

第一种：引入完整构建包。

```html
<script src="https://unpkg.com/tdesign-sfc"></script>
```

这种最直接最暴力，把所有组件一次性全部引入。优点是简单快捷，缺点是包比较大，加载较慢。

第二种：依赖+构建包。

```html
<script src="https://unpkg.com/sfcjs"></script>
<script src="https://unpkg.com/tdesign-sfc/dist"></script>
```

这种把依赖sfcjs给独立出来，假如你项目种有其他用到sfcjs的地方，可以用这种。可以稍微加快加载速度，但是仍然是一次性把所有组件都引入了。

第三种：按需引入。

```html
<script src="https://unpkg.com/sfcjs"></script>
<script src="https://unpkg.com/tdesign-sfc/dist/t-button"></script>
```

这种你需要先独立引入sfcjs依赖，然后再引入某个你需要的组件文件。优点是根据实际需要的组件引入，缺点是如果需要加载很多组件会加载慢。

第四种：异步加载。

```html
<script src="https://unpkg.com/sfcjs"></script>
<script src="https://unpkg.com/tdesign-sfc/dist/async.js"></script>
<script>
  const { define } = window['tdesign-sfc']
  define({
    button: 'https://unpkg.com/packages/t-button/index.htm',
    icon: 'https://unpkg.com/packages/t-icon/index.htm',
  })
</script>
```

这种方式充分利用了sfcjs的特性，实现异步加载和在线编译。这种既平衡了首次加载，又可以按需引入自己需要的组件。

第五种：自己构建。

通过下拉源码，修改入口文件，构建打包出自己需要的组件。这样可以避免按需引入时组件过多所带来的问题。

## 组件

### t-button

```html
<t-button>按钮</t-button>
```

支持如下属性：

| 属性名 | 类型 | 默认值 | 说明 | 必传 |
|------|-----|----|---|---|
| block | boolean | false | 是否作为块级元素按钮 | N |
| disabled | boolean | false | 是否禁用 | N |
| ghost | boolean | false | 是否作为幽灵按钮 | N |
| shape | string | rectangle | 按钮形状，支持：rectangle, square, round, circle | N |
| size | string | medium | 尺寸，支持：l, large, m, medium, s, small, 10px, 1em 等 | N |
| theme | string | default | 组件颜色风格，支持： default, primary, danger, warning, success | N |
| type | string | button | 组件类型，和 html button 的 type 一致 | N |
| variant | string | base | 按钮形式，支持：base, outline, dashed, text | N |

可通过 [Demo](https://unpkg.com/tdesign-sfc/examples/t-button/index.html) 查看所有按钮效果。

支持如下事件：

| 事件名 | 说明 |
| ---- | ---- |
| click | 点击按钮时触发 |

### t-icon

```html
<t-icon name="search"></t-icon>
```

支持如下属性：

| 属性名 | 类型 | 默认值 | 说明 | 必传 |
|------|-----|----|---|---|
| name | string | - | icon 名 | Y |
| size | string | medium | 尺寸，支持：10px, 1em 等 | N |
| color | string | - | 颜色，支持：red 或 #f1f1f1 等颜色形式 | N |

可通过查看 [Demo](https://unpkg.com/tdesign-sfc/examples/t-icon/index.html) 页面获得全部图标名。
