
//Factory Function to create Projects
const addProject = (projectName) => {
    return { projectName: projectName };
  };

console.log(addProject('shopping'))


//Factory Function to create To-Do's
// const personFactory = (name, age) => {
//     const sayHello = () => console.log('hello!');
//     return { name, age, sayHello };
//   };
  