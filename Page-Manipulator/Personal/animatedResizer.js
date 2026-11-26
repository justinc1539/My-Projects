// V11.26.2026
const img = document.querySelector("#image");
if (img) {
    const imgWidth = img.width;
    const imgHeight = img.height;

    const resizedNotice = document.querySelector("#resized_notice");
    if (resizedNotice) {
        Post.highres(); $('resized_notice').hide(); Note.sample=false;
        img.width = imgWidth;
        img.height = imgHeight;
    }
}
