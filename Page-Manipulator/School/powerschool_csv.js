// V11.13.2026
// Useful for https://docs.google.com/spreadsheets/d/1DoKdORl4rLTHS-SmeZf7L3-eYeqj1RXhQhfl5WQXWFA/edit?gid=1433644940#gid=1433644940
// Inspired by Nicholas Baldino's grade calculator.xlsx (https://pcti.instructure.com/courses/18206/files/8176154?module_item_id=1722603) and (https://docs.google.com/spreadsheets/d/1dgzstyOCx6S6d6ZpMN6mX9wLc23AyjpI/edit?gid=22007649#gid=22007649)
(() => {
  const container = document.getElementById('sps-assignment-categories-container');
  const heading = container?.querySelector('h2');
  const table = document.getElementById('sps-assignment-categories');

  if (!heading || !table || heading.querySelector('.copy-csv-btn')) return;

  Object.assign(heading.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  const copyIcon = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>`;

  const checkIcon = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-csv-btn';
  btn.title = 'Copy Assignment Categories for Google Sheets';
  btn.innerHTML = copyIcon;

  Object.assign(btn.style, {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    background: 'transparent',
    border: '1px solid currentColor',
    borderRadius: '4px',
    padding: '3px 6px',
    color: 'inherit',
    cursor: 'pointer',
    opacity: '0.75',
    fontSize: '12px',
    lineHeight: '1',
    transition: 'opacity 0.15s ease'
  });

  btn.addEventListener('mouseenter', () => (btn.style.opacity = '1'));
  btn.addEventListener('mouseleave', () => (btn.style.opacity = '0.75'));

  btn.addEventListener('click', async () => {
    const tsv = Array.from(table.querySelectorAll('tbody tr'))
      .filter(row => row.querySelector('td.cat-name'))
      .map(row =>
        Array.from(row.querySelectorAll('td'))
          .slice(0, 5) // Grabs Category, Weight, # Assignments, Points Possible, Points Earned
          .map(td => td.textContent.trim())
          .join('\t') // Tab-separated so Google Sheets splits into columns on paste
      )
      .join('\n');

    try {
      await navigator.clipboard.writeText(tsv);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = tsv;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }

    btn.innerHTML = `${checkIcon}<span style="color: #4ade80; font-weight: 600;">Copied</span>`;
    setTimeout(() => {
      btn.innerHTML = copyIcon;
    }, 1500);
    
    alert("Go to \"https://docs.google.com/spreadsheets/d/1DoKdORl4rLTHS-SmeZf7L3-eYeqj1RXhQhfl5WQXWFA/edit?gid=1433644940#gid=1433644940\" and paste your values in Cell B4!")
  });

  heading.appendChild(btn);
})();
