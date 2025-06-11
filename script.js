// ------------------- Console Test
console.log(document.getElementById("createButt"));

// ------------------- Event Listeners
document.getElementById("createButt").addEventListener("click", createTask);
document.getElementById("clearForm").addEventListener("click", clearInputs);

// ------------------- Clear Inputs
function clearInputs() {
  console.log("clear button clicked");
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("datePick").value = "";
}
// ------------------------ create subtsak
document.getElementById("addSubtask").addEventListener("click", function () {
  console.log("subtaskInputArea showing");
  let newSubtaskName = document.getElementById("subtaskInputArea");
  newSubtaskName.style.display = "flex";
  newSubtaskName.style.marginTop = "5px";

  let newSubtaskText = document.getElementById("newSubtaskText");

  document
    .getElementById("confirmSubtask")
    .addEventListener("click", function () {
      console.log("subtask add button clicked");
      const subtaskText = newSubtaskText.value.trim();

      if (subtaskText) {
        let checkbox = document.createElement("label");
        checkbox.innerHTML = `
          <input type="checkbox" value="${subtaskText}"> ${subtaskText}
        `;
        document.getElementById("subtaskList").appendChild(checkbox);

        newSubtaskText.value = "";
      }
    });
});

// ------------------- Drag and Drop
function dragstartHandler(ev) {
  ev.dataTransfer.setData("div", ev.target.id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("div");
  const draggedElement = document.getElementById(data);

  let dropZone = ev.target;
  while (!dropZone.classList.contains("column") && dropZone !== document.body) {
    dropZone = dropZone.parentNode;
  }
  dropZone.appendChild(draggedElement);
}

// ------------------- Create Task
function createTask() {
  console.log("button clicked");

  // Date Handling
  const dateAta = document.getElementById("datePick").value;
  console.log(dateAta);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const d = new Date(dateAta);
  const month = months[d.getMonth()];
  const date = d.getDate();
  const day = days[d.getDay()];

  const taskDate = document.createElement("p");
  taskDate.setAttribute("id", "taskdate");
  taskDate.innerHTML = `${date}th of ${month}`;

  // Title and Description
  const todoSec = document.getElementById("section2");
  const boxtitle = document.getElementById("title").value;
  const boxdesc = document.getElementById("description").value;

  const taskBox = document.createElement("div");
  taskBox.className = "taskBox";
  taskBox.setAttribute("id", "taskBoxNew");
  taskBox.setAttribute("draggable", "true");
  taskBox.setAttribute("ondragstart", "dragstartHandler(event)");
  taskBox.style.position = "relative";

  const taskTitle = document.createElement("h3");
  taskTitle.innerHTML = boxtitle;

  const taskdesc = document.createElement("p");
  taskdesc.innerHTML = boxdesc;

  // Close Button
  const close = document.createElement("span");
  close.className = "close";
  close.innerHTML = "❌";
  close.style.position = "absolute";
  close.style.top = "7%";
  close.style.right = "7%";
  close.onclick = () => {
    taskBox.style.display = "none";
  };

  // Assignee
  const assignee = document.createElement("p");
  assignee.setAttribute("class", "assignee");

  if (document.getElementById("person1").checked) {
    assignee.innerHTML =
      "Assignee to: " + document.getElementById("person1").value;
  } else if (document.getElementById("person2").checked) {
    assignee.innerHTML =
      "Assignee to: " + document.getElementById("person2").value;
  } else {
    assignee.innerHTML =
      "Assignee to: " + document.getElementById("person3").value;
  }

  // Subtasks
  const subtask = document.createElement("h4");
  subtask.setAttribute("class", "subtask");

  const subtaskCheckboxes = document
    .getElementById("subtaskList")
    .querySelectorAll("input[type='checkbox']");
  const selected = [];

  subtaskCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selected.push(checkbox.value);
    }
  });

  subtask.innerHTML =
    selected.length > 0
      ? "Subtasks: " + selected.join(" + ")
      : "No subtask selected";

  // Header
  const taskBoxHeader = document.createElement("div");
  taskBoxHeader.innerHTML = `${taskDate.innerHTML} | ${assignee.innerHTML}`;
  taskBoxHeader.style.borderBottom = "1px solid black";
  taskBoxHeader.style.paddingBottom = "5px";
  taskBoxHeader.style.marginBottom = "10px";
  taskBoxHeader.style.fontSize = "14px";
  taskBoxHeader.style.fontWeight = "600";

  // Build Card
  taskBox.appendChild(taskTitle);
  taskBox.appendChild(close);
  taskBox.appendChild(taskBoxHeader);
  taskBox.appendChild(subtask);
  taskBox.appendChild(taskdesc);
  todoSec.appendChild(taskBox);

  // Clear form
  clearInputs();
}
