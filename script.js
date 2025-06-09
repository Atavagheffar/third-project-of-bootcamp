console.log(document.getElementById("createButt"));

document.getElementById("createButt").addEventListener("click", createTask);

// *********************clear inputs
document.getElementById("clearForm").addEventListener("click", clearInputs);
function clearInputs() {
  console.log("clear button clicked");
  let dateAta = document.getElementById("datePick");
  let boxtitle = document.getElementById("title");
  let boxdesc = document.getElementById("description");
  // console.log(boxtitle.value);

  boxtitle.value = "";
  boxdesc.value = "";
  dateAta.value = "";
}

// *********************drag and drop
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
// ************************************************************
function createTask() {
  console.log("button clicked");
  // *********************date and time
  console.log(document.getElementById("datePick").value);
  let dateAta = document.getElementById("datePick").value;
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
  let month = months[d.getMonth()];
  let date = d.getDate();
  let day = days[d.getDay()];

  let taskDate = document.createElement("p");
  taskDate.setAttribute("id", "taskdate");
  taskDate.innerHTML = date + "th of" + " " + month;
  // taskDate.innerHTML = day + " / " + month + "," + date;
  // *********************title and desc
  let todoSec = document.getElementById("section2");
  let boxtitle = document.getElementById("title").value;
  let boxdesc = document.getElementById("description").value;
  let taskBox = document.createElement("div");

  taskBox.className = "taskBox";
  taskBox.setAttribute("id", "taskBoxNew");

  taskBox.setAttribute("draggable", "true");
  taskBox.setAttribute("ondragstart", "dragstartHandler(event)");
  taskBox.style.position = "relative";
  let taskTitle = document.createElement("h3");
  taskTitle.innerHTML = boxtitle;
  let taskdesc = document.createElement("p");
  taskdesc.innerHTML = boxdesc;

  // *********************close button
  let close = document.createElement("span");
  close.className = "close";
  close.innerHTML = "❌";
  close.style.position = "absolute";
  close.style.top = "7%";
  close.style.right = "7%";
  close.onclick = function () {
    taskBox.style.display = "none";
  };
  // *********************Assignee checking
  let assignee = document.createElement("p");
  assignee.setAttribute("class", "assignee");

  if (document.getElementById("person1").checked) {
    console.log("assignee to person1");
    assignee.innerHTML =
      "Assignee to: " + document.getElementById("person1").value;
  } else if (document.getElementById("person2").checked) {
    console.log("assignee to person2");
    assignee.innerHTML =
      "Assignee to: " + document.getElementById("person2").value;
  } else {
    console.log("assignee to person3");
    assignee.innerHTML =
      "Assignee to: " + document.getElementById("person3").value;
  }

  // *********************subtask checking

  let subtask = document.createElement("h4");
  subtask.setAttribute("class", "subtask");

  let box1 = document.getElementById("box1");
  let box2 = document.getElementById("box2");

  if (box1.checked && !box2.checked) {
    console.log("Only subtask A selected");
    subtask.innerHTML = "Subtask: " + box1.value;
  } else if (!box1.checked && box2.checked) {
    console.log("Only subtask B selected");
    subtask.innerHTML = "Subtask: " + box2.value;
  } else if (box1.checked && box2.checked) {
    console.log("Both subtasks selected");
    subtask.innerHTML = "Subtasks: " + box1.value + " + " + box2.value;
  } else {
    console.log("No subtask selected");
    subtask.innerHTML = "No subtask selected";
  }
  // *********************taskbox header
  let taskBoxHeader = document.createElement("div");
  taskBoxHeader.innerHTML = taskDate.innerHTML + " | " + assignee.innerHTML;
  taskBoxHeader.style.borderBottom = "1px solid black";
  taskBoxHeader.style.paddingBottom = "5px";
  taskBoxHeader.style.marginBottom = "10px";
  taskBoxHeader.style.fontSize = "14px";
  taskBoxHeader.style.fontWeight = "600";
  // *********************build card
  taskBox.appendChild(taskTitle);
  taskBox.appendChild(close);
  taskBox.appendChild(taskBoxHeader);
  taskBox.appendChild(subtask);
  taskBox.appendChild(taskdesc);
  todoSec.appendChild(taskBox);
  clearInputs();
}
