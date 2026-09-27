---
title: 从零搭建个人博客：GitHub + Firefly + Cloudflare Pages
published: 2026-09-27
description: 记录我的个人博客搭建过程：使用 GitHub 保存 Firefly 主题，通过 Cloudflare Pages 自动部署，再将 Spaceship 购买的域名绑定到博客。
image: ''
tags: [博客搭建, Firefly, GitHub, Cloudflare]
category: 建站记录
draft: false
lang: ''
---

一直想拥有一个自己的博客，用来记录学习、生活和一些零散的想法。折腾了一番之后，我终于让它通过自己的域名打开了。

这篇文章整理了我实际走通的路线：**在 GitHub 创建博客仓库，使用 Firefly 主题，通过 Cloudflare Pages 发布网站，最后绑定自己的域名。** 初次搭建可以主要使用浏览器完成，不必先配置本地开发环境。

我的博客地址是：[litumast.top](https://litumast.top)。

## 一、先弄清楚这几个平台的作用

| 名称 | 在博客中负责什么 |
| --- | --- |
| Firefly | 提供博客主题、页面布局和文章功能 |
| GitHub | 保存博客代码、配置、图片和 Markdown 文章 |
| Cloudflare Pages | 将仓库中的内容构建成网站，并自动部署 |
| Cloudflare DNS | 管理域名解析，让域名找到博客 |
| Spaceship | 我购买和续费域名的平台 |

之后更新博客的流程就是：

```text
修改文章或配置 → 提交到 GitHub → Cloudflare 自动构建 → 网站更新
```

域名是网站的地址，托管平台负责提供网页。域名接入 Cloudflare DNS 后，仍然在原来的注册商续费。

## 二、准备账号和主题仓库

需要准备一个 [GitHub 账号](https://github.com) 和一个 [Cloudflare 账号](https://dash.cloudflare.com)。有自己的域名就可以在后面绑定；暂时没有域名，也可以先使用 Pages 分配的地址。

### 1. 创建自己的博客仓库

打开 [Firefly 官方仓库](https://github.com/CuteLeaf/Firefly)。

如果页面有 **Use this template**，选择 **Create a new repository**，填写自己的账号和仓库名称。我使用的仓库名称是 `litumast-blog`。

也可以使用 **Fork** 创建自己的副本。后面的操作都在自己账号下的仓库中进行。

创建完成后，应能看到 `src`、`public`、`package.json` 等文件和目录。记住页面左上角的默认分支名称，我的仓库是 `master`，其他仓库可能是 `main`。

### 2. 修改网站基本信息

打开仓库中的 `src/config/siteConfig.ts`，点击铅笔图标进入编辑模式。

找到相应字段，替换成自己的内容。例如：

```ts
title: "里托大师的博客",
subtitle: "记录学习与生活",
site_url: "https://litumast.top",
description: "分享学习笔记、生活记录和一些想法。",
```

这只是需要修改的字段示例，不是整个文件。保留文件中其余配置，以及原来的引号、逗号和括号。

如果暂时没有自己的域名，等 Pages 部署成功后，将 `site_url` 改成实际分配的 `https://项目名.pages.dev` 地址。

修改完成后点击 **Commit changes**。如果弹窗提供分支选项，选择直接提交到默认分支，再确认提交。

网页上的编辑必须提交才会保存到仓库；仅在编辑框中输入文字，还没有完成发布。

## 三、通过 Cloudflare Pages 部署

### 1. 找到 Pages 入口

登录 Cloudflare 控制台，进入 **Workers & Pages**，点击创建应用。

我当时看到的是一个写着 **Make something new** 的页面，里面有 GitHub、GitLab、Hello World 等选项。**Pages 入口在这张卡片下方的小字中：**

> 想要部署 Pages？开始使用

点击这里的“开始使用”，再选择 **导入现有 Git 存储库**。

界面之后可能调整；关键是确认自己进入的是 Pages 的 Git 部署流程。

### 2. 连接 GitHub

按提示连接 GitHub 账号，授权访问自己的博客仓库，然后选中 `litumast-blog`。

如果列表里找不到仓库，检查 GitHub 的授权范围是否包含它。选择仓库后进入“设置构建和部署”。

### 3. 填写构建设置

我成功部署时使用的是：

| 设置项 | 我的配置 |
| --- | --- |
| 项目名称 | `litumast-blog` |
| 生产分支 | `master` |
| 框架预设 | `Astro` |
| 构建命令 | `pnpm run build` |
| 构建输出目录 | `dist` |
| 根目录 | 留空，使用仓库根目录 |

生产分支必须与自己的仓库一致。输出目录输入框外如果已经显示 `/`，框内只填 `dist` 即可。

在“环境变量（高级）”中，我添加了：

| 变量名称 | 值 |
| --- | --- |
| `NODE_VERSION` | `24.5.0` |
| `PNPM_VERSION` | `11.22.0` |

**这些是我这次部署的版本，不是所有 Firefly 版本都必须照抄。** 创建仓库后，应查看 `package.json`：`engines.node` 表示 Node.js 要求，`packageManager` 表示项目指定的包管理器版本。将构建环境与自己的仓库要求对应起来。

Pages 会安装依赖，此页面不需要另填安装命令。这次使用主题的静态构建方式，环境变量中没有添加 `CF_WORKERS`。

构建环境的版本设置可参考 [Cloudflare 构建环境文档](https://developers.cloudflare.com/pages/configuration/build-image/)。

### 4. 保存并部署

点击 **保存并部署**，等待安装依赖、构建和发布完成。

成功后，我拿到的地址是：

```text
https://litumast-blog.pages.dev
```

打开实际分配的地址，检查首页和文章。如果构建失败，先看具体错误日志，再修改配置；只看最后一句“部署失败”通常找不到原因。

到这里，博客已经有可访问的地址了。接下来是给它绑定自己的域名。

## 四、将域名 DNS 接入 Cloudflare

我的域名 `litumast.top` 在 Spaceship 购买。绑定这个不带 `www` 的根域名时，需要将它的 DNS 接入与 Pages 项目相同的 Cloudflare 账号。

### 1. 从 Pages 添加自定义域

进入 **Workers & Pages → 博客项目 → 自定义域 → 设置自定义域**，输入自己的域名。

如果出现“DNS 转移管理”，按提示开始接入。在“添加站点”页面选择 **连接域名**，选择免费方案，并扫描已有 DNS 记录。

这里的“连接域名”是将 DNS 交给 Cloudflare 管理。域名的注册和续费仍在 Spaceship。

### 2. 检查导入的记录

自动扫描不一定包含所有记录，需要与原 DNS 平台核对。使用域名邮箱或其他子域服务的人，还应保留对应的记录。

我之前试过其他托管平台，扫描结果中出现了两条旧博客的根域名 A 记录。我在确认它们指向旧站点后，将它们替换成新博客的 CNAME：

| 设置项 | 示例 |
| --- | --- |
| 类型 | `CNAME` |
| 名称 | `@` |
| 内容 | `litumast-blog.pages.dev` |
| 代理状态 | 已代理 |
| TTL | 自动 |

`@` 表示根域名。内容填写自己项目的 Pages 地址，不加 `https://` 和末尾斜杠。不要为了处理博客解析而清空其他服务的记录。

### 3. 修改名称服务器

继续激活后，Cloudflare 会分配两条名称服务器地址。

**一定复制自己页面提供的两条地址，不要使用其他教程里的示例。**

我在 Spaceship 中的操作顺序是：

1. 打开“域名管理器”，选择自己的域名。
2. 进入“名称服务器和 DNS”。
3. 点击名称服务器旁的“更改”。
4. 选择“自定义名称服务器”。
5. 用 Cloudflare 提供的两条地址替换原来的 Spaceship 名称服务器。
6. 保存设置。

这是修改名称服务器，不是在“高级 DNS”中新增两条 NS 记录。若原平台已开启 DNSSEC，先按迁移提示处理并关闭旧 DNSSEC，接入完成后再配置。

### 4. 等待激活

返回 Cloudflare 检查名称服务器。我的页面提示通常需要 1～2 小时，最长可能到 24 小时，以实际检测结果为准。

等待期间不必反复更换地址。当页面显示“您的域现在受 Cloudflare 保护”时，说明域名接入已经完成。

## 五、完成 Pages 自定义域绑定

DNS 激活后，还需要完成 Pages 项目中的域名绑定。

重新进入 **Workers & Pages → litumast-blog → 自定义域**，添加 `litumast.top`，确认页面显示的 CNAME 目标是自己的 Pages 地址，然后点击 **激活域**。

我之前已经添加过 CNAME，所以确认页中的新旧记录完全一样，这是正常的。此时仍需点击激活，完成项目关联。

等待自定义域和证书就绪后，打开：

```text
https://litumast.top
```

当自己的域名能够通过 HTTPS 正常显示博客首页，整条发布流程就走通了。只添加 DNS 记录并不能代替 Pages 的自定义域绑定，具体要求见 [Cloudflare 自定义域文档](https://developers.cloudflare.com/pages/configuration/custom-domains/)。

## 六、以后如何更新博客

Firefly 的文章可以使用 `.md` 格式，存放在 `src/content/posts` 中。文件开头是一段文章信息，后面是正文，例如：

```markdown
---
title: 我的第一篇文章
published: 2026-09-27
description: 记录一次新的开始。
tags: [生活, 随笔]
category: 生活记录
draft: false
---

这里开始写正文。

## 一个小标题

记录今天学到的东西。
```

通过 GitHub 网页发布文章时，进入 `src/content/posts`，使用 **Add file → Upload files** 上传 Markdown 文件，再点击 **Commit changes** 提交到生产分支。Cloudflare 会自动构建，成功后文章就会出现在网站上。

如果在电脑上使用 GitHub Desktop 编辑，则需要完成保存、Commit 和 Push。Commit 只记录本地修改，Push 才会将提交上传到 GitHub。

## 七、这次搭建中容易弄混的地方

| 遇到的情况 | 应该检查什么 |
| --- | --- |
| 创建应用后不知道如何进入 Pages | 查看创建页是否有单独的 Pages 入口 |
| 修改后网站一直没变化 | 是否提交成功，以及 Cloudflare 最新部署是否成功 |
| 仓库中找不到自己的修改 | 是否编辑了正确仓库、正确分支 |
| 部署失败后网页还是旧内容 | 失败的构建不会替换上次成功发布的版本 |
| 域名已在 Cloudflare 激活，但博客打不开 | Pages 的自定义域绑定是否完成，HTTPS 是否就绪 |
| 修改头像或背景后不显示 | 文件名、大小写、路径与扩展名是否一致 |

此外，不要混淆两个管理入口：以后调整 DNS 到 Cloudflare 操作，域名到期续费仍在 Spaceship 操作。

从模板仓库到自己的网址，真正需要弄明白的就是代码、部署和域名之间的关系。网站上线之后，接下来就是慢慢写文章，把这片小天地填充起来。
