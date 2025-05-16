function injectSidebar() {
    if (document.getElementById("my-sidebar")) return;
  
    // Primary Sidebar (Menu)
    let sidebar = document.createElement("div");
    sidebar.id = "my-sidebar";
    Object.assign(sidebar.style, {
      position: "fixed",
      top: "0",
      right: "-320px",
      width: "300px",
      height: "100%",
      backgroundColor: "white",
      color: "#3B32B3",
      boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.1)",
      transition: "right 0.3s ease-in-out",
      zIndex: "9999",
      padding: "20px",
      borderRadius: "12px 0 0 12px",
      overflowY: "auto",
    });
  
    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "✖";
    Object.assign(closeBtn.style, {
      position: "absolute",
      top: "15px",
      right: "15px",
      border: "none",
      background: "none",
      color: "#3B32B3",
      fontSize: "20px",
      cursor: "pointer",
    });
    closeBtn.addEventListener("click", () => {
      sidebar.style.right = "-320px";
      closeModal(modal1);
      closeModal(modal2);
    });
    sidebar.appendChild(closeBtn);
  
    let contentHTML = `
        <div id="chrome-extension-title">
            <h2 id="chrome-extension-h2">Duperset</h2>
        </div>
        <hr style="border: 0; height: 1px; background: #3B32B3; margin: 10px 0;" />
        <p id="chrome-extension-branding">Brought to you by <strong>Placecom</strong></p>
        <a href="#" id="verify-button" class="duperset-button">Verify My Profile</a>
        <a href="#" id="major-minor-button" class="duperset-button">Request Major Minor Change</a>
        <br />
        <hr style="border: 0; height: 1px; background: #3B32B3; margin: 10px 0;" />
        <br />
        <p id="chrome-extension-branding">Coming Soon</p>
        <a href="#" class="duperset-button">Deadline Calendar</a>
        <a href="#" class="duperset-button">FAQs</a>
        <a href="#" class="duperset-button">External Opportunities</a>
    `;
    let contentDiv = document.createElement("div");
    contentDiv.innerHTML = contentHTML;
    sidebar.appendChild(contentDiv);
  
    // Styles
    let style = document.createElement("style");
    style.innerHTML = `
        .duperset-button {
            display: block;
            background: white;
            color: #3B32B3;
            padding: 10px;
            margin: 10px 0;
            border-radius: 8px;
            text-decoration: none;
            font-size: 14px;
            text-align: center;
            transition: 0.3s;
            border: 1px solid rgba(59, 50, 179, 0.2);
        }
  
        .duperset-button:hover {
            background: rgba(59, 50, 179, 0.1);
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
            padding-bottom: 5px;
        }
  
        #chrome-extension-branding {
            color: #3B32B3;
            font-size: 14px;
            text-align: center;
            font-style: italic;
            font-weight: 500;
            margin-bottom: 24px;
            letter-spacing: 0.5px;
            opacity: 0.8;
        }
  
        /* Modal overlay */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
  
        /* Modal content */
        .modal-content {
            background: white;
            color: #3B32B3;
            width: 900px;
            height: 90vh;
            border-radius: 12px;
            box-shadow: 0 0 15px rgba(0,0,0,0.2);
            position: relative;
            display: flex;
            overflow-y:scroll;
            flex-direction: column;
        }
  
        /* Modal close button */
        .modal-close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            border: none;
            background: none;
            color: #3B32B3;
            font-size: 20px;
            cursor: pointer;
            z-index: 10;
        }
  
        .modal-iframe {
            flex-grow: 1;
            border: none;
            margin-top: 50px;
            border-radius: 0 0 12px 12px;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(sidebar);
  
    // Hamburger Button
    let menuButton = document.createElement("button");
    menuButton.id = "my-hamburger-button";
    menuButton.innerHTML = "☰";
    Object.assign(menuButton.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#3B32B3",
      color: "white",
      fontSize: "20px",
      border: "none",
      borderRadius: "20px",
      width: "50px",
      height: "50px",
      cursor: "pointer",
      zIndex: "10001",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    });
    menuButton.addEventListener("click", () => {
      const isOpen = sidebar.style.right === "0px";
      sidebar.style.right = isOpen ? "-320px" : "0px";
      if (isOpen) {
        closeModal(modal1);
        closeModal(modal2);
      }
    });
    document.body.appendChild(menuButton);
  
    // Modal 1 - Verify My Profile
    let modal1 = document.createElement("div");
    modal1.classList.add("modal-overlay");
    modal1.id = "modal1";
  
    let modal1Content = document.createElement("div");
    modal1Content.classList.add("modal-content");
  
    let closeBtn1 = document.createElement("button");
    closeBtn1.className = "modal-close-btn";
    closeBtn1.innerHTML = "✖";
    closeBtn1.addEventListener("click", () => closeModal(modal1));
  
    let iframe1 = document.createElement("iframe");
    iframe1.src =
      "https://script.google.com/macros/s/AKfycbxh2yw4PfXQK4zvGdVMVR4h1OyYdjqL-z8QJRhf1VEOBwpwv8gamH9YrF7b8-yAzR0gQQ/exec";
    iframe1.className = "modal-iframe";
  
    modal1Content.appendChild(closeBtn1);
    modal1Content.appendChild(iframe1);
    modal1.appendChild(modal1Content);
    document.body.appendChild(modal1);
  
    // Modal 2 - Major/Minor Change
    let modal2 = document.createElement("div");
    modal2.classList.add("modal-overlay");
    modal2.id = "modal2";
  
    let modal2Content = document.createElement("div");
    modal2Content.classList.add("modal-content");
  
    let closeBtn2 = document.createElement("button");
    closeBtn2.className = "modal-close-btn";
    closeBtn2.innerHTML = "✖";
    closeBtn2.addEventListener("click", () => closeModal(modal2));
  
    let iframe2 = document.createElement("iframe");
    iframe2.src =
      "https://script.google.com/macros/s/AKfycbzy6oo0GFxrQVH_ouol-NyuUV-S6MRvUvxVZ0y1HBWFz1l3murt2s1FbPplsc47EfW1oQ/exec";
    iframe2.className = "modal-iframe";
  
    modal2Content.appendChild(closeBtn2);
    modal2Content.appendChild(iframe2);
    modal2.appendChild(modal2Content);
    document.body.appendChild(modal2);
  
    // Helper to open modal
    function openModal(modal) {
      modal.style.display = "flex";
    }
  
    // Helper to close modal
    function closeModal(modal) {
      modal.style.display = "none";
    }
  
    // Button listeners
    document.getElementById("verify-button").addEventListener("click", (event) => {
      event.preventDefault();
      openModal(modal1);
      closeModal(modal2);
    });
  
    document.getElementById("major-minor-button").addEventListener("click", (event) => {
      event.preventDefault();
      openModal(modal2);
      closeModal(modal1);
    });
  }
  
  injectSidebar();
  