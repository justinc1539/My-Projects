// V11.10.2026
(function() {
  // 1. Clean up any existing instances
  const existingPicker = document.getElementById('unicodePickerModal');
  if (existingPicker) existingPicker.remove();
  const existingStyle = document.getElementById('unicodePickerStyles');
  if (existingStyle) existingStyle.remove();

  // 2. Comprehensive Symbol Dataset (Math, Greek, Logic, Geometry, Music)
  const symbols = [
    // Greek Letters
    { char: 'α', name: 'alpha' }, { char: 'β', name: 'beta' }, { char: 'γ', name: 'gamma' },
    { char: 'δ', name: 'delta' }, { char: 'ε', name: 'epsilon' }, { char: 'ζ', name: 'zeta' },
    { char: 'η', name: 'eta' }, { char: 'θ', name: 'theta' }, { char: 'π', name: 'pi' },
    { char: 'λ', name: 'lambda' }, { char: 'μ', name: 'mu' }, { char: 'σ', name: 'sigma' },
    { char: 'ρ', name: 'rho' }, { char: 'Δ', name: 'capital delta' }, { char: 'Φ', name: 'capital phi' },
    { char: 'Ω', name: 'capital omega' },

    // Math Operators & Calculus
    { char: '≠', name: 'not equal' }, { char: '±', name: 'plus minus' }, { char: '∓', name: 'minus plus' },
    { char: '×', name: 'multiply times' }, { char: '÷', name: 'divide' }, { char: '√', name: 'square root rad' },
    { char: 'ⁿ√', name: 'n-th root' }, { char: '∞', name: 'infinity' }, { char: '∫', name: 'integral' },
    { char: '∑', name: 'sum summation' }, { char: '∏', name: 'product' }, { char: '∂', name: 'partial derivative' },
    { char: '∇', name: 'nabla grad del' }, { char: '≈', name: 'approx equal' }, { char: '≡', name: 'identical equivalent' },
    { char: '∝', name: 'proportional' }, { char: '≤', name: 'less equal' }, { char: '≥', name: 'greater equal' },
    { char: '|x|', name: 'absolute value' }, { char: '⌊x⌋', name: 'floor' }, { char: '⌈x⌉', name: 'ceiling' },
    { char: 'log', name: 'logarithm' }, { char: 'lim', name: 'limit' },

    // Sets & Logic
    { char: '∩', name: 'intersection cap' }, { char: '∪', name: 'union cup' }, { char: '⊂', name: 'subset' },
    { char: '⊆', name: 'subset equal' }, { char: '⊄', name: 'not subset' }, { char: '∈', name: 'element in' },
    { char: '∉', name: 'not element' }, { char: '∅', name: 'empty set null phi' }, { char: '∀', name: 'for all' },
    { char: '∃', name: 'there exists' }, { char: '∄', name: 'there does not exist' }, { char: '∧', name: 'logical and' },
    { char: '∨', name: 'logical or' }, { char: '¬', name: 'not negation' },

    // Geometry & Vectors
    { char: '∠', name: 'angle' }, { char: '∡', name: 'measured angle' }, { char: '⊥', name: 'perpendicular' },
    { char: '║', name: 'parallel' }, { char: '≅', name: 'congruent' }, { char: '°', name: 'degree' },
    { char: '∴', name: 'therefore' }, { char: '∵', name: 'because' },

    // Arrows
    { char: '→', name: 'right arrow' }, { char: '←', name: 'left arrow' }, { char: '⇒', name: 'implies right arrow' },
    { char: '↔', name: 'left right arrow bidirectional' }, { char: '⇔', name: 'equivalent right left arrow' },

    // Music & Extra
    { char: '♩', name: 'quarter note' }, { char: '♪', name: 'eighth note' }, { char: '♫', name: 'beamed eighth notes' },
    { char: '♬', name: 'beamed sixteenth notes' }
  ];

  // 3. Inject Modal Styles matching your screenshots
  const style = document.createElement('style');
  style.id = 'unicodePickerStyles';
  style.textContent = `
    #unicodePickerModal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999999;
      width: 360px;
      max-height: 480px;
      background-color: #3e3e3e;
      border: 1px solid #555555;
      border-radius: 6px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
      font-family: Menlo, Monaco, "Courier New", monospace;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      user-select: none;
    }

    #unicodePickerModal.hidden {
      display: none !important;
    }

    .unicode-search-header {
      padding: 10px;
      background-color: #3e3e3e;
      border-bottom: 1px solid #4a4a4a;
    }

    .unicode-search-input {
      width: 100%;
      background-color: #ffffff;
      border: 1px solid #cccccc;
      border-radius: 3px;
      padding: 6px 8px 6px 28px;
      font-size: 14px;
      box-sizing: border-box;
      outline: none;
      color: #333333;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="%23888888" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>');
      background-repeat: no-repeat;
      background-position: 8px center;
    }

    .unicode-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
      padding: 12px;
      overflow-y: auto;
      max-height: 380px;
    }

    .unicode-item {
      position: relative;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 4px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #e0e0e0;
      cursor: pointer;
      transition: background-color 0.1s, border-color 0.1s;
    }

    .unicode-item:hover {
      background-color: #ffffff;
      color: #111111;
      border-color: #ffffff;
    }

    /* Tooltip styling matching screenshot */
    .unicode-item .tooltip {
      visibility: hidden;
      position: absolute;
      bottom: -32px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #e0e0e0;
      color: #222222;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 4px;
      white-space: nowrap;
      z-index: 10;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      pointer-events: none;
    }

    .unicode-item:hover .tooltip {
      visibility: visible;
    }
  `;
  document.head.appendChild(style);

  // 4. Inject Modal Elements
  const modal = document.createElement('div');
  modal.id = 'unicodePickerModal';
  modal.className = 'hidden';
  modal.innerHTML = `
    <div class="unicode-search-header">
      <input type="text" id="unicodeSearchInput" class="unicode-search-input" placeholder="Search Symbols" spellcheck="false" />
    </div>
    <div id="unicodeGrid" class="unicode-grid"></div>
  `;
  document.body.appendChild(modal);

  const searchInput = document.getElementById('unicodeSearchInput');
  const grid = document.getElementById('unicodeGrid');

  // 5. Render Symbols
  function renderSymbols(filter = '') {
    grid.innerHTML = '';
    const query = filter.toLowerCase().trim();

    symbols.forEach(sym => {
      if (!query || sym.name.toLowerCase().includes(query) || sym.char.includes(query)) {
        const item = document.createElement('div');
        item.className = 'unicode-item';
        item.innerHTML = `${sym.char}<span class="tooltip">${sym.name}</span>`;
        
        item.addEventListener('click', () => {
          if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
              // TODO: Append to current text
              const kbEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                bubbles: true,      // Allows the event to bubble up the DOM
                cancelable: true    // Allows event.preventDefault() to work
              });
            //   document.activeElement.dispatchEvent(kbEvent);
          } else {
              navigator.clipboard.writeText(sym.char);
          }
          modal.classList.add('hidden');
        });

        grid.appendChild(item);
      }
    });
  }

  // 6. Search Filter Listener
  searchInput.addEventListener('input', (e) => {
    renderSymbols(e.target.value);
  });

  // 7. Global Key Listener for Alt + \
  document.addEventListener('keydown', function(e) {
    if (e.altKey && (e.key === '\\' || e.code === 'Backslash')) {
      // Block event propagation completely
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const isHidden = modal.classList.contains('hidden');
      if (isHidden) {
        modal.classList.remove('hidden');
        renderSymbols();
        searchInput.value = '';
        setTimeout(() => searchInput.focus(), 50);
      } else {
        modal.classList.add('hidden');
      }
    } else if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  }, true); // Use Capture phase to intercept before page listeners

})();
