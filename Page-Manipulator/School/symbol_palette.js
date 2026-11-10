// V11.10.2026
let activeElement;

async function simulateTyping(text, delay = 120) {
  // 1. Target Google's search input (currently a textarea with name="q")
  // const input = document.querySelector('textarea[name="q"], input[name="q"]');
  const input = activeElement;
  if (!input) {
    console.error('Google search bar not found.');
    return;
  }

  input.focus();
  input.value = ''; // Clear existing text

  // 2. Loop through each character and trigger real input events
  for (const char of text) {
    input.value += char;

    // Fire keydown
    input.dispatchEvent(new KeyboardEvent('keydown', { key: char, bubbles: true }));

    // Fire input event (required for Google's live autocomplete dropdown to respond)
    input.dispatchEvent(new InputEvent('input', { data: char, bubbles: true, inputType: 'insertText' }));

    // Fire keyup
    input.dispatchEvent(new KeyboardEvent('keyup', { key: char, bubbles: true }));

    // Delay between keystrokes for realistic typing effect
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};

(function() {
  // 1. Clean up any existing instances
  const existingPicker = document.getElementById('unicodePickerModal');
  if (existingPicker) existingPicker.remove();
  const existingStyle = document.getElementById('unicodePickerStyles');
  if (existingStyle) existingStyle.remove();

  // 2. Comprehensive Symbol Dataset
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

  // 3. Inject Modal Styles (with active selection state)
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

    /* Selected state for mouse hover AND keyboard arrow navigation */
    .unicode-item:hover,
    .unicode-item.selected {
      background-color: #ffffff;
      color: #111111;
      border-color: #ffffff;
    }

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

    .unicode-item:hover .tooltip,
    .unicode-item.selected .tooltip {
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

  // State
  let currentMatches = [];
  let selectedIndex = 0;
  const GRID_COLS = 6;

  // 5. Update Highlighted Selection & Auto-Scroll
  function updateSelection(newIndex) {
    if (currentMatches.length === 0) return;

    // Clamp index bounds
    selectedIndex = Math.max(0, Math.min(newIndex, currentMatches.length - 1));

    const children = grid.children;
    for (let i = 0; i < children.length; i++) {
      if (i === selectedIndex) {
        children[i].classList.add('selected');
        children[i].scrollIntoView({ block: 'nearest' });
      } else {
        children[i].classList.remove('selected');
      }
    }
  }

  // 6. Select Character Action (Copy & Close)
  function selectCharacter(index) {
    if (index >= 0 && index < currentMatches.length) {
      if (['INPUT', 'TEXTAREA'].includes(activeElement.tagName)) {
          // TODO: Append to current text
           (async () => {
               simulateTyping(currentMatches[index].char);
           })();
      } else navigator.clipboard.writeText(currentMatches[index].char);
      modal.classList.add('hidden');
    }
  }

  // 7. Render Filtered Symbols
  function renderSymbols(filter = '') {
    grid.innerHTML = '';
    const query = filter.toLowerCase().trim();

    currentMatches = symbols.filter(sym => 
      !query || sym.name.toLowerCase().includes(query) || sym.char.includes(query)
    );

    currentMatches.forEach((sym, idx) => {
      const item = document.createElement('div');
      item.className = 'unicode-item';
      item.innerHTML = `${sym.char}<span class="tooltip">${sym.name}</span>`;

      item.addEventListener('mouseenter', () => {
        updateSelection(idx);
      });

      item.addEventListener('click', () => {
        selectCharacter(idx);
      });

      grid.appendChild(item);
    });

    // Default selection to first result
    updateSelection(0);
  }

  // Search Input Listener
  searchInput.addEventListener('input', (e) => {
    renderSymbols(e.target.value);
  });

  // 8. Global Interceptor (Capture Phase)
  document.addEventListener('keydown', function(e) {
    const isModalOpen = !modal.classList.contains('hidden');

    // Shortcut: Alt + \
    if (e.altKey && (e.key === '\\' || e.code === 'Backslash')) {
      activeElement = document.activeElement;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (!isModalOpen) {
        modal.classList.remove('hidden');
        renderSymbols();
        searchInput.value = '';
        setTimeout(() => searchInput.focus(), 50);
      } else {
        modal.classList.add('hidden');
      }
      return;
    }

    // Modal Active Controls
    if (isModalOpen) {
      // Prevent key events from reaching the background site while picker is open
      if (['Escape', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }

      if (e.key === 'Escape') {
        modal.classList.add('hidden');
      } else if (e.key === 'Enter') {
        selectCharacter(selectedIndex);
      } else if (e.key === 'ArrowRight') {
        updateSelection(selectedIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        updateSelection(selectedIndex - 1);
      } else if (e.key === 'ArrowDown') {
        updateSelection(selectedIndex + GRID_COLS);
      } else if (e.key === 'ArrowUp') {
        updateSelection(selectedIndex - GRID_COLS);
      }
    }
  }, true); // Use capture phase to intercept before site listeners

})();//TODO: call
