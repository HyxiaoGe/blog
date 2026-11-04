# 博客香港 VPS 转发

2026-11-04（Asia/Shanghai）启用。请求链路为：访客 → 香港 VPS `43.161.240.133:443` → Vercel；博客源站、证书和 GitHub → Vercel 自动发布流程继续由原有配置负责。

## DNS 与回源

- Cloudflare：`blog.seanfield.org` 使用 A 记录 `43.161.240.133`，仅 DNS，TTL 自动。
- 原记录：CNAME `4d2296f58052b6fc.vercel-dns-017.com`，仅 DNS，TTL 自动。
- 回源固定使用原 Vercel 分配域名并动态解析，不能使用 `blog.seanfield.org` 作为回源地址，否则 DNS 切换后会循环转发。
- 图片仍直接从现有 OSS 加载。

## Nginx 配置

香港 VPS 已有 Nginx 1.28.3。共享 443 入口位于 `/etc/nginx/stream.d/fusion-relay.conf`，仅增加 `blog.seanfield.org 127.0.0.1:19443;` 一条 SNI 映射。

新增配置：

| 仓库文件 | VPS 目标路径 | 用途 |
| --- | --- | --- |
| `deploy/blog-vps/stream.conf` | `/etc/nginx/stream.d/blog-relay.conf` | 接收内部 PROXY protocol 后转发标准 TLS 至 Vercel |
| `deploy/blog-vps/http.conf` | `/etc/nginx/conf.d/blog-relay.conf` | 转发 HTTP 请求与证书验证路径 |

19443 只监听本机。HTTPS 不在 VPS 解密，SNI、Host 和 HTTP 内容原样传递，没有额外缓存；因此 Vercel 发布后不需要额外清理代理缓存。回源 DNS 每 60 秒重新解析。内部 PROXY protocol 不能发给 Vercel，专用本机监听用于移除该头，既有 Fusion/Auth/个人站/灵稿的转发保持原样。

HTTP 请求交给 Vercel 决定跳转，`/.well-known/acme-challenge/*` 可以直接到达源站，HTTPS 的 `/.well-known/vercel/*` 也不会被缓存或改写。这遵循 [Vercel 关于验证路径的说明](https://vercel.com/kb/guide/can-i-use-a-proxy-on-top-of-my-vercel-deployment)。

本方案未配置 Verified Proxy Advanced；Vercel 看见的连接来源是 VPS 地址，不能依赖其连接源 IP 识别真实访客或地区。需要真实客户端 IP 的安全或分析能力时，应重新评估接入方式，不伪造受信任代理头。

## 安装与检查

`deploy/blog-vps/activate.py` 接收 `--expected-sha`，先校验既有入口的 SHA-256，再生成完整候选配置执行 `nginx -t`，备份、安装、热加载并验证 HTTPS。失败自动恢复本次修改。它不会修改 DNS，也不会覆盖已经存在的博客转发配置。

首次启用前共享入口 SHA-256：`904db919c4bae75d19ea6f8bd06693965cd2a5bbc03602fe53cbab6df5ed5dd7`。这仅是历史记录，后续操作必须重新读取当前文件。

本次备份：`/etc/nginx/backups/blog-vps-20261104-192011/`。博客连接日志：`/var/log/nginx/blog-relay-access.log`。

切换 DNS 前可用以下命令验证新链路，不关闭证书校验：

```sh
curl --noproxy '*' --resolve blog.seanfield.org:443:43.161.240.133 https://blog.seanfield.org/
```

## 验证记录

- 候选配置与活动配置 `nginx -t` 均通过；已有 Nginx 通过热加载生效。
- 同一 dev 网络交替请求 Vercel 真实 IP 和香港 VPS，各 5 次，全部返回 200；10 次首页 SHA-256 完全一致。
- 首页首字节中位数：直连 633 ms，VPS 187 ms；完整 HTML 下载中位数：639 ms，VPS 207 ms。VPS 有一次 1.25 秒首字节波动；这些是单一网络样本，不代表所有地区。
- HTTPS 首页、文章和 CSS 返回 200；HTTP 首页与源站同为 308，测试 ACME 路径与源站同为 404，没有被 VPS 强制跳转。
- DNS 切换后，公共解析器 `1.1.1.1` 与 `8.8.8.8` 均返回香港 IP；香港主机按普通域名访问返回 200，实际连接地址为 `43.161.240.133`，转发日志记录了至 Vercel 的上游连接。
- 个人站 `/healthz` 和灵稿首页返回 200，Fusion 根路径仍返回登录跳转，其他共享 SNI 规则未改动。

## 回退

将博客 DNS 恢复为上面的原 CNAME、仅 DNS、TTL 自动即可回到 Vercel 直连。保留 VPS 博客转发至旧 DNS 缓存过期，避免仍使用旧 A 记录的访客断开。

若以后要移除代理配置，只移除本次博客 SNI 映射和两份博客配置，先检查其他域名是否已有新变更，再执行 `nginx -t` 和热加载。不要直接覆盖整个共享入口为历史备份。
