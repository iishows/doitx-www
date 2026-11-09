---
locale: "zh"
title: "Claude Duet 对比 Grok Bot，以及一个开源替代品"
description: "Anthropic 于 2026 年 10 月 21 日发布 Claude Duet。它如何与 xAI 的 Grok Bot 相比，又如何与本项目 Doitx——你可以自己运行的开源选项——相比。"
published: "2026-10-24"
updated: "2026-10-24"
author: "Elie Steinbock"
category: "comparisons"
tldr: "Claude Duet 是一个线程里的一个主动式智能体：它每天早上给你简报，盯着你的收件箱和日历，并在发送、付款、签署或删除之前征询你。Grok Bot 是一组具名机器人，在一台共享的云端算力上运行例行任务。两者都是托管产品，并替你选好模型。Doitx 是你可以自己运行的开源版本，模型由你选择，包括你的 Claude 订阅。"
sources:
  - label: "Anthropic，Introducing Claude Duet（2026 年 10 月 21 日）"
    href: "https://claude.com/resources/articles/claude-duet"
  - label: "Claude Duet"
    href: "https://claude.com/product/claude-duet"
  - label: "Claude 帮助中心，Get started with Claude Duet"
    href: "https://support.claude.com/en/articles/17631495"
  - label: "Anthropic，Claude Duet: Safety, Privacy, and Security（2026 年 10 月 23 日）"
    href: "https://claude.com/resources/articles/claude-duet-safety-privacy-and-security"
  - label: "Claude 定价"
    href: "https://claude.com/pricing"
  - label: "Grok Bot 概览"
    href: "https://docs.x.ai/grok-bot/overview"
  - label: "Grok Bot 常见问题"
    href: "https://docs.x.ai/grok-bot/faq"
  - label: "xAI 定价"
    href: "https://x.ai/pricing"
  - label: "Doitx 源码"
    href: "https://github.com/iishows/doitx"
related:
  - href: "/claude-duet-alternative/"
    title: "开源 Claude Duet 替代品"
    description: "Doitx 与 Claude Duet 的完整对比表。"
  - href: "/grok-bot-alternative/"
    title: "开源 Grok Bot 替代品"
    description: "更长的 Grok Bot 页面，含安装步骤和截图。"
  - href: "/alternatives/"
    title: "2026 年最佳个人 AI 智能体"
    description: "我们对比的所有托管和开源智能体，汇于一张表。"
  - href: "/blog/self-host-an-ai-agent/"
    title: "如何自托管一个 AI 智能体"
    description: "Doitx 的已发布镜像安装步骤。"
faq:
  - question: "Claude Duet 对所有人开放吗？"
    answer: "不。它是面向美国 Claude Pro 和 Max 订阅者的研究预览，邀请从候补名单发出。Team 和 Enterprise 套餐尚未包含。"
  - question: "我能在 Claude Duet 或 Grok Bot 中选择模型吗？"
    answer: "不能。Duet 运行在 Claude Opus 5.5 上，帮助中心称你无法选择模型。Grok Bot 文档没有描述连接你自己的提供商。Doitx 允许每个机器人使用不同的模型，包括通过你的 Pro 或 Max 登录使用 Claude。"
  - question: "我能自托管 Claude Duet 或 Grok Bot 吗？"
    answer: "这两个产品的页面都没有描述自托管安装。Duet 运行在 Anthropic 操作的云端算力上。Grok Bot 使用你账号下的云端算力，可选本地算力执行经批准的命令。Doitx 采用 Apache-2.0，运行在你掌控的硬件上。"
  - question: "这些细节来自哪里？"
    answer: "Anthropic 的 Duet 公告、产品页、帮助中心文章和安全文章，xAI 的 Grok Bot 文档和定价页，以及本项目的源码。阅读时间为 2026 年 10 月 24 日。Duet 是研究预览，依赖某个细节之前请核对这些页面。"
comparison:
  caption: "公开描述，阅读于 2026 年 10 月 24 日。"
  columns:
    - "主题"
    - "Claude Duet"
    - "Grok Bot"
    - "Doitx"
  rows:
    - topic: "形态"
      cells:
        - "一个持续线程里的一个智能体"
        - "带例行任务的具名机器人"
        - "带例行任务的具名机器人，位于聊天中"
    - topic: "由谁运行"
      cells:
        - "Anthropic，运行在云端算力上"
        - "xAI，运行在共享的云端算力上"
        - "你自己，或处于 beta 的 Doitx Cloud"
    - topic: "模型"
      cells:
        - "Claude Opus 5.5。无可选。"
        - "随套餐提供。文档中没有自带提供商。"
        - "每个机器人可选，来自路由器或本地服务器"
    - topic: "价格"
      cells:
        - "Pro 每月 20 美元，Max 每月 100 美元起"
        - "付费 Cursor 套餐，SuperGrok 每月 30 美元"
        - "不收席位费。你为模型和算力付费。"
    - topic: "可用性"
      cells:
        - "仅限美国，需从候补名单进入"
        - "定价页列出的付费套餐"
        - "现在可自托管。Cloud 处于 beta。"
    - topic: "源码"
      cells:
        - "仅托管"
        - "仅托管"
        - "Apache-2.0"
