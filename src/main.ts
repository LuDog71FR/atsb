import { marked } from 'marked';

interface NavLink {
  text: string;
  pageKey: string; // e.g. "actus/index"
}

const MARKDOWN_BASE = 'markdown/';
const DEFAULT_PAGE = 'accueil';

function pageKeyToPath(key: string): string {
  return `${MARKDOWN_BASE}${key}.md`;
}

function currentDir(pageKey: string): string {
  const parts = pageKey.split('/');
  return parts.length > 1 ? parts.slice(0, -1).join('/') : '';
}

function resolveRelativePath(href: string, dir: string): string {
  if (!dir) return href.replace(/\.md$/, '');
  return `${dir}/${href}`.replace(/\.md$/, '');
}

function rewriteLinks(html: string, pageKey: string): string {
  const dir = currentDir(pageKey);
  return html.replace(/href="([^"]+)"/g, (match, href: string) => {
    // External links — leave unchanged
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
      return match;
    }
    // Markdown links — rewrite to hash navigation
    if (href.endsWith('.md')) {
      const resolved = resolveRelativePath(href, dir);
      return `href="#${resolved}"`;
    }
    // Other links (anchors, etc.) — leave unchanged
    return match;
  });
}

async function loadPage(pageKey: string): Promise<void> {
  const contentEl = document.getElementById('content')!;
  const contentArea = document.getElementById('content-area')!;

  try {
    const response = await fetch(pageKeyToPath(pageKey));
    if (!response.ok) {
      contentEl.innerHTML = `<p class="text-red-600">Page introuvable : <code>${pageKey}</code></p>`;
      return;
    }
    const text = await response.text();
    const rawHtml = await marked.parse(text);
    const html = rewriteLinks(rawHtml, pageKey);
    contentEl.innerHTML = html;
    contentArea.scrollTop = 0;
    updateActiveLink(pageKey);
  } catch (err) {
    contentEl.innerHTML = `<p class="text-red-600">Erreur lors du chargement de la page.</p>`;
    console.error(err);
  }
}

async function buildMenu(): Promise<void> {
  const navEl = document.getElementById('nav-menu')!;

  try {
    const response = await fetch(`${MARKDOWN_BASE}menu.md`);
    if (!response.ok) throw new Error('menu.md not found');
    const text = await response.text();
    const rawHtml = await marked.parse(text);

    // Parse the rendered HTML to extract links
    const tmp = document.createElement('div');
    tmp.innerHTML = rawHtml;
    const anchors = tmp.querySelectorAll('a');

    const links: NavLink[] = [];
    anchors.forEach((a) => {
      const href = a.getAttribute('href') ?? '';
      if (href.endsWith('.md')) {
        const pageKey = href.replace(/\.md$/, '');
        links.push({ text: a.textContent ?? pageKey, pageKey });
      }
    });

    navEl.innerHTML = links
      .map(
        (link) =>
          `<a href="#${link.pageKey}"
              data-page="${link.pageKey}"
              class="block px-3 py-2 rounded text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors mb-1">
            ${link.text}
          </a>`
      )
      .join('');
  } catch (err) {
    navEl.innerHTML = '<p class="text-red-400 px-3 text-xs">Erreur menu</p>';
    console.error(err);
  }
}

function updateActiveLink(pageKey: string): void {
  const navEl = document.getElementById('nav-menu')!;
  navEl.querySelectorAll('a').forEach((a) => {
    if (a.getAttribute('data-page') === pageKey) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

function getPageKeyFromHash(): string {
  const hash = window.location.hash.slice(1); // remove '#'
  return hash || DEFAULT_PAGE;
}

async function init(): Promise<void> {
  await buildMenu();
  await loadPage(getPageKeyFromHash());

  window.addEventListener('hashchange', () => {
    loadPage(getPageKeyFromHash());
  });
}

init();
