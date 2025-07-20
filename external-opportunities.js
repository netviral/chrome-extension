(() => {
  /*───────────────────────────────────
   *  CONFIG
   *───────────────────────────────────*/
  const MENU_SELECTOR   = 'ul.MuiList-root.MuiList-padding.css-1ontqvh';
  const ITEM_ID         = 'external-opportunities';
  const NAV_DIV_ID      = 'external-opportunities-nav';
  const CUSTOM_DIV_ID   = 'external-opps-root';
  const TARGET_URL      = '/students/external-opportunities';
  const SHEET_CSV_URL   = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT-6TJY5bC7z2EjjApxdRGN0qnrDKiVPpyvW_872mvgD73N7XOSHCYPYY4ms9g4UWYKJNvUcvcd86s8/pub?output=csv';
  const MAX_ATTEMPTS    = 20;

  let attempts = 0;
  let cachedOpps = null;   // cache CSV results so we fetch only once

  /*───────────────────────────────────
   *  CSV → JSON
   *───────────────────────────────────*/
  const parseCSV = (csvText) => {
    const rows = csvText
      .trim()
      .split(/\r?\n/)
      .map(r => r.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim()));

    const headers = rows.shift();
    return rows.filter(r => r.length === headers.length).map(r => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = r[i] || ''; });
      return obj;
    });
  };

  const fetchOpportunities = async () => {
    if (cachedOpps) return cachedOpps;
    try {
      const res  = await fetch(SHEET_CSV_URL);
      const text = await res.text();
      cachedOpps = parseCSV(text);
      return cachedOpps;
    } catch (err) {
      console.error('[ExtOpp] CSV fetch failed:', err);
      return [];
    }
  };

  /*───────────────────────────────────
   *  STYLING
   *───────────────────────────────────*/
  const injectStyles = () => {
    if (document.getElementById('extopp-styles')) return;
    const style = document.createElement('style');
    style.id = 'extopp-styles';
    style.textContent = `
      #${CUSTOM_DIV_ID}       { padding:2rem; font-family:system-ui,sans-serif; width:100%; }
      .extopp-card            { border:1px solid #ccc; border-radius:12px; padding:1.25rem 1.5rem;
                                margin-bottom:1.25rem; background:#f9f9f9;
                                box-shadow:0 2px 8px rgba(0,0,0,0.05); }
      .extopp-card h2         { font-size:1.1rem; margin:0 0 0.4rem; }
      .extopp-card p          { margin:0.25rem 0; font-size:0.92rem; color:#444; line-height:1.35; }
      .extopp-card a          { display:inline-block; margin-top:0.4rem; color:#0066cc; text-decoration:none;
                                font-weight:500; }
      .extopp-card a:hover    { text-decoration:underline; }
     

      .extopp-header {
  margin-bottom: 1rem;
}

.extopp-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.extopp-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid #ccc;
}

.poster-name {
  margin: 0;
  font-size: 0.95rem;
}


    `;
    document.head.appendChild(style);
  };

  /*───────────────────────────────────
   *  CARD RENDERING
   *───────────────────────────────────*/
  const renderCard = (opp) => {
  const card = document.createElement('div');
  card.className = 'extopp-card';

  const title     = opp['Job/Opportunity Title'] || 'Untitled Opportunity';
  const poster    = opp['Posted By (Name)'] || 'Unknown';
  const skills    = opp['Skills/Major Required'] || '—';
  const pay       = opp['Compensation Type'] || '—';
  const weeks     = opp['Duration (Number of Weeks)'] || '—';
  const wType     = opp['Work Type'] || '—';
  const start     = opp['Start Date'] || '?';
  const end       = opp['End Date'] || '?';
  const link      = opp['Please attach the relevant job description'] || '';
  const longDesc  = opp['Please attach the relevant job description'] || '';

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(poster)}&background=random&size=128&bold=true`;

  card.innerHTML = `
    <div class="extopp-header">
  <h2>${title}</h2>
  <div class="extopp-meta">
    <div class="extopp-avatar">
      <img src="${avatarUrl}" alt="Avatar of ${poster}" />
    </div>
    <p class="poster-name"><strong>Posted By:</strong> ${poster}</p>
  </div>
