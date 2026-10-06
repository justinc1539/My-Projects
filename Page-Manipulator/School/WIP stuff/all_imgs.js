// Active website: https://www.gutenberg.org/files/25344/25344-h/25344-h.htm
const originalHTML = document.body.innerHTML; // or any specific container's innerHTML

// Create a temporary container to parse the HTML
const temp = document.createElement('div');
temp.innerHTML = originalHTML;

// Remove all non-<img> elements
temp.querySelectorAll('*:not(img)').forEach(el => el.remove());

// Get the cleaned HTML with only <img> tags
const onlyImagesHTML = temp.innerHTML;

navigator.clipboard.writeText(onlyImagesHTML)
  .then(() => {
    alert('✅ Text copied to clipboard!');
  })
  .catch(err => {
    alert('❌ Failed to copy text:', err);
  });
document.body.innerHTML = onlyImagesHTML; // or assign it back to the DOM
