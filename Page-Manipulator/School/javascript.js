// V10.29.2026
// Active Websites: All

try {
// SET ACTIVE WEBSITES TO ALL
// https://copilot.microsoft.com/chats/WtPeNsm5rvHac4qFa4hKX
// Search + Shift + P to toggle the touchpad and Search + Shift + T to toggle the touchscreen
if (document.title.toLowerCase().includes("edpuzzle")) {
    alert("You can watch the EdPuzzle video in the background using split screen!");
}
const url = window.location.href;

function copyText(text, display=true) {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (display) alert("Text copied to clipboard!");
      })
      .catch(err => {
        if (display) alert("Failed to copy:", err);
      });
}

function displayDict(dict, delimiter=": ", sep="\n") {
    let output = '';
    for (const [key, value] of Object.entries(dict)) {
      output += `${key}${delimiter}${value}${sep}`;
    }
    alert(output);
}

function showPopup(message) {
    // Create popup element
    const popup = document.createElement("div");
    popup.textContent = message;

    // Style it
    Object.assign(popup.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "20px 30px",
        borderRadius: "10px",
        fontSize: "18px",
        zIndex: 2147483646,
        opacity: 0,
        transition: "opacity 0.3s ease"
    });

    // Add to page
    document.body.appendChild(popup);

    // Fade in
    requestAnimationFrame(() => {
        popup.style.opacity = 1;
    });

    // Remove after 3 seconds
    setTimeout(() => {
        popup.style.opacity = 0;
        setTimeout(() => popup.remove(), 300); // wait for fade-out
    }, 3000);
}

