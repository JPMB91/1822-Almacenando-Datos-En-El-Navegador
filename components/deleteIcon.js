import { displayTasks } from "./readTasks.js";


const deleteIcon = (id) => {
  const i = document.createElement('i');
  i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
  i.addEventListener('click', ()=> deleteTask(id));
  return i;
};

const deleteTask = (id) => {

  //accedemos al local storage
  const tasks = JSON.parse(localStorage.getItem("tasks"))

  //encontramos el index del elemento id que queremos borrar
  const index = tasks.findIndex((item) => item.id == id)
  console.log(index)

  //usando splice borramos ese index, con el numero de elementos borrados "1" por click
  tasks.splice(index, 1);
   console.log(tasks)

  localStorage.setItem("tasks", JSON.stringify(tasks));

  //accedemos a data-list y le borramos el contenido al hacer click
  const li = document.querySelector("[data-list]");
  li.innerHTML = ""

  displayTasks();
  
};

export default deleteIcon;
