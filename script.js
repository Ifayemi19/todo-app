function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();
  
    if (task === "") return;
  
    const li = document.createElement("li");
  
    li.innerHTML = `
      <span>${task}</span>
      <button onclick="toggleDone(this.previousElementSibling)">✔️</button>
      <button onclick="this.parentElement.remove()">❌</button>
    `;
  
    document.getElementById("taskList").appendChild(li);
  
    input.value = "";
  }
  
  function toggleDone(element) {
    element.classList.toggle("done");
  }