function main() {
try {
// Fill in empty Canvas Refined Custom Tasks
// <span style="color:#cccccc;font-size:12px;margin-top:-2px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;box-sizing:border-box;padding-right:22px;">
setInterval(() => {
    document.querySelectorAll('span[style="color:#cccccc;font-size:12px;margin-top:-2px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;box-sizing:border-box;padding-right:22px;"]').forEach(ele => {
        ele.innerHTML = "<span style='color:black'>Custom Task</span>";
    });
}, 1);
// URL LOGIC VVV
if (url.match(/^https:\/\/example\.com\/?(?:\?.*)?$/)) {
    document.documentElement.innerHTML = "";
} else if (url.includes("knowt.com/study/flashcards/64c815cf-e945-4c2e-89a0-69c5347fcbc5/learn")) {
const text = document.querySelector(".ProseMirror").innerText;
const box = document.querySelector('.new_bodyS.MuiBox-root.knowt-qr172j');

// Fill out answer
Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    "value"
).set.call(box, text);
box.dispatchEvent(new Event("input", { bubbles: true }));

// Click buttons
[...document.querySelectorAll("button")].find(
    btn => btn.innerText.trim() === "Answer"
)?.click();
[...document.querySelectorAll("button")].find(
    btn => btn.innerText.trim().startsWith("Next")
)?.click();
} else if (url.startsWith("https://codehs.com/student") && url.includes("/assignment/")) {
    // localStorage.setItem("SnVzdGluJ3MgS2V5", ""); // Reset code
    const codeHSAPI = "TWFkZSBieSBKdXN0aW4gQ2h1YQ==";
    const fakeOne = "bG9s";
    const fakeTwo = "dHMgc28gZmFrZSBsb2w=";
    if (localStorage.getItem("SnVzdGluJ3MgS2V5") === codeHSAPI) {
        const solution = window.pageSpecific.solution;
        
        function decodeEscapedString(str) {
            // Step 1: convert \uXXXX → actual characters
            const unicodeDecoded = str.replace(/\\u([\dA-F]{4})/gi, (_, code) =>
                String.fromCharCode(parseInt(code, 16))
            );
        
            // Step 2: decode HTML entities (&quot;, &lt;, &gt;, etc.)
            const textarea = document.createElement("textarea");
            textarea.innerHTML = unicodeDecoded;
            return textarea.value;
        }
        
        readableCode = decodeEscapedString(solution);
        
        const editor = ace.edit(document.querySelector(".ace_editor"));
        const existingReadable = editor.getValue();
        const session = editor.getSession();
        function checkAviary(codeHSAPI) {
            successBtn.style.display = "";
            failureBtn.style.display = "";
            // 1. Create the button
            successBtn.textContent = "Add solution to the end of editor";
            failureBtn.textContent = "Replace entire code in editor with solution";
            
            // 3. Add a click listener
            successBtn.addEventListener("click", () => {
                setTimeout(() => {successBtn.style.display = "none";}, 5000);
                successBtn.innerHTML = "If you don't see the code, please save and refresh, or press enter at the bottom of the code a few times.";
                btn.style.display = "none";
                failureBtn.style.display = "none";
                cancelBtn.style.display = "none";
                // Append text using Ace API
                session.insert({
                    row: session.getLength(),
                    column: 0
                }, "\n" + readableCode);
            });
            failureBtn.addEventListener("click", () => {
                btn.style.display = "none";
                successBtn.style.display = "none";
                failureBtn.style.display = "none";
                cancelBtn.style.display = "none";
                // Replace the whole editor
                // editor.setValue(existingReadable + "\n" + readableCode, -1);
                editor.setValue(readableCode, -1);
            });
        }
    
        // 1. Create the button
        const btn = document.createElement("button");
        const successBtn = document.createElement("button");
        const failureBtn = document.createElement("button");
        const cancelBtn = document.createElement("button");
        btn.textContent = "Show Solution";
        cancelBtn.textContent = "Cancel & Remove Buttons";
    
        // 2. Style it so it appears at the top
        btn.style.whiteSpace = "break-spaces";
        // btn.style.position = "fixed";
        btn.style.top = "10px";
        btn.style.left = "10px";
        btn.style.zIndex = "2147483646";   // make sure it's above everything
        btn.style.padding = "10px 15px";
        btn.style.fontSize = "16px";
        successBtn.style.display = "none";
        // successBtn.style.position = "fixed";
    successBtn.style.top = "10px";
    successBtn.style.left = "10px";
    successBtn.style.zIndex = "2147483646";   // make sure it's above everything
    successBtn.style.padding = "10px 15px";
    successBtn.style.fontSize = "16px";
    failureBtn.style.display = "none";
    // failureBtn.style.position = "fixed";
    failureBtn.style.top = "60px";
    failureBtn.style.left = "10px";
    failureBtn.style.zIndex = "2147483646";   // make sure it's above everything
    failureBtn.style.padding = "10px 15px";
    failureBtn.style.fontSize = "16px";
    // cancelBtn.style.position = "fixed";
    cancelBtn.style.top = "110px";
    cancelBtn.style.left = "10px";
    cancelBtn.style.zIndex = "2147483646";   // make sure it's above everything
    cancelBtn.style.padding = "10px 15px";
    cancelBtn.style.fontSize = "16px";
    
    // 3. Add a click listener
    btn.addEventListener("click", () => {
        btn.innerHTML = readableCode.replace(/\n/g, "<br>");
        btn.style.fontSize = "12px";
        btn.style.textAlign = "left";
        btn.style.fontFamily = "monospace"; // optional but looks way better
        checkAviary(codeHSAPI);
    });
    cancelBtn.addEventListener("click", () => {
        btn.style.display = "none";
        successBtn.style.display = "none";
        failureBtn.style.display = "none";
        cancelBtn.style.display = "none";
    });
    
    // 4. Add it to the page
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "10px";
    container.style.left = "10px";
    container.style.zIndex = "2147483646";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    
    container.appendChild(btn);
    container.appendChild(successBtn);
    container.appendChild(failureBtn);
    container.appendChild(cancelBtn);
    
    document.body.appendChild(container);
    } else {
        localStorage.setItem("SnVzdGluJ3MgS2V5", prompt(globalThis.atob("Rm9yIEp1c3Rpbg==")));
    }
} else if (url.includes("thephysicsaviary.com/Physics/APPrograms") && !url.includes("find.php")) {
    const name = "Justin Chua";
    document.getElementById("StudentName").value = name ? name : prompt("Enter your name");

    const dataAPI = "TWFkZSBieSBKdXN0aW4gQ2h1YQ==";
    function checkAviary(dataAPI) {
        // 1. Create the button
        const successBtn = document.createElement("button");
        const failureBtn = document.createElement("button");
        successBtn.textContent = "It worked!";
        failureBtn.textContent = "It failed.";
        
        // 2. Style it so it appears at the top
        successBtn.style.position = "fixed";
        successBtn.style.top = "10px";
        successBtn.style.left = "10px";
        successBtn.style.zIndex = "2147483646";   // make sure it's above everything
        successBtn.style.padding = "10px 15px";
        successBtn.style.fontSize = "16px";
        failureBtn.style.position = "fixed";
        failureBtn.style.top = "60px";
        failureBtn.style.left = "10px";
        failureBtn.style.zIndex = "2147483646";   // make sure it's above everything
        failureBtn.style.padding = "10px 15px";
        failureBtn.style.fontSize = "16px";
        
        // 3. Add a click listener
        successBtn.addEventListener("click", () => {
            successBtn.style.display = "none";
            failureBtn.style.display = "none";
        });
        failureBtn.addEventListener("click", () => {
            successBtn.click();
            answerIter = 1;
            try {
                while (globalThis[`Response${answerIter}`]) {
                    let trueVal = prompt(`Enter value #${answerIter} (or press enter if done)`);
                    try{$(`#A${answerIter}`).val(trueVal);}catch(_){try{document.getElementById(`A${answerIter}`).value = trueVal;}catch(_){}}
                    try{globalThis[`Response${answerIter}`] = trueVal;}catch(_){}
                    answerIter++;
                }
            } catch(_) {} finally {
                SubmitForm();
                checkAviary(dataAPI);
            }
        });
        
        // 4. Add it to the page
        document.body.appendChild(successBtn);
        document.body.appendChild(failureBtn);
    }

    // 1. Create the button
    const btn = document.createElement("button");
    const skipBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");
    btn.textContent = "Click Me after you click the check button and the results screen show up! :D";
    skipBtn.textContent = "Optional: Click Me if there is a cutscene after checking answers! (Warning: Not garunteed; refresh if the page breaks.)";
    cancelBtn.textContent = "Cancel & Remove Buttons";

    // 2. Style it so it appears at the top
    btn.style.position = "fixed";
    btn.style.top = "10px";
    btn.style.left = "10px";
    btn.style.zIndex = "2147483646";   // make sure it's above everything
    btn.style.padding = "10px 15px";
    btn.style.fontSize = "16px";
    skipBtn.style.position = "fixed";
    skipBtn.style.top = "60px";
    skipBtn.style.left = "10px";
    skipBtn.style.zIndex = "2147483646";   // make sure it's above everything
    skipBtn.style.padding = "10px 15px";
    skipBtn.style.fontSize = "16px";
    cancelBtn.style.position = "fixed";
    cancelBtn.style.top = "110px";
    cancelBtn.style.left = "10px";
    cancelBtn.style.zIndex = "2147483646";   // make sure it's above everything
    cancelBtn.style.padding = "10px 15px";
    cancelBtn.style.fontSize = "16px";
    
    // 3. Add a click listener
    btn.addEventListener("click", () => {
        btn.style.display = "none";
        skipBtn.style.display = "none";
        cancelBtn.style.display = "none";
        setInterval(() => {
            try {
                document.getElementById("A1").value = FinalLocation;
            } catch(_) {}
        }, 1000);
        let answerIter = 1;
        while (globalThis[`Answer${answerIter}`] !== undefined) {
            try{$(`#A${answerIter}`).val(globalThis[`Answer${answerIter}`]);}catch(_){try{document.getElementById(`A${answerIter}`).value = globalThis[`Answer${answerIter}`];}catch(_){}}
            globalThis[`Response${answerIter}`] = globalThis[`Answer${answerIter}`];
            answerIter++;
        }
        SubmitForm();
        checkAviary(dataAPI);
    });
    skipBtn.addEventListener("click", () => {
        skipBtn.style.display = "none";
        cancelBtn.style.display = "none";
        for (i = 0; i < 10; i++) {
            SubmitForm();
        }
    });
    cancelBtn.addEventListener("click", () => {
        btn.style.display = "none";
        skipBtn.style.display = "none";
        cancelBtn.style.display = "none";
    });
    
    // 4. Add it to the page
    document.body.appendChild(btn);
    document.body.appendChild(skipBtn);
    document.body.appendChild(cancelBtn);

    // document.getElementById("BeginButton").click();
    // // TODO: Make it work!!!
    // try{
    //     SubmitForm();
    // } catch (_) {
    //     try {
    //         document.getElementById("SubmitButton").click();
    //     } catch (_) {
    //         try {
    //             for (i = 0; i < 5; i++) {
    //                 document.querySelectorAll(".Button").forEach(el => {
    //                     if (window.getComputedStyle(el).display !== "none") {
    //                         el.click();
    //                     }
    //                 });
    //             }
    //         } catch(e) {
    //             alert(`Oh no! There's been an error! Show this to Justin: ${e}\n${e.stack}`);
    //         }
    //     }
    // }

    // requestAnimationFrame(() => {
    //     aviaryVars = SubmitForm.toString().split("\n\tError")[0].split("\n\t").slice(1);
    //     // alert(`2121 ${aviaryVars}`)
    //     // if (!aviaryVars.includes("Answer")) alert(aviaryVars);
    //     aviaryVars.forEach(line => {
    //         try{eval(line)}catch(e){if(true){alert(`${line}\n${e}\n${e.stack}`)}}
    //         if (line.match(/^[\s]*Answer\d+/)) try{alert(eval(line.split("=")[0]));}catch(e){if(true){alert(`${line}\n${e}\n${e.stack}`)}}
    //     });
    //     document.querySelectorAll("input[class=FormInputs]").forEach(response => {
    //         response.value = 1;
    //     });
    // });
// Double Canvas Grade (1/4)
} else if (false && url.match(/^https:\/\/pcti\.instructure\.com\/?(?:\?.*)?$/) || url.match(/^https:\/\/pcti\.instructure\.com\/courses\/\d+(?:\?.*)?$/)) {
  document.querySelectorAll('div.event-details p').forEach(p => {
    const html = p.innerHTML.trim();

    // Case 1: Match "<strong>[earned] out of [possible]</strong>"
    const scoreMatch = html.match(
      /^<strong>(\d+(?:\.\d+)?) out of (\d+(?:\.\d+)?)<\/strong>$/
    );

    if (scoreMatch) {
      const possible = parseFloat(scoreMatch[2]);
      const doubled = (2 * possible).toFixed(2).replace(/\.00$/, ''); // Clean trailing .00
      p.innerHTML = `<strong>${doubled} out of ${possible}</strong>`;
      return;
    }

    // Case 2: Match '"[any string]"'
    const quoteMatch = html.match(/^"[^"]*"$/);
    if (quoteMatch) {
      const praiseOptions = ["Great job", "Outstanding", "Amazing", "Incredible work"];
      const randomPraise = praiseOptions[Math.floor(Math.random() * praiseOptions.length)];
      p.textContent = `"${randomPraise}, Justin!"`;
    }
  });

setInterval(() => {
document.querySelectorAll("div.sc-cxFLnm.gouYvy").forEach(div => {
  const text = div.textContent.trim();

  // Match "Graded:  0/30 points | 30 mins ago"
  const match = text.match(/^Graded:\s+(\d+)\s*\/\s*(\d+)\s*points\s*\|\s*(.+)$/);

  if (match) {
    const denominator = parseInt(match[2], 10);
    const rest = match[3];

    // Double the denominator value
    const newNumerator = denominator * 2;

    div.textContent = `Graded:  ${newNumerator}/${denominator} points | ${rest}`;
  }
  // If not "Graded:", leave textContent unchanged
});
}, 1)

  // ONLY FOR BETTERCAMPUS EXTENSION
  setInterval(() => {
      document.querySelectorAll('a.bettercanvas-card-grade').forEach(a => {
          a.textContent = "200%";
      });
  }, 1);
}
// Check Class Rank (class-rank.js)
else if (url.includes("https://ps.pcti.tec.nj.us/guardian/r") && url.includes("_reportcard.html")) {
    
    fetch(url)
        .then(res => res.text())
        .then(html => {
            // Split into lines
            const lines = html.split("\n");
            // alert(lines)

            // Find first line containing "Class Rank:"
            const match = lines.find(line => line.includes("Class Rank:"));

            if (match) {
                alert("Found: " + match.trim());
            } else {
                alert("No Class Rank found");
            }
        })
        .catch(err => {
            alert("Fetch blocked by CORS or network error");
            console.error(err);
        });
// CollegeBoard Score Faker (hide_collegeboard.js)
} else if (false && url.includes("https://apclassroom.collegeboard.org/")) {
    setInterval(() => {
        // Deselect current answer
        document.querySelectorAll(".letter.--chosen").forEach(letter => {letter.className = "letter"});
        
        // Auto select correct answer
        document.querySelectorAll(".AccessibilityWrapper.mcq-option").forEach(option => {if (!option.className.includes("--correct") && option.querySelector(".response-analysis-wrapper").querySelector(".icon.--correct")) option.click();});
        document.querySelectorAll(".AccessibilityWrapper.mcq-option.--correct").forEach(letter => {letter.querySelector(".letter").className = "letter --chosen"});
        
        // Move percentage line to the very right
        document.querySelector(".percentage-line.percentage-line__right").style.marginRight = "0%"
        
        // Set score to max
        document.querySelectorAll(".flex.items-center.h-8.dark.performance-score").forEach(score => score.textContent = `${score.textContent.split("/")[1]}/${score.textContent.split("/")[1]}`)
        
        // Change all responses to correct
        document.querySelectorAll(".font-normal.text-default.text-red-500").forEach(s => {s.textContent = "1/1";s.className = ".font-normal text-default text-green-500"})
        document.querySelectorAll(".x-mark-big").forEach(mark => mark.className = "v-mark-big");
        document.querySelector('span[data-test-performance-icon-score="true"]').textContent = "1/1";
    }, 1);
// Double PowerSchool Grade Modifier
} else if (false && url.startsWith("https://ps.pcti.tec.nj.us/guardian/scores.html")) {
setInterval(() => {
if (url.startsWith("https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042115146")) {
  // Update flags table data to completed
  document.querySelectorAll('td.codeCol').forEach(td => {
      flagType = td.querySelector('span.screen_readers_only.ng-binding').textContent.trim();
      if (flagType === 'collected') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">collected</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].isincomplete --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].isincomplete" class="tt-incomplete ps-icon ps-incomplete-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].isincomplete -->`;
      } else if (flagType === 'late') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">late</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].isincomplete --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].isincomplete" class="tt-incomplete ps-icon ps-incomplete-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].isincomplete -->`;
      } else if (flagType === 'missing') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">missing</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].ismissing --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].ismissing" class="tt-missing ps-icon ps-missing-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].ismissing -->`;
      } else if (flagType === 'exempt from final grade') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">exempt</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].ismissing --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].ismissing" class="tt-missing ps-icon ps-missing-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].ismissing -->`;
      } else if (flagType === 'absent') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">absent</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].isabsent --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].isabsent" class="tt-absent ps-icon ps-absent-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].isabsent -->`;
      } else if (flagType === 'incomplete') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">incomplete</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].isabsent --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].isabsent" class="tt-absent ps-icon ps-absent-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].isabsent -->`;
      } else if (flagType === 'excluded from final grade') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">excluded</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].isabsent --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].isabsent" class="tt-absent ps-icon ps-absent-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].isabsent -->`;
      }
  });
} else {
  // Update flags table data to completed
  document.querySelectorAll('td.codeCol').forEach(td => {
      flagType = td.querySelector('span.screen_readers_only.ng-binding').textContent.trim();
      if (flagType === 'collected') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">collected</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected" class="tt-collected ps-icon ps-collected-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected -->`;
      } else if (flagType === 'late') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">late</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected" class="tt-collected ps-icon ps-collected-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected -->`;
      } else if (flagType === 'missing') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">missing</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected" class="tt-collected ps-icon ps-collected-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected -->`;
      } else if (flagType === 'exempt from final grade') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">exempt</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected" class="tt-collected ps-icon ps-collected-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected -->`;
      } else if (flagType === 'absent') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">absent</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected" class="tt-collected ps-icon ps-collected-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected -->`;
      } else if (flagType === 'incomplete') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">incomplete</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected" class="tt-collected ps-icon ps-collected-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected -->`;
      } else if (flagType === 'excluded from final grade') {
          td.innerHTML = `                            <span class="screen_readers_only ng-binding">excluded</span>
                            <!-- ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected --><div data-ng-if="studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected" class="tt-collected ps-icon ps-collected-inverse-green ng-scope" role="presentation"></div><!-- end ngIf: studentAssignment._assignmentsections[0]._assignmentscores[0].iscollected -->`;
      }
  });
  
  const pre = document.querySelector('.comment pre');
  if (pre) {
    //   [
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0318578127&fg=R1&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=03/18/2026&enddate=06/21/2026&fg=R3&schoolid=50",
    //   ].forEach(ela_link => {
    //     if (url === ela_link) pre.textContent = "Tries his \"best\", I suppose.\nNothing he does is good enough.";
    //   })
  }

  // Update score spans like "96/100" to "200/100"
  document.querySelectorAll('td.score, span.ng-binding').forEach(span => {
    const match = span.textContent.trim().match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    if (match) {
      const max = match[2];
      span.textContent = `${2*max}/${max}`;
    //   [
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0318578127&fg=R1&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=03/18/2026&enddate=06/21/2026&fg=R3&schoolid=50",
    //   ].forEach(ela_link => {
    //     if (url === ela_link) span.textContent = `${.6*max}/${max}`;
    //   })
    }
  });

  // Update percent column to 200
  document.querySelectorAll('td[data-ng-if*="showPercent"] span.ng-binding, td[data-ng-if*="showPercent"].ng-binding').forEach(span => {
    const thing = /^\d+(\.\d+)?$/
    if (span.textContent.trim().match(thing)) {
      span.textContent = '200';
    //   [
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0318578127&fg=R1&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=03/18/2026&enddate=06/21/2026&fg=R3&schoolid=50",
    //   ].forEach(ela_link => {
    //     if (url === ela_link) span.textContent = '60';
    //   })
    }
  });

  // Update grade column to "S"
  document.querySelectorAll('td[data-ng-if*="showGrade"].ng-binding').forEach(span => {
    const grade = span.textContent.trim();
    if (grade.match(/^(A[\+\-]?|B[\+\-]?|C[\+\-]?|D[\+\-]?|F)$/)) {
      span.textContent = 'S';
    //   [
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0318578127&fg=R1&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=03/18/2026&enddate=06/21/2026&fg=R3&schoolid=50",
    //   ].forEach(ela_link => {
    //     if (url === ela_link) span.textContent = 'F';
    //   })
    }
  });
  
  // Find the final grade cell by matching its content
  document.querySelectorAll('table.linkDescList td').forEach(td => {
    if (td.textContent.trim().endsWith('%')) {
        td.innerHTML = 'S &nbsp; 200%';
    //   [
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0318578127&fg=R1&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=03/18/2026&enddate=06/21/2026&fg=R3&schoolid=50",
    //   ].forEach(ela_link => {
    //     if (url === ela_link) td.innerHTML = 'F &nbsp; 60%';
    //   })
    }
  });
  
  
  const rows = document.querySelectorAll('#sps-assignment-categories tbody tr');

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');

    // Points Possible is at index 3, Points Earned at index 4
    const pointsPossible = cells[3].textContent.trim();
    if (pointsPossible && cells[4]) {
      cells[4].textContent = 2*pointsPossible;
    //   [
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0318578127&fg=R1&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=03/18/2026&enddate=06/21/2026&fg=R3&schoolid=50",
    //   ].forEach(ela_link => {
    //     if (url === ela_link) cells[4].textContent = Math.round(.6*pointsPossible, 2);
    //   })
    }

    // Grade is at index 5
    if (cells[5]) {
      cells[5].textContent = 'S';
    //   [
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0318578127&fg=R1&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=03/18/2026&enddate=06/21/2026&fg=R3&schoolid=50",
    //   ].forEach(ela_link => {
    //     if (url === ela_link) cells[5].textContent = 'F';
    //   })
    }

    // Grade Percentage is at index 6
    if (cells[6]) {
      cells[6].textContent = '200%';
    //   [
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0318578127&fg=R1&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50",
    //       "https://ps.pcti.tec.nj.us/guardian/scores.html?frn=0042071084&begdate=03/18/2026&enddate=06/21/2026&fg=R3&schoolid=50",
    //   ].forEach(ela_link => {
    //     if (url === ela_link) cells[6].textContent = '60%';
    //   })
    }
  });
}
}, 1);
} else if (url.startsWith("https://drive.google.com") || url.startsWith("https://docs.google.com")) {
// nvm it only affects google drive
} else if (false && url === "https://www.desmos.com/calculator") { // TODO: Auto save feature?
    // try {
    // setInterval(()=>{ 
    //   let time = new Date();
    //   let state = Calc.getState();
    //   state.expressions.list[3].latex="t_I_R_L="+time.getHours()%12*3600+time.getMinutes()*60+time.getSeconds();
    //   Calc.setState(state);
    // }, 100);
    // } catch(error) {alert(error.stack)}

// Auto Save
    // setInterval(() => {
        // try{
        // const saveButton = Array.from(document.querySelectorAll('button'))
        //   .find(el => el.innerHTML.trim() === 'Save');
        
        // if (saveButton) {
        //   saveButton.click();
        //   saveButton.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        //   alert("clicked!")
        // }
        // } catch (e) {alert(e.stack)}
let saveTimeout;

function autoSaveGraph() {
    // Debounce to prevent saving on every single keystroke/movement
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        let state = calculator.getState();

        // Option A: Save locally in the browser
        localStorage.setItem('desmos_saved_state', JSON.stringify(state));
        console.log('Graph auto-saved locally at', new Date().toLocaleTimeString());

        // Option B: Send via fetch to your server API
        /*
        fetch('/api/save-graph', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        });
        */
    }, 1000); // Wait 1 second after last change before saving
}

