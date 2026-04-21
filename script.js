function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();
  
    if (task === "") return;
  
    createTask(task, false);
    saveTasks();
    updateCounter();
  
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
      updateCounter();
    };
  
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔️";
    doneBtn.onclick = () => {
      span.classList.toggle("done");
      saveTasks();
      updateCounter();
    };
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
      updateCounter();
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
  
  function updateCounter() {
    const tasks = document.querySelectorAll("#taskList li span");
    let remaining = 0;
  
    tasks.forEach(task => {
      if (!task.classList.contains("done")) {
        remaining++;
      }
    });
  
    const counter = document.getElementById("taskCounter");
  
    if (remaining <= 1) {
      counter.textContent = `${remaining} tâche restante`;
    } else {
      counter.textContent = `${remaining} tâches restantes`;
    }
  }
  
  function filterTasks(type) {
    const tasks = document.querySelectorAll("#taskList li");
  
    tasks.forEach(li => {
      const span = li.querySelector("span");
      const isDone = span.classList.contains("done");
  
      if (type === "all") {
        li.style.display = "flex";
      } else if (type === "todo") {
        li.style.display = isDone ? "none" : "flex";
      } else if (type === "done") {
        li.style.display = isDone ? "flex" : "none";
      }
    });
  }
  
  loadTasks();
  updateCounter();