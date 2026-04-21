function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value;
  
    if (task === "") return;
  
    const li = document.createElement("li");
  
    li.innerHTML = `
      <span onclick="toggleDone(this)">${task}</span>
      <button onclick="this.parentElement.remove()">❌</button>
    `;
  
    document.getElementById("taskList").appendChild(li);
  
    input.value = "";
  }
  
  function toggleDone(element) {
    element.classList.toggle("done");
  }