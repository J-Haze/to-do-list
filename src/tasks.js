// import { compareAsc, format } from 'date-fns'

// format(new Date(2014, 1, 11), 'yyyy-MM-dd')


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
        console.log("test editTaskBtn")
        // edittedTask = renderTasks(activeProject, allTasks);
        // console.log("Returned edittedTask:", edittedTask)
        // let edittedValueTask = document.getElementById("edit-task").value;
        let editTaskFormValue = document.getElementById("edit-task").value;
        // let newEditTask = edittedTask;
        let changeTask = document.getElementById(edittedTask);
        let taskID = changeTask.id;
        
        // console.log("EDITTEDVALUETASK", edittedValueTask)
        // console.log("tasksArr!!!", allTasks)
    
        for (let i in allTasks){
            let ob = allTasks[i];
            // console.log(`i: ${i} taskID: ${taskID}`)
            console.log(`ob.taskName: ${ob.taskName} taskID: ${taskID}`)
            if (ob.taskName == taskID){
                console.log("match between i and taskID")
                // obj.innerHTML = edittedValue;
                ob.notes = editTaskFormValue;
                console.log("Stored edittedValue:", editTaskFormValue)
            }
        }
    
        console.log("EdittedTaskValueForm:", editTaskFormValue)
        console.log("EDITTEDTASK", edittedTask)
        console.log("tasksArr!!!!!", allTasks)
        // localStorage.setItem("allTasks", JSON.stringify(allTasks));
    
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
    
    let todoContent = document.getElementById("todo-content");
    let modalTask = document.getElementById("modal-task");

    function clearTasks(){
        todoContent.innerHTML = '';
    };
    clearTasks();

    if(todoContent.length === 0) {
        console.log("todoContent length equals zero!")
        return
      };

    if(allTasks == null){
        console.log("tasksArr equals null!")
        return
    };

    console.log("allTasks:", allTasks)

    for (let task in allTasks){
        let obj = allTasks[task];

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
    
            let dateDisp = document.createElement('input');
            dateDisp.type = 'date';
            console.log('obj.date.value', obj.date.value)
            dateDisp.value = obj.date;
            dateDisp.classList.add("dateDisplay");
            newElement.appendChild(dateDisp);
    
            let noteDisp = document.createElement('div');
            noteDisp.innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
            noteDisp.classList.add("noteDisplay");
            noteDisp.id = task;
            noteDisp.title = obj.taskName
            noteDisp.text = obj.notes;

            noteDisp.onclick = function(){
                editTaskFormValue = obj.notes;
                edittedTask = obj.taskName;
                renderTaskForm(editTaskFormValue, edittedTask, allTasks);
                
                modalTask.style.display = "block";
                return edittedTask = edittedTask
            }

            newElement.appendChild(noteDisp);

            let closeTask = document.createElement('div');
            closeTask.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
            closeTask.className = "delete deleteTask";
            closeTask.id = task;

            closeTask.onclick = function() {
                allTasks.splice(closeTask.id,1);
                allTasks = allTasks;
    
                localStorage.setItem("allTasks", JSON.stringify(allTasks));
                renderTasks(activeProject, allTasks);
              }
            newElement.appendChild(closeTask);      
        }
    };

    return edittedTask
};

export{renderTasks}