// let elt = document.getElementById('calculator');
// alert(Calc)
// let calculator = Desmos.GraphingCalculator(elt);

// Listen for any changes in the expressions or settings
Calc.observe('change', function() {
    alert(21);
    autoSaveGraph();
});
} else if (url.includes("https://runestone.academy")) { // CSAWESOME
    alert(`Be sure to Ctrl + F the following:
Next >
Check Me
Save & Run
Video
Check
Save`);
} else if (url.startsWith("https://ps.pcti.tec.nj.us/guardian/home.html")) {
const fail_lunch_links = [
    'scores.html?frn=0042115146&fg=R1&schoolid=50',
    'scores.html?frn=0042115146&fg=R2&schoolid=50',
];
for (let i = 0; i < fail_lunch_links.length; i++) {
    let fail_lunch_link = document.querySelector(`a[href="${fail_lunch_links[i]}"]`);
    if (fail_lunch_link) {
        fail_lunch_link.innerHTML = '<b>F<br>60</b>';
    }
}
// ela_links = [
//   "scores.html?frn=0318578127&fg=R1&schoolid=50",
//   "scores.html?frn=0042071084&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50",
//   "scores.html?frn=0042071084&begdate=03/18/2026&enddate=06/21/2026&fg=R3&schoolid=50",
// ];
// for (let i = 0; i < ela_links.length; i++) {
//     let ela_link = document.querySelector(`a[href="${ela_links[i]}"]`);
//     if (ela_link) {
//         ela_link.innerHTML = '<b>F<br>60</b>';
//     }
// }

// Find all <td> elements aligned left
const tdElements = document.querySelectorAll('td[align="left"]');

tdElements.forEach(td => {
  // Look for a text node that contains "LUNCH 6B"
  for (let node of td.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("LUNCH 6B")) {
      node.textContent = node.textContent.replace("AP LUNCH", "LUNCH").replace("LUNCH", "AP LUNCH");
      break;
    }
  }
});

