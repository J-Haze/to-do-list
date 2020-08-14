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
    }
    
    window.onclick = function(event) {
      if (event.target == modalTask) {
        modalTask.style.display = "none";
      }
    }

    editTaskBtn.addEventListener('click', () => {
        let editTaskFormValue = document.getElementById("edit-task").value;
        let changeTask = document.getElementById(edittedTask);
        let taskID = changeTask.id;
    
        for (let i in allTasks){
            let ob = allTasks[i];

            if (ob.taskName == taskID){
                ob.notes = editTaskFormValue;
            }
        }
        
        renderTaskForm(editTaskFormValue, edittedTask, allTasks)
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
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
        return
      };

    if(allTasks == null){
        return
    };

    for (let task in allTasks){
        let obj = allTasks[task];

        if ((obj.project == activeProject.projectName) || (activeProject.projectName == "all")){
            let newElement = document.createElement('div');
            newElement.className = obj.taskName;
            newElement.classList.add("box");
            newElement.id = obj.taskName;
            todoContent.appendChild(newElement);
    
            let uncheckedBox = document.createElement('div');
            uncheckedBox.innerHTML = 'X';
            uncheckedBox.className = 'uncheckedBox';
            newElement.appendChild(uncheckedBox);

            let taskTitle = document.createElement('div');
            taskTitle.innerHTML = obj.taskName;
            taskTitle.classList.add(obj.taskName.replace(/\s/g , "-"));
            taskTitle.classList.add("task");
            newElement.appendChild(taskTitle);

            if (obj.done == "yes"){
                uncheckedBox.className = "checked";
                taskTitle.classList.add("strikethrough");
            }

            uncheckedBox.addEventListener('click', () => {
                if (obj.done != "yes"){
                    uncheckedBox.className = "checked";
                    taskTitle.classList.add("strikethrough");
                    obj.done = "yes";
                    localStorage.setItem("allTasks", JSON.stringify(allTasks));
                } else{
                    if (priorityValueInput == "low") {
                        lowPriority.classList.add("lowSelected");
                        medPriority.classList.remove("mediumSelected");
                        highPriority.classList.remove("highSelected");
        
                        uncheckedBox.className = "lowBox";
                        taskTitle.classList.remove("strikethrough");
                    };
        
                    if (priorityValueInput == "medium") {
                        lowPriority.classList.remove("lowSelected");
                        medPriority.classList.add("mediumSelected");
                        highPriority.classList.remove("highSelected");
        
                        uncheckedBox.className = "medBox";
                        taskTitle.classList.remove("strikethrough");
                    };
        
                    if (priorityValueInput == "high") {
                        lowPriority.classList.remove("lowSelected");
                        medPriority.classList.remove("mediumSelected");
                        highPriority.classList.add("highSelected");
        
                        uncheckedBox.className = "highBox";
                        taskTitle.classList.remove("strikethrough");
                    };

                    obj.done = "no";
                    localStorage.setItem("allTasks", JSON.stringify(allTasks));
                }
            });

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

            let priorityDisp = document.createElement('div');
            let priorityValueInput = obj.priority;
            priorityDisp.classList.add(obj.priority);
            priorityDisp.classList.add("priorityDisplay");
            newElement.appendChild(priorityDisp);

            //Create priority buttons for each Task
            let lowPriority = document.createElement('div')
            lowPriority.innerHTML = 'Low';
            lowPriority.className = "toggle";
            priorityDisp.appendChild(lowPriority);

            let medPriority = document.createElement('div')
            medPriority.innerHTML = 'Medium';
            medPriority.className = "toggle";
            priorityDisp.appendChild(medPriority);

            let highPriority = document.createElement('div')
            highPriority.innerHTML = 'High';
            highPriority.className = "toggle";
            priorityDisp.appendChild(highPriority);

            //apply selection if the input priority value corresponds with div        
            if (priorityValueInput == "low") {
                lowPriority.classList.add("lowSelected");
                medPriority.classList.remove("mediumSelected");
                highPriority.classList.remove("highSelected");

                if (obj.done != "yes"){
                uncheckedBox.className = "lowBox";
                taskTitle.classList.remove("strikethrough");
                }
            };

            if (priorityValueInput == "medium") {
                lowPriority.classList.remove("lowSelected");
                medPriority.classList.add("mediumSelected");
                highPriority.classList.remove("highSelected");

                if (obj.done != "yes"){
                uncheckedBox.className = "medBox";
                taskTitle.classList.remove("strikethrough");
                }
            };

            if (priorityValueInput == "high") {
                lowPriority.classList.remove("lowSelected");
                medPriority.classList.remove("mediumSelected");
                highPriority.classList.add("highSelected");

                if (obj.done != "yes"){
                uncheckedBox.className = "highBox";
                taskTitle.classList.remove("strikethrough");
                }
            };

            //event listeners
            lowPriority.onclick = function() {
                lowPriority.classList.add("lowSelected");
                medPriority.classList.remove("mediumSelected");
                highPriority.classList.remove("highSelected");
                obj.priority = "low";
                uncheckedBox.className = "lowBox";
                taskTitle.classList.remove("strikethrough");
                if (obj.done == "yes"){
                    obj.done = "no";
                    }
                localStorage.setItem("allTasks", JSON.stringify(allTasks));
            };

            medPriority.onclick = function() {
                lowPriority.classList.remove("lowSelected");
                medPriority.classList.add("mediumSelected");
                highPriority.classList.remove("highSelected");
                obj.priority = "medium";
                uncheckedBox.className = "medBox";
                taskTitle.classList.remove("strikethrough");
                if (obj.done == "yes"){
                    obj.done = "no";
                    }
                localStorage.setItem("allTasks", JSON.stringify(allTasks));
                }

            highPriority.onclick = function() {
                lowPriority.classList.remove("lowSelected");
                medPriority.classList.remove("mediumSelected");
                highPriority.classList.add("highSelected");
                obj.priority = "high";
                uncheckedBox.className = "highBox";
                taskTitle.classList.remove("strikethrough");
                if (obj.done == "yes"){
                    obj.done = "no";
                    }
                localStorage.setItem("allTasks", JSON.stringify(allTasks));
                }
            
            let dateDisp = document.createElement('input');
            dateDisp.type = 'date';
            dateDisp.value = obj.date;
            dateDisp.classList.add("dateDisplay");
            dateDisp.addEventListener("change", function(e){
                obj.date = dateDisp.value;
                localStorage.setItem("allTasks", JSON.stringify(allTasks));
              }, false
              );

            newElement.appendChild(dateDisp);

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