  
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

let edittedObject = "";

//Initialize project libarary
function getProjectLibrary() {
    let projectLibrary = [];
    if(localStorage.length > 0) { 
      projectLibrary = JSON.parse(localStorage.getItem("projectLibrary"));
    }
    return projectLibrary;
  };

//Factory Function to create Projects
const addProject = (projectName) => {
    return { 
        projectName: projectName 
    }
  };

//Adds new project to the "projectLibrary"
function addProjectToLibrary(addProject) {
    projectLibrary.push(addProject);
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
    newProject = addProject(projectTitle);

    addProjectToLibrary(newProject);
    localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
    renderProjects(projectLibrary);
})

//Creates new div with the new project object
let projectsContent = document.getElementById("projects-content");

function clearProjectLibrary(){
    projectsContent.innerHTML = '';
}

function renderProjects(projectLibrary){
    clearProjectLibrary();
    
    if(projectsContent.length === 0) {
        return;
      } 

    for (project in projectLibrary){
        let obj = projectLibrary[project];
        let newElement = document.createElement('div');
        newElement.innerHTML = obj.projectName;
        newElement.id = obj.projectName;
        newElement.className = "project";
        projectsContent.appendChild(newElement);


        //Button to edit project title
        let edit = document.createElement('div');
        edit.innerHTML = '<i class="fa fa-pencil"></i>';
        edit.className = "edit";
        // edit.classList.add = project;
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
        close.id = project;
        close.onclick = function() {
            projectLibrary.splice(close.id,1)
            localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
            renderProjects(projectLibrary)
          }
        newElement.appendChild(close);




    }
    
}

//Modal & form
let modalProject = document.getElementById("modal-project");
let editProjectBtn = document.getElementById("submit-project");
let projectSpan = document.getElementsByClassName("span")[0];

// editProjectBtn.onclick = function() {
//     modalProject.style.display = "block";
// }

projectSpan.onclick = function() {
    modalProject.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalProject) {
    modalProject.style.display = "none";
  }
}

editProjectBtn.addEventListener('click', () => {
    let changeProject = document.getElementById(edittedProject);
    let edittedValue = document.getElementById("edit-project").value;
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
    
    // edit.id.innerHTML = edittedValue;

    // console.log("edittedValue", edittedValue)
    // if (!edittedValue) return
    // console.log(edittedProject)
    // let changeProject = document.getElementById(edittedProject);
    // console.log("changeProject:", changeProject)
    // changeProject.projectName = edittedValue;
    // changeProject.innerHTML = edittedValue;
    // changeProject.id = edittedValue;

    // projectLibrary = projectLibrary.map(x => (x.id === edittedProject.id) ? x : edittedValue)

    // const projectLibrary = projectLibrary.map(x => edittedValue.find(({ changeProject }) => changeProject === x.changeProject) || x);

    // projectLibrary.splice(close.id,1)
    // projectLibrary.appendChild(changeProject)


    console.log(projectLibrary)
    localStorage.setItem("projectLibrary", JSON.stringify(projectLibrary));
    renderProjects(projectLibrary)
    modalProject.style.display = "none";
});






//add event listeners for all "project" class, when you click on it style changes to selected, removes selected from others, and 


//need an array of all existing "projects" as objects


//will need an array of all existing to-do's as objects


let projectLibrary = getProjectLibrary();

// addProjectToLibrary(addProject('All To-Do\x27s'));

//render
renderProjects(projectLibrary);
//renderTodos(todoLibrary);