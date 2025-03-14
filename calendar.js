// Example events
const events = [
    { date: "2025-03-20", title: "Meeting with Team" },
    { date: "2025-03-22", title: "Project Deadline" },
  ];
  
  // Generate calendar
  function generateCalendar() {
    const calendar = document.getElementById("calendar");
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";
      dayDiv.textContent = i;
  
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const eventForDay = events.find(event => event.date === dateStr);
      if (eventForDay) {
        const eventDiv = document.createElement("div");
        eventDiv.className = "event";
        eventDiv.textContent = eventForDay.title;
        dayDiv.appendChild(eventDiv);
      }
  
      calendar.appendChild(dayDiv);
    }
  }
  
  generateCalendar();
  