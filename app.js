//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListerners();

//Load all event listeners
function loadEventListerners() {
  //DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks)
  //Add Task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask)
  //Clear tasks event
  clearBtn.addEventListener('click', clearTasks)
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks)
}

//Get Tasks from Local Storage
function getTasks(params) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []; 
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    const li = document.createElement('li')
    li.className = 'collection-item';
    //create text node
    li.appendChild(document.createTextNode(task));
    //create link element
    const link = document.createElement('a');
    link.className  = 'delete-item secondary-content';
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    //Append the link
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
  });
}

//Add task 
function addTask(e) {
  
  if (taskInput.value === '') {
    alert('Add a task');
  }else{
    const li = document.createElement('li')
    li.className = 'collection-item';
    //create text node
    li.appendChild(document.createTextNode(taskInput.value));
    //create link element
    const link = document.createElement('a');
    link.className  = 'delete-item secondary-content';
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    //Append the link
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    //Store in local storage
    storeTaskInLocalStorage(taskInput.value)

    //Clear input
    taskInput.value = '';
  }


  e.preventDefault();

}

//Store task

function storeTaskInLocalStorage(data) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []; 
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(data)

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task event
function removeTask(e) { 
if (e.target.parentElement.classList.contains('delete-item')) {
 if (confirm('Are You Sure?')) {
  e.target.parentElement.parentElement.remove()

      //Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
} 

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];   
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks event
function clearTasks() {
if (confirm('Are You Sure You Wanna Remove All Task?')) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//Clear from Local Storage
clearTasksFromLocalStorage()

}

//Clear Tasks from Local Storage
function clearTasksFromLocalStorage(params) {
  localStorage.clear()
}
//Filter tasks event

function filterTasks(e) {
  const text = e.target.value.toLowerCase()

 const taskItems = document.querySelectorAll('.collection-item')

 taskItems.forEach((task) => {
  const item = task.firstChild.textContent;
  if (item.toLowerCase().indexOf(text) != -1) {
    task.style.display = 'block';
  } else {
    task.style.display = 'none';
  }
 })
}