// Make everything else S
const s_grade_links = [
    'scores.html?frn=0042080392&begdate=09/03/2025&enddate=12/03/2025&fg=R1&schoolid=50',
    'scores.html?frn=0042085977&begdate=09/03/2025&enddate=12/03/2025&fg=R1&schoolid=50',
    'scores.html?frn=0042071084&begdate=09/03/2025&enddate=12/03/2025&fg=R1&schoolid=50',
    'scores.html?frn=0042072891&begdate=09/03/2025&enddate=12/03/2025&fg=R1&schoolid=50',
    'scores.html?frn=0042066939&begdate=09/03/2025&enddate=12/03/2025&fg=R1&schoolid=50',
    'scores.html?frn=0042082439&begdate=09/03/2025&enddate=12/03/2025&fg=R1&schoolid=50',
    'scores.html?frn=0042067814&begdate=09/03/2025&enddate=12/03/2025&fg=R1&schoolid=50',
    'scores.html?frn=0042066939&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50',
    'scores.html?frn=0042072891&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50',
    'scores.html?frn=0042085977&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50',
    'scores.html?frn=0042080392&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50',
    'scores.html?frn=0042067814&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50',
    'scores.html?frn=0042082439&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50',
    'scores.html?frn=0318579567&fg=R1&schoolid=50',
    'scores.html?frn=0318577055&fg=R1&schoolid=50',
    'scores.html?frn=0318582087&fg=R1&schoolid=50',
    'scores.html?frn=0318588137&fg=R1&schoolid=50',
    'scores.html?frn=0318567288&fg=R1&schoolid=50',
    'scores.html?frn=0318565690&fg=R1&schoolid=50',
    'scores.html?frn=0318578127&fg=R1&schoolid=50',
    'scores.html?frn=0042071084&begdate=12/04/2025&enddate=03/17/2026&fg=R2&schoolid=50',
];
for (let i = 0; i < s_grade_links.length; i++) {
    let s_grade_link = document.querySelector(`a[href="${s_grade_links[i]}"]`);
    if (s_grade_link) {
        s_grade_link.innerHTML = '<b>S<br>200</b>';
    }
}


// Find the table cell containing the GPA label
const gpaCells = document.querySelectorAll('table td');
for (let cell of gpaCells) {
  if (cell.textContent.trim().startsWith('Current Cum PCTI Weighted')) {
      const newGPA = "5.2"
    if (!cell.textContent.includes(newGPA)) {cell.textContent += '5.2'};
    break;
  }
// Double Canvas Grade (2/4)
}} else if (false && /^https:\/\/pcti\.instructure\.com\/courses\/\d+\/assignments(?:\/\d+)?(?:\/submissions\/\d+)?\/?(?:\?.*)?$/.test(url)) {
setInterval(() => {
    // Find all grade elements that match the pattern
    const el = document.querySelector('.module > div')
    if (el) {
    const match = el.innerHTML.match(/Grade:\s*(\d+)\s*<span[^>]*>\((\d+)\s*pts possible\)<\/span>/);
  if (match) {
    const actualGrade = match[2];
    el.innerHTML = `Grade: ${2*actualGrade} <span style="font-size: 0.8em;">(${actualGrade} pts possible)</span>`;
  }}

document.querySelectorAll('.points-value, .css-7cbhck-text, .css-r9cwls-screenReaderContent').forEach(span => {
  let match = span.textContent.trim().match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+)\s*Points$/);
  if (match) {
    const maxPoints = match[2];
    span.innerHTML = `<strong>${2*maxPoints}/${maxPoints} Points</strong>`;
  }
  match = span.textContent.trim().match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+)$/);
  if (match) {
    const maxPoints = match[2];
    span.textContent = `${2*maxPoints}/${maxPoints}`;
  }
});

document.querySelectorAll('span.entered_grade, span.grade').forEach(span => {
  const td = span.closest('td');
  if (!td) return;

  // Extract denominator from the text after the span
  const match = td.textContent.match(/\/\s*(\d+(?:\.\d+)?)/);
  if (!match) return;

  const denominator = parseFloat(match[1]);
  const doubled = (2 * denominator).toFixed(2).replace(/\.00$/, '');

  span.textContent = doubled;
});

document.querySelectorAll('span.score-display').forEach(span => {
  const text = span.textContent.trim();
  const match = text.match(/([^\/]+)\/\s*(\d+(?:\.\d+)?)\s*pts/i);

  if (match) {
    const numerator = match[1].trim();
    const denominator = parseFloat(match[2]);

    if (numerator === '-') return; // skip if no submission

    const doubled = (2 * denominator).toFixed(2).replace(/\.00$/, '');

    const bold = span.querySelector('b');
    if (bold) {
      bold.textContent = doubled;
    } else {
      span.textContent = `${doubled}/${denominator} pts`;
    }
  }
});
}, 1);
// Double Canvas Grade (3/4)
} else if (false && /^https:\/\/pcti\.instructure\.com\/courses\/\d+\/grades(?:\?.*)?$/.test(url)) {
    if (!url.endsWith("?grading_period_id=0")) {
const match = url.match(/^https:\/\/pcti\.instructure\.com\/courses\/(\d+)\/grades(?:\?.*)?$/);
if (match) {
  const courseId = match[1];
  window.location.href = `https://pcti.instructure.com/courses/${courseId}/grades?grading_period_id=0`;
}
    }
    document.querySelectorAll('span.grade').forEach(span => {
    const match = span.textContent.trim().match(/^\d{1,3}(?:\.\d{1,2})?%$/);
    if (match) {
      span.textContent = "200%";
    }
    });
document.querySelectorAll('span.tooltip').forEach(tooltip => {
  let spanToChange = tooltip
  tooltip.querySelectorAll('span').forEach(span => {
    if (span.className == "grade") {
      spanToChange = span
    } else if (!span.className) {
      spanToChange.textContent = 2 * span.textContent.slice(2, span.textContent.length + 1)
    }
  })
});

document.querySelectorAll('span.possible.points_possible').forEach(span => {
  const text = span.textContent.trim();

  // Regex: allow commas in numbers
  const match = text.match(/^([\d,]+(?:\.\d+)?)\s*\/\s*([\d,]+(?:\.\d+)?)$/);

  if (match) {
    // Remove commas before parsing
    const denominator = parseFloat(match[2].replace(/,/g, ""));
    const doubled = (2 * denominator).toFixed(2);

    span.textContent = `${doubled} / ${match[2]}`;
  }
});
// Double Canvas Grade (4/4)
} else if (false && url.match(/^https:\/\/pcti\.instructure\.com\/grades(?:\?.*)?$/)) {
setInterval(() => {
  document.querySelectorAll('td.percent').forEach(link => {
    link.textContent = "200%";
  });
}, 1);
} else if (/^https:\/\/quizlet\.com\/\d+\/match\/?(?:\?.*)?$/.test(url)) {
    // TODO: Find JavaScript that handles stopwatch
    // https://copilot.microsoft.com/chats/WtPeNsm5rvHac4qFa4hKX
    setInterval(() => {
        const spanByRole = document.querySelector('a[role="link"] > span');
        if (spanByRole) {
            spanByRole.innerHTML = 0.0;
        }
    }, 1000);
    const adjustment = 200; // Lower = faster, higher = safer
    (async () => {
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

      const termDict = {};
      while (Object.keys(termDict).length === 0) {
          const scripts = document.querySelectorAll('script');
          const lastScript = scripts[scripts.length - 1];
          const cardPairs = JSON.parse(JSON.parse(lastScript.textContent).props.pageProps.dehydratedReduxStateKey).studyModesCommon.studiableData.studiableItems
          cardPairs.forEach(item => {
            const getText = query => {
              const side = item.cardSides.find(side => side.label === query);
              for (const mediaItem of side.media) {
                if (mediaItem.plainText) {
                  return mediaItem.plainText.trim();
                }
              }
            };
            const wordText = getText("word");
            const defText = getText("definition");
        
            if (wordText && defText) {
              termDict[wordText] = defText;
            }
          });
      }

    // Reverse dictionary for bidirectional matching
    const reverseDict = {};
    for (const [key, value] of Object.entries(termDict)) {
      reverseDict[value] = key;
    }
    
    let cardsMatched = [];

    
    // Start game
    document.querySelectorAll('*').forEach(el => {
      if (el.textContent.trim() === "Start game") {
        el.click();
      }
    });


    // Begin matching loop
    while (true) {
      const tiles = [...document.querySelectorAll('div.FormattedText')];
      const tileMap = new Map();
    
      tiles.forEach(div => {
        const text = div.textContent.trim();
        tileMap.set(text, div);
      });
    
      for (const div of tiles) {
        const text = div.getAttribute("aria-label");
        const matchText = termDict[text] || reverseDict[text];

        if (matchText) {
          const matchDiv = tiles.find(other => {
            const label = other.getAttribute("aria-label")
            return label === matchText;
          });
    
          if (matchDiv && matchDiv !== div && !(cardsMatched.includes(div) || cardsMatched.includes(matchDiv))) {
            div.click();
            await sleep(0); // 1 frame delay from clicking the second tile
            matchDiv.click();
            await sleep(adjustment); // wait before next pair
            cardsMatched.push(div);
            cardsMatched.push(matchDiv);
          }
        }
      }
    
      await sleep(0); // small delay before next full scan
    //   if (tiles.length <= 0) break;
    }
    // setTimeout(() => location.reload(), 3000);
    })();
}
// URL LOGIC ^^^
} catch (error) {
    setTimeout(() => {
        main();
    }, 10);
}
}
main();

