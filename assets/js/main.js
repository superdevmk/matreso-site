/* MATRESO.MK — Main JS (MAREKO template) */
(function () {
  'use strict';

  const SITE = {
    name: 'МАТРЕСО',
    fullName: 'Macedonian Textile Recycling Solutions',
    legalName: 'МАТРЕСО ДОО Скопје',
    domain: 'matreso.mk',
    email: 'info@matreso.mk',
    phone: '070 307 976',
    phoneTel: '+38970307976',
    themeColor: '#1b4b7a',
    logo: 'assets/images/matreso-logo.png',
    priceList: 'assets/docs/MATRESO-CENOVNIK-2026.pdf',
    address: 'Бул. Кузман Јосифовски-Питу бр.1/1 кат, Скопје, Македонија',
    mapLat: 41.9913,
    mapLng: 21.4459,
    tagline: 'Macedonian Textile Recycling Solutions',
    intro:
      'МАТРЕСО обезбедува колективно управување со отпаден текстил согласно законските прописи за управување со дополнителни текови на отпад во Република Северна Македонија.',
  };

  const NAV_ITEMS = [
    { href: 'index.html', label: 'Дома', id: 'home' },
    { href: 'za-nas.html', label: 'За нас', id: 'about' },
    { href: 'kontakt.html', label: 'Контакт', id: 'contact' },
    { href: 'zachlenuvanje.html', label: 'Зачленување', id: 'membership' },
    { href: 'dokumenti.html', label: 'Документи', id: 'documents' },
    { href: 'partneri.html', label: 'Партнери', id: 'partners' },
  ];

  const SEARCH_INDEX = [
    { title: 'Дома', url: 'index.html', keywords: 'дoma matreso почетна текстил' },
    { title: 'За нас', url: 'za-nas.html', keywords: 'профил мисија матreso' },
    { title: 'Контакт', url: 'kontakt.html', keywords: `адреса email телефон ${SITE.email}` },
    { title: 'Зачленување', url: 'zachlenuvanje.html', keywords: 'регистрација членство производител' },
    { title: 'Документи', url: 'dokumenti.html', keywords: 'pdf постапка ценовник текстил договор' },
    { title: 'Партнери', url: 'partneri.html', keywords: 'производители договорени' },
    { title: 'Ценовник 2026', url: SITE.priceList, keywords: 'ценовник 2026 цена колектив' },
  ];

  const PARTNERS = [];

  const DOCUMENTS = [
    {
      file: 'assets/docs/POSTAPKA-MATRESO-2025.pdf',
      title:
        'Начин и постапка за избор на правно или физичко лице за собирање, транспорт, складирање и/или преработка на отпаден текстил – 2025 година',
      type: 'PDF',
    },
    {
      file: 'assets/docs/Matreso-postapka-2024.pdf',
      title:
        'Начин и постапка за избор на правно или физичко лице за собирање, транспорт, складирање и/или преработка на отпаден текстил – 2024 година',
      type: 'PDF',
    },
    {
      file: 'assets/docs/Cenovnik-Matreso.pdf',
      title: 'Ценовник за колективно постапување МАТРЕСО',
      type: 'PDF',
    },
    {
      file: 'assets/docs/RASKINUVANJE-MATRESO.pdf',
      title: 'Раскинати договори од МАТРЕСО ДОО',
      type: 'PDF',
    },
  ];

  const currentPage = document.body.dataset.page || '';

  function buildNavLink(item) {
    const active = currentPage === item.id ? ' active' : '';
    return `<a href="${item.href}" class="nav-link${active}">${item.label}</a>`;
  }

  function buildLogo(className) {
    const cls = className ? ` logo ${className}` : ' logo';
    return `<a href="index.html" class="${cls.trim()}" aria-label="${SITE.name} – ${SITE.fullName}">
      <img src="${SITE.logo}" alt="${SITE.name} – ${SITE.fullName}" class="logo-img" width="320" height="80">
    </a>`;
  }

  function injectHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    header.innerHTML = `
      <div class="site-top">
        <div class="logo-area">
          ${buildLogo('')}
        </div>
        <div class="main-nav-wrap">
          <div class="main-nav-inner">
            <nav class="main-nav" aria-label="Главна навигација">
              ${NAV_ITEMS.map((item) => buildNavLink(item)).join('')}
            </nav>
            <div class="nav-actions">
              <button class="search-toggle" aria-label="Пребарај" id="search-toggle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
              <button class="menu-toggle" aria-label="Мени" id="menu-toggle" aria-expanded="false">
                <div class="hamburger"><span></span><span></span><span></span></div>
              </button>
            </div>
          </div>
          <nav class="mobile-nav" id="mobile-nav" aria-label="Мобилна навигација">
            ${NAV_ITEMS.map((item) => buildNavLink(item)).join('')}
          </nav>
        </div>
      </div>
    `;

    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.id = 'search-overlay';
    searchOverlay.innerHTML = `
      <button class="search-close" id="search-close" aria-label="Затвори">✕</button>
      <input type="search" id="search-input" placeholder="Барај..." autocomplete="off" aria-label="Пrebарување">
      <div class="search-results" id="search-results"></div>
    `;
    document.body.appendChild(searchOverlay);
  }

  function injectFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="footer-accent" aria-hidden="true"></div>
      <div class="footer-inner">
        <nav class="footer-links" aria-label="Подножје навигација">
          ${NAV_ITEMS.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
        </nav>
        <span class="footer-copy">Copyright © ${new Date().getFullYear()}. ${SITE.name}.</span>
      </div>
    `;
  }

  function initNavShimmer() {
    const navWrap = document.querySelector('.main-nav-wrap');
    if (!navWrap) return;
    navWrap.classList.add('nav-shimmer');
    setTimeout(() => navWrap.classList.remove('nav-shimmer'), 2000);
  }

  function injectSidebar() {
    const sidebar = document.getElementById('sidebar-nav');
    if (!sidebar) return;
    sidebar.innerHTML = NAV_ITEMS.map((item) => {
      const active = currentPage === item.id ? ' active' : '';
      return `<a href="${item.href}" class="${active.trim()}">${item.label}</a>`;
    }).join('');
  }

  function initMobileNav() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('mobile-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initSearch() {
    const toggle = document.getElementById('search-toggle');
    const overlay = document.getElementById('search-overlay');
    const close = document.getElementById('search-close');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    if (!toggle || !overlay || !input || !results) return;

    function openSearch() {
      overlay.classList.add('open');
      input.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
      overlay.classList.remove('open');
      input.value = '';
      results.innerHTML = '';
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openSearch);
    close.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        results.innerHTML = '';
        return;
      }
      const matches = SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.keywords.toLowerCase().includes(q)
      );
      results.innerHTML = matches.length
        ? matches.map((m) => `<a href="${m.url}">${m.title}</a>`).join('')
        : '<p style="color:var(--text-light);padding:1rem">Нема резултати.</p>';
    });
  }

  function initFontSize() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.font-size-btn');
      if (!btn) return;
      document.querySelectorAll('.font-size-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const sizes = { sm: '14px', md: '16px', lg: '18px' };
      document.documentElement.style.setProperty('--font-base', sizes[btn.dataset.size] || '16px');
    });
  }

  function initSlider() {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    const caption = document.getElementById('hero-caption');
    const prev = document.getElementById('slider-prev');
    const next = document.getElementById('slider-next');
    let current = 0;
    let timer;

    function updateCaption(index) {
      if (!caption) return;
      const text = slides[index].dataset.caption || '';
      caption.classList.remove('visible');
      setTimeout(() => {
        caption.textContent = text;
        if (text) caption.classList.add('visible');
      }, 180);
    }

    function goTo(index) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
      updateCaption(current);
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    function startAuto() {
      timer = setInterval(nextSlide, 6000);
    }

    function resetAuto() {
      clearInterval(timer);
      startAuto();
    }

    if (prev) prev.addEventListener('click', () => { prevSlide(); resetAuto(); });
    if (next) next.addEventListener('click', () => { nextSlide(); resetAuto(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    });

    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
        resetAuto();
      }
    }, { passive: true });

    startAuto();
    updateCaption(0);
  }

  function initFadeUp() {
    const elements = document.querySelectorAll('.fade-up:not(.visible)');
    elements.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 0.08, 0.56)}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
  }

  function initPageTransition() {
    document.body.classList.add('page-enter');
    requestAnimationFrame(() => {
      document.body.classList.add('page-enter-active');
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.target === '_blank' ||
        href.includes('://') ||
        /\.pdf$/i.test(href)
      ) {
        return;
      }

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const resolved = new URL(href, window.location.href);
      if (resolved.origin !== window.location.origin) return;

      e.preventDefault();
      document.body.classList.add('page-leaving');
      setTimeout(() => {
        window.location.href = resolved.pathname + resolved.search + resolved.hash;
      }, 280);
    });
  }

  function extractDocYear(doc) {
    const fromTitle = doc.title.match(/20\d{2}/);
    if (fromTitle) return fromTitle[0];
    const fromFile = doc.file.match(/20\d{2}/);
    return fromFile ? fromFile[0] : null;
  }

  function extractPartnerCity(name) {
    const cities = ['Скопје', 'Куманово', 'Охрид', 'Штип', 'Битола', 'Прилеп'];
    for (const city of cities) {
      if (name.includes(city)) return city;
    }
    return null;
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) return;

      const subject = encodeURIComponent(`Контакт од ${SITE.domain} – ${name}`);
      const body = encodeURIComponent(`Име: ${name}\nЕ-пошта: ${email}\n\n${message}`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;

      const success = document.getElementById('form-success');
      if (success) success.classList.add('show');
    });
  }

  function renderDocuments() {
    const container = document.getElementById('doc-list');
    if (!container) return;

    container.innerHTML = DOCUMENTS.map(
      (doc) => {
        const year = extractDocYear(doc);
        const yearTag = year ? `<span class="doc-year">${year}</span>` : '';
        return `
        <a href="${doc.file}" class="doc-item fade-up" target="_blank" rel="noopener">
          <span class="doc-stripe" aria-hidden="true"></span>
          <div class="doc-icon">${doc.type}</div>
          <div class="doc-info">
            ${yearTag ? `<div class="doc-meta">${yearTag}</div>` : ''}
            <h3>${doc.title}</h3>
          </div>
          <span class="doc-download" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>
          </span>
        </a>
      `;
      }
    ).join('');

    initFadeUp();
  }

  function renderPartners() {
    const container = document.getElementById('partners-list');
    if (!container) return;

    if (!PARTNERS.length) {
      container.innerHTML = `
        <div class="contact-box fade-up">
          <div class="contact-box-header">Партнери</div>
          <div class="contact-box-body">
            <p>Листата на договорени производители ќе биде објавена наскoro. За информации, контактирајте не на <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
          </div>
        </div>
      `;
      initFadeUp();
      return;
    }

    container.innerHTML = `
      <div class="partners-table-wrap fade-up">
        <table class="partners-table">
          <thead>
            <tr>
              <th class="num-col">Бр.</th>
              <th>Договорен производител</th>
            </tr>
          </thead>
          <tbody>
            ${PARTNERS.map(
              (p, i) => {
                const city = extractPartnerCity(p.name);
                const cityChip = city ? `<span class="city-chip">${city}</span>` : '';
                return `
                <tr>
                  <td class="num-col">${i + 1}</td>
                  <td>
                    <div class="partner-name-cell">
                      <span>${p.name}</span>
                      ${cityChip}
                    </div>
                  </td>
                </tr>
              `;
              }
            ).join('')}
          </tbody>
        </table>
      </div>
    `;

    initFadeUp();
  }

  function initBackToTop() {
    if (document.getElementById('back-to-top')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Назад на врв');
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>
      </svg>
    `;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(btn);

    function toggleBtn() {
      btn.classList.toggle('visible', window.scrollY > 320);
    }

    window.addEventListener('scroll', toggleBtn, { passive: true });
    toggleBtn();
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    injectSidebar();
    initNavShimmer();
    initPageTransition();
    initMobileNav();
    initSearch();
    initFontSize();
    initSlider();
    initFadeUp();
    initContactForm();
    renderDocuments();
    renderPartners();
    initBackToTop();
  });
})();
