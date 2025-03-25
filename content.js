function injectSidebar() {
    if (document.getElementById("my-sidebar")) return;

        // Sidebar Container
        let sidebar = document.createElement("div");
        sidebar.id = "my-sidebar";
        sidebar.style.position = "fixed";
        sidebar.style.top = "0";
        sidebar.style.right = "-320px"; // Hidden initially
        sidebar.style.width = "300px";
        sidebar.style.height = "100%";
        // sidebar.style.backgroundColor = "#EBEAF7"; // Changed to white
        sidebar.style.backgroundColor = "white"; // Changed to white
        sidebar.style.color = "#3B32B3"; // Dark purple text
        sidebar.style.boxShadow = "-2px 0px 10px rgba(0, 0, 0, 0.1)"; // Softer shadow
        sidebar.style.transition = "right 0.3s ease-in-out";
        sidebar.style.zIndex = "9999";
        sidebar.style.padding = "20px";
        sidebar.style.borderRadius = "12px 0 0 12px";
        sidebar.style.overflowY = "auto";

        // Close Button (✖)
        let closeBtn = document.createElement("button");
        closeBtn.innerHTML = "✖";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "15px";
        closeBtn.style.right = "15px";
        closeBtn.style.border = "none";
        closeBtn.style.background = "none";
        closeBtn.style.color = "#3B32B3"; // Dark purple instead of neon purple
        closeBtn.style.fontSize = "20px";
        closeBtn.style.cursor = "pointer";

        closeBtn.addEventListener("click", () => {
            sidebar.style.right = "-320px"; // Hide sidebar
        });

        sidebar.appendChild(closeBtn);


    // Duperset Content
    let content = `
        <div id="chrome-extension-title">
        <h2 id="chrome-extension-h2">Duperset</h2>
        </div>
        <hr style="border: 0; height: 1px; background: #3B32B3; margin: 10px 0;" />

        <p id="chrome-extension-branding">
            Brought to you by <strong>Placecom</strong>
        </p>
        
        <a href="#" class="duperset-button">Verify My Profile</a>
        <a href="#" class="duperset-button">Deadline Calendar</a>
        <a href="#" class="duperset-button">Request Major Minor Change</a>
        <a href="#" class="duperset-button">Chatbot</a>
        <a href="#" class="duperset-button">External Opportunities</a>
        <a href="#" class="duperset-button">Resume Checker</a>
        
        
    `;
    
    let contentDiv = document.createElement("div");
    contentDiv.innerHTML = content;
    sidebar.appendChild(contentDiv);

    // Add styles for Duperset buttons
    let style = document.createElement("style");
    style.innerHTML = `
        .duperset-button {
            display: block;
            background: white; /* White background */
            color: #3B32B3; /* Dark Purple text */
            padding: 10px;
            margin: 10px 0;
            border-radius: 8px;
            text-decoration: none;
            font-size: 14px;
            text-align: center;
            transition: 0.3s;
            border: 1px solid rgba(59, 50, 179, 0.2); /* Subtle border */
        }

        .duperset-button:hover {
            background: rgba(59, 50, 179, 0.1); /* Dark purple hover */
            color: #3B32B3;
        }

        #chrome-extension-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
            
    #chrome-extension-h2 {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1px;
    color: #3B32B3;
    display: inline-block;
    line-height: 1.2;
    padding-bottom: 5px;
}
    #chrome-extension-branding {
    color: #3B32B3; /* Dark purple for elegance */
    font-size: 14px; /* Slightly larger for readability */
    text-align: center;
    font-style: italic;
    font-weight: 500; /* Slightly bolder for visibility */
    margin-bottom: 24px;
    letter-spacing: 0.5px; /* Subtle spacing for refinement */
    opacity: 0.8; /* Softer look */
}


`;
    document.head.appendChild(style);

    document.body.appendChild(sidebar);

    // Hamburger Button (where Verify Profile button was)
    let menuButton = document.createElement("button");
    menuButton.id = "my-hamburger-button";
    menuButton.innerHTML = "☰";
    menuButton.style.position = "fixed";
    menuButton.style.bottom = "20px";
    menuButton.style.right = "20px";
    menuButton.style.background = "#3B32B3"; // Matches previous button color
    menuButton.style.color = "white";
    menuButton.style.fontSize = "20px";
    menuButton.style.border = "none";
    menuButton.style.borderRadius = "20px";
    menuButton.style.width = "50px";
    menuButton.style.height = "50px";
    menuButton.style.cursor = "pointer";
    menuButton.style.zIndex = "10000";
    menuButton.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";

    menuButton.addEventListener("click", () => {
        sidebar.style.right = "0"; // Show sidebar
    });

    document.body.appendChild(menuButton);
}

injectSidebar();