---

Anthropic 于 2026 年 10 月 21 日以研究预览形式发布 Claude Duet。它与 Meta 的 Muse、OpenAI 的 Dots、Hark Pro 和 xAI 的 Grok Bot 一样，都是托管的个人智能体。它们都在你关闭应用之后替你分担工作。差别在于你能得到多少个智能体、谁运行算力，以及你能否选择模型。

## Claude Duet 是什么

Duet 是一个面向 iOS 和 Android 的独立应用，也提供 claude.ai 网页版。你像给人发消息一样，用文字或语音，在一个持续线程里与它交流。任务标签页显示进行中的工作，制作标签页存放大型任务的产物。

每天早上它会查看你的邮件和日历，整理出重要内容，并可以着手第一步，例如起草回复。之后它按间隔检查已连接的账号，直到有事需要你才出声。公告称它每隔几小时检查一次，因为持续检查会更快耗尽套餐额度。帮助中心没有给出具体数字，并称紧急事项可能在两次检查之间到达。

Duet 在自己的云端算力上工作，那是一台带浏览器的虚拟机，因此你关闭应用后它仍继续运行。你无法观看或接管那个浏览器。它通过 Claude 的连接器和插件接入：帮助中心点名了 Gmail、Google 日历、Google Drive、Slack、QuickBooks、HubSpot、Docusign 和 Calendly。Microsoft 365 尚不可用。付款通过 Link by Stripe 或 Shop Pay 完成，使用一次性虚拟卡。

它在发送消息、付款、签署文件或删除任何东西之前都会征询你。如果你不在，它会完成其余部分，之后再带着审批回来。交易证券、在账户间转移资金以及访问他人账号即使在批准后也会被阻止。Anthropic 称 Duet 从不会看到你的密码、cookie 或应用令牌，智能体机器之外的一个代理会在每次请求时把它们加上。

Duet 运行在 Claude Opus 5.5 上，你无法选择模型。它在美国随 Claude Pro 和 Max 提供，需从候补名单进入，其工作按与聊天相同的速率计入套餐用量限制。Anthropic 坦率地列出了粗糙之处：它可能误读某个线程、误判什么紧急，或在两次检查之间漏掉东西。订票这类个人琐事不如工作任务成熟。

## 与 Grok Bot 相比

Grok Bot 是 xAI 面向具名机器人的托管产品，这些机器人可以使用算力、保留例行任务并在审批处暂停。Duet 是一个智能体，Grok Bot 是一份名单。这是形态上的主要差异。

算力也不同。Duet 的算力属于该智能体，运行在 Anthropic 的云上。Grok Bot 文档描述的是你账号下的一台云端算力，由该账号下的每个机器人共用，包括文件和登录状态。可选的本地算力可以在你面前的机器上执行经批准的命令。

Duet 默认是主动式的：晨报和定时检查就是产品本身。Grok Bot 更依赖你为每个机器人设置的例行任务。

两种情况下价格都随套餐而定。Duet 随每月 20 美元的 Claude Pro 和每月 100 美元起的 Max 提供。Grok Bot 随付费 Cursor 套餐和每月 30 美元的 SuperGrok 提供。两者都不允许你自带模型提供商，也都没有描述由你自己运行该服务。

## Doitx 的定位

Doitx 是这种形态的开源版本。它采用 Apache-2.0，目前处于 beta 阶段。你用已发布的 Docker 镜像或桌面应用运行它，或使用处于 beta 的 Doitx Cloud。客户端包括网页版应用、Electron 桌面应用和 Expo 移动应用。

和 Grok Bot 一样，一旦运行起来它就是一个聊天。你创建具名机器人，并在各自的对话里管理它们。每个机器人保留记忆、例行任务和历史。例行任务是可读的 Markdown，可以按排程运行，因此晨报是你写的一条例行任务，而不是固定功能。机器人可以在你设定的边界处暂停等待批准，操作会记入审计日志。

模型归你。连接 Doitx 路由器或运维方运行的本地 OpenAI 兼容服务器，使用你自己的密钥。每个机器人可以在你运行的算力上使用不同的模型。

算力也归你。默认是本地 Docker。E2B、Daytona、CreateOS 和 Boat 是可选项。团队算力共享，私有算力隔离。连接器凭据在你的服务器上加密，且永不经 API 返回。

## 如何选择

当你为 Claude Pro 或 Max 付费、身在美国、并且想要一个无需任何设置就会盯着收件箱和日历的智能体时，选 Claude Duet。接受这一点：Anthropic 运行算力、选择模型，而且这是预览版。

当你已在为 Cursor 或 SuperGrok 付费、并想要几个具名机器人运行在 xAI 托管的算力上时，选 Grok Bot。

当智能体应运行在你掌控的硬件上、模型由你选择、并且你想要不止一个机器人时，选 Doitx。代价在安装：Docker 或桌面应用，然后创建账号并连接模型。[如何自托管一个 AI 智能体](/blog/self-host-an-ai-agent/)逐步讲解了它。

本页对比的是公开描述。它不衡量其中任何一个把任务做对的频率。Duet 在预览期间尤其会变化，依赖某个细节之前请核对链接来源。