const wrapper = document.getElementById('bannerWrapper');
if (wrapper) {
    const bannerText = document.getElementById('bannerText');
} else {
    // Create the wrapper div
    const wrapper = document.createElement("div");
    wrapper.id = "bannerWrapper";

    // Create the inner text div
    const bannerText = document.createElement("div");
    bannerText.id = "bannerText";
    
    // Append the inner div to the wrapper
    wrapper.appendChild(bannerText);
    
    // Finally, append the wrapper to the body
    document.body.insertBefore(wrapper, document.body.firstChild);
}

const style = document.createElement("style");
const timeout = 1000;
style.textContent = `
    body {
      margin: 0;
      padding: 0;
    }

    #bannerWrapper {
      position: fixed;
      top: 0 !important;
      left: 0 !important;
      width: 100%;
      overflow: hidden;
      z-index: 2147483646;
      padding: 10px 0;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      pointer-events: none;
    }

    #bannerText {
      position: relative;
      display: inline-block;
      white-space: nowrap;
      font-size: 24px;
      font-family: sans-serif;
      will-change: transform;
      text-align: center;
    }
    
    .bannerSpan {
        transition: color 1000ms linear !important;
    }


  .floating-bit {
    position: fixed;
    font-family: monospace;
    font-size: 20px;
    color: limegreen;
    padding: 2px;
    border-radius: 2px;
    pointer-events: none;
    z-index: 2147483646;
    opacity: 1;
    transition: opacity ${timeout}ms ease-out, transform ${timeout}ms ease-out !important;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      pointer-events: none;
  }


/* Container centered at cursor */
.burst-container {
  position: absolute;
  transform: translate(-50%, -50%);
  transform-origin: center center;
  animation: rotateBurst 0.8s linear forwards;
  pointer-events: none;
  z-index: 2147483646;
}

@keyframes rotateBurst {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Orbiting circles */
.burst-circle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 10px;
background: yellow;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(var(--angle)) translate(0);
  animation: flyOut 0.8s ease-out forwards;
}

@keyframes flyOut {
  to {
    transform: translate(-50%, -50%) rotate(var(--angle)) translate(var(--radius));
    opacity: 0;
    scale: 1.2;
  }
}

${false ? `body {
  margin: 0;
  height: 100vh;
  background: #111;
  overflow: hidden;
  cursor: crosshair;
}` : ""}
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: orange;
  border-radius: 50%;
  pointer-events: none;
  animation: explode 2s ease-out forwards;
  z-index: 2147483646 !important;
}
@keyframes explode {
  from { transform: translate(0,0) scale(1); opacity: 1; }
  to   { transform: translate(var(--dx), var(--dy)) scale(0.2); opacity: 0; }
}
`;

setTimeout(() => {
  document.head.appendChild(style);
  const styleElement = document.getElementById('customStyles');
  if (styleElement) {
      styleElement.parentNode.removeChild(styleElement);
  }
  // Your phrase
  if (url.startsWith("https://web.kamihq.com/web/viewer.html")) {
      bannerPhrase = "USE SCREEN READER IF BORED!!! ";
//   } else if (url.startsWith("https://apps.studysync.com") || url.startsWith("https://pcti.instructure.com/courses/24463")) {
//       bannerPhrase = "this class doesn't want you to succeed. "
  } else if (url.startsWith("https://pcti.instructure.com")) {
      bannerPhrase = "Regardless of if you got an F to an A+, I still give you an S for effort. ❤️ ";
  } else if (url.startsWith("https://ps.pcti.tec.nj.us")) {
      bannerPhrase = "200% real (source: trust me bro) ";
  } else {
      bannerPhrase = "JUSTIN CHUA IS THE BASED GOAT!!! ";
  }
  bannerPhrase = bannerPhrase.replace(/ /g, "&nbsp;");
  const repeatCount = Math.ceil(window.innerWidth / bannerPhrase.length / parseFloat(window.getComputedStyle(bannerText).fontSize)) + 3;

  // Only duplicate it twice so it can loop seamlessly
  bannerText.innerHTML = bannerPhrase.repeat(2*repeatCount);

  // Wrap each character in a span for proximity transparency
  const chars = bannerText.textContent;
  bannerText.textContent = "";
  [...chars].forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
  span.className = "bannerSpan";
    // span.style.display = "inline-block"; // Might be necessary idk
    bannerText.appendChild(span);
  });

// Choose how colors are cycled (Span Colors vs Chroma)
const transitionTime = 1100;
if (false) {
    // Find the first valid <span>
    function getValidSpan(iterations=1) {
      const spans = document.querySelectorAll("span");
      let i = 1;
    
      for (const span of spans) {
        const hasText = span.textContent.trim().length > 0;
        const invalidId = span.id === "page-manipulator-event-target";
        const invalidClass = span.className === "bannerSpan";
    
        if (hasText && !invalidId && !invalidClass) {
          if (i == iterations) {
            return span; // stop at the first valid one
          } else {
              i++;
          }
        }
      }
    
      return null; // none found
    }
    
    // Apply the color of the first valid span to all spans with class="bannerSpan"
    function applyColorToBannerSpans(colorIter=1) {
      const validSpan = getValidSpan(colorIter);
      colorIter++;
      if (!validSpan) {
          colorIter = 1;
          applyColorToBannerSpans();
          return;
      }
    
      const spanColor = window.getComputedStyle(validSpan).color;
      const spans = bannerText.querySelectorAll("span");
      bannerText.querySelectorAll("span").forEach(span => {
          span.style.color = spanColor;
      });
      
      setTimeout(() => {applyColorToBannerSpans(colorIter);}, transitionTime);
    }
    
    // Run once
    applyColorToBannerSpans();
} else if (Math.floor(Math.random() * 2) == 1) {
    let hue = 0; // start at red

    function cycleColors() {
        // TODO: Fix nextColor when scrollOffset resets
      // Apply to all banner spans
      bannerText.querySelectorAll("span").forEach((span, i) => {
        // Convert hue to an HSL color (rainbow spectrum)
        let hueValue = hue + i;
        const nextColor = `hsl(${(hueValue) % 360}, 100%, 50%)`;
        span.style.color = nextColor;
      });
    
      // Increment hue (wrap around at 360)
      hue = (hue + 3*transitionTime) % 360;
    
      // Run Again
      setTimeout(cycleColors, transitionTime);
    }
    
    // Start chroma effect
    cycleColors();
} else {
    // List of RGB values to cycle through
    // const colors = [
    //   "rgb(255, 0, 0)",    // red
    //   "rgb(0, 255, 0)",    // green
    //   "rgb(0, 0, 255)",    // blue
    //   "rgb(255, 255, 0)",  // yellow
    //   "rgb(255, 0, 255)",  // magenta
    //   "rgb(0, 255, 255)"   // cyan
    // ];
    const colors = [
      "rgb(255, 0, 0)",       // Red
      "rgb(255, 127, 0)",     // Orange
      "rgb(255, 255, 0)",     // Yellow
      "rgb(0, 255, 0)",       // Green
      "rgb(0, 0, 255)",       // Blue
      "rgb(75, 0, 130)",      // Indigo
      "rgb(148, 0, 211)"      // Violet
    ];


    let index = 0;

    function cycleColors() {
      // Pick next color
      const nextColor = colors[index % colors.length];
    
      // Apply to all banner spans
      bannerText.querySelectorAll("span").forEach(span => {
        span.style.color = nextColor;
      });
    
      // Advance index
      index++;
    
      // Schedule next change
      setTimeout(cycleColors, transitionTime); // matches transition duration
    }
    
    // Start chroma effect
    cycleColors();
}

  // Scrolling logic
  let scrollAmount = 1; // pixels per frame
  let scrollOffset = 0;

  function scrollBanner() {
      scrollOffset -= scrollAmount;
      requestAnimationFrame(() => {
          bannerText.style.transform = `translateX(${scrollOffset}px)`;
          updateOpacity();
      });
      // When the first phrase has fully scrolled out, reset
      if (Math.abs(scrollOffset) >= bannerText.offsetWidth / repeatCount) {
        scrollOffset = 0;
      }
    
      requestAnimationFrame(scrollBanner);
  }
  scrollBanner();
}, 1000);

