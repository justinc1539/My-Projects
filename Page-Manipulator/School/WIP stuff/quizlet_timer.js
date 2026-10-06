// Active websites: all
alert(2)
// https://quizlet.com/477037701/quizlet-match-timer-cheat-flash-cards/

url = window.location.href
if (/^https:\/\/quizlet\.com\/\d+\/match?(?:\?.*)?$/.test(url)) {
    alert(123)
        document.querySelectorAll('*').forEach(el => {
          if (el.textContent.trim() === "Start game") {
            el.click();
            // setTimeout(() => alert(1), 100)
          }
        });
}

// setInterval(() => {
//     alert(1)
//     try {
        
//     } catch (error) {
//         alert(`ERROR!!! ${error}`)
//     }
// }, 10); //Change 5100

// setTimeout(() => {
//     while (true) {
//         for (var F = setTimeout(";"), i = 0; i < F; i++) {
//             // alert(i)
//             clearTimeout(i)
//         }
//     }
// }, 500);

    setInterval(() => {
        const spanByRole = document.querySelector('a[role="link"] > span');
        if (spanByRole) {
            spanByRole.innerHTML = 0.0;
        }
    }, 1000);
    const adjustment = 200; // Lower = faster, higher = safer
    (async () => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      const urlParts = url.split('/');

      // Remove the last non-empty segment (e.g., "match")
      if (urlParts[urlParts.length - 1] === '') {
        urlParts.pop(); // remove trailing slash
      }
      urlParts.pop(); // remove last segment

      const targetUrl = urlParts.join('/');
      console.log('Target URL:', targetUrl);
    
      try {
        const response = await fetch(targetUrl, {
          credentials: 'include',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
    
        if (!response.ok) {
          error = `HTTP error! Status: ${response.status}`;
          alert(error)
          throw new Error(error);
          return;
        }
    
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
    
        // Extract terms from <span class="TermText notranslate lang-en">
        // const termSpans = [...doc.querySelectorAll('span.TermText.notranslate.lang-en')];
        const termSpans = [...doc.querySelectorAll('span.TermText')];
        const rawTerms = termSpans.map(span => span.textContent.trim());
    
        // Build dictionary: odd-indexed terms as keys, even-indexed as values
        const termDict = {};
        for (let i = 0; i < rawTerms.length - 1; i += 2) {
          termDict[rawTerms[i]] = rawTerms[i + 1];
        }
            // let termOutput = '📘 Term Dictionary:\n\n';
            // for (const [key, value] of Object.entries(termDict)) {
            //   termOutput += `• ${key} → ${value}\n`;
            // }
            // alert(termOutput);
        // Reverse dictionary for bidirectional matching
        const reverseDict = {};
        for (const [key, value] of Object.entries(termDict)) {
          reverseDict[value] = key;
        }
            // let reverseOutput = '🔁 Reverse Dictionary:\n\n';
            // for (const [key, value] of Object.entries(reverseDict)) {
            //   reverseOutput += `• ${key} → ${value}\n`;
            // }
            // alert(reverseOutput);

        // Start game
        document.querySelectorAll('*').forEach(el => {
          if (el.textContent.trim() === "Start game") {
            el.click();
            // setTimeout(() => alert(1), 100)
            setTimeout(() => {
                for (var F = setTimeout(";"), i = 0; i < F; i++) {
            // alert(i)
            clearTimeout(i)
        }
            }
          }
        });

    
        // Begin matching loop
        while (true) {
        //   const tiles = [...document.querySelectorAll('div.FormattedText.notranslate.lang-en')];
          const tiles = [...document.querySelectorAll('div.FormattedText')];
          const tileMap = new Map();
        
          tiles.forEach(div => {
            const text = div.textContent.trim();
            tileMap.set(text, div);
          });
        
          for (const div of tiles) {
            // TODO: Have it work for image stuff too (e.g. https://quizlet.com/1103923485/match)
            const text = div.getAttribute("aria-label");
            const matchText = termDict[text] || reverseDict[text];
        
            if (matchText) {
              const matchDiv = tiles.find(other => {
                const label = other.getAttribute("aria-label")//?.replace(/\n/g, "");
                return label === matchText;
              });
        
              if (matchDiv && matchDiv !== div) {
                div.click();
                await sleep(adjustment*0); // wait before clicking the second tile
                matchDiv.click();
                await sleep(adjustment); // wait before next pair
              }
            }
          }
        
          await sleep(adjustment); // small delay before next full scan
        //   if (tiles.length <= 0) break;
        }
        // setTimeout(() => location.reload(), 3000);
      } catch (err) {
        alert('Failed to fetch or parse: ' + err.message);
      }
    })();