// Obtener la informacion del formulario, amañadiendo un listener cada vez que se presione el boton con tag submit ejecutando la función saveTask
document.getElementById("formTask").addEventListener("submit",saveTask);

function saveTask(e){
    // Se obtienen los datos del formulario y se almacenan en variables separadas
    let title = document.getElementById('title').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let description = document.getElementById('description').value;
    //Objeto que contiene la información del formulario, se asigna el valor de las variables a las key
    const task = {
        title: title,
        description: description,
        fecha: fecha,
        hora: hora
    };
    // Se hace uso de Local Storage para almacenar los datos dentro del navegador 
    if(localStorage.getItem("tasks") === null){ // Se usa la funcion getItem para pedir una copia de la informacion del formulario
        let tasks = []; // Creación del arreglo tasks (donde se almancenan las actividades)
        tasks.push(task); // Se llena este arreglo con el metodo push con la información de los objetos
        // JSON.stringify convierte el objeto a string para tener una mejor presentacion en el navegador
        localStorage.setItem("tasks", JSON.stringify(tasks)); // setItem carga la información

    } else{
        //JSON.parse convierte el string en JSON (objeto)
        let tasks = JSON.parse(localStorage.getItem("tasks")); 
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    getTasks();
    document.getElementById("formTask").reset(); // Limpia la informacion ingresada en el formulario
    e.preventDefault(); // Previene el reseteo de la información cuando se refresque la página
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")); //Obtencion de los datos
    let tasksView = document.getElementById("tasks"); // Reconocimiento del div con id tasks

    tasksView.innerHTML = ''; // Se inicializa vacio la variable

    for(let i=0; i<tasks.length; i++){ // Recorrido del arreglo tasks
        // Extracción de la información de los arreglos
        let title = tasks[i].title;
        let description = tasks[i].description;
        let fecha = tasks[i].fecha;
        let hora = tasks[i].hora;
        // Creación del div que presenta la información del formulario
        tasksView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p>${title}  ${fecha} - ${hora} - ${description}</p> 
                <a class="btn btn-danger borrar" onclick="deleteTasks('${title}')">Delete</a>
            </div>
        </div>`
    }
}

function deleteTasks(title){ // Funcion para borrar cualquier tarea a partir del nombre de la actividad
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i=0; i<tasks.length; i++){
        if (tasks[i].title === title){ // Se busca que coincida el nombre de la tarea con el que pide la funcion
            tasks.splice(i, 1); // Se quita el dato requerido
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    getTasks();
}

getTasks();