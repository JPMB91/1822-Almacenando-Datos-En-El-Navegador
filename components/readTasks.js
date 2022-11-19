//este archivo va a leer las tareas almacenadas y mostrarlas en pantalla al abrir la página

import { createTask } from "./addTask.js";
import { uniqueDates, orderDates } from "../services/date.js";
import { dateElement } from "./dateElement.js";

export const displayTasks = () =>{

    console.log(uuid.v4())

    //accedemos al ul del index que nos permite agregar las tareas almacenadas
    const list = document.querySelector('[data-list]');
    console.log(list)

    //entramos a localStorage y buscamos la llave "tasks" q almacena nuestras tareas
    //si viene vacio (nulo) que tenga el valor de un array vacio
    const taskList = JSON.parse(localStorage.getItem("tasks")) || []; 

    //console.log(taskList)

   const dates = uniqueDates(taskList)

    const order = orderDates(dates);

   dates.forEach (date =>{
        //este console muestra cada una de las fechas unicas almacenadas en el arreglo
        //console.log(date)

        const dateMoment = moment(date, "DD/MM/YYYY");

        list.appendChild(dateElement(date))
    //recorremos ese array de tareas "taskList"
    //esta funcion anonima usando forEach, separan los elementos del array en objetos  
    taskList.forEach((task) => {
        //console.log(createTask(task))

         //por cada tarea en la lista en storage
         //list.appendChild(dateElement(task.dateFormat))
         
        const taskDate = moment(task.dateFormat, "DD/MM/YYYY")
        //console.log(taskDate)

        //diff analiza la diferencia entre "dateMoment" la fecha, y taskdate, que es la fecha de la tarea
        const diff = dateMoment.diff(taskDate);
        //console.log(diff);

        //si no hay diferencia entonces agrupa las tareas bajo esa fecha titulo
        if(diff == 0){
        //para cada task la pasamos a la lista que contiene la tarea
        //a la ul le pasamos la task que contiene los array con informacion
        list.appendChild(createTask(task))
        }

    }); 

   })

}