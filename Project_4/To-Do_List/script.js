var taskInput = document.getElementById("task");
var taskList = document.getElementById("task-list");

var ENTER_KEY_CODE = 13;


var taskTemplate = document.getElementById("task-template");
var renderTaskTemplate = Handlebars.compile(taskTemplate.innerHTML);

var taskInput = document.getElementById("task");
var taskList = document.getElementById("task-list");

function getData() {
  console.log("called");

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  var tasks = JSON.parse(localStorage.getItem("data"));
  if (tasks == null) return;
  console.log(tasks);

  tasks.forEach(function (task) {
    var li = document.createElement("li");
    li.innerHTML = renderTaskTemplate({ task: task });
    li.setAttribute("id", task);
    taskList.appendChild(li);
  });
}

taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === ENTER_KEY_CODE) {
    event.preventDefault();
    addTaskToList();
  }
});

taskList.addEventListener("click", function (event) {
  var target = event.target;
  var li = target.parentNode;

  if (target.classList.contains("check")) {
    event.preventDefault();
    if (li.classList.contains("checked")) {
      li.classList.remove("checked");
      target.innerHTML = "&#9744;";
    } else {
      li.classList.add("checked");
      target.innerHTML = "&#9745;";
    }

    localStorage.tasks = taskList.innerHTML;
  } else if (target.classList.contains("delete")) {
    event.preventDefault();
    li.parentNode.removeChild(li);
    let data_new = JSON.parse(localStorage.getItem("data"));
    data_new = data_new.filter((el) => el !== target.parentNode.id);
    localStorage.setItem("data", JSON.stringify(data_new));

    localStorage.tasks = taskList.innerHTML;
    //console.log(event.target);
  }
});

function addTaskToList() {
  if (taskInput.value) {
    console.log(taskInput.value);

    var li = document.createElement("li");
    li.innerHTML = renderTaskTemplate({ task: taskInput.value });

    taskList.appendChild(li);

    let data_localStorage = JSON.parse(localStorage.getItem("data"));
    let new_array = [];
    if (data_localStorage !== null) {
      new_array = data_localStorage;
    }
    new_array.push(taskInput.value);
    localStorage.setItem("data", JSON.stringify(new_array));
    taskInput.value = "";
  }
}
