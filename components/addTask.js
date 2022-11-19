import { uniqueDates } from '../services/date.js';
import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from "./readTasks.js";

export const addTask = (evento) =>{
   //esto evita que el navegador borre todo a cada cambio
   evento.preventDefault();
  //accedemos a lista que contiene toda la tarea
  const list = document.querySelector('[data-list]');
  const input = document.querySelector('[data-form-input]');
  const calendar = document.querySelector('[data-form-date]');

  const value = input.value;
  const date = calendar.value // esta constante nos deja acceder al valor 
  
  //a la biblioteca moments le consulto sobre date y le paso el formato que necesito que muestre
  //console.log(moment(date).format('DD/MM/YYYY'))
  const dateFormat = moment(date).format('DD/MM/YYYY')

  //si el input o la fecha no son validas o vacias, retorna el valor inmediatamente para que no se ejecute el código
  if(value == "" || date == ""){
    console.log("No hay tarea para crear")
    return
  }

  //limpiamos el input y el calendario para que queden vacíos  
   input.value = "";
   calendar.value = "";

   //esta variable nos ayuda a rastrear una variable completada para que almacene el valor en storage
  const complete = false;
   
  //un objeto que almacene los valores de value(input de texto) y dateFormat(la fecha seleccionada)
  const objTask = {
    value,
    dateFormat,
    complete,
    id: uuid.v4()  //esto permite que cada elemento tenga un id
  }

  //cada vez que se agrega una tarea, primero inicia con estructura vacia, luego "readTask" agrega la estructura
  list.innerHTML ="";

   // aqui almacenaremos las "tasks" del objTask en localStorage, asi no se sobreescriben
   // con getItem llamamos la llave "tasks" que tiene la informacion almacenada
   // JSON.parse revierte el stringify convertido en string y lo revierte a objeto

  // || [] significa que en caso que que hayan datos en storage estos se muestren, de lo contrario empieze con array vacio
   const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
   console.log(taskList)
   //vamos agregando objTask al array taskList
   taskList.push(objTask);

   // sessionStorage y localStorage con metodo setItem solo toma como valores strings
   // usamos JSON.stringify para convertir objTask en string
   // sessionStorage.setItem("tasks", JSON.stringify(objTask))
 
   // almacenabamos el objeto directamente, ahora almacenamos el array
   localStorage.setItem("tasks", JSON.stringify(taskList))
   // localStorage.setItem("tasks", JSON.stringify(objTask)) 
 
   //al agregar una nueva task esta se agrega inmediatamente a la lista desde el storage a la pantalla
  displayTasks();

  
  /*
  //task llama a la funcion createTast y recibe a evento como parametro
  const task = createTask(objTask)

   //task a lista, PERO NECESITAMOS QUE CREATE TASK NOS RETORNE task

   //agregamos esta tarea a la lista
  list.appendChild(task);*/
  
}

//esta funcion crea "fisicamente" la tarea en el index
export const createTask = ({value, dateFormat, complete, id}) => {
  

  //creamos la lista
  const task = document.createElement('li');
  //a esa lista le pasamos una clase "card"
        task.classList.add('card');

  //se crea un div para recibir los elementos
  const taskContent = document.createElement('div');

  const check = checkComplete(id)

  //esta seccion cambia el estilo de la marca check segun se encuentre gracias a toggle
  //si complete es true:
  if(complete){
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
    console.log("completada")
  }
  
  //creamos dentro de la div un span que es lo q contiene la tarea finalmente
  const titleTask = document.createElement('span');
        titleTask.classList.add('task');
        titleTask.innerText = value;

        //al div "taskContent" le pasamos 2 hijos, el icono y el titulo de la tarea
        taskContent.appendChild(check);
        taskContent.appendChild(titleTask);

  //creamos un elemento span para recibir la fecha
  const dateElement = document.createElement("span")
        //a ese span le pasamos la fecha
        dateElement.innerHTML = dateFormat;
        // task.innerHTML = content;
        //console.log(dateElement);
      
        //a "task" que contiene la tarea le pasamos el contenido con iconos, titulo de tarea y tambiem la fecha
        task.appendChild(taskContent);
        task.appendChild(dateElement) //entre el nombre de la tarea y el icono de borrar le pasamos la fecha 
        task.appendChild(deleteIcon(id));
        //list.appendChild(task);

  return task; //esto hace un link con la funcion addTask
};