// Proximity transparency logic
let clientX = Infinity;
let clientY = Infinity;
let oldClientX = Infinity;
let oldClientY = Infinity;

// const trailPhrase = ("made yo gullible ahh look [dab] ").replace(/ /g, "      ").replace("[dab]", "ヽ( •_)ᕗ").split(" ");
// const trailPhrase = ["JUSTIN CHUA IS THE BASED GOAT!!!"];
// const trailPhrase = ["JUSTIN", "", "", "", "", "", "", "CHUA", "", "", "", "", "", "", "IS", "", "", "", "", "", "", "THE", "", "", "", "", "", "", "BASED", "", "", "", "", "", "", "GOAT", "", "", "", "", "", "", ""]
const trailPhrase = [["0", "1"], ["★", "✦", "✧", "✩", "✪"]][Math.floor(Math.random() * 2)];
let phrase_iter = 0;
  trailContainer = document.createElement("div");
  trailContainer.id = "cursor-trail-container";
  document.body.appendChild(trailContainer);

document.addEventListener("mousemove", e => {
  clientX = e.clientX;
  clientY = e.clientY;

  // Cursor trail
  const bit = document.createElement("span");
  bit.textContent = trailPhrase[phrase_iter];
  phrase_iter = phrase_iter === trailPhrase.length - 1 ? 0 : phrase_iter + 1;
  bit.className = "floating-bit";
  const values = window.getComputedStyle(document.body).transform.match(/matrix\(([^)]+)\)/);
  const parts = values[1].split(',').map(v => parseFloat(v.trim()));
  bit.style.left = `${window.scrollX-parts[4]+clientX-5}px`;
  bit.style.top =  `${window.scrollY-parts[5]+clientY-10}px`;
  trailContainer.appendChild(bit);

//   // Force layout so the browser registers the initial state
//   getComputedStyle(bit).opacity;

  // Calculate movement vector
  const dx = clientX - oldClientX;
  const dy = clientY - oldClientY;

  requestAnimationFrame(() => {
    bit.style.opacity = 0; // fade out
    // Move in the direction of mouse movement, scaled for effect
    bit.style.transform = `translate(${dx * 2}px, ${dy * 2}px)`;
  });

  setTimeout(() => bit.remove(), timeout);

  // Update old coordinates for next frame
  oldClientX = clientX;
  oldClientY = clientY;
});

function updateOpacity() {
    bannerText.querySelectorAll("span").forEach(span => {
      const rect = span.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let distance = Math.sqrt((clientX - centerX) ** 2 + (clientY - centerY) ** 2) ** 3;
      const radius = 100000000; // pixels

      if (distance < radius) {
        span.style.opacity = distance / radius; // 0 at center, 1 at edge
      } else {
        span.style.opacity = 1
      }
    });
}

// Check if a charset meta tag already exists
let metaCharset = document.querySelector('meta[charset]');
if (!metaCharset) {
  // Create the meta tag
  metaCharset = document.createElement('meta');
  metaCharset.setAttribute('charset', 'UTF-8');

  // Insert it at the beginning of <head>
  document.head.insertBefore(metaCharset, document.head.firstChild);
}

document.addEventListener("click", e => {
    // Make a yellow circle explosion blast every click
    if (true) { // Circles
  const multiples = [2, 3, 4, 12];
  const numCircles = multiples[Math.floor(Math.random() * multiples.length)];
  const radius = 200; // 60; // final distance from center

  // Create a container anchored at the cursor
  const container = document.createElement("div");
  container.className = "burst-container";
  container.style.left = e.pageX + "px";
  container.style.top = e.pageY + "px";
  document.body.appendChild(container);

  // Create evenly spaced circles
  for (let i = 0; i < numCircles; i++) {
    const c = document.createElement("div");
    c.className = "burst-circle";
    const angle = (360 / numCircles) * i;
    c.style.setProperty("--angle", angle + "deg");
    c.style.setProperty("--radius", radius + "px");
    container.appendChild(c);
    c.addEventListener("animationend", () => c.remove());
  }

  container.addEventListener("animationend", () => container.remove());
    }
    
    if (false) { // Explosion
  const numParticles = 12;
  for (let i = 0; i < numParticles; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    // random direction
    const angle = (Math.PI * 2 * i) / numParticles;
    const distance = 40 + Math.random() * 20;
    const dx = Math.cos(angle) * distance + "px";
    const dy = Math.sin(angle) * distance + "px";
    p.style.setProperty("--dx", dx);
    p.style.setProperty("--dy", dy);
    p.style.left = e.pageX + "px";
    p.style.top = e.pageY + "px";
    document.body.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
    }
});

let ctrlHeld = false
let altHeld = false
let soundboardActive = false;
let currentMeme = [];
let permaMemeTimeout;
const audios = [];
// To include an unblocked meme, upload to GitHub, and copy image address
const memePopupTime = .5;
const memes = [
    // Online
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBSWYR-VQcx1KhAoOh4T5U74hmNauGSVgmmgBnHeECk7U3Z3NbRRrnmBoP:https://i.scdn.co/image/ab67616d00001e02eaf1fcbc9f49682325efe9db&s=10",
    "https://media.tenor.com/nW6YblNGXocAAAAe/an-iq-too-low.png",
    "https://media.tenor.com/N8mABRAlDpsAAAAe/get-out-sign-the-doors-right-there-pal.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg12stH_jV6JrXDiJfErZaAyeDT5_UmPqt9cf5YWn3zhYyWOv8sptJjj6p:https://static01.nyt.com/images/2016/08/05/us/05onfire1_xp/05onfire1_xp-articleLarge-v2.jpg%3Fquality%3D75%26auto%3Davif%26disable%3Dupscale&s=10",    

    // Personal
    "https://raw.githubusercontent.com/justinc1539/My-Projects/a370f62da3a0749703db518aa0d72f12ff619f06/salih%20slimed.PNG",
    "https://raw.githubusercontent.com/justinc1539/My-Projects/refs/heads/main/testImgs/gothamchess.png",
    "https://raw.githubusercontent.com/justinc1539/My-Projects/refs/heads/main/testImgs/ham%20(TKAM).png",
    "https://raw.githubusercontent.com/justinc1539/My-Projects/refs/heads/main/testImgs/jaineil%20is%20tung%20tung%20sahir%20(ded%20meme).png",
    "https://raw.githubusercontent.com/justinc1539/My-Projects/refs/heads/main/testImgs/yaseen%20ayo%20what.png",
    "https://raw.githubusercontent.com/justinc1539/My-Projects/refs/heads/main/testImgs/yaseen%20please.png",
];
let command = ""
let bgImgSrcIter = 1;

// Listen for tab switching
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Reset key states when tab is hidden
    ctrlHeld = false;
    altHeld = false;
    console.log("Tab switched out: ctrlHeld and altHeld reset to false");
  }
});

function blockEvents(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
}

