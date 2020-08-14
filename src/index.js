const { renderTasks } = require("./tasks");

console.log('webpack test')

//Checks that Local Storage is available
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

//Alerts if Local Storage is not available
if (storageAvailable('localStorage')) {
    console.log("Local Storage Available");
  }
  else {
    alert("Local Storage Unavailable");
  }


//Initialize project libarary
function getProjectLibrary() {
    let projectLibrary = [];
    if(localStorage.length > 0) {
        projectLibrary = JSON.parse(localStorage.getItem("projectLibrary"));
    }
    
    if(projectLibrary == null){
        projectLibrary = [];
    }

    return projectLibrary;
  };

function getAllTasks() {
    let allTasks = [];
    if(localStorage.length > 0) {
        allTasks = JSON.parse(localStorage.getItem("allTasks"));
    }
    if (allTasks == null){
        allTasks = [];
    }

    return allTasks;
  };


//Factory Function to create Projects
const addProject = (projectName, projectArray) => {
    return { 
        projectName: projectName,
        projectArray: projectArray
    }
  };

//Factory Function to create Task
const addTask = (taskName, project, priority, date, notes, done) => {
    return { 
        taskName: taskName,
        project: project,
        priority: priority,
        date: date,
        notes: notes,
        done: done
    }
};

let allTasks = getAllTasks();
let allTasksTab = addProject("all", allTasks);
let activeProject = allTasksTab;

//Adds new project to the "projectLibrary"
function addProjectToLibrary(addProject) {
    projectLibrary.push(addProject);
}

//Adds new Task to Project
function addTaskToProject(newTask) {
    if (activeProject.projectArray == undefined){
        activeProject.projectArray = newTask;
        allTasks = newTask;
    }
    activeProject.projectArray.push(newTask);
    allTasks.push(newTask);
}

//Script for priority
let priorityValue = "low";
let lowBtn = document.getElementById("lowBtn");
let mediumBtn = document.getElementById("mediumBtn");
let highBtn = document.getElementById("highBtn");

lowBtn.onclick = function() {
    lowBtn.classList.add("lowSelected");
    mediumBtn.classList.remove("mediumSelected");
    highBtn.classList.remove("highSelected");
    priorityValue = "low";
};

mediumBtn.onclick = function() {
    lowBtn.classList.remove("lowSelected");
    mediumBtn.classList.add("mediumSelected");
    highBtn.classList.remove("highSelected");
    priorityValue = "medium";
};

highBtn.onclick = function() {
    lowBtn.classList.remove("lowSelected");
    mediumBtn.classList.remove("mediumSelected");
    highBtn.classList.add("highSelected");
    priorityValue = "high";
};

//Creates new div with the new project object
let projectsContent = document.getElementById("projects-content");

function clearProjectLibrary(){
    projectsContent.innerHTML = '';
}

function renderProjects(projectLibrary){
    clearProjectLibrary();
    
    if(projectsContent.length == 0) {
        return
      }
    if(projectLibrary.length == 0){
        return
    }

    let allTodos = document.getElementById("projects-header");
    let selectedProject = document.querySelector('.selectedProject')
    allTodos.onclick = function() {
        if (selectedProject != null){
            selectedProject.classList.remove("selectedProject");
        }
        allTodos.classList.add("selectedProject");
        activeProject = allTasksTab;
        selectedProject = document.querySelector('.selectedProject');
        renderTasks(activeProject, allTasks);
    };


    for (let project in projectLibrary) {
        let obj = projectLibrary[project];
        let newElement = document.createElement('div');
        newElement.innerHTML = obj.projectName;
        newElement.id = obj.projectName;
        newElement.className = "project";
        projectsContent.appendChild(newElement);

        //Event Listener for selecting the active project
        newElement.onclick = function() {
            if (selectedProject != null){
                selectedProject.classList.remove("selectedProject");
            }

            newElement.classList.add("selectedProject");
            activeProject = obj;
            selectedProject = document.querySelector('.selectedProject')

            renderTasks(activeProject, allTasks);
        };

        //Button to edit project title
        let edit = document.createElement('div');
        edit.innerHTML = '<i class="fa fa-pencil"></i>';
        edit.className = "edit";
        
        edit.onclick = function() {
            modalProject.style.display = "block";
            edit.id = project;
            edittedProject = obj.projectName;
            return edittedProject = edittedProject
          }
        newElement.appendChild(edit);

        //Button to delete projects
        let close = document.createElement('div');
        close.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        close.className = "delete";
        close.id = project;
        close.onclick = function() {
            closeName = projectLibrary[close.id].projectName;
            projectLibrary.splice(close.id,1);
            for (task in allTasks){
                if (allTasks[task].project == closeName){
                    allTasks.splice(task,1)
                }
            }

            localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
            renderProjects(projectLibrary);
            renderTasks(activeProject, allTasks);
          }
        newElement.appendChild(close);
        
    };
    
};

//Even Listener for Add Project Button
let addProjectBtn = document.getElementById("add-project");

addProjectBtn.addEventListener('click', () => {
    let projectTitle = document.getElementById("project-form").value;
    for (project in projectLibrary){
        let obj = projectLibrary[project];
        if (obj.projectName == projectTitle){
            projectTitle = `${projectTitle}.1`;
        }
    }

    if (projectTitle == ""){return}
    let newProjectArray = [];
    let newProject = addProject(projectTitle, newProjectArray);

    let obj = "";
    addProjectToLibrary(newProject);
    localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
    renderProjects(projectLibrary);
})

//Add Project Modal
let modalProject = document.getElementById("modal-project");
let editProjectBtn = document.getElementById("submit-project");
let projectSpan = document.getElementsByClassName("span")[0];

projectSpan.onclick = function() {
    modalProject.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalProject) {
    modalProject.style.display = "none";
  }
}

editProjectBtn.addEventListener('click', () => {

    let edittedValue = document.getElementById("edit-project").value;
    if (edittedValue == ""){
        return
    }

    let changeProject = document.getElementById(edittedProject);
    let projectID = changeProject.id;


    for (project in projectLibrary){
        let obj = projectLibrary[project];
        if (obj.projectName == projectID){
            obj.projectName = edittedValue;
        }
    }

    for (task in allTasks){
        if (allTasks[task].project == projectID){
            allTasks[task].project = edittedValue
        }}

    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
    renderTasks(activeProject, allTasks);
    renderProjects(projectLibrary)
    modalProject.style.display = "none";
});


let addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener('click', () => {
    //Get task from the form
    let taskTitle = document.getElementById("new-task-form").value;
    let priority = priorityValue;

    //Will need to reformat how it gets data from "date"
    let date = document.getElementById("date").value;
    let notes = document.getElementById("notes-input").value;

    //Make sure form isn't empty
    if (taskTitle == ""){
        console.log('Task Title is blank')
        return}
    if (activeProject == allTasksTab){
        alert("Please select a Project to add To-Do to.")
        return
    }

    for (task in allTasks){
        if (task == taskTitle){
            taskTitle = `${taskTitle}.1`;
        }
    }
    
    let newTask = addTask(taskTitle, activeProject.projectName, priority, date, notes);

    addTaskToProject(newTask);
    renderTasks(activeProject, allTasks);
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
});


let projectLibrary = getProjectLibrary();

renderProjects(projectLibrary);
renderTasks(activeProject, allTasks);



