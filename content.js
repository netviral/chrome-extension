function injectButton() {
    if (!document.getElementById("my-extension-button")) {
        let button = document.createElement("button");
        button.id = "my-extension-button";
        button.innerText = "Verify My Profile";
        button.style.position = "fixed";
        button.style.bottom = "20px";
        button.style.right = "20px";
        button.style.zIndex = "10000";
        button.style.backgroundColor = "rgb(59, 50, 179)";
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.padding = "10px";

        button.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "openPopup" });
        });

        document.body.appendChild(button);
    }
}

injectButton();