document.addEventListener('keydown', (event) => {
    // Check if the pressed key is 'p' (case-sensitive by default)
    if (event.key === '\\' && ctrlHeld && altHeld) {
        blockEvents(event);
        command = prompt("Enter your command here:", command);
        let output = "SyntaxError"
        try {
            const meta = document.createElement('meta');
            meta.httpEquiv = "Content-Security-Policy";
            meta.content = "script-src 'self' 'unsafe-eval';";
            document.head.appendChild(meta);
            output = eval(command);
        } catch (error) {
            output = error;
        } finally {
            alert(`You asked:\n${command}\nOutput:\n${output}`);
            ctrlHeld = false;
            altHeld = false;
        }
    } else if (event.key === 'b' && ctrlHeld && altHeld) {
        blockEvents(event);
        bgImgSrcIter++;
        if (bgImgSrcIter >= bgImgSrcs.length) {
            bgImg.style.display = "none";
            bgImgSrcIter = -1;
        } else {
            bgImg.style.display = "";
            bgImg.src = bgImgSrcs[bgImgSrcIter];
            bgImg.style.zIndex = bgImgSrcIter === 2 ? `${2**31}` : "";
        }
    } else if (event.key === 'ArrowDown' && ctrlHeld && altHeld) {
        blockEvents(event);
        bgImg.style.opacity = Math.max(0, parseFloat(bgImg.style.opacity) - .05);
        bgImg.style.pointerEvents = "none";
    } else if (event.key === 'ArrowUp' && ctrlHeld && altHeld) {
        blockEvents(event);
        bgImg.style.opacity = Math.min(1, parseFloat(bgImg.style.opacity) + .05);
        bgImg.style.pointerEvents = bgImg.style.opacity == 1 ? "" : "none";
    } else if (event.key === "Control") {
        ctrlHeld = true;
    } else if (event.key === "Alt") {
        altHeld = true;
    }
    if (url.startsWith("https://web.kamihq.com/web/viewer.html")) {
        if (event.key === "." && ctrlHeld) {
            blockEvents(event);
            document.querySelector("button[value=super]").click();
        } else if (event.key === "," && ctrlHeld) {
            blockEvents(event);
            document.querySelector("button[value=sub]").click();
        } else if (event.key === "b" && ctrlHeld) {
            blockEvents(event);
            document.querySelector("button[title=bold]").click();
        } else if (event.key === "i" && ctrlHeld) {
            blockEvents(event);
            document.querySelector("button[title=italic]").click();
        } else if (event.key === "u" && ctrlHeld) {
            blockEvents(event);
            document.querySelector("button[title=underline]").click();
        } else if (event.key === "%" && altHeld) {
            blockEvents(event);
            document.querySelector("button[title='strike through']").click();
        }
    }
    if (ctrlHeld && event.key === "S") {
        soundboardActive = !soundboardActive;
        if (soundboardActive) alert(`V - Vine Boom
B - Bruh
G - Get Out
O - Oh My`);
        else {
            audios.forEach(audioObject => {
                audioObject.pause();
                audioObject.src = ""; // Clears the source string
                audioObject.load();   // Forces the element to update and release resources
            });
            audios.length = 0;
            alert("Soundboard Off");
        }
    }
    if (soundboardActive) {
        if (event.key === "0" && event.altKey) {
            blockEvents(event);
            audios.forEach(audioObject => {
                audioObject.pause();
                audioObject.src = ""; // Clears the source string
                audioObject.load();   // Forces the element to update and release resources
            });
            audios.length = 0;
        }

        else if (event.key === "v") {
            blockEvents(event);
            const vineBoom = new Audio('https://www.myinstants.com/media/sounds/vine-boom-hq-longer.mp3');
            vineBoom.currentTime = 0; // Rewind to start if pressed rapidly
            audios.push(vineBoom);
            vineBoom.play().catch(error => {
              console.warn('Audio playback requires prior user interaction with the page:', error);
            });
        } else if (event.key === "b") {
            blockEvents(event);
            const bruh = new Audio('https://www.myinstants.com/media/sounds/bruh-sound-effect_WstdzdM.mp3');
            bruh.currentTime = 0; // Rewind to start if pressed rapidly
            audios.push(bruh);
            bruh.play().catch(error => {
              console.warn('Audio playback requires prior user interaction with the page:', error);
            });
        } else if (event.key === "g") {
            blockEvents(event);
            const getOut = new Audio('https://www.myinstants.com/media/sounds/tuco-get-out.mp3');
            getOut.currentTime = 0; // Rewind to start if pressed rapidly
            audios.push(getOut);
            getOut.play().catch(error => {
              console.warn('Audio playback requires prior user interaction with the page:', error);
            });
        } else if (event.key === "o") {
            blockEvents(event);
            const ohMy = new Audio('https://www.myinstants.com/media/sounds/oh-my-god-bro-oh-hell-nah-man.mp3');
            ohMy.currentTime = 0; // Rewind to start if pressed rapidly
            audios.push(ohMy);
            ohMy.play().catch(error => {
              console.warn('Audio playback requires prior user interaction with the page:', error);
            });
        }

        else if (/^Digit[0-9]$/.test(event.code)) {
            blockEvents(event);
            memeIter = event.code.replace("Digit", "");
            memeIter--;
            if (memeIter === -1) memeIter = Math.floor(memes.length * Math.random());
            if (memeIter < memes.length) {
                if (event.shiftKey) {
                    
                    // MEME TODO: see what's wrong
                    if (currentMeme[0]) {
                        // 4. Remove the clone temporarily after a set time (e.g., 3 seconds)
                        currentMeme[0].style.opacity = 0;
                        clearTimeout(permaMemeTimeout)
                        if (currentMeme[1] === memeIter) {
                            permaMemeTimeout = setTimeout(() => {
                                currentMeme[0].remove(); // or originalImg.parentNode.removeChild(currentMeme[0])
                            }, 1000*memePopupTime);
                        } else {
                            currentMeme[0].remove();
                        }
                        currentMeme[0] = null;
                    }

                    if (currentMeme[1] !== memeIter) {
                        // 1. Play vine boom obviously
                        const vineBoom = new Audio('https://www.myinstants.com/media/sounds/vine-boom-hq-longer.mp3');
                        vineBoom.currentTime = 0; // Rewind to start if pressed rapidly
                        audios.push(vineBoom);
                        vineBoom.play().catch(error => {
                          console.warn('Audio playback requires prior user interaction with the page:', error);
                        });
    
                        // 2. Clone the image (false means shallow copy, which is enough for an <img>)
                        const clonedImg = bgImg.cloneNode(false);
                        
                        // Optional: Change an attribute like id or class to prevent duplicate IDs
                        clonedImg.id = 'tempImageClone';
                        clonedImg.src = memes[memeIter];
    
                        clonedImg.style.position = 'fixed';
                        clonedImg.style.top = '0';
                        clonedImg.style.left = '0';
                        clonedImg.style.width = '100vw';
                        clonedImg.style.height = '100vh';
                        clonedImg.style.objectFit = 'fill'; // Distorts the image to fit exact dimensions
                        clonedImg.style.pointerEvents = 'none'; // Optional: lets clicks pass through
    
                        clonedImg.style.opacity = 1;
                        clonedImg.style.transition = `opacity ${memePopupTime}s ease-in-out`;
                        
                        // 3. Temporarily append the clone to the DOM (e.g., inside the body or a container)
                        document.body.appendChild(clonedImg);
                        currentMeme[0] = clonedImg;
                        currentMeme[1] = memeIter;
                    } else {
                        clearTimeout(permaMemeTimeout)
                        currentMeme[1] = null;
                    }
                } else {
                    // 1. Play vine boom obviously
                    const vineBoom = new Audio('https://www.myinstants.com/media/sounds/vine-boom-hq-longer.mp3');
                    vineBoom.currentTime = 0; // Rewind to start if pressed rapidly
                    audios.push(vineBoom);
                    vineBoom.play().catch(error => {
                      console.warn('Audio playback requires prior user interaction with the page:', error);
                    });

                    // 2. Clone the image (false means shallow copy, which is enough for an <img>)
                    const clonedImg = bgImg.cloneNode(false);
                    
                    // Optional: Change an attribute like id or class to prevent duplicate IDs
                    clonedImg.id = 'tempImageClone';
                    clonedImg.src = memes[memeIter];

                    clonedImg.style.position = 'fixed';
                    clonedImg.style.top = '0';
                    clonedImg.style.left = '0';
                    clonedImg.style.width = '100vw';
                    clonedImg.style.height = '100vh';
                    clonedImg.style.objectFit = 'fill'; // Distorts the image to fit exact dimensions
                    clonedImg.style.pointerEvents = 'none'; // Optional: lets clicks pass through

                    clonedImg.style.opacity = 1;
                    clonedImg.style.transition = `opacity ${memePopupTime}s ease-in-out`;
                    
                    // 3. Temporarily append the clone to the DOM (e.g., inside the body or a container)
                    document.body.appendChild(clonedImg);

                    // 4. Remove the clone temporarily after a set time (e.g., 3 seconds)
                    setTimeout(() => {
                      clonedImg.style.opacity = 0;
                      setTimeout(() => {
                        clonedImg.remove(); // or originalImg.parentNode.removeChild(clonedImg)
                      }, 1000*memePopupTime);
                    }, 500);
                }
            }
        }
    }
}, { capture: true, passive: false });  // Run this listener during the capture phase instead of the default bubble phase.

window.addEventListener('keyup', event => {
    if (soundboardActive) blockEvents(event);
}, { capture: true, passive: false });
document.addEventListener('keyup', event => {
    if (soundboardActive) blockEvents(event);
}, { capture: true, passive: false });

// Inspired by the login_success=1 URL parameter every time I get auto-logged out and have to log back in
if (window.location.href === "https://pcti.instructure.com/?login_success=0") {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
    document.body.textContent = "login failed fahhh";
}
// Determine Current Period VVVVV - Time Tracker program - (time-period-tracker.js)
function formatTime(minutes, includeEnd=0) {
    const hour = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const meridiem = hour > 12 ? "PM" : "AM";
    let timeString = `${hour % 12 === 0 ? "12" : hour % 12}:${String(mins).padStart(2, "0")} ${meridiem}`;
    if (includeEnd) timeString += `-${formatTime(minutes + includeEnd)}`
    return timeString;
}

function getCurrentPeriodStr(dayType, mins, times, periodLength, firstPeriodExtra, breakTime) {
    // Period 1 Extra: {normal: +6; delayed: +12; half: +4}
    // Break: {normal: +5; delayed: +4; half: +5}
    // Tell me why Delayed Opening gives 1st period a whole 12 EXTRA MINUTES and only gives us 4 minutes of break instead of 5
    for (let i = 0; i < times.length; i++) {
        if (mins < times[i]) {
            if (i === 0) return `Before School (<${formatTime(times[0])})`;
            if (i === 1) return `Period 1 (${formatTime(times[0], periodLength + firstPeriodExtra)})`;
            return `Period ${i} (${formatTime(times[i-1] + breakTime, periodLength)})`;
        }
    }
    return `After School (>${formatTime(times[times.length - 1])})`;
}

