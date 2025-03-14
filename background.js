let popupWindowId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openPopup") {
        chrome.windows.create({
            url: chrome.runtime.getURL("pocs.html"),
            type: "popup",
            width: 800,
            height: 600
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
