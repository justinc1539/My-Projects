// V10.10.2026
// Active websites: all

/* DOWNLOAD VID VVV
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

async function trimVideoFromElement(videoElement, startTime, duration) {
  // 1. Automatically grab the actual active source URL
  const videoUrl = videoElement.currentSrc || videoElement.src;
  
  if (!videoUrl) {
    console.error("No video source found on this element.");
    return;
  }

  try {
    // 2. Load FFmpeg web assembly if it hasn't been loaded yet
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    // 3. Smart Fetching Layer
    // Works for both network URLs ("https://...") AND local memory links ("blob:...")
    console.log(`Processing video source: ${videoUrl}`);
    const fileData = await fetchFile(videoUrl);

    // 4. Write file to FFmpeg virtual memory system
    ffmpeg.FS('writeFile', 'input.mp4', fileData);

    // 5. Run the fast, lossless trim command (-c copy skips re-encoding)
    await ffmpeg.run(
      '-ss', `${startTime}`, 
      '-i', 'input.mp4', 
      '-t', `${duration}`, 
      '-c', 'copy', 
      'output.mp4'
    );

    // 6. Read the resulting file back from memory
    const data = ffmpeg.FS('readFile', 'output.mp4');

    // 7. Trigger the browser download
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `trimmed_clip_${startTime}s.mp4`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log("Download started successfully!");

  } catch (error) {
    console.error("An error occurred during the clipping process:", error);
  }
}
DOWNLOAD VID ^^^ */

// Variables
const navModifiers = [0.05, 0.25, 1, 5, 30];
const speedModifiers = [0.0001, 0.001, 0.01, 0.1, 0.25, 0.5, 1, 5, 10];
const durationRounding = [null, -1, 2]
let highlightOutline = true;
let durationOutlineIndex = 2;
let currentIndex = 0;
let videos;

// Overlays
const videoOverlay = document.createElement('div');
videoOverlay.id = 'custom-video-overlay';
videoOverlay.overlayTimeout = null;
videoOverlay.clearTextTimeout = null;
videoOverlay.addEventListener('click', () => {
    clearTimeout(videoOverlay.overlayTimeout);
    clearTimeout(videoOverlay.clearTextTimeout);
    videoOverlay.clearTextTimeout = setTimeout(() => {videoOverlay.innerText = "";}, 200);
    videoOverlay.classList.remove('show');
});
document.body.appendChild(videoOverlay);

const durationOverlay = document.createElement('div');
durationOverlay.id = 'custom-video-overlay';
durationOverlay.overlayTimeout = null;
durationOverlay.clearTextTimeout = null;
durationOverlay.addEventListener('click', () => {
    clearTimeout(durationOverlay.overlayTimeout);
    clearTimeout(durationOverlay.clearTextTimeout);
    durationOverlay.clearTextTimeout = setTimeout(() => {durationOverlay.innerText = "";}, 200);
    durationOverlay.classList.remove('show');
});
durationOverlay.style.top = "90%";
document.body.appendChild(durationOverlay);

const styles = document.createElement('style');
styles.textContent = `
  #custom-video-overlay {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 18px;
    font-weight: bold;
    z-index: 999999; /* Ensures it sits on top of the video player */
    /*pointer-events: none;*/ /* Clicking through it still works but cannot disappear via clicking */
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    max-height: 200px;         /* Caps the height so it doesn't overflow the screen */
    max-width: 80vw;           /* Caps the width to 80% of the viewport width */
    overflow-y: auto;          /* Enables vertical scrolling only when text overflows */
    overflow-x: auto;          /* Enables horizontal scrolling if text is a massive single line */
    white-space: pre-wrap;     /* Optional: Forces long text blocks to break lines cleanly */
  }
  #custom-video-overlay.show {
    opacity: 1;
  }


  .highlighted {
    position: relative !important;
    outline: 4px solid #3b82f6 !important;
    outline-offset: 4px;
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
    transition: outline 0.2s ease-in-out;
  }
`;
document.head.appendChild(styles);

