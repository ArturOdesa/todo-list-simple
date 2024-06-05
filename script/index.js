
let dataTasks = [];
let startMessage = document.querySelector('#start-message');
 let todayDateP = document.querySelector('#today-date');
 let taskInput = document.querySelector("#task-input");
 let addTaskBtn = document.querySelector('#add-task-btn');
let taskList = document.querySelector('#task-list');
let showAllBtn = document.querySelector('#show-all');
 let removeAllBtn = document.querySelector('#remove-all');
 let showCompletedBtn = document.querySelector('#show-completed');
 let showUncompletedBtn = document.querySelector('#show-uncompleted');

showCompletedBtn.addEventListener('click', showCompletedHandler);
showAllBtn.addEventListener('click', showAllHandler);
showUncompletedBtn.addEventListener('click', showUncompletedHandler);

 addTaskBtn.addEventListener('click', addTaskHandler);
 taskInput.addEventListener('keydown', function (event) {
     if (event.key === 'Enter') {
         addTaskHandler();
     }
 })

 function addTaskHandler () {
     if (taskInput.value) {
     dataTasks.push(createTask(taskInput.value, dataTasks.length + 1));
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
     checkbox.addEventListener('click', checkboxClickHandler)
     let spanTask = document.createElement('span');
     spanTask.classList.add('task-text');
     spanTask.innerText = setTaskText(dataTasks);
     let taskBtnDiv = document.createElement('div')
     taskBtnDiv.classList.add('task-btn-holder');
     let taskBtnEdit = document.createElement('button');
     taskBtnEdit.classList.add('task-btn', 'edit');
     taskBtnEdit.addEventListener('click', editTaskHandler);
     let taskBtnDelete = document.createElement('button');
     taskBtnDelete.classList.add('task-btn', 'delete');
     taskBtnDelete.addEventListener('click', deleteTaskHandler);


     taskItem.append(checkbox);
     taskItem.append(spanTask);
     taskItem.append(taskBtnDiv);
     taskBtnDiv.append(taskBtnEdit);
     taskBtnDiv.append(taskBtnDelete);


return taskItem;
 }

 function showCompletedHandler() {
     // First way how to get uncompleted task

     // dataTasks.forEach(task => {
     //     if (!task.completed) {
     //         let tasksLis = taskList.children;
     //         for (let i = 0; i < tasksLis.length; i++) {
     //             let taskSpan = tasksLis[i].firstChild.nextSibling;
     //             if (task.name === taskSpan.textContent) {
     //                 tasksLis[i].classList.add('hide-element');
     //             }
     //             else {
     //                 tasksLis[i].classList.remove('hide-element');
     //             }
     //         }
     //     }
     // })

 //     Second way how to get uncompleted task

     let tasksLis = taskList.children;

     for (let i = 0; i < tasksLis.length; i++) {
         let checkbox = tasksLis[i].firstChild;
         if (!checkbox.checked) {
             tasksLis[i].classList.add('hide-element');
         }
         else {
             tasksLis[i].classList.remove('hide-element');
         }
     }

 }

 function showUncompletedHandler() {
     // dataTasks.forEach(task => {
     //     if (task.completed) {
     //         let tasksLis = taskList.children;
     //         for (let i = 0; i < tasksLis.length; i++) {
     //             let taskSpan = tasksLis[i].firstChild.nextSibling;
     //             if (task.name === taskSpan.textContent) {
     //                 tasksLis[i].classList.add('hide-element');
     //             }
     //             else {
     //                 tasksLis[i].classList.remove('hide-element');
     //             }
     //         }
     //     }
     // })

     let tasksLis = taskList.children;

     for (let i = 0; i < tasksLis.length; i++) {
         let checkbox = tasksLis[i].firstChild;
         if (checkbox.checked) {
             tasksLis[i].classList.add('hide-element');
         }
         else {
             tasksLis[i].classList.remove('hide-element');
         }
     }
 }

 function showAllHandler() {
     let tasksLis = taskList.children;
     for (let li of tasksLis) {
         li.classList.remove('hide-element');
     }
 }

 function checkboxClickHandler() {
     if (this.checked) {
         this.parentElement.classList.add('completed');
         this.nextElementSibling.classList.add('completed-text')
         dataTasks.forEach(task => {
             if (this.nextElementSibling.textContent === task.name) {
                 task.completed = true;
                 this.nextElementSibling.nextElementSibling.firstChild.removeEventListener('click', editTaskHandler);
             }
         })
     }
     else {
         this.parentElement.classList.remove('completed');
         this.nextElementSibling.classList.remove('completed-text');
        dataTasks.forEach(task => {
            if (this.nextElementSibling.textContent === task.name) {
                task.completed = false;
                this.nextElementSibling.nextElementSibling.firstChild.addEventListener('click', editTaskHandler);
            }
        })
     }

 }

 function editTaskHandler() {
     this.removeEventListener('click', editTaskHandler);
     let btnHolder = this.parentElement;
     let taskSpan = btnHolder.previousElementSibling;
     let checkboxEl = taskSpan.previousElementSibling;
     let taskEditInput = document.createElement('input');
     taskEditInput.classList.add('task-new-text');
     taskEditInput.value = taskSpan.textContent;
     taskEditInput.addEventListener('keydown',(event) => {
         if (event.key === 'Enter') {
             for (let task of dataTasks) {
                 if (taskSpan.textContent === task.name) {
                     task.name = taskEditInput.value;
                     taskSpan.textContent = task.name;
                     taskEditInput.hidden = true;
                     taskSpan.hidden = false;
                     taskEditInput.remove();
                     this.addEventListener('click', editTaskHandler);
                 }
             }
         }
         if (event.key === 'Escape') {
             taskEditInput.hidden = true;
             taskSpan.hidden = false;
             taskEditInput.remove();
             this.addEventListener('click', editTaskHandler);
         }
     })
     this.addEventListener('click', () => {
         for (let task of dataTasks) {
             if (taskSpan.textContent === task.name) {
                 task.name = taskEditInput.value;
                 taskSpan.textContent = task.name;
                 taskEditInput.hidden = true;
                 taskSpan.hidden = false;
                 this.addEventListener('click', editTaskHandler);
                 taskEditInput.remove();
             }
         }
     })
     taskSpan.hidden = true;
     checkboxEl.after(taskEditInput);
     // taskSpan.hidden = true;


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



let setTodayDate = function () {
    let currentDate = new Date();
    const options = {
        day: 'numeric',
        month: 'long',
        weekday: 'long'
    };
    todayDateP.textContent = currentDate.toLocaleDateString('En-en', options);
}

setTodayDate();
// removeAll(dataTasks);