let popupWindowId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "verifyPopup") {
        chrome.windows.create({
            url: chrome.runtime.getURL("verify-my-profile.html"),
            type: "popup",
            width: 800,
            height: 600,
        }, (popup) => {
            popupWindowId = popup.id;
        });
    }
});

// Listen for focus change and close popup if focus is lost
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (popupWindowId && windowId !== popupWindowId && windowId !== chrome.windows.WINDOW_ID_NONE) {
        chrome.windows.remove(popupWindowId);
        popupWindowId = null;
    }
});


let popupWindow2Id = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "majorMinorPopup") {
        chrome.windows.create({
            url: chrome.runtime.getURL("major-minor.html"),
            type: "popup",
            width: 800,
            height: 600
        }, (popup) => {
            popupWindow2Id = popup.id;
        });
    }
});

// // Listen for focus change and close popup if focus is lost
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (popupWindow2Id && windowId !== popupWindow2Id && windowId !== chrome.windows.WINDOW_ID_NONE) {
        chrome.windows.remove(popupWindow2Id);
        popupWindow2Id = null;
    }
});