function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value;
  
    if (task === "") return;
  
    const li = document.createElement("li");
  
    li.innerHTML = `
      ${task}
      <button onclick="this.parentElement.remove()">❌</button>
    `;
  
    document.getElementById("taskList").appendChild(li);
  
    input.value = "";
  }