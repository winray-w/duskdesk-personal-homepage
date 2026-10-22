/* 在交互初始化前填充页面及弹窗，避免同一份资料在多处重复维护。 */
(() => {
  'use strict';
  const config = window.SITE_CONFIG || {};
  const name = String(config.name || 'Your Name');
  const text = (root, selector, value) => {
    root.querySelectorAll(selector).forEach(node => { node.textContent = String(value ?? ''); });
  };
  // 对外链接仅接受 HTTP(S)，避免把配置中的其他协议当作跳转目标。
  const webURL = value => {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  };
  const fillAvatar = root => {
    root.querySelectorAll('img').forEach(img => {
      img.src = config.avatar || 'assets/avatar.svg';
      img.alt = config.avatarAlt || `${name} 的头像`;
    });
  };
  // 捕获克隆到弹窗中的图片错误，统一回退；事件捕获也适用于后创建的节点。
  document.addEventListener('error', event => {
    const img = event.target;
    if (img instanceof HTMLImageElement && !img.dataset.fallbackUsed) {
      img.dataset.fallbackUsed = 'true';
      img.src = 'assets/avatar.svg';
    }
  }, true);
  document.title = config.pageTitle || `${name} — 灵感桌面`;
  document.querySelector('meta[name="description"]').content = config.description || '';
  const bindings = { ...config, name, desktopSignature: `${name} 的桌面` };
  document.querySelectorAll('[data-bind]').forEach(node => {
    node.textContent = String(bindings[node.dataset.bind] ?? '');
  });
  document.querySelector('.brand').setAttribute('aria-label', `${name} 主页`);
  document.querySelector('.profile-card').setAttribute('aria-label', `${name} 的个人名片`);
  fillAvatar(document.querySelector('.profile-card'));

  const about = document.querySelector('#about-template').content;
  text(about, '[data-about-name]', `你好，我是 ${name}。`);
  text(about, '.about-tagline', config.tagline);
  text(about, '[data-about-motto]', config.about?.motto);
  text(about, '[data-about-bio]', config.about?.bio);
  fillAvatar(about);

  const titles = { about: '关于我', projects: '造物匣 — 我的项目合集', contact: '联系方式' };
  const collection = document.querySelector('#projects-template').content;
  text(collection, '[data-projects-intro]', config.projectsIntro);
  const grid = collection.querySelector('.project-grid');
  const projects = Array.isArray(config.projects) ? config.projects : [];
  const detailBase = document.querySelector('#project-detail-template');
  projects.forEach((project, index) => {
    const id = `project-${index}`;
    const projectName = String(project.name || '未命名项目');
    titles[id] = `造物匣 / ${projectName}`;
    const detail = detailBase.cloneNode(true);
    detail.id = `${id}-template`;
    text(detail.content, '[data-project-name]', projectName);
    text(detail.content, '[data-project-caption]', project.caption);
    text(detail.content, '[data-project-summary]', project.summary);
    text(detail.content, '[data-project-description]', project.description);
    text(detail.content, '.project-tag', project.tag);
    const list = detail.content.querySelector('.project-highlights');
    (Array.isArray(project.highlights) ? project.highlights : []).forEach(item => {
      const li = document.createElement('li');
      const title = document.createElement('strong');
      const body = document.createElement('span');
      title.textContent = String(item.title ?? '');
      body.textContent = String(item.text ?? '');
      li.append(title, body);
      list.append(li);
    });
    list.hidden = !list.childElementCount;
    const link = detail.content.querySelector('[data-project-link]');
    const url = webURL(project.url);
    if (url) {
      link.href = url;
      link.setAttribute('aria-label', `在新标签页查看 ${projectName}`);
    } else { link.remove(); }
    detailBase.before(detail);

    const button = document.createElement('button');
    button.className = 'project-item';
    button.dataset.open = id;
    // 复制固定结构后使用 textContent，配置中的特殊字符按文字展示。
    button.append(document.querySelector('#project-card-template').content.cloneNode(true));
    text(button, '.mini-terminal-caption', project.caption);
    text(button, '[data-card-name]', projectName);
    text(button, '[data-card-summary]', project.summary);
    grid.append(button);
  });
  if (!projects.length) {
    const empty = document.createElement('p');
    empty.className = 'body-copy';
    empty.textContent = '新的作品正在酝酿中，敬请期待。';
    grid.append(empty);
  }
  window.HOMEPAGE_TITLES = titles;

  const contact = document.querySelector('#contact-template').content;
  text(contact, '[data-contact-intro]', config.contact?.intro);
  text(contact, '[data-contact-note]', config.contact?.note);
  const contactList = contact.querySelector('.contact-list');
  function addContact(label, value, href, icon) {
    const row = document.createElement('a');
    row.className = 'contact-row';
    row.href = href;
    row.append(document.querySelector('#contact-row-template').content.cloneNode(true));
    row.querySelector('use').setAttribute('href', `#${icon}`);
    text(row, 'h3', label);
    text(row, 'p', value);
    text(row, '.contact-action', label === '邮箱' ? '写邮件 ↗' : '查看 ↗');
    if (label !== '邮箱') { row.target = '_blank'; row.rel = 'noopener noreferrer'; }
    row.setAttribute('aria-label', `${label}：${value}`);
    contactList.append(row);
  }
  const github = webURL(config.contact?.github);
  if (github) addContact('GitHub', github.replace(/^https?:\/\//, '').replace(/\/$/, ''), github, 'i-github');
  const email = String(config.contact?.email || '').trim();
  if (/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)) {
    addContact('邮箱', email, `mailto:${encodeURIComponent(email).replace('%40', '@')}`, 'i-mail');
  }
  if (!contactList.childElementCount) {
    const empty = document.createElement('p');
    empty.className = 'contact-empty';
    empty.textContent = '联系方式待填写。';
    contactList.append(empty);
  }
})();
