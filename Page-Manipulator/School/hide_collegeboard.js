// V10.23.2026
// Active Websites: All
const allCorrect = [
    [],
    [
        [], []
    ],
    [],
    [],
    [],
    [],
    []
];
const allGuess = [
    [],
    [],
    []
];

function isDeeplyEmpty(arr) {
  // If the item isn't an array, it shouldn't be here (means there is data inside)
  if (!Array.isArray(arr)) {
    return false;
  }
  
  // Check if every single item in this array passes the same emptiness test
  return arr.every(item => isDeeplyEmpty(item));
}

document.addEventListener('keydown', (event) => {
    if (event.key === "x") {
        if (event.ctrlKey) {
            if (isDeeplyEmpty(allCorrect)) {
                // Deselect current answer
                document.querySelectorAll(".letter.--chosen").forEach(letter => {
                    allCorrect[0].push([
                        letter,
                        letter.className
                    ]);
                    letter.className = "letter";
                });

                // For Undo feature
                document.querySelectorAll(".AccessibilityWrapper.mcq-option.--incorrect").forEach(option => {
                    allCorrect[1][0].push(option);
                });
                // Auto select correct answer
                document.querySelectorAll(".AccessibilityWrapper.mcq-option").forEach(option => {
                    if (!option.className.includes("--correct") && option.querySelector(".response-analysis-wrapper").querySelector(".icon.--correct")) {
                        option.click();
                    }
                });
                document.querySelectorAll(".AccessibilityWrapper.mcq-option.--correct").forEach(letter => {
                    allCorrect[1][1].push([
                        letter.querySelector(".letter"),
                        letter.querySelector(".letter").className
                    ]);
                    letter.querySelector(".letter").className = "letter --chosen";
                });
                
                // Move percentage line to the very right
                allCorrect[2] = [
                    document.querySelector(".percentage-line.percentage-line__right"),
                    document.querySelector(".percentage-line.percentage-line__right").style.marginRight
                ];
                document.querySelector(".percentage-line.percentage-line__right").style.marginRight= "0%";
                
                // Set score to max
                document.querySelectorAll(".flex.items-center.h-8.dark.performance-score").forEach(score => {
                    allCorrect[3].push([
                        score,
                        score.textContent
                    ]);
                    score.textContent = `${score.textContent.split("/")[1]}/${score.textContent.split("/")[1]}`;
                })
                
                // Change all responses to correct
                document.querySelectorAll(".font-normal.text-default.text-red-500").forEach(s => {
                    allCorrect[4].push([
                        s,
                        s.textContent,
                        s.className
                    ]);
                    s.textContent = "1/1";
                    s.className = ".font-normal text-default text-green-500"
                });
                document.querySelectorAll(".x-mark-big").forEach(mark => {
                    allCorrect[5].push([
                        mark,
                        mark.className
                    ]);
                    mark.className = "v-mark-big";
                });
                allCorrect[6] = [
                    document.querySelector('span[data-test-performance-icon-score="true"]'),
                    document.querySelector('span[data-test-performance-icon-score="true"]').textContent
                ];
                document.querySelector('span[data-test-performance-icon-score="true"]').textContent = "1/1";
            } else {
                // Select current answer
                allCorrect[0].forEach(letter => {
                    letter[0].className = letter[1];
                });
                
                // Auto deselect correct answer
                allCorrect[1][0].forEach(option => {
                    option.click();
                });
                allCorrect[1][1].forEach(letter => {
                    letter[0].className = letter[1];
                });
                
                // Move percentage line back
                allCorrect[2][0].style.marginRight = allCorrect[2][1];
                
                // Reverse
                allCorrect[3].forEach(score => {
                    score[0].textContent = score[1];
                })
                
                // Change all responses to original
                allCorrect[4].forEach(s => {
                    s[0].textContent = s[1];
                    s[0].className = s[2];
                });
                allCorrect[5].forEach(mark => {
                    mark[0].className = mark[1];
                });
                allCorrect[6][0].textContent = allCorrect[6][1];
                for (let i = 0; i < allCorrect.length; i++) {
                    if (i === 1) {
                        allCorrect[i][0].length = 0;
                        allCorrect[i][1].length = 0;
                    } else {
                        allCorrect[i].length = 0;
                    }
                }
            }
        } else if (event.altKey) {
            if (isDeeplyEmpty(allGuess)) {
                document.querySelectorAll(".letter.--chosen").forEach(letter => {
                    allGuess[0].push([
                        letter,
                        letter.className
                    ]);
                    letter.className = "letter";
                });
                document.querySelectorAll(".icon.--correct").forEach(icon => {
                    allGuess[1].push([
                        icon,
                        icon.className
                    ]);
                    icon.className = "icon";
                });
                document.querySelectorAll("AccessibilityWrapper.mcq-option.--correct").forEach(option => {
                    allGuess[2].push([
                        option,
                        option.className
                    ]);
                    option.className = "AccessibilityWrapper mcq-option";
                });
            } else {
                allGuess[0].forEach(letter => {
                    letter[0].className = letter[1];
                });
                allGuess[1].forEach(icon => {
                    icon[0].className = icon[1];
                });
                allGuess[2].forEach(option => {
                    option[0].className = option[1];
                });
                for (let i = 0; i < allGuess.length; i++) {
                    allGuess[i].length = 0;
                }
            }
        }
    }
}, true);
