//esta funcion va a verificar que las fechas en la esquina no se repitan
export const uniqueDates = (tasks) => {
    const unique = [];
    tasks.forEach(task => {

        //esto ve las fechas de cada una de la tareas
        //console.log(task.dateFormat);

        //si no existe esa fecha de nuestra tarea entonces que la agregue al array unique
        if(!unique.includes(task.dateFormat)){
            unique.push(task.dateFormat)

            //console.log(unique)
        }
    });
    
    return unique
    
};

//funcion para ordernar las fechas
export const orderDates = (dates)=>{
    return dates.sort((a, b) =>{
        //console.log(a)
        //console.log(b)

        //se le asigna a cada letra un nombre de variable
        const firstDate = moment(a, "DD/MM/YYY");

        const secondDate = moment(b, "DD/MM/YYY");

        //al retornar la diferencia ordena la fecha a antes de la b de manera descendente
        return firstDate - secondDate;

    })


    }