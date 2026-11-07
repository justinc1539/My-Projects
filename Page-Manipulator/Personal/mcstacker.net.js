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

    function newCmd(numID, iterations) {
        console.log(`newCmd(${numID}, ${iterations})`)
        // Confirm Command
        const command = prompt("Enter command here:");
        if (!command) return alert("Please try again.");
        
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
            iterations++;
            if (iterations === 2) currentID = 3;
            if (iterations > 2) {
                addPassenger(`Passengers${currentID}Pane`);
                currentID += 2;
            }
            newCmd(currentID, iterations);
        })
    const endBtn = document.createElement("button");
        endBtn.style.position = "fixed";
        endBtn.style.top = "60px";
        endBtn.style.left = "10px";
        endBtn.style.zIndex = "2147483646";   // make sure it's above everything
        endBtn.style.padding = "10px 15px";
        endBtn.style.fontSize = "16px";
        endBtn.textContent = "Finish Command Chain";
        document.body.appendChild(endBtn);
        endBtn.addEventListener("click", () => {
            // document.querySelector(`#passengerEntity_${currentID} a`).click();
            newCmdBtn.style.display = "none";
            endBtn.style.display = "none";
        })
}
