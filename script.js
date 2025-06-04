console.log(document.getElementById("createButt"));

document.getElementById("createButt").addEventListener("click", createTask);

function createTask() {
  console.log("button clicked");
  let todoSec = document.getElementById("section2");
  let boxtitle = document.getElementById("title").value;
  let boxdesc = document.getElementById("description").value;
  //   console.log(boxtitle);
  //   console.log(boxdesc);

  let taskBox = document.createElement("div");
  taskBox.className = "taskBox";
  taskBox.style.backgroundColor = "white";
  //   taskBox.innerHTML = "test 1";

  let taskTitle = document.createElement("h3");
  taskTitle.innerHTML = boxtitle;
  let taskdesc = document.createElement("p");
  taskdesc.innerHTML = boxdesc;
  taskBox.appendChild(taskTitle);
  taskBox.appendChild(taskdesc);

  todoSec.appendChild(taskBox);
}
