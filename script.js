function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();
  
    if (task === "") return;
  
    createTask(task, false);
    saveTasks();
  
    input.value = "";
  }
  
  function createTask(text, done) {
    const li = document.createElement("li");
  
    const span = document.createElement("span");
    span.textContent = text;
  
    if (done) {
      span.classList.add("done");
    }
  
    span.onclick = () => {
      span.classList.toggle("done");
      saveTasks();
    };
  
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔️";
    doneBtn.onclick = () => {
      span.classList.toggle("done");
      saveTasks();
    };
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
    };
  
    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
  
    document.getElementById("taskList").appendChild(li);
  }
  
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
      const text = li.querySelector("span").textContent;
      const done = li.querySelector("span").classList.contains("done");
      tasks.push({ text, done });
    });
  
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const data = localStorage.getItem("tasks");
    if (!data) return;
  
    const tasks = JSON.parse(data);
    tasks.forEach(task => createTask(task.text, task.done));
  }
  
  loadTasks();