</div>


    <p><strong>Skills:</strong> ${skills}</p>
    <p><strong>Compensation:</strong> ${pay}</p>
    <p><strong>Work Type:</strong> ${wType}</p>
    <p><strong>Duration:</strong> ${weeks} weeks</p>
    <p><strong>Dates:</strong> ${start} → ${end}</p>

    ${longDesc ? `<p style="margin-top:0.75rem;"><strong>Description:</strong><br>${longDesc}</p>` : ''}
    ${link && !longDesc.includes('http') ? `<a href="${link}" target="_blank" rel="noopener">Learn more →</a>` : ''}
  `;

  return card;
};


  const populateOpportunities = async () => {
    const container = document.getElementById(CUSTOM_DIV_ID);
    if (!container) return;

    container.innerHTML = '<p>Loading opportunities…</p>';
    const opps = await fetchOpportunities();

    if (!opps.length) {
      container.innerHTML = '<p style="color:red;">No opportunities found.</p>';
      return;
    }

    container.innerHTML = '';
    opps.forEach(o => container.appendChild(renderCard(o)));
  };

  /*───────────────────────────────────
   *  SHOW / HIDE CUSTOM DIV
   *───────────────────────────────────*/
  const showCustomDiv = () => {
    const main = document.querySelector('main');
    const mainChild = main?.firstElementChild;
    if (mainChild) mainChild.style.display = 'none';

    let customDiv = document.getElementById(CUSTOM_DIV_ID);
    if (!customDiv) {
      customDiv = document.createElement('div');
      customDiv.id = CUSTOM_DIV_ID;
      main.appendChild(customDiv);
      injectStyles();
    }
    customDiv.style.display = 'block';
    populateOpportunities();
  };

  const hideCustomDiv = () => {
    const main = document.querySelector('main');
    const mainChild = main?.firstElementChild;
    if (mainChild) mainChild.style.display = 'block';

    const customDiv = document.getElementById(CUSTOM_DIV_ID);
    if (customDiv) customDiv.style.display = 'none';
  };

  /*───────────────────────────────────
   *  NAV STATE HELPERS
   *───────────────────────────────────*/
  const updateActiveFromUrl = () => {
    document
      .querySelectorAll(`${MENU_SELECTOR} .MuiListItemIcon-root`)
      .forEach(div => div.classList.remove('active'));

    const navDiv = document.getElementById(NAV_DIV_ID);
    if (navDiv && window.location.pathname === TARGET_URL) {
      navDiv.classList.add('active');
      showCustomDiv();
    } else {
      hideCustomDiv();
    }
  };

  const updateActiveOnClick = (clickedLi) => {
    document
      .querySelectorAll(`${MENU_SELECTOR} li .MuiListItemIcon-root`)
      .forEach(div => div.classList.remove('active'));

    clickedLi.querySelector('.MuiListItemIcon-root')?.classList.add('active');
    hideCustomDiv();                       // Hide when navigating elsewhere
  };

  const attachClickListeners = () => {
    document.querySelectorAll(`${MENU_SELECTOR} li`).forEach(li => {
      if (!li.hasAttribute('data-active-watcher')) {
        li.addEventListener('click', () => updateActiveOnClick(li));
        li.setAttribute('data-active-watcher', 'true');
      }
    });
  };

  /*───────────────────────────────────
   *  SIDEBAR INJECTION
   *───────────────────────────────────*/
  const injectSidebarItem = (menu) => {
    if (document.getElementById(ITEM_ID)) return;

    const li = document.createElement('li');
    li.id = ITEM_ID;
    li.className = 'MuiListItem-root MuiListItem-gutters MuiListItem-padding css-8s6ur9';
    li.innerHTML = `
      <div id="${NAV_DIV_ID}" class="MuiListItemIcon-root css-harqlm" style="cursor:pointer">
        <i class="fi fi-rr-globe text-base"></i>
        <p class="!text-center !text-xs !max-w-[75px] !break-words !pt-0.5 text-dark">
          External Opportunities
        </p>
      </div>
    `;
    li.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = TARGET_URL;   // hard‑reload for reliability
    });

    menu.children.length >= 2
      ? menu.insertBefore(li, menu.children[2])  // 3rd item
      : menu.appendChild(li);

    attachClickListeners();
    updateActiveFromUrl();
  };

  /*───────────────────────────────────
   *  BOOTSTRAP
   *───────────────────────────────────*/
  const waitForSidebar = () => {
    const menu = document.querySelector(MENU_SELECTOR);
    if (menu) {
      injectSidebarItem(menu);
    } else if (++attempts < MAX_ATTEMPTS) {
      setTimeout(waitForSidebar, 500);
    } else {
      console.warn('[ExtOpp] Sidebar not found.');
    }
  };

  window.addEventListener('DOMContentLoaded', updateActiveFromUrl);
  waitForSidebar();
})();
