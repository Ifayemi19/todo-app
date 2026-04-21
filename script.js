let currentFilter = "all";

function addTask() {
  const input = document.getElementById("taskInput");
  const dateInput = document.getElementById("taskDate");

  const task = input.value.trim();
  const date = dateInput.value;

  if (task === "") return;

  createTask(task, false, date);
  saveTasks();
  updateCounter();
  applyFilter();

  input.value = "";
  dateInput.value = "";
}

function createTask(text, done, date = "") {
  const li = document.createElement("li");

  const leftDiv = document.createElement("div");
  leftDiv.className = "task-left";

  const textBlock = document.createElement("div");
  textBlock.className = "task-text";

  const span = document.createElement("span");
  span.textContent = text;

  if (done) {
    span.classList.add("done");
  }

  span.onclick = () => {
    span.classList.toggle("done");
    span.classList.add("bounce");
    setTimeout(() => span.classList.remove("bounce"), 350);
    saveTasks();
    updateCounter();
    applyFilter();
  };

  const dateElement = document.createElement("div");
  dateElement.className = "task-date";
  dateElement.textContent = date ? `📅 ${date}` : "";

  textBlock.appendChild(span);
  textBlock.appendChild(dateElement);
  leftDiv.appendChild(textBlock);

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "task-buttons";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => {
    editTask(span, dateElement);
  };

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✔️";
  doneBtn.onclick = () => {
    span.classList.toggle("done");
    span.classList.add("bounce");
    setTimeout(() => span.classList.remove("bounce"), 350);
    saveTasks();
    updateCounter();
    applyFilter();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => {
    li.classList.add("removing");
    setTimeout(() => {
      li.remove();
      saveTasks();
      updateCounter();
      applyFilter();
    }, 300);
  };

  buttonDiv.appendChild(editBtn);
  buttonDiv.appendChild(doneBtn);
  buttonDiv.appendChild(deleteBtn);

  li.appendChild(leftDiv);
  li.appendChild(buttonDiv);

  document.getElementById("taskList").appendChild(li);
}

function editTask(span, dateElement) {
  const newText = prompt("Modifier la tâche :", span.textContent);
  if (newText === null) return;

  const trimmedText = newText.trim();
  if (trimmedText === "") return;

  span.textContent = trimmedText;

  const currentDate = dateElement.textContent.replace("📅 ", "");
  const newDate = prompt("Modifier la date (YYYY-MM-DD) :", currentDate);

  if (newDate !== null) {
    const trimmedDate = newDate.trim();
    dateElement.textContent = trimmedDate ? `📅 ${trimmedDate}` : "";
  }

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const done = li.querySelector("span").classList.contains("done");
    const dateText = li.querySelector(".task-date").textContent.replace("📅 ", "");
    tasks.push({ text, done, date: dateText });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (!data) return;

  const tasks = JSON.parse(data);
  tasks.forEach(task => createTask(task.text, task.done, task.date));
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