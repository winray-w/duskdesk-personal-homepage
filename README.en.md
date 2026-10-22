[简体中文](README.md) | English

> [!IMPORTANT]
> Before publishing, edit [`site.config.js`](site.config.js), replace the avatar, and add your own profile and projects.
> [winray.cc](https://winray.cc) is my personal demo site; the template uses generic placeholder content.

<p align="center">
  <img src="docs/images/duskdesk-banner.svg" alt="DuskDesk — Dusk Pixel Desktop personal website template" width="100%">
</p>

<h1 align="center">DuskDesk</h1>
<p align="center">
  <strong>Dusk Pixel Desktop · 暮色像素桌面风</strong><br>
  A little desktop for your projects, ideas, and a sunset.<br>
  Personal Homepage · Personal Website · Portfolio Template
</p>

<p align="center">
  <a href="https://winray.cc">✦ Live demo</a> ·
  <a href="#getting-started">Getting started</a> ·
  <a href="docs/使用手册.md">User guide (中文)</a> ·
  <a href="#make-it-yours">Make it yours</a>
</p>

---

## Start with a sunset

**winray 的灵感桌面 — winray's inspiration desktop** · [winray.cc](https://winray.cc)

[![DuskDesk in use: winray's personal homepage](docs/images/demo-desktop.jpg)](https://winray.cc)

<p align="center"><sub>Click the image to visit the live site. Open the desktop icons and explore the projects inside.</sub></p>
<details>
<summary><strong>✦ Explore the project collection and detail window</strong></summary>

### Open the collection

Project cards keep your work together. Each card opens its own detail window.

![Live demo: project collection window](docs/images/demo-projects.jpg)

### See an idea come to life

Each project has room for a description, highlights, and a link to the work.

![Live demo: MiniCode project detail window](docs/images/demo-project-detail.jpg)

</details>

## About DuskDesk

DuskDesk is a **personal website template built with plain HTML, CSS, and JavaScript**, suitable for introductions, project showcases, and contact information. This project is shared as a visual theme template. No frontend package installation or build step is required: download it and open it in a browser.

| ✦ Desktop details | What they offer |
| --- | --- |
| **Dusk pixel scene** | A purple-pink sky, sunset, city skyline, and pixel accents in one visual theme |
| **Desktop windows** | Shortcuts and a bottom Dock open About, Projects, project details, and Contact |
| **One configuration file** | Keep your name, avatar, bio, projects, and contact links in `site.config.js` |
| **Flexible project collection** | Generate cards and detail windows from an array; supports multiple projects and an empty state |
| **Light animations** | A rooftop cat, meteors, fireflies, and click particles, with a shared pause control and reduced-motion support |
| **Landscape and portrait layouts** | Viewport-aware composition, scrollable windows, Esc to close, and focus restoration |

## Getting started

### 01 · Download and open

Download this repository as a ZIP and extract it. Open **`index.html`** in your browser. On Windows, you can also double-click `start-preview.cmd`.

There is no `npm install` or build command to run first.

### 02 · Tell your story

Open **[`site.config.js`](site.config.js)** in a text editor. Update the matching fields in the existing object and keep the other settings:

```js
name: 'Your Name',
pageTitle: 'Your Name — My Desktop',
description: 'A home for my projects, ideas, and things I am exploring.',
avatar: 'assets/avatar.jpg',
avatarAlt: 'My profile picture',
tagline: 'Bring ideas to life',

about: {
  motto: 'Turn ideas into something you can share.',
  bio: 'Hello! Introduce your interests, experience, and what you are making here.',
},

contact: {
  intro: 'Talk projects, share an idea, or just say hello.',
  github: 'https://github.com/your-username',
  email: 'hello@example.com',
  note: 'I would love to hear from you.',
},
```

Place your avatar in `assets/` and make sure the `avatar` path matches the file. Save and refresh: the profile card and About window will update together.

### 03 · Add your work

Edit the `projects` array in the configuration. Each object creates a project card and its detail window:

```js
projects: [
  {
    name: 'My Project',
    summary: 'Describe your project in one sentence',
    caption: '~/projects/my-project',
    tag: 'Web / Design',
    description: 'Explain the problem, your approach, and what you actually built.',
    highlights: [
      { title: 'Highlight', text: 'Share a feature worth a closer look.' },
      { title: 'Approach', text: 'Describe your tools or design decisions.' },
    ],
    url: 'https://example.com',
  },
],
```

Copy an object to add a project, remove it to delete one, or reorder the array to change the display order. Set `projects: []` for a friendly empty collection.

**Need more detailed, step-by-step instructions?** See the [full user guide in Chinese](docs/使用手册.md), covering configuration fields, avatar replacement, project management, styling, deployment, and troubleshooting.

## Make it yours

| What to change | Where to edit |
| --- | --- |
| Name, browser title, description, and profile text | Basic fields in `site.config.js` |
| Avatar | Add an image to `assets/`; update `avatar` and `avatarAlt` |
| About text | `site.config.js` → `about` |
| Projects | `site.config.js` → `projects` |
| GitHub and email | `site.config.js` → `contact`; empty values hide the corresponding links |
| Collage headline and decorative copy | `index.html`; update the related `aria-label` too |
| Colors, fonts, and components | `style.css`; theme variables are in `:root` |
| Layout and animation | `layout.css` |
| Browser icon | `assets/favicon.svg` |

`tagline` appears in the profile card and About window. The large **Bring ideas to life** collage headline is styled separately in `index.html`. Keep desktop copy short and put longer introductions inside the windows.

## Preview and deploy

### Optional: preview over HTTP

If Node.js is already installed, run this from the repository root:

```sh
node server.cjs
```

Open **`http://127.0.0.1:4173`**, as printed in your terminal. Press `Ctrl+C` to stop. `server.cjs` is only a local preview tool.

### Further deployment

After customizing the template, you can publish your website using a domain name and a cloud server:

1. **Prepare a domain and server**: register a domain, get a cloud server with a public IP address, and install a web server such as Nginx.
2. **Upload the website files**: copy the files listed below into the server's website directory, such as `/var/www/duskdesk`, keeping their directory structure.
3. **Connect the domain**: add a DNS A record pointing to the server's public IPv4 address, then configure the domain, website directory, and `index.html` entry page in Nginx.
4. **Enable HTTPS**: allow the required web ports, 80 and 443, through the server's security group and firewall, configure an SSL/TLS certificate, and check that the domain is accessible.

<details>
<summary><strong>Project structure</strong></summary>

```text
.
├── README.md                 Chinese README
├── README.en.md              English README
├── index.html                Page structure and window templates
├── site.config.js            Profile and project configuration
├── personalize.js            Populate the page from configuration
├── app.js                    Windows, clock, and motion controls
├── style.css                 Theme and base styles
├── layout.css                Layout and animations
├── assets/                   Website runtime assets
│   ├── avatar.svg            Generic pixel avatar
│   └── favicon.svg           Browser icon
├── docs/
│   ├── 使用手册.md           Full user guide in Chinese
│   └── images/               README banner and live screenshots
├── server.cjs                Optional local preview server
└── start-preview.cmd         Windows launcher
```

</details>

## A few practical notes

- Configuration text is inserted as plain text. Use full `https://` or `http://` URLs for GitHub and project links.
- Empty GitHub, email, or project URL fields hide those external links. Email links open the visitor's configured mail app.
- Google Fonts enhance the typography; system fonts are used when they are unavailable. No local font installation is required.
- Refresh after editing and check narrow screens and each window. The [user guide](docs/使用手册.md#9-常见问题) includes more troubleshooting advice in Chinese.

---

<p align="center">
  <strong>Make something you love.</strong><br>
  <sub>Give your next little idea a desktop of its own.</sub><br><br>
  <a href="https://winray.cc">winray 的灵感桌面</a> · <a href="README.md">阅读中文版</a>
</p>
