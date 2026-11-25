'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
const desktop = window.matchMedia('(min-width: 781px)');
desktop.addEventListener('change', e => { if (e.matches) setMenu(false); });
const filters = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('[data-kind]')];
const status = document.querySelector('#filter-status');
filters.forEach(button => button.addEventListener('click', () => {
  const selection = button.dataset.filter;
  filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  let count = 0;
  projects.forEach(project => { project.hidden = selection !== 'all' && project.dataset.kind !== selection; if (!project.hidden) count++; });
  status.textContent = `${count} project${count === 1 ? '' : 's'} shown.`;
}));

// Theme cycling pauses for hidden tabs; manual choices persist and disable Auto.
const themeRoot = document.documentElement;
const swatches = [...document.querySelectorAll('[data-theme-choice]')];
const autoButton = document.querySelector('.theme-auto');
const themes = ['sage', 'night', 'plum'];
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeTheme = 'sage', auto = !motion.matches, timer;
try { const saved = JSON.parse(localStorage.getItem('portfolio-retro-theme') || 'null'); if (saved && themes.includes(saved.theme)) { activeTheme = saved.theme; auto = saved.auto === true && !motion.matches; } } catch {}
function applyTheme(theme) {
  activeTheme = theme; themeRoot.dataset.theme = theme;
  swatches.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme)));
  autoButton.setAttribute('aria-pressed', String(auto));
  document.querySelector('meta[name="theme-color"]').content = {sage:'#351019',night:'#171719',plum:'#493021'}[theme];
}
function saveTheme() { try { localStorage.setItem('portfolio-retro-theme', JSON.stringify({theme:activeTheme,auto})); } catch {} }
function scheduleTheme() { clearInterval(timer); if (auto && !motion.matches && !document.hidden) timer = setInterval(() => applyTheme(themes[(themes.indexOf(activeTheme)+1)%themes.length]), 9000); }
swatches.forEach(button => button.addEventListener('click', () => { auto=false; applyTheme(button.dataset.themeChoice); saveTheme(); scheduleTheme(); }));
autoButton.addEventListener('click', () => { if (motion.matches) return; auto=!auto; applyTheme(activeTheme); saveTheme(); scheduleTheme(); });
function respectMotion() { if(motion.matches) auto=false; autoButton.disabled=motion.matches; autoButton.title=motion.matches?'Auto disabled by reduced-motion preference':'Cycle themes every 9 seconds'; applyTheme(activeTheme); scheduleTheme(); }
motion.addEventListener('change',respectMotion); document.addEventListener('visibilitychange',scheduleTheme); respectMotion();

const pauseButton = document.querySelector('.motion-toggle');
const ticker = document.querySelector('.ticker-track');
const group = document.createElement('div'); group.className='ticker-group';
while(ticker.firstChild) group.append(ticker.firstChild);
const duplicate=group.cloneNode(true); duplicate.setAttribute('aria-hidden','true');
ticker.append(group,duplicate);
let paused=false;
pauseButton.addEventListener('click',()=>{paused=!paused; themeRoot.classList.toggle('motion-paused',paused); pauseButton.setAttribute('aria-pressed',String(paused)); pauseButton.setAttribute('aria-label',paused?'Resume decorative motion':'Pause decorative motion'); pauseButton.textContent=paused?'▶':'Ⅱ'; if(paused){auto=false;applyTheme(activeTheme);saveTheme();scheduleTheme();}});

// The incoming page sits underneath while the outgoing page lifts from its spine.
const album = document.querySelector('.album');
const pages = [...album.querySelectorAll('.album-page')];
const turnCover = album.querySelector('.sleeve-hit');
const turnCaption = album.querySelector('.album-next');
const pagePosition = album.querySelector('.album-position');
let pageIndex = 0;
let activeTurn;

function finishAlbumTurn() {
  if (!activeTurn) return;
  const { animation, outgoing } = activeTurn;
  activeTurn = null;
  animation.onfinish = null;
  outgoing.hidden = true;
  outgoing.classList.remove('turning');
  outgoing.removeAttribute('aria-hidden');
  animation.cancel();
}

function turnAlbumPage() {
  // Commit the preceding turn before reusing either page on a rapid tap.
  finishAlbumTurn();
  const outgoing = pages[pageIndex];
  pageIndex = (pageIndex + 1) % pages.length;
  const incoming = pages[pageIndex];
  incoming.hidden = false;
  pagePosition.textContent = (pageIndex + 1) + ' / ' + pages.length + ' · ' + incoming.dataset.pageTitle;
  const action = pageIndex === 0 ? 'Flip cover' : pageIndex === pages.length - 1 ? 'Back to cover' : 'Flip page';
  turnCaption.firstChild.textContent = action + ' ';
  turnCover.setAttribute('aria-label', action + ' · ' + incoming.dataset.pageTitle);

  if (paused || motion.matches || !outgoing.animate) {
    outgoing.hidden = true;
    return;
  }
  outgoing.setAttribute('aria-hidden', 'true');
  outgoing.classList.add('turning');
  const animation = outgoing.animate([
    { transform: 'perspective(900px) rotateY(0deg)', filter: 'brightness(1)' },
    { transform: 'perspective(900px) rotateY(-48deg)', filter: 'brightness(.88)', offset: .58 },
    { transform: 'perspective(900px) rotateY(-94deg)', filter: 'brightness(.65)' }
  ], { duration: 600, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
  activeTurn = { animation, outgoing };
  animation.onfinish = finishAlbumTurn;
}
turnCover.hidden = false;
turnCaption.hidden = false;
turnCover.addEventListener('click', turnAlbumPage);
turnCaption.addEventListener('click', turnAlbumPage);
pauseButton.addEventListener('click', () => { if (paused) finishAlbumTurn(); });
motion.addEventListener('change', () => { if (motion.matches) finishAlbumTurn(); });
