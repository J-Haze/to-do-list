// import { compareAsc, format } from 'date-fns'

// format(new Date(2014, 1, 11), 'yyyy-MM-dd')

//format for "getTaskList"
//I think the local storage should be done through index.js (the tasks should be stored witht hte project right? In the projectArray?)

// let projectIndex = localStorage.projectIndex || 0;

function renderTasks(activeProject, tasksArr){
    console.log('test renderTasks')
    let todoContent = document.getElementById("todo-content");

    function clearTasks(){
        todoContent.innerHTML = '';
    };
    clearTasks();
    //May only need active project and then can get tasksArr from there?
    
    console.log("Active Project:", activeProject)
    console.log("!tasksArr:2", tasksArr)

    if(todoContent.length === 0) {
        console.log("todoContent length equals zero!")
        return
      };


    if(tasksArr == null){
        console.log("tasksArr equals null!")
        return
    };

    for (let task in tasksArr){
        let obj = tasksArr[task];
        console.log("obj:", obj)
        console.log("activeProject4", activeProject.projectName)
        if ((obj.project == activeProject.projectName) || (activeProject.projectName == "all")){
            console.log("Match")
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
            // noteDisp.innerHTML = obj.notes;
            noteDisp.innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
            noteDisp.classList.add("noteDisplay");
            noteDisp.id = task;
            noteDisp.text = obj.notes;
            newElement.appendChild(noteDisp);

            let closeTask = document.createElement('div');
            closeTask.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
            closeTask.className = "delete deleteTask";
            closeTask.id = task;

            closeTask.onclick = function() {
                tasksArr.splice(closeTask.id,1);
                allTasks = tasksArr
                // for (task in allTasks){
                //     console.log('task.projectname,', allTasks[task].taskName)
                //     console.log('obj id', closeName)
                //     if (allTasks[task].taskname == closeName){
                //         console.log('match')
                //         allTasks.splice(task,1)
                //     }
                // }
                // if(allTasks.some(task => task.projectName == close.id)){
                //     alert(`${close.id} found inside the array.`);
                // } else{
                    
                //     alert(`${close.id} NOT found inside the array.`);
                // }
    
                localStorage.setItem("allTasks", JSON.stringify(allTasks));
                renderTasks(activeProject, allTasks);
              }
            newElement.appendChild(closeTask);
        }

    };
    // const removeTodo = (todoID) => {
    //     const index = todos.findIndex(todo => {
    //         return todo.getTodoID() === todoID;
    //     })

    //     todos.splice(index, 1);
    // }
    
    // const exportForLocalStorage = () => {
    //     const todosForExport = todos.map(todo => todo.exportForLocalStorage());

    //     return {
    //         name,
    //         todos: todosForExport
    //     };
    // }
    // return {
    //     removeTodo,
    //     exportForLocalStorage
    // };
};

export{renderTasks}