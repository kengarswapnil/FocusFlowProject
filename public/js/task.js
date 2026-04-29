let api = "http://localhost:3000/api/tasks";
let isEdited = null;
let allTasks = [];

let btn = document.getElementById("addtask");
taskList = document.getElementById("taskList");

async function reload() {
  try {
    const res = await fetch(api);
    const data = await res.json();
    allTasks = data;
    renderTask(data);
  } catch (err) {
    console.log(err);
  }
}

btn.addEventListener("click", async () => {
 let  title = document.getElementById("task").value;
 let  date = document.getElementById("date").value;
 let  status = document.getElementById("Status").value;

  if (isEdited) {
    await fetch(api + "/" + isEdited, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task:title, date, status }),
    });
    isEdited = null;
    await reload();
  } else {
    try {
      await fetch(api, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ title, date, status }),
      });
      await reload();
    } catch (err) {
      console.log(err);
    }
  }
});

function renderTask(tasks) {
  taskList.innerHTML = "";

  let count = document.getElementById("counttask");
  count.innerText = tasks.length;

  let completed = document.getElementById("Completed");
  let completedCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  completed.innerText = completedCount;

  let pending = document.getElementById("pending");
  let pendingcount = tasks.filter((task) => task.status === "pending").length;
  pending.innerText = pendingcount;

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task-item";

    div.innerHTML = `
              
              <div class="chk ${task.status === "completed" ? "done" : ""} done"></div>
              <span class="task-name done">${task.title}</span>
              <span class="task-badge badge-tomorrow">${task.date}</span>
               <span class="task-badge badge-tomorrow ${task.status === "completed" ? "text-success " : "text-warning"}" >${task.status}</span>
              <div class="task-actions">
                <button class="icon-btn edit" onclick="editTask('${task._id}','${task.title}','${task.date}','${task.status}')">
                  <i class="bi bi-pencil"></i>  
                </button>
                <button class="icon-btn del" onclick="deleteTask('${task._id}')">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            
  
  `;

    taskList.appendChild(div);
  });
}

async function deleteTask(id) {
  console.log("Deleting ID:", id);
  await fetch(api + "/" + id, {
    method: "DELETE",
  });
  reload();
}

function editTask(id, title, date, Status) {
  document.getElementById("task").value = title;
  document.getElementById("date").value = date;
  document.getElementById("Status").value = Status;
  console.log(id, title, date,Status);
  isEdited = id;

  let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
}

function filterTask(type, event) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");

  let filterd = [];

  if (type === "completed") {
    filterd = allTasks.filter((task) => task.status === "completed");
  } else if (type === "pending") {
    filterd = allTasks.filter((task) => task.status === "pending");
  } else {
    filterd = allTasks;
  }

  renderTask(filterd);
}
document.addEventListener("DOMContentLoaded", reload);
