let currentFilter = "all";

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (task === "") return;

  createTask(task, false);
  saveTasks();
  updateCounter();
  applyFilter();

  input.value = "";
}

function createTask(text, done) {
  const li = document.createElement("li");

  const leftDiv = document.createElement("div");
  leftDiv.className = "task-left";

  const span = document.createElement("span");
  span.textContent = text;

  if (done) {
    span.classList.add("done");
  }

  span.onclick = () => {
    span.classList.toggle("done");
    saveTasks();
    updateCounter();
    applyFilter();
  };

  leftDiv.appendChild(span);

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "task-buttons";

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✔️";
  doneBtn.onclick = () => {
    span.classList.toggle("done");
    saveTasks();
    updateCounter();
    applyFilter();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
    updateCounter();
    applyFilter();
  };

  buttonDiv.appendChild(doneBtn);
  buttonDiv.appendChild(deleteBtn);

  li.appendChild(leftDiv);
  li.appendChild(buttonDiv);

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
  currentFilter = type;
  applyFilter();
}

function applyFilter() {
  const tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(li => {
    const span = li.querySelector("span");
    const isDone = span.classList.contains("done");

    if (currentFilter === "all") {
      li.style.display = "flex";
    } else if (currentFilter === "todo") {
      li.style.display = isDone ? "none" : "flex";
    } else if (currentFilter === "done") {
      li.style.display = isDone ? "flex" : "none";
    }
  });
}

function updateDarkModeButton() {
  const toggleBtn = document.getElementById("darkModeToggle");

  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️ Mode clair";
  } else {
    toggleBtn.textContent = "🌙 Mode sombre";
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);

  updateDarkModeButton();
}

function loadDarkMode() {
  const isDark = localStorage.getItem("darkMode") === "true";

  if (isDark) {
    document.body.classList.add("dark");
  }

  updateDarkModeButton();
}

loadTasks();
updateCounter();
applyFilter();
loadDarkMode();

document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);