function getCurrentPeriod(dayType) {
    const mins = getMinutes();

    function getMinutes() {
        const now = new Date();
        // return now.getHours() * 60 + now.getMinutes();
        const njHour = parseInt(now.toLocaleString("en-US", { timeZone: "America/New_York", hour: "2-digit", hour12: false }), 10);
        const njMinute = parseInt(now.toLocaleString("en-US", { timeZone: "America/New_York", minute: "2-digit" }), 10);
        
        return njHour * 60 + njMinute;
    }

    let period = "";
    if (dayType === "normal") period = getCurrentPeriodStr(dayType, mins, [490, 536, 581, 626, 671, 716, 761, 806, 851, 896], 40, 6, 5);
    else if (dayType === "half") period = getCurrentPeriodStr(dayType, mins, [490, 522, 555, 588, 621, 654, 687, 720, 753, 786], 28, 4, 5);
    else if (dayType === "delayed") period = getCurrentPeriodStr(dayType, mins, [600, 640, 672, 704, 736, 768, 800, 832, 864, 896], 28, 12, 4);
    else period = 'Invalid day type (must be "normal", "half", or "delayed")';

    return period;
}

// Black Box Window
(function() {
    // Create the box
    const box = document.createElement("div");
    box.id = "timeBox";
    box.style.position = "fixed";        // fixed beats Canvas layout
    box.style.top = "10px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.padding = "6px 10px";
    box.style.background = "black";
    box.style.color = "white";
    box.style.fontFamily = "monospace";
    box.style.fontSize = "12px";
    box.style.borderRadius = "4px";
    box.style.cursor = "move";
    box.style.zIndex = "2147483646";      // Canvas can't beat this
    // box.textContent = new Date().toLocaleTimeString();
    document.body.appendChild(box);

    // Update time every second
    setInterval(() => {
        const dayType = "normal"; // Time Tracker: Not a Normal School Day? Not a Full Day? Change This!
        // box.textContent = new Date().toLocaleTimeString();
        currentTime = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" });
        box.textContent = `${currentTime} ${getCurrentPeriod(dayType)}`;
        
        const displayPeriodEnd = className => {
            for (let i = 0; i < 10; i++) {
                alert(`${className} is ending!`);
            }
        }

        // Optional TTTODO: Make function with array courses, arrray times (either values or a list including value and value to subtract from first value)
        // TTTODO: add lunch time ends!
        if (dayType === "normal") {
            if (currentTime === "8:55:20 AM") displayPeriodEnd("AP Physics C: Mechanics");
            else if (currentTime === "9:40:20 AM") displayPeriodEnd("AP Calculus B/C");
            else if (currentTime === "10:25:20 AM") displayPeriodEnd("Health");
            else if (currentTime === "11:09:20 AM") displayPeriodEnd("APUSH");
            else if (currentTime === "11:55:20 AM") displayPeriodEnd("English 4 (H)");
            else if (currentTime === "12:38:20 PM") displayPeriodEnd("AP Statistics");
            else if (currentTime === "1:02:20 PM") displayPeriodEnd("Lunch");
            else if (currentTime === "2:55:20 PM") displayPeriodEnd("AP Computer Science A");
        } else if (dayType === "half") {
            if (currentTime === "8:41:20 AM") displayPeriodEnd("AP Physics C: Mechanics");
            else if (currentTime === "9:14:20 AM") displayPeriodEnd("AP Calculus B/C");
            else if (currentTime === "9:47:20 AM") displayPeriodEnd("Health");
            else if (currentTime === "10:19:20 AM") displayPeriodEnd("APUSH");
            else if (currentTime === "10:53:20 AM") displayPeriodEnd("English 4 (H)");
            else if (currentTime === "11:24:20 AM") displayPeriodEnd("AP Statistics");
            else if (currentTime === "11:42:20 PM") displayPeriodEnd("Lunch");
            else if (currentTime === "1:05:20 PM") displayPeriodEnd("AP Computer Science A");
        } else if (dayType === "delayed") {
            if (currentTime === "10:39:20 AM") displayPeriodEnd("AP Physics C: Mechanics");
            else if (currentTime === "11:11:20 AM") displayPeriodEnd("AP Calculus B/C");
            else if (currentTime === "11:43:20 AM") displayPeriodEnd("Health");
            else if (currentTime === "12:14:20 PM") displayPeriodEnd("APUSH");
            else if (currentTime === "12:47:20 PM") displayPeriodEnd("English 4 (H)");
            else if (currentTime === "1:18:20 PM") displayPeriodEnd("AP Statistics");
            else if (currentTime === "1:34:20 PM") displayPeriodEnd("Lunch");
            else if (currentTime === "2:55:20 PM") displayPeriodEnd("AP Computer Science A");
        }
    }, 100);

    // Dragging logic
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    box.addEventListener("mousedown", e => {
        event.preventDefault();
        isDragging = true;

        // Remove centering transform once dragging starts
        box.style.transform = "";

        offsetX = e.clientX - box.getBoundingClientRect().left;
        offsetY = e.clientY - box.getBoundingClientRect().top;
    });

    window.addEventListener("mousemove", e => {
        if (!isDragging) return;
        box.style.left = e.clientX - offsetX + "px";
        box.style.top = e.clientY - offsetY + "px";
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Canvas sometimes re-renders the page.
    // This keeps your box visible even if Canvas tries to remove it.
    setInterval(() => {
        if (!document.getElementById("timeBox")) {
            document.body.appendChild(box);
        }
    }, 500);
})();
// Determine Current Period ^^^^^
document.addEventListener('keyup', (event) => {
    if (event.key === "Control") {
        ctrlHeld = false;
    } else if (event.key === "Alt") {
        altHeld = false;
    }
});
// Reset state if window loses focus to prevent stuck keys
window.addEventListener('blur', () => {
    ctrlHeld = false;
    altHeld = false;
});
const cmdPopup = false;
if (cmdPopup) {
    showPopup("Press 'Ctrl+\\' to enter a command! -Justin")
}

function enableBackgroundOverlay() {
    // Disable old img.html
    const oldImg = document.getElementsByClassName("bg-image")[0];
    if (oldImg) oldImg.style.display = "none";
    
    // Create <style> for the overlay
    const style = document.createElement("style");
    style.id = "bg-overlay-style";
    style.textContent = `
        .bg-image-overlay {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 2147483646;
        }
    `;
    document.head.appendChild(style);

    // Create the <img> overlay
    const img = document.createElement("img");
    img.id = "bg-overlay-img";
    img.className = "bg-image-overlay";
    const srcs = [
        "https://media.tenor.com/H9lW6EsIj9oAAAAM/stars.gif",
        "https://media1.tenor.com/m/-pPezftYe2MAAAAd/cinnabon-cinnamon-roll.gif",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYLRHSHI_3WslVsTDkOhsux7Wne4daPCu5hU8185W_T0AVss7O1TMd_OLf:https://upload.wikimedia.org/wikipedia/commons/2/21/Solid_black.svg%3Futm_source%3Dsimple.wikipedia.org%26utm_campaign%3Dindex%26utm_content%3Doriginal&s",
        "https://media1.tenor.com/m/W_mXv1jxr8oAAAAd/the-show-down-alan-becker.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExamlnZGU5ZGNlZHQxMnV0MnRvcWdxamhhamVoZGg2aHMwN3BiZ2Y1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V4NSR1NG2p0KeJJyr5/giphy.gif",
        "https://cdn.shopify.com/s/files/1/0925/7290/files/2Ho3c.gif?4157969559071305091",
        "https://media.tenor.com/5L8h9023VmIAAAAi/cat-funny.gif",
    ];
    if (bgImgSrcIter < 0 || bgImgSrcIter >= srcs.length) {
        img.style.display = "none";
    } else {
        img.src = srcs[bgImgSrcIter];
    }
    img.alt = "Background Overlay";
    img.style.opacity = 0.15;
    img.style.pointerEvents = "none";

    document.body.appendChild(img);
    return {img, srcs};
}

// Uncomment this line to enable the overlay:
const {img: bgImg, srcs: bgImgSrcs} = enableBackgroundOverlay();
} catch (_) {alert(_);}

// YouTube Iframe Player API
// setInterval(() => {document.querySelector('video').playbackRate = 15.0;}, 1);

// 1. Load the YouTube Iframe Player API asynchronously
let tag = document.createElement('script');
tag.src = "https://youtube.com"; // Or "https://youtube.com"
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

// 2. This function creates the player object once the API downloads
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube_player', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

// 3. Change the speed once the player is ready
function onPlayerReady(event) {
    // Set speed: 0.25, 0.5, 1, 1.5, or 2
    player.setPlaybackRate(1); 
}

// Alternative: Change speed later via a button click
function changeSpeed(speed) {
    try{
    if (player && typeof player.setPlaybackRate === 'function') {
        player.setPlaybackRate(speed);
    }
    } catch(e){alert(e.stack)}
}

setInterval(() => {changeSpeed(2)}, 1);
