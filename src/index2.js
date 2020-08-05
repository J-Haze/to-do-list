// const { renderTasks } = require("./tasks");

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

// let edittedObject = "";
let mode = "all";
// import {renderTasks} from './tasks';


//Initialize project libarary
function getProjectLibrary() {
    let projectLibrary = [];
    if(localStorage.length > 0) { 
      projectLibrary = JSON.parse(localStorage.getItem("projectLibrary"));
    }
    return projectLibrary;
  };

//Factory Function to create Projects
const addProject = (projectName, tasksArr) => {
    return { 
        projectName: projectName,
        tasksArr: tasksArr
    }
  };

//Adds new project to the "projectLibrary"
function addProjectToLibrary(addProject) {
    projectLibrary.push(addProject);
}



//Creates new div with the new project object
let projectsContent = document.getElementById("projects-content");

function clearProjectLibrary(){
    projectsContent.innerHTML = '';
}

function renderProjects(projectLibrary){
    clearProjectLibrary();
    
    if(projectsContent.length === 0) {
        return
      } 
    if(projectLibrary.length === 0){
        return
    }

    let allTodos = document.getElementById("projects-header");
    let selectedProject = document.querySelector('.selectedProject')
    allTodos.onclick = function() {
        if (selectedProject != null){
            selectedProject.classList.remove("selectedProject");
        }
        allTodos.classList.add("selectedProject");
        mode = "all";
        selectedProject = document.querySelector('.selectedProject');
    };

    // let allProjects = document.getElementsByClassName('project');
    // let selectedProject = allProjects.getElementByClassName("selectedProject")
    
    for (project in projectLibrary){
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
            mode = obj.projectName;
            selectedProject = document.querySelector('.selectedProject')
        };

        //Button to edit project title
        let edit = document.createElement('div');
        edit.innerHTML = '<i class="fa fa-pencil"></i>';
        edit.className = "edit";
        
        edit.onclick = function() {
            modalProject.style.display = "block";
            edit.id = project;
            edittedProject = obj.projectName;
            console.log(obj.projectName)
            console.log("edittedProject", edittedProject)
            return edittedProject = edittedProject
            // localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
            // renderProjects(projectLibrary)
          }
        newElement.appendChild(edit);

        //Button to delete projects
        let close = document.createElement('div');
        // close.innerHTML = '&#128465';
        close.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        close.className = "delete";
        close.id = project.projectName;
        //close.id = project;
        close.onclick = function() {
            projectLibrary.splice(close.id,1)
            localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
            renderProjects(projectLibrary)
          }
        newElement.appendChild(close);


    }
    
}

//Even Listener for Add Project Button
let addProjectBtn = document.getElementById("add-project");

addProjectBtn.addEventListener('click', () => {
    let projectTitle = document.getElementById("project-form").value;
    //check for duplicate names
    for (project in projectLibrary){
        let obj = projectLibrary[project];
        if (obj.projectName == projectTitle){
            projectTitle = `${projectTitle}.1`;
        }
    }

    if (projectTitle == ""){return}
    let newProjectArray = [];
    newProject = addProject(projectTitle, newProjectArray);

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
    console.log("project ID:", projectID)

    for (project in projectLibrary){
        let obj = projectLibrary[project];
        console.log(obj.projectName)
        if (obj.projectName == projectID){
            console.log("match")
            // obj.innerHTML = edittedValue;
            obj.projectName = edittedValue;
            // obj.id = edittedValue;
        }
    }


    console.log(projectLibrary)
    localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
    renderProjects(projectLibrary)
    modalProject.style.display = "none";
});






//add event listeners for all "project" class, when you click on it style changes to selected, removes selected from others, and 


//need an array of all existing "projects" as objects


//will need an array of all existing to-do's as objects


let projectLibrary = getProjectLibrary();

//render
renderProjects(projectLibrary);
// renderTasks();
//renderTodos(todoLibrary);