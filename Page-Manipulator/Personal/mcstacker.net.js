// V11.7.2026
if (window.location.href.includes("mcstacker.net/?cmd=summon")) {
    function fallingBlockCmd(numID, command) {
        // Falling Block Command Block
        console.log(`fallingBlockCmd(${numID}, ${command})`)
        document.querySelector(`#entity${numID}`).focus();
        document.activeElement.value = 'falling_block';
        document.activeElement.dispatchEvent(new Event('change'));
        
        document.querySelector(`#block${numID}`).focus();
        document.activeElement.value = 'repeating_command_block';
        document.activeElement.dispatchEvent(new Event('change'));
        
        document.querySelector(`#auto${numID}`).focus();
        document.activeElement.value = '1';
        document.activeElement.dispatchEvent(new Event('change'));
        
        document.querySelector(`#Command${numID}`).focus();
        document.activeElement.value = command;
        document.activeElement.dispatchEvent(new Event('change'));
    }
    
    function armorStand(numID) {
        console.log(`armorStand(${numID})`)
        // Armor Stand (to prevent Command Block Destruction)
        document.querySelector(`#entity${numID}`).focus();
        document.activeElement.value = 'armor_stand';
        document.activeElement.dispatchEvent(new Event('change'));
        
        // document.querySelector(`#Small${numID}`).focus();
        // document.activeElement.value = '1';
        // document.activeElement.dispatchEvent(new Event('change'));
        
        document.querySelector(`#Invisible${numID}`).focus();
        document.activeElement.value = '1';
        document.activeElement.dispatchEvent(new Event('change'));
    }

    function newCmd(numID, iterations, command) {
        console.log(`newCmd(${numID}, ${iterations})`)
        
        // First Usage Exception
        // Optional TODO: have first commmand be "/execute at @p run kill @e[type=minecraft:armor_stand,dy=256,y=-64]"
        if (iterations === 1) {
            addPassenger(`Passengers0Pane`);
            fallingBlockCmd(0, command);
            return;
        }
        // Second Usage Exception
        else if (iterations === 2) {
            armorStand(2);
            
            // Ready next layer
            addPassenger(`Passengers0Pane`);

            fallingBlockCmd(3, command);
            return;
        }

        armorStand(numID - 1);
        
        // Ready next layer
        addPassenger(`Passengers${numID - 2}Pane`);
        
        fallingBlockCmd(numID, command);
    }
    
    const excludeChar = "#"; // <-- CHANGE EXCLUSION CHARACTER HERE
    let currentID = 0;
    let iterations = 0;
    
    const newCmdBtn = document.createElement("button");
        newCmdBtn.style.position = "fixed";
        newCmdBtn.style.top = "10px";
        newCmdBtn.style.left = "10px";
        newCmdBtn.style.zIndex = "2147483646";   // make sure it's above everything
        newCmdBtn.style.padding = "10px 15px";
        newCmdBtn.style.fontSize = "16px";
        newCmdBtn.textContent = "New Falling Command Block";
        document.body.appendChild(newCmdBtn);
        newCmdBtn.addEventListener("click", () => {
            // Confirm Command
            const command = prompt("Enter command here:");
            if (command) {
                iterations++;
                if (iterations === 2) currentID = 3;
                if (iterations > 2) {
                    addPassenger(`Passengers${currentID}Pane`);
                    currentID += 2;
                }
                newCmd(currentID, iterations, command);
                newCmdBtn.focus();
            } else alert("Please try again.");
        })
    const newCmdStackBtn = document.createElement("button");
        newCmdStackBtn.style.position = "fixed";
        newCmdStackBtn.style.top = "60px";
        newCmdStackBtn.style.left = "10px";
        newCmdStackBtn.style.zIndex = "2147483646";   // make sure it's above everything
        newCmdStackBtn.style.padding = "10px 15px";
        newCmdStackBtn.style.fontSize = "16px";
        newCmdStackBtn.textContent = "New Falling Command Block Stack";
        document.body.appendChild(newCmdStackBtn);
        newCmdStackBtn.addEventListener("click", () => {
            // Confirm Command
            const commandList = prompt(`Enter command list here (seperate with new line and use "${excludeChar}" before a line to exclude it):`)
                .split("\n")
                .filter(command => command.trimEnd().length > 0 && !command.startsWith(excludeChar));
            if (commandList.length <= 9) commandList.forEach(command => {
                command = command.trimEnd();
                iterations++;
                if (iterations === 2) currentID = 3;
                if (iterations > 2) {
                    addPassenger(`Passengers${currentID}Pane`);
                    currentID += 2;
                }
                newCmd(currentID, iterations, command);
                newCmdStackBtn.focus();
            });
            else alert("Please do not use more than 9 commands for performance.")
        })
    const endBtn = document.createElement("button");
        endBtn.style.position = "fixed";
        endBtn.style.top = "110px";
        endBtn.style.left = "10px";
        endBtn.style.zIndex = "2147483646";   // make sure it's above everything
        endBtn.style.padding = "10px 15px";
        endBtn.style.fontSize = "16px";
        endBtn.textContent = "Finish Command Chain";
        document.body.appendChild(endBtn);
        endBtn.addEventListener("click", () => {
            newCmdBtn.remove();
            newCmdStackBtn.remove();
            endBtn.remove();
        })
}
