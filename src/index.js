
//Initialize project libarary
function getProjectLibrary() {
    let projectLibrary = [];
    // if(localStorage.length > 0) { 
    //   projectLibrary = JSON.parse(localStorage.getItem("projectLibrary"));
    // }
    return projectLibrary;
  }


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

//add even listener for the add button
let addProjectBtn = document.getElementById("add-project");

addProjectBtn.addEventListener('click', () => {
    // let projectInput = document.getElementById("project-form");
    let projectTitle = document.getElementById("project-form").value;
    newProject = addProject(projectTitle);
    addProjectToLibrary(newProject);
    renderProjects(projectLibrary);
    console.log(projectLibrary)
})
//should take the form input and create a new div with it
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

    }
    
}


//add event listeners for all "project" class, when you click on it style changes to selected, removes selected from others, and 


//need an array of all existing "projects" as objects


//will need an array of all existing to-do's as objects


console.log(addProject('shopping'))




let projectLibrary = getProjectLibrary();

addProjectToLibrary(addProject('Default'));

//render
renderProjects(projectLibrary);
//renderTodos();