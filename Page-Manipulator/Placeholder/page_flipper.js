// V9.27.2026
// Active websites: all
document.addEventListener('keydown', function(event) {
    // Check if Ctrl key is held down and Left Arrow (37) or Right Arrow (39) was pressed
    if (event.ctrlKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        const currentUrl = window.location.href;

        // Regular expression to match the very last digits in the URL
        const regex = /(\d+)(?=[^\d]*$)/;
        const match = currentUrl.match(regex);

        if (match) {
            event.preventDefault();
            event.stopImmediatePropagation();
            const currentNumber = parseInt(match[0], 10);
            let newNumber = currentNumber;

            if (event.key === 'ArrowRight') {
                newNumber += 1;
            } else if (event.key === 'ArrowLeft') {
                // Prevent going below 0 or 1 if desired
                newNumber = Math.max(0, currentNumber - 1);
            }

            // Replace only the last number with the updated value
            const newUrl = currentUrl.replace(regex, newNumber);

            // Navigate to the new URL
            window.location.href = newUrl;
        }
    }
});