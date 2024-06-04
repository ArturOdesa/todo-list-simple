
let dataTasks = [];
let startMessage = document.querySelector('#start-message');
 let todayDateP = document.querySelector('#today-date');
 let taskInput = document.querySelector("#task-input");
 let addTaskBtn = document.querySelector('#add-task-btn');
 let removeAllBtn = document.querySelector('#remove-all');

 addTaskBtn.addEventListener('click', addTaskHandler);
 taskInput.addEventListener('keydown', function (event) {
     if (event.key === 'Enter') {
         addTaskHandler();
     }
 })

 function addTaskHandler () {
     if (taskInput.value) {
     dataTasks.push(createTask(taskInput.value, dataTasks.length + 1));
     let taskList = document.querySelector('#task-list');
     taskInput.value = '';
     taskList.append(createTaskItem());
     if (dataTasks.length !== 0) {
         startMessage.hidden = true;
     }
     }
 }

 function createTaskItem() {
     let taskItem = document.createElement('li');
     taskItem.classList.add('task-item');
     let checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     checkbox.classList.add('checkbox');
     let spanTask = document.createElement('span');
     spanTask.classList.add('task-text');
     spanTask.innerText = setTaskText(dataTasks);
     let taskBtnDiv = document.createElement('div')
     taskBtnDiv.classList.add('task-btn-holder');
     let taskBtnEdit = document.createElement('button');
     taskBtnEdit.classList.add('task-btn', 'edit');
     let taskBtnDelete = document.createElement('button');
     taskBtnDelete.classList.add('task-btn', 'delete');
     // taskBtnDelete.value = dataTasks[dataTasks.length - 1].id;
     taskBtnDelete.addEventListener('click', deleteTaskHandler);


     taskItem.append(checkbox);
     taskItem.append(spanTask);
     taskItem.append(taskBtnDiv);
     taskBtnDiv.append(taskBtnEdit);
     taskBtnDiv.append(taskBtnDelete);


return taskItem;
 }

 function deleteTaskHandler () {
     let btnHolder = this.parentElement;
     let taskText = btnHolder.previousElementSibling.textContent;
     for (let i = 0; i < dataTasks.length; i++) {
         if (dataTasks[i].name === taskText) {
             dataTasks.splice(i, 1);
         }
         if (dataTasks.length === 0) {
             startMessage.hidden = false;
         }
     }

     btnHolder.parentElement.remove();

 }

 function setTaskText (tasks) {
     return tasks[tasks.length - 1].name;
 }

 function createTask(text, index) {
     return {
         id: index,
        name: text,
         completed: false,
     }
 }

 removeAllBtn.addEventListener('click', removeAll);
 function removeAll () {
     if (dataTasks.length !== 0) {
     dataTasks = [];
     let lis = document.querySelectorAll('li');
     lis.forEach(li => li.remove());
     }
     if (dataTasks.length === 0) {
       startMessage.hidden = false;
     }
 }

 removeAll(dataTasks);

let setTodayDate = function () {
    let currentDate = new Date();
    const options = {
        day: 'numeric',
        month: 'long',
        weekday: 'long'
    };
    let formattedDate = currentDate.toLocaleDateString('En-en', options);
    todayDateP.textContent = formattedDate;
}

setTodayDate();