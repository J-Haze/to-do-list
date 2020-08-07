// import { compareAsc, format } from 'date-fns'

// format(new Date(2014, 1, 11), 'yyyy-MM-dd')

//format for "getTaskList"
//I think the local storage should be done through index.js (the tasks should be stored witht hte project right? In the projectArray?)



function renderTasks(activeProject, tasksArr){
    console.log('test renderTasks')
    let todoContent = document.getElementById("todo-content");

    function clearTasks(){
        todoContent.innerHTML = '';
    };
    clearTasks();
    //May only need active project and then can get tasksArr from there?
    
    console.log("Active Project:", activeProject)
    console.log("tasksArr:", tasksArr)

    if(todoContent.length === 0) {
        return
      };


    if(tasksArr == null){
        return
    };

    for (let task in tasksArr){
        let obj = tasksArr[task];
        console.log("obj:", obj)
        let newElement = document.createElement('div');
        newElement.className = obj.taskName;
        newElement.classList.add("box");
        todoContent.appendChild(newElement);

        let taskTitle = document.createElement('div');
        taskTitle.innerHTML = obj.taskName;
        taskTitle.classList.add(obj.taskName);
        taskTitle.classList.add("task");
        newElement.appendChild(taskTitle);

        let priorityDisp = document.createElement('div');
        priorityDisp.innerHTML = obj.priority;
        priorityDisp.classList.add(obj.priority);
        priorityDisp.classList.add("priorityDisplay");
        newElement.appendChild(priorityDisp);

        let dateDisp = document.createElement('div');
        dateDisp.innerHTML = obj.date;
        dateDisp.classList.add("dateDisplay");
        newElement.appendChild(dateDisp);

        let noteDisp = document.createElement('div');
        noteDisp.innerHTML = obj.notes;
        noteDisp.classList.add("noteDisplay");
        newElement.appendChild(noteDisp);
    };



};

export{renderTasks}