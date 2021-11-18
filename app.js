document.getElementById("formTask").addEventListener("submit",saveTask);

function saveTask(e){
    let title = document.getElementById('title').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let description = document.getElementById('description').value;

    const task = {
        title: title,
        description: description,
        fecha: fecha,
        hora: hora
    };

    if(localStorage.getItem("tasks") === null){
        let tasks = [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

    } else{
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    getTasks();
    document.getElementById("formTask").reset();
    e.preventDefault();
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let tasksView = document.getElementById("tasks");

    tasksView.innerHTML = '';

    for(let i=0; i<tasks.length; i++){
        let title = tasks[i].title;
        let description = tasks[i].description;
        let fecha = tasks[i].fecha;
        let hora = tasks[i].hora;

        tasksView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p>${title}  ${fecha} - ${hora} - ${description}</p> 
                <a class="btn btn-danger borrar" onclick="deleteTasks('${title}')">Delete</a>
            </div>
        </div>`
    }
}

function deleteTasks(title){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i=0; i<tasks.length; i++){
        if (tasks[i].title === title){
            tasks.splice(i, 1);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        getTasks();
    }
}

getTasks();