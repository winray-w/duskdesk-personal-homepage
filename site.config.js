/* 个性化入口：修改引号中的文字即可。保存后刷新页面，无需构建。
 * 空链接不会生成可点击入口；projects: [] 可以暂时不展示项目。
 * 文案按纯文本显示，无需也不支持在这里写 HTML 标签。
 */
window.SITE_CONFIG = {
  name: 'Your Name',
  pageTitle: 'Your Name — 灵感桌面',
  description: '一个展示个人作品与灵感的暮色像素桌面。',
  desktopLabel: '的灵感桌面',
  avatar: 'assets/avatar.svg',
  avatarAlt: '个人头像',
  tagline: 'Bring ideas to life',
  introNote: '把脑海里的小小火花，变成眼前的作品。',
  welcome: '欢迎随便逛逛，看看我正在创造什么。',
  status: '保持好奇',
  greeting: '很高兴遇见你 :)',
  footerNote: '慢慢生长中',
  about: {
    motto: '把想法，变成可以触摸的作品。',
    bio: '在这里写下你的自我介绍，例如兴趣、正在学习的方向，以及想要分享的故事。',
  },
  projectsIntro: '把灵感收进匣子，让想法慢慢长成作品。',
  projects: [
    {
      name: '示例项目',
      summary: '用一句话介绍你的作品',
      caption: '~/projects/my-project',
      tag: '个人作品',
      description: '这是一个占位示例。请填写项目解决的问题、你的实现方式，以及可以展示的成果。',
      highlights: [
        { title: '项目亮点', text: '介绍作品中最值得分享的一个特点。' },
        { title: '实现方式', text: '说明使用的技术或你的设计思路。' },
        { title: '完成成果', text: '写下真实完成的内容或可验证的结果。' },
      ],
      url: '', // 填写完整的 https:// 地址；留空时不显示项目链接。
    },
  ],
  contact: {
    intro: '关于项目，关于灵感，或者只是打个招呼。',
    github: '', // 例如 https://github.com/your-username
    email: '', // 例如 hello@example.com
    note: '欢迎交流有趣的想法。',
  },
};
