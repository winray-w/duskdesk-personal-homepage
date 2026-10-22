/* Each desktop shortcut opens its own content in a native, keyboard-accessible dialog. */
const dialog = document.querySelector('#app-dialog');
const content = document.querySelector('#dialog-content');
const dialogTitle = document.querySelector('#dialog-title');
const titles = window.HOMEPAGE_TITLES;
let lastTrigger = null;

function openWindow(name, trigger) {
  const template = document.querySelector(`#${name}-template`);
  if (!template || !titles[name]) return;
  if (!dialog.open) lastTrigger = trigger;
  content.replaceChildren(template.content.cloneNode(true));
  dialogTitle.textContent = titles[name];
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  document.querySelector('.close-window').focus({ preventScroll: true });
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-open]');
  if (trigger) openWindow(trigger.dataset.open, trigger);
  // Render after opening a dialog so the particle popover stays above that window.
  if (event.target.closest('#pause-motion')) return;
  const rect = event.target.getBoundingClientRect();
  const x = event.detail === 0 ? rect.left + rect.width / 2 : event.clientX;
  const y = event.detail === 0 ? rect.top + rect.height / 2 : event.clientY;
  burstPixels(x, y);
});
document.querySelector('.close-window').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => lastTrigger?.focus({ preventScroll: true }));

const clock = document.querySelector('#clock');
function updateClock() {
  const now = new Date();
  clock.textContent = new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
  clock.dateTime = now.toISOString();
  clock.title = new Intl.DateTimeFormat('zh-CN', { dateStyle: 'full' }).format(now);
}
updateClock();
setInterval(updateClock, 30_000);

const motionButton = document.querySelector('#pause-motion');
const particleLayer = document.querySelector('#particle-layer');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = motionPreference.matches;
function setMotionState() {
  document.body.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? '开启动效：楼顶小猫、流星、微光和点击粒子' : '暂停动效：楼顶小猫、流星、微光和点击粒子');
  motionButton.querySelector('.motion-label').textContent = paused ? '动态已暂停' : '动态已开启';
  motionButton.querySelector('#motion-symbol').setAttribute('d', paused ? 'M10 6l16 10-16 10z' : 'M9 7h5v18H9zm9 0h5v18h-5z');
  if (paused) particleLayer.replaceChildren();
}
motionButton.addEventListener('click', () => { paused = !paused; setMotionState(); });
motionPreference.addEventListener('change', (event) => { paused = event.matches; setMotionState(); });
setMotionState();

const particleColors = ['#ffe7ad', '#f7ba91', '#e8a7c6', '#fff5db', '#c0acd9'];
function burstPixels(x, y) {
  if (paused) return;
  // A manual popover puts the non-interactive effect above native modal dialogs.
  if (typeof particleLayer.showPopover === 'function') {
    if (particleLayer.matches(':popover-open')) particleLayer.hidePopover();
    particleLayer.showPopover();
  }
  while (particleLayer.childElementCount > 140) particleLayer.firstElementChild.remove();
  for (let i = 0; i < 22; i++) {
    const particle = document.createElement('span');
    const angle = Math.PI * 2 * i / 22 + (Math.random() - .5) * .4;
    const distance = 45 + Math.random() * 95;
    particle.className = `pixel-particle${i % 4 === 0 ? ' spark' : ''}`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--size', `${i % 4 === 0 ? 12 : 4 + Math.random() * 4}px`);
    particle.style.setProperty('--color', particleColors[i % particleColors.length]);
    particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--dy', `${Math.sin(angle) * distance + 24}px`);
    particle.style.setProperty('--turn', `${Math.random() * 200 - 100}deg`);
    particleLayer.append(particle);
    // A bounded lifetime also cleans up particles if the tab is hidden mid-animation.
    setTimeout(() => particle.remove(), 1650);
  }
}

const desktop = document.querySelector('.desktop');
const scene = document.querySelector('.scene');
const portraitLayout = window.matchMedia('(max-width: 600px), (max-width: 900px) and (orientation: portrait)');
function fitScene() {
  const width = portraitLayout.matches ? 390 : 1280;
  const height = portraitLayout.matches ? 620 : 560;
  const scale = Math.min(desktop.clientWidth / width, desktop.clientHeight / height);
  scene.style.setProperty('--scene-scale', String(scale));
}
new ResizeObserver(fitScene).observe(desktop);
portraitLayout.addEventListener('change', fitScene);
fitScene();