// Functions
function getDecimalCount(num) {
  if (Number.isInteger(num)) return 0;

  const cleanStr = (+num.toFixed(4)).toString(); // Capped at 4 decimals because 2**-4 is minimum value
  return cleanStr.split('.')[1].length;
}

function formatTime(seconds, truncation=null) {
    if (isNaN(seconds)) return seconds;
    let wholeSeconds = Math.floor(seconds);
    let fraction = String(seconds).split('.')[1];
    if (fraction) {
        fraction = "." + fraction;
        if (truncation !== null) fraction = fraction.slice(0, truncation + 1);
    } else if (truncation !== null && truncation > 0) fraction = "." + "0".repeat(truncation);
    else fraction = "";

    let hours = Math.floor(wholeSeconds / 3600);
    let minutes = Math.floor((wholeSeconds % 3600) / 60);
    if (minutes > 0 || hours > 0) minutes = String(minutes).padStart(2, "0") + ":";
    else minutes = "";
    if (hours > 0) hours = String(hours).padStart(2, "0") + ":";
    else hours = "";
    let secs = String(wholeSeconds % 60).padStart(2, "0");

    return `${hours}${minutes}${secs}${fraction}`;
}

function flashIndicator(text, showTime=1000, overlay=videoOverlay) {
  overlay.innerText = text;
  overlay.classList.add('show');
  
  clearTimeout(overlay.overlayTimeout); // Reset the hide timer if the user keeps pressing keys
  clearTimeout(overlay.clearTextTimeout);
  overlay.overlayTimeout = setTimeout(() => {
    overlay.clearTextTimeout = setTimeout(() => {overlay.innerText = "";}, 200);
    overlay.classList.remove('show');
  }, showTime);
}

/* // TODO: Why does the other highlightVideos() work?
function highlightVideos(theVids) {
    theVids.forEach(video => {
        // Prevent wrapping a video twice if the script runs again
        if (video.parentElement.classList.contains('video-highlight-container')) return;
    
        // Create the container element
        const container = document.createElement('div');
        container.className = 'video-highlight-container';
    
        // Insert the container right before the video in the DOM
        video.parentNode.insertBefore(container, video);
    
        // Move the video inside the container
        container.appendChild(video);
    
        // Make the video programmatically focusable
        video.setAttribute('tabindex', '0');
    })
}
*/
function highlightVideos(theVids) {
  theVids.forEach(video => {
    // Check if we've already highlighted this video
    if (video.dataset.highlighted === 'true') return;
    video.dataset.highlighted = 'true';

    // Ensure video is focusable without changing DOM structure
    video.setAttribute('tabindex', '0');

    // Create a visual overlay matching the video's bounding rect
    const rect = video.getBoundingClientRect();
    const highlightBox = document.createElement('div');
    highlightBox.className = 'video-highlight-overlay';
    
    // Style as an overlay without moving the video element
    Object.assign(highlightBox.style, {
      position: 'absolute',
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      pointerEvents: 'none', // Prevents blocking player UI clicks
      zIndex: '9999'
    });

    document.body.appendChild(highlightBox);
  });
}

function highlightVideo(index) {
  videos.forEach(video => {
    video.parentElement.classList.remove('highlighted');
  });

  if (index === null) return;
  
  if (index >= 0 && index < videos.length) {
    const targetVideo = videos[index];
    if (highlightOutline) targetVideo.parentElement.classList.add('highlighted');
    targetVideo.focus();
  }
}

function blockKeyEvents(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
}

