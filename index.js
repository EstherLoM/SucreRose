import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `
      <div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="./icons/imagenA2.jfif" class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title">${task.title}</h3>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small class="text-muted">Porciones: ${task.porciones} <br>
        Tiempo: ${task.tiempo} <br>
        Dificultad: ${task.dificultad}.</small></p>
      </div>
    </div>
  </div>
</div>
      
      `;
    });

    

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-dificultad"].value = task.dificultad;
          taskForm["task-porciones"].value = task.porciones;
          taskForm["task-tiempo"].value = task.tiempo;
          taskForm["task-ingredientes"].value = task.ingredientes;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const dificultad = taskForm["task-dificultad"];
  const porciones = taskForm["task-porciones"];
  const tiempo = taskForm["task-tiempo"];
  const ingredientes = taskForm["task-ingredientes"];
  const description = taskForm["task-description"];

  try {
    if (!editStatus) {
      await saveTask(title.value,dificultad.value,porciones.value,tiempo.value,ingredientes.value, description.value);
    } else {
      await updateTask(id, {
        title: title.value,
        dificultad: dificultad.value,
        porciones: porciones.value,
        tiempo: tiempo.value,
        ingredientes: ingredientes.value,
        description: description.value,
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});
