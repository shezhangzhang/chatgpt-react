# 部署你的私有 ChatGPT

![gpt](./gpt.gif)

[English](./README.md) | 中文

这个仓库的目的是为了让你可以轻松部署自己的私有 ChatGPT 网站。你可以使用自己的 OpenAI secret key，将密码设置到环境变量中，部署，并和你的朋友分享网站！

它具有以下基本功能：

- 流式数据（Streaming data）
- 服务器端渲染（Server-side rendering）
- 代码块高亮（Code block highlighting）
- 响应式设计（Responsive Design）
- 暗黑模式（Dark mode）
- 支持将对话保存成图片（Save conversations as an image）
- Sentry 监控（Sentry monitor）

使用的技术列表如下：

- Next.js
- React.js
- Tailwindcss
- Sentry
- Vercel

## 步骤如下

### 步骤 1

去 [OpenAI platform](https://platform.openai.com/account/api-keys)，获取你的秘钥。

### 步骤 2

Fork 此仓库。（请顺便点个 star :D）

### 步骤 3

进入 [Vercel](https://vercel.com/new)（或者你喜欢的其他部署方式），然后找到你刚才 fork 的仓库。

在你点击部署按钮之前，需要添加一些环境变量：

1. `OPENAI_API_KEY`：必填，这是你在步骤 1 中生成的 OpenAI 秘钥。
2. `PASSWORD`：必填，这是一个简单的身份验证策略，你可以添加一个或多个密码（用逗号分隔），并与你的合作伙伴共享密码。
3. `MODEL`: 可选，API 模型，默认为：“gpt-3.5-turbo”。

现在，点击部署按钮，就是这样！（你可以后续再绑定自己的域名）

## 更多

你可以给你的每个朋友象征他名字的密码，这样你可以接入 Sentry，并在 Sentry 中查看每个人的用量，以及其他可能出现的错误事件。你可以通过 vercel 直接接入 sentry。

## 开发

安装依赖：

```bash
npm i
```

在根目录下添加 `.env.local` 文件:

```bash
OPENAI_API_KEY=your_openai_secret_key
PASSWORD=user1,user2
```

启动：

```bash
npm run dev
```

最后，打开 <http://localhost:3007>