async function waitForVideos() {
    while (document.querySelectorAll("video").length === 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return document.querySelectorAll("video");
}

// Main Script
(async () => {
    videos = await waitForVideos();

    setInterval(() => {
        videos = document.querySelectorAll("video");
        highlightVideos(videos);
        highlightVideo(currentIndex);
    }, 100);

    videos.forEach(video => {
        video.volume = 1;
    });

    setInterval(() => {
        if (currentIndex !== null) {
            videos.forEach(v => {
                if (durationOutlineIndex !== -1 && v === videos[currentIndex]) {
                    flashIndicator(`${formatTime(v.currentTime, durationRounding[durationOutlineIndex])} / ${formatTime(v.duration, durationRounding[durationOutlineIndex])}`, 1, durationOverlay);
                }
                if (v.replay) {
                    if (v.currentTime < v.replayStart || v.currentTime > v.replayEnd) {
                            v.currentTime = v.replayStart;
                        }
                }
                if (v.allowCuts) {
                    for (let i = 0; i < v.cuts.length; i++) {
                        if (v.cuts[i]) {
                            if (v.cuts[i][0] < v.currentTime && v.currentTime < v.cuts[i][1]) {
                                v.currentTime = v.cuts[i][1];
                            }
                        }
                    }
                }
            });
        }
    }, 1);
    
    flashIndicator("Ctrl + Shift + / for shortcuts", 3000);
    window.addEventListener("keydown", (event) => {
  // Selecting Video feature
  if (currentIndex !== null && event.key === "Escape") {
      blockKeyEvents(event);
      currentIndex = null;
      flashIndicator(`Disabled Program (Ctrl + \` to restart)`, 3000);
  } else if (currentIndex === null) {
      if (event.ctrlKey && event.key === "`") {
          blockKeyEvents(event);
          currentIndex = 0;
          flashIndicator(`Enabled Program (Esc to end)`, 3000);
      }
  } else if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName) && event.key === 'Tab') {
    blockKeyEvents(event);

    if (videos.length === 0 || currentIndex === null) return; // Make sure Tab/Shift + Tab only happens IF THERE IS AT LEAST 1 VIDEO

    if (event.shiftKey) {
      // Shift + Tab: Move backward
      currentIndex = currentIndex <= 0 ? videos.length - 1 : currentIndex - 1;
    } else {
      // Tab: Move forward
      currentIndex = currentIndex >= videos.length - 1 ? 0 : currentIndex + 1;
    }

    highlightVideo(currentIndex);
    flashIndicator(`Selected Video ${currentIndex+1}`);
  } else if (event.ctrlKey && event.altKey && ["H", "h"].includes(event.key)) {
      blockKeyEvents(event);
      highlightOutline = !highlightOutline;
      flashIndicator(`Outline ${highlightOutline ? "En" : "Dis"}abled`);
  } else if (event.ctrlKey && event.altKey && ["D", "d"].includes(event.key)) {
      blockKeyEvents(event);
      if (durationOutlineIndex === durationRounding.length - 1) {
          durationOutlineIndex = -1;
          flashIndicator("Video Duration Hidden");
      } else {
          durationOutlineIndex = (durationOutlineIndex + 1) % durationRounding.length;
          if (durationRounding[durationOutlineIndex] === null) {
              flashIndicator("Video Duration Shown");
          } else if (durationRounding[durationOutlineIndex] === -1) {
              flashIndicator("Video Duration Truncated to the nearest Second");
          } else {
              flashIndicator(`Video Duration Truncated to ${durationRounding[durationOutlineIndex]} Digits`);
          }
      }
  }

      if (videos.length > 0 && currentIndex !== null) (aVideo => {
        if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
            // Defining attributes
            if (!("replayStart" in aVideo)) aVideo.replayStart = 0;
            if (!("replayEnd" in aVideo)) aVideo.replayEnd = aVideo.duration;
            if (!("cuts" in aVideo)) aVideo.cuts = [];
            // TODO: change below ex-variables to attributes
            if (!("navModIter" in aVideo)) aVideo.navModIter = 3;
            if (!("speedModIter" in aVideo)) aVideo.speedModIter = 4;
            if (!("replay" in aVideo)) aVideo.replay = false;
            if (!("allowCuts" in aVideo)) aVideo.allowCuts = false;
            if (!("cutIter" in aVideo)) aVideo.cutIter = "";
            if (!("deleteCutIter" in aVideo)) aVideo.deleteCutIter = "";
            if (!("volMod" in aVideo)) aVideo.volMod = 0.1;
        
            const quality = aVideo.getVideoPlaybackQuality?.();
            const fps = (quality && quality.totalVideoFrames && quality.totalFrameDelay)
                ? quality.totalVideoFrames / quality.totalFrameDelay
                : 100;
            if (event.ctrlKey && event.key === "?") {
                flashIndicator(`Click this box to close\n\
====================================================================\n\
Selecting Video\n\
Esc - End Program\n\
Ctrl + \` - Restart Program\n\n\
Tab - Select Next Video\n\
Shift + Tab - Select Previous Video\n\n\
Ctrl + Alt + H - Hide Outline (in case it doesn't work or hides the video)\n\
Ctrl + Alt + D - Toggle Duration Outline\n\
====================================================================\n\
Play/Pause\n\
Space/K/Enter - Play/Pause\n\
====================================================================\n\
Controls\n\
Ctrl + Alt + C - Show all Controls\n\
Ctrl + Alt + L - Toggle Loop\n\
Ctrl + Alt + P - Toggle Picture-in-Picture\n\
====================================================================\n\
Navigation\n\
Comma - Go back 1 frame\n\
Period - Go forward 1 frame\n\n\
Numbers (0-9) = Go to percentage of video length\n\n\
Left Arrow - Go back by Navigation Modifier\n\
Right Arrow - Go forward by Navigation Modifier\n\
J - Go back by 2 * Navigation Modifier\n\
L - Go forward by 2 * Navigation Modifier\n\n\
Ctrl + Left Arrow - Decrease Navigation Modifier\n\
Ctrl + Right Arrow - Increase Navigation Modifier\n\
====================================================================\n\
Volume\n\
Up Arrow - Increase Volume by Volume Modifier\n\
Down Arrow - Decrease Volume by Volume Modifier\n\n\
Ctrl + Up Arrow - Increase Volume Modifier\n\
Ctrl + Down Arrow - Decrease Volume Modifier\n\n\
M - Toggle mute\n\
====================================================================\n\
Playback Rate/Speed\n\
Shift + Space - Reset Playback Rate and Speed Modifier\n\n\
Shift + Comma (Less Than) - Decrease Playback Rate by Speed Modifier\n\
Shift + Period (Greater Than) - Increase Playback Rate by Speed Modifier\n\n\
Ctrl + Shift + Comma (Ctrl + Less Than) - Decrease Speed Modifier\n\
Ctrl + Shift + Period (Ctrl + Greater Than) - Increase Speed Modifier\n\
====================================================================\n\
Replay\n\
Shift + Up Arrow - Cycle Enabling Replay and/or Cuts\n\
Shift + Down Arrow - Disable Replay and Cuts\n\n\
Shift + Left Arrow - Set Replay Start\n\
Shift + Right Arrow - Set Replay End\n\
====================================================================\n\
Cut\n\
Shift + Up Arrow - Cycle Enabling Replay and/or Cuts\n\
Shift + Down Arrow - Disable Replay and Cuts\n\n\
Shift + Numbers (0-9) - Set Cut Customization (e.g. Shift + 1 + 9 - Customize Cut 19)\n\
Shift + Left Arrow (while Customizing Cut) - Set Cut Start\n\
Shift + Right Arrow (while Customizing Cut) - Set Cut End\n\n\
Ctrl + Shift + Numbers (0-9) - Set Cut Deletion (e.g. Shift + 1 + 9 - Delete Cut 19)\n\n\
Ctrl + Shift - Finish Cut Customization/Confirm Cut Deletion`, 2**16);
            }
            // Playback Rate/Speed feature
            else if (event.shiftKey && event.key === " ") {
                blockKeyEvents(event);
                aVideo.speedModIter = 4;
                aVideo.playbackRate = 1;
                flashIndicator(`${aVideo.playbackRate}x ± ${speedModifiers[aVideo.speedModIter]}x`);
            } else if (event.ctrlKey && ["<", ">"].includes(event.key)) {
              if (event.key === ">") {
                aVideo.speedModIter = Math.min(aVideo.speedModIter + 1, speedModifiers.length - 1);
              } else {
                aVideo.speedModIter = Math.max(aVideo.speedModIter - 1, 0);
              }
              flashIndicator(`±${speedModifiers[aVideo.speedModIter].toFixed(getDecimalCount(speedModifiers[aVideo.speedModIter]))}x`);
            } else if (["<", ">"].includes(event.key)) {
              if (event.key === ">") {
                aVideo.playbackRate = Math.min(aVideo.playbackRate + speedModifiers[aVideo.speedModIter], 2**4);
              } else {
                aVideo.playbackRate = Math.max(Math.max(aVideo.playbackRate - speedModifiers[aVideo.speedModIter], speedModifiers[aVideo.speedModIter]), 2**-4);
              }
              flashIndicator(`${aVideo.playbackRate.toFixed(getDecimalCount(speedModifiers[aVideo.speedModIter]))}x`);
            }
            // Replay + Cut feature
            else if (event.shiftKey && event.key === "ArrowUp") {
                blockKeyEvents(event);
                if (aVideo.replay && aVideo.allowCuts) {
                    aVideo.allowCuts = false;
                }
                else if (aVideo.replay && !aVideo.allowCuts) {
                    aVideo.replay = false;
                    aVideo.allowCuts = true;
                }
                else {
                    aVideo.replay = true;
                    aVideo.allowCuts = true;
                }
                flashIndicator(`${aVideo.replay ? `Replay (${formatTime(aVideo.replayStart)} to ${formatTime(aVideo.replayEnd)}) ` : ""}${aVideo.replay && aVideo.allowCuts ? "+ " : ""}${aVideo.allowCuts ? `Cuts ${Object.keys(aVideo.cuts).map(Number)} ` : ""}On`);
            } else if (event.shiftKey && event.key === "ArrowDown") {
                blockKeyEvents(event);
                aVideo.replay = false;
                aVideo.allowCuts = false;
                flashIndicator(`Replay (${formatTime(aVideo.replayStart)} to ${formatTime(aVideo.replayEnd)}) + Cuts ${Object.keys(aVideo.cuts).map(Number)} Off`);
            } else if (event.shiftKey && event.key === "ArrowLeft") {
                blockKeyEvents(event);
                if (aVideo.cutIter) {
                    if (!aVideo.cuts[aVideo.cutIter]) aVideo.cuts[aVideo.cutIter] = [];
                    aVideo.cuts[aVideo.cutIter][0] = aVideo.currentTime;
                    flashIndicator(`Cut ${aVideo.cutIter}: ${formatTime(aVideo.cuts[aVideo.cutIter][0])} to ${formatTime(aVideo.cuts[aVideo.cutIter][1])} (Ctrl + Shift to finish)`);
                } else {
                    aVideo.replayStart = aVideo.currentTime;
                    flashIndicator(`Replay: ${formatTime(aVideo.replayStart)} to ${formatTime(aVideo.replayEnd)}`);
                }
            } else if (event.shiftKey && event.key === "ArrowRight") {
                blockKeyEvents(event);
                if (aVideo.cutIter) {
                    if (!aVideo.cuts[aVideo.cutIter]) aVideo.cuts[aVideo.cutIter] = [];
                    aVideo.cuts[aVideo.cutIter][1] = aVideo.currentTime;
                    flashIndicator(`Cut ${aVideo.cutIter}: ${formatTime(aVideo.cuts[aVideo.cutIter][0])} to ${formatTime(aVideo.cuts[aVideo.cutIter][1])} (Ctrl + Shift to finish)`);
                } else {
                    aVideo.replayEnd = aVideo.currentTime;
                    flashIndicator(`Replay: ${formatTime(aVideo.replayStart)} to ${formatTime(aVideo.replayEnd)}`);
                }
            }
            /*
            // Optional TODO: Download feature
            else if (event.key === "D") {
                blockKeyEvents(event);
                let start = aVideo.replay ? aVideo.replayStart : 0;
                let end = aVideo.replay ? aVideo.replayEnd : aVideo.duration;
                flashIndicator(`Downloading video from ${start} to ${end}`);
                // trimVideoFromElement(aVideo, start, end-start) // Maybe for a dev extension?
            }
            */
            // Cut feature
            else if (event.shiftKey && event.ctrlKey && /^Digit[0-9]$/.test(event.code)) {
                blockKeyEvents(event);
                if (event.code === "Digit0" && aVideo.deleteCutIter === "") {
                    flashIndicator(`Cannot start cut number with 0`);
                } else {
                    aVideo.deleteCutIter += event.code.replace("Digit", "");
                    let timeframe = "";
                    if (aVideo.cuts[aVideo.deleteCutIter]) {
                        timeframe = ` (${formatTime(aVideo.cuts[aVideo.deleteCutIter][0])} to ${formatTime(aVideo.cuts[aVideo.deleteCutIter][1])})`
                    }
                    flashIndicator(`Deleting Cut ${aVideo.deleteCutIter}${timeframe} (Ctrl + Shift to delete)`);
                }
            } else if (event.shiftKey && /^Digit[0-9]$/.test(event.code)) {
                blockKeyEvents(event);
                if (event.code === "Digit0" && aVideo.cutIter === "") {
                    flashIndicator(`Cannot start cut number with 0`);
                } else {
                    aVideo.cutIter += event.code.replace("Digit", "");
                    let timeframe = "";
                    if (aVideo.cuts[aVideo.cutIter]) {
                        timeframe = ` (${formatTime(aVideo.cuts[aVideo.cutIter][0])} to ${formatTime(aVideo.cuts[aVideo.cutIter][1])})`
                    }
                    flashIndicator(`Customizing Cut ${aVideo.cutIter}${timeframe} (Ctrl + Shift to finish)`);
                }
            } else if (event.shiftKey && event.ctrlKey) {
                if (aVideo.deleteCutIter) {
                    if (aVideo.cuts[aVideo.deleteCutIter]) {
                        delete aVideo.cuts[aVideo.deleteCutIter];
                        flashIndicator(`Deleted Cut ${aVideo.deleteCutIter}`);
                        aVideo.cuts.length = Object.keys(aVideo.cuts).length ? +Object.keys(aVideo.cuts).at(-1) + 1 : 0;
                    } else {
                        flashIndicator(`Cut ${aVideo.deleteCutIter} does not exist`);
                    }
                    aVideo.deleteCutIter = "";
                } else if (aVideo.cutIter) {
                    flashIndicator(`Finished Customizing Cut ${aVideo.cutIter}`);
                    aVideo.cutIter = "";
                }
            }
            // Play/Pause feature
            else if ([" ", "K", "k", "Enter"].includes(event.key)) {
                blockKeyEvents(event);
                aVideo.paused ? aVideo.play() : aVideo.pause();
                flashIndicator(`Video ${aVideo.paused ? "Paused" : "Playing"}`);
            }
            // Controls feature
            else if (event.ctrlKey && event.altKey && ["C", "c"].includes(event.key)) {
                blockKeyEvents(event);
                aVideo.controls = !aVideo.controls;
                flashIndicator(`Controls ${aVideo.controls ? "En" : "Dis"}abled`);
            } else if (event.ctrlKey && event.altKey && ["L", "l"].includes(event.key)) {
                blockKeyEvents(event);
                aVideo.loop = !aVideo.loop;
                flashIndicator(`Loop ${aVideo.loop ? "En" : "Dis"}abled`);
            } else if (event.ctrlKey && event.altKey && ["P", "p"].includes(event.key)) {
                blockKeyEvents(event);
                if (aVideo.hasAttribute('__pip__')) {
                    document.exitPictureInPicture();
                    flashIndicator("Ended Picture-in-Picture");
                } else {
                    if (document.pictureInPictureElement) document.exitPictureInPicture();
                    aVideo.removeAttribute("disablePictureInPicture");
                    aVideo.requestPictureInPicture();
                    aVideo.setAttribute('__pip__', true);
                    aVideo.addEventListener('leavepictureinpicture', event => {
                        aVideo.removeAttribute('__pip__');
                    }, { once: true });
                    flashIndicator(`Started Picure-in-Picture for Video ${currentIndex+1}`);
                }
            }
            // Navigation feature
            else if ([",", "."].includes(event.key)) {
                blockKeyEvents(event);
                aVideo.currentTime += event.key === "," ? -1/fps : 1/fps;
                flashIndicator(`${event.key === "," ? "-" : "+"}1 frame`);
            } else if (event.ctrlKey && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
              blockKeyEvents(event);
              if (event.key === "ArrowLeft") {
                aVideo.navModIter = Math.max(aVideo.navModIter - 1, 0);
              } else {
                aVideo.navModIter = Math.min(aVideo.navModIter + 1, navModifiers.length - 1);
              }
              flashIndicator(`±${navModifiers[aVideo.navModIter]}s`);
            } else if (/^Digit[0-9]$/.test(event.code)) {
                blockKeyEvents(event);
                aVideo.currentTime = aVideo.duration * JSON.parse(event.code.replace("Digit", "")) / 10;
                flashIndicator(`${JSON.parse(event.code.replace("Digit", "")) * 10}% of Video Duration`);
            } else if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
                blockKeyEvents(event);
                aVideo.currentTime += event.key === "ArrowLeft" ? -navModifiers[aVideo.navModIter] : navModifiers[aVideo.navModIter];
                flashIndicator(`${event.key === "ArrowLeft" ? "-" : "+"}${navModifiers[aVideo.navModIter]}s`);
            } else if (["j", "l"].includes(event.key.toLowerCase())) {
                blockKeyEvents(event);
                aVideo.currentTime += event.key.toLowerCase() === "j" ? -2 * navModifiers[aVideo.navModIter] : 2 * navModifiers[aVideo.navModIter];
                flashIndicator(`${event.key === "j" ? "-" : "+"}${2 * navModifiers[aVideo.navModIter]}s`);
            }
            // Volume feature
            else if (event.ctrlKey && ["ArrowDown", "ArrowUp"].includes(event.key)) {
                blockKeyEvents(event);
                if (event.key === "ArrowUp") {
                    aVideo.volMod = Math.round(100 * Math.min(1, aVideo.volMod + 0.01)) / 100;
                } else {
                    aVideo.volMod = Math.round(100 * Math.max(0, aVideo.volMod - 0.01)) / 100;
                }
                flashIndicator(`±${Math.round(100 * aVideo.volMod)}%`);
            } else if (["ArrowDown", "ArrowUp"].includes(event.key)) {
                blockKeyEvents(event);
                if (event.key === "ArrowUp") {
                    aVideo.volume = Math.round(100 * Math.min(1, aVideo.volume + aVideo.volMod)) / 100;
                } else {
                    aVideo.volume = Math.round(100 * Math.max(0, aVideo.volume - aVideo.volMod)) / 100;
                }
                flashIndicator(`Volume: ${Math.round(100 * aVideo.volume)}%${aVideo.muted ? " (Muted)" : ""}`)
            } else if (["M", "m"].includes(event.key)) {
                aVideo.muted = !aVideo.muted;
                flashIndicator(`${aVideo.muted ? "M" : "Unm"}uted`);
            }
        }
      })(videos[currentIndex]);
    }, true);
})();
