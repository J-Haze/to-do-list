// import { compareAsc, format } from 'date-fns'

// format(new Date(2014, 1, 11), 'yyyy-MM-dd')

//format for "getTaskList"
//I think the local storage should be done through index.js (the tasks should be stored witht hte project right? In the projectArray?)

// let projectIndex = localStorage.projectIndex || 0;
// const { renderTaskForm } = require("./index");

// let renderTaskForm = renderTaskForm;
// const { renderTaskForm } = require("./index");

let edittedTask = "";
let editTaskFormValue = "";

let formTask = document.getElementById("form-task");
let editTaskForm = document.createElement('textarea');
editTaskForm.id = "edit-task";
editTaskForm.className = "form-input-task";
editTaskForm.value = editTaskFormValue
formTask.appendChild(editTaskForm);

let editTaskBtn = document.createElement('button')
editTaskBtn.id = "submit-task";
editTaskBtn.innerHTML = "Submit";
formTask.appendChild(editTaskBtn);



let modalTask = document.getElementById("modal-task");
// let editTaskBtn = document.getElementById("submit-task");
let taskSpan = document.getElementsByClassName("span-task")[0];

function renderTaskForm (editTaskFormValue, edittedTask, allTasks) {
    let formTask = document.getElementById("form-task");
    let editTaskForm = document.createElement('textarea'); 

    function clearTaskForm(){
        formTask.innerHTML = "";
    }
    clearTaskForm()

    // editTaskForm.type = "text";
    editTaskForm.id = "edit-task";
    editTaskForm.className = "form-input-task";
    editTaskForm.value = editTaskFormValue
    formTask.appendChild(editTaskForm);

    let editTaskBtn = document.createElement('button')
    editTaskBtn.id = "submit-task";
    editTaskBtn.innerHTML = "Submit";
    formTask.appendChild(editTaskBtn);


    taskSpan.onclick = function() {
        modalTask.style.display = "none";
        // renderTasks(activeProject, allTasks)
        // renderTaskForm();
    }
    
    window.onclick = function(event) {
      if (event.target == modalTask) {
        modalTask.style.display = "none";
        // renderTasks(activeProject, allTasks);
        // renderTaskForm();
      }
    }

    editTaskBtn.addEventListener('click', () => {
        // edittedTask = renderTasks(activeProject, allTasks);
        // console.log("Returned edittedTask:", edittedTask)
        let edittedValueTask = document.getElementById("edit-task").value;
        // let newEditTask = edittedTask;
        let changeTask = document.getElementById(edittedTask);
        let taskID = changeTask.id;
        
        console.log("EDITTEDVALUETASK", edittedValueTask)
        console.log("tasksArr!!!", allTasks)
    
        for (let i in allTasks){
            let ob = allTasks[i];
            // console.log(`i: ${i} taskID: ${taskID}`)
            console.log(`ob.taskName: ${ob.taskName} taskID: ${taskID}`)
            if (ob.taskName == taskID){
                console.log("match between i and taskID")
                // obj.innerHTML = edittedValue;
                ob.notes = edittedValueTask;
                console.log("Stored edittedValue:", edittedValueTask)
            }
        }
    
        console.log("EdittedValueTask:", edittedValueTask)
        console.log("tasksArr!!!!!", allTasks)
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
    
        renderTaskForm(editTaskFormValue, edittedTask, allTasks)
        
        // obj.notes = edittedValueTask;
    
        // console.log(projectLibrary)
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
        // localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
        
        // renderProjects(projectLibrary)
        modalTask.style.display = "none";
    }); 


};

function renderTasks(activeProject, allTasks){
    // renderTaskForm(editTaskFormValue, edittedTask, allTasks);
    console.log('test renderTasks')
    let todoContent = document.getElementById("todo-content");
    let modalTask = document.getElementById("modal-task");
    // let editTaskForm = document.getElementById("edit-task");
    
    // let data-edittedTask = "";

    function clearTasks(){
        todoContent.innerHTML = '';
    };
    clearTasks();
    //May only need active project and then can get tasksArr from there?
    
    console.log("Active Project:", activeProject)
    console.log("!tasksArr:2", allTasks)

    if(todoContent.length === 0) {
        console.log("todoContent length equals zero!")
        return
      };


    if(allTasks == null){
        console.log("tasksArr equals null!")
        return
    };

    for (let task in allTasks){
        let obj = allTasks[task];
        console.log("obj!", obj)
        if ((obj.project == activeProject.projectName) || (activeProject.projectName == "all")){
            let newElement = document.createElement('div');
            newElement.className = obj.taskName;
            newElement.classList.add("box");
            newElement.id = obj.taskName;
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
            noteDisp.title = obj.taskName
            noteDisp.text = obj.notes;

            // editTaskForm.defaultValue = obj.notes;

            noteDisp.onclick = function(){
                // editTaskForm.defaultValue = noteDisp.text;
                editTaskFormValue = obj.notes;
                renderTaskForm(editTaskFormValue, edittedTask, allTasks);
                
                modalTask.style.display = "block";
                // noteDisp.id = task;
                console.log("obj.taskName:", obj.taskName)

                edittedTask = obj.taskName;
                console.log("EDITTED TASK:", edittedTask)
                
                console.log("all task here2", allTasks)
 
                // renderTasks(activeProject, allTasks);
                return edittedTask = edittedTask
            }

            newElement.appendChild(noteDisp);

            // console.log("edittedTask in for:", edittedTask)



            let closeTask = document.createElement('div');
            closeTask.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
            closeTask.className = "delete deleteTask";
            closeTask.id = task;

            closeTask.onclick = function() {
                allTasks.splice(closeTask.id,1);
                allTasks = allTasks;
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













    // let editTaskBtn = document.getElementById("submit-task");

    // editTaskBtn.addEventListener('click', () => {
    //     let edittedValueTask = document.getElementById("edit-task").value;
    //     // if (edittedValue == ""){
    //     //     return
    //     // }
        
    //     let changeTask = document.getElementById(edittedTask);
    //     let taskID = changeTask.id;

    //     for (task in allTasks){
    //         let obj = allTasks[task];
    //         // console.log(obj.projectName)
    //         if (obj.taskName == taskID){
    //             // console.log("match")
    //             // obj.innerHTML = edittedValue;
    //             obj.taskName = edittedValueTask;
    //             // obj.id = edittedValue;
    //         }
    //     }
        
    //         console.log("task ID:", taskID)
    //         console.log("edittedValueTask:,", edittedValueTask)

    //     // for (task in allTasks){
    //     //     console.log('task.projectname,', allTasks[task].project)
    //     //     // console.log('obj id', edittedProject)
    //     //     // console.log('project', project)
    //     //     if (allTasks[task].project == projectID){
    //     //         console.log('match')
    //     //         allTasks[task].project = edittedValue
    //     //     }}


    //     // console.log(projectLibrary)
    //     localStorage.setItem("allTasks", JSON.stringify(allTasks));
    //     localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
    //     renderTasks(activeProject, allTasks);
    //     renderProjects(projectLibrary)
    //     modalProject.style.display = "none";
    // });
    console.log("edittedTask inside render", edittedTask)
    return edittedTask
};

export{renderTasks}