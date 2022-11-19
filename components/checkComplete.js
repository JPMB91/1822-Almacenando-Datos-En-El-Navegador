
//ahora esta variable recibe la id creada por uidd
const checkComplete = (id) => {
  const i = document.createElement('i');
  i.classList.add('far', 'fa-check-square', 'icon');

  //cada vez que se haga click a este icono se manda a llamar la funcion completeTask
  i.addEventListener('click', (event)  =>completeTask(event,id));
  return i;
};
// Immediately invoked function expression IIFE
const completeTask = (event, id) => {
  const element = event.target;
  element.classList.toggle('fas');
  element.classList.toggle('completeIcon');
  element.classList.toggle('far');

  console.log("check id", id)


  //esto nos ayuda a saber el orden de complete en el array para pasarlo de false a true
  const tasks = JSON.parse(localStorage.getItem("tasks"))
  //console.log(tasks)

  const index = tasks.findIndex ((item) => item.id == id);
  console.log(index)

  //antes dejamos a complete por defaul en false cuando se crea una tarea
  //esta linea permite cambiar el estado de complete al negarlo cuando se presione el icono cambia de true a false segun sea el caso
  tasks[index].complete = !tasks[index].complete;

  //esta linea almacena el cambio en "tasks" que almacena el array con el contenido de la tarea
  localStorage.setItem("tasks", JSON.stringify(tasks));

  console.log(tasks)

  
};

export default checkComplete; 
