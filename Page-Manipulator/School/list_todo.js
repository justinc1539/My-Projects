// V11.9.2026
// Active Websites: All

// Fill in empty Canvas Refined Custom Tasks
// <span style="color:#cccccc;font-size:12px;margin-top:-2px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;box-sizing:border-box;padding-right:22px;">
setInterval(() => {
    document.querySelectorAll('span[style="color:#cccccc;font-size:12px;margin-top:-2px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;box-sizing:border-box;padding-right:22px;"]').forEach(ele => {
        ele.innerHTML = "<span style='color:black'>Custom Task</span>";
    });
}, 1);

const classTODOs = [];

function toggleOnlyCustomTODO(customTODOs) {
    if (classTODOs.length > 0) {
        classTODOs.forEach(aDiv => {
            aDiv[0].style.display = "";
            aDiv[0].innerHTML = aDiv[1];
        });
        classTODOs.length = 0;
        customTODOs.textContent = "-";
    } else {
        document.querySelectorAll(".todo-group-list").forEach(aList => {
            aList.querySelectorAll("div div div div").forEach(aDiv => {
                if (aDiv.querySelector("span") && !(aDiv.querySelector("span span")  )) {
                    classTODOs.push([aDiv, aDiv.innerHTML]);
                    aDiv.style.display = "none";
                }
            });
        });
        customTODOs.textContent = "+";
    }
}

function outOfBounds(element) {
  const rect = element.getBoundingClientRect();

  const directions = [];
  if (rect.top < 0) directions.push("top");
  if (rect.left < 0) directions.push("left");
  if (rect.bottom > (window.innerHeight || document.documentElement.clientHeight)) directions.push("bottom");
  if (rect.right > (window.innerWidth || document.documentElement.clientWidth)) directions.push("right");
  return directions;
}

function toggleMin(box, minimize, minimizeTutorial, customTODOs, customTODOsTutorial) {
    // Minimize feature
    if (box.style.maxHeight === "600px") {
        box.style.maxWidth = "80px";
        box.style.minWidth = "80px";
        box.style.maxHeight = "80px";
        box.style.overflowX = "auto";
        box.style.overflowY = "none";
        minimize.textContent = "+";
        minimizeTutorial.textContent = "";
        customTODOs.style.display = "none";
        customTODOsTutorial.textContent = "";
        // document.getElementById("Toggle Minimize feature").addEventListener("click", e => {
        //     toggleMin(box);
        // });
    } else {
        box.style.maxWidth = "250px";
        box.style.minWidth = "250px";
        box.style.maxHeight = "600px";
        box.style.overflowX = "auto";
        box.style.overflowY = "auto";
        minimize.textContent = "-";
        minimizeTutorial.textContent = " <-- Minimize";
        customTODOs.style.display = "";
        customTODOsTutorial.textContent = " <-- Custom TODOs only";
        box.appendChild(document.querySelector("#canvasrefined-todo-list"));
        // document.getElementById("Toggle Minimize feature").addEventListener("click", e => {
        //     toggleMin(box);
        // });
    }
}

(async () => {
    await (async () => {
        // Only list view has PlannerHeader
        while (!document.querySelector('.PlannerHeader-styles__root.PlannerHeader[data-testid="PlannerHeader"]')) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    })();

    // Todo List Window
    // Create the box
    const box = document.createElement("div");
    box.id = "timeBox";
    box.style.position = "fixed";        // fixed beats Canvas layout
    box.style.top = 0;
    box.style.right = 0;
    box.style.padding = "6px 10px";
    box.style.background = "white";
    box.style.fontFamily = "monospace";
    box.style.fontSize = "20px";
    box.style.borderRadius = "4px";
    box.style.cursor = "move";
    box.style.zIndex = "999999999";      // Canvas can't beat this
    box.style.maxHeight = "600px";         /* Caps the height so it doesn't overflow the screen */
    box.style.maxWidth = "250px";           /* Caps the width to 80% of the viewport width */
    box.style.overflowY = "auto";          /* Enables vertical scrolling only when text overflows */
    box.style.overflowX = "auto";          /* Enables horizontal scrolling if text is a massive single line */
    box.style.minWidth = "250px";
    document.body.appendChild(box);
    
    const minimize = document.createElement("a");
    minimize.id = "Toggle Minimize feature";
    minimize.style.cursor = "pointer";
    minimize.style.fontSize = "50px";
    minimize.textContent = "-"; // Sets the visual minus sign
    const minimizeTutorial = document.createTextNode(" <-- Minimize");
    box.appendChild(minimize);
    box.appendChild(minimizeTutorial);
    
    // Add line break between sections
    box.appendChild(document.createElement("br"));
    
    const customTODOs = document.createElement("a");
    customTODOs.id = "Toggle Custom TODO feature";
    customTODOs.style.cursor = "pointer";
    customTODOs.style.fontSize = "50px";
    customTODOs.textContent = "-"; // Sets the visual minus sign
    customTODOsTutorial = document.createTextNode(" <-- Custom TODOs only");
    box.appendChild(customTODOs);
    box.appendChild(customTODOsTutorial);
    
    // Add TODO List to box
    box.appendChild(document.querySelector("#canvasrefined-todo-list"));
    
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

        // Check out of bounds
        const directions = outOfBounds(box);
        if (directions.includes("top")) box.style.top = 0;
        if (directions.includes("left")) box.style.left = 0;
        if (directions.includes("bottom")) {
            box.style.top = "auto";
            box.style.bottom = 0;
        }
        if (directions.includes("right")) {
            box.style.left = "auto";
            box.style.right = 0;
        }
    });
    
    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    document.getElementById("Toggle Minimize feature").addEventListener("click", e => {
        toggleMin(box, minimize, minimizeTutorial, customTODOs, customTODOsTutorial);
    });
    
    document.getElementById("Toggle Custom TODO feature").addEventListener("click", e => {
        toggleOnlyCustomTODO(customTODOs);
    });
    
    // Canvas sometimes re-renders the page.
    // This keeps your box visible even if Canvas tries to remove it.
    setInterval(() => {
        if (!document.getElementById("timeBox")) {
            document.body.appendChild(box);
        }
    }, 500);
})();

/*// TODO: show only custom tasks
document.querySelectorAll(".todo-group-list").forEach(aList => {
    aList.querySelectorAll("div div div div").forEach(aDiv => {
        if (!(aDiv.querySelector("span span")  )) { //  && aDiv.querySelector("span span").innerHTML === "Custom Task"
            if (aDiv.querySelector("span")) aDiv.style.display = "none";
            // parentElement
        }
    });
});*/
