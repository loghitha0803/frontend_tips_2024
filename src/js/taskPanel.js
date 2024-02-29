import { dashboard, loginPage } from './constntDeclaration.js';
import { KanbanBoard } from './kanbanBoard.js';
let taskManager;
export class Workenvironment {
  constructor (listItem) {
    this.projectName = listItem.textContent;
    this.render();
  }

  render () {
    const workPanel = `<div class='work-panel'>
      <input type="text" id="taskInput" class='task-input' placeholder="Enter task">
      <button class='add-task logout-btn'>Add Task</button>
  <div class="board" id="board"></div>`;
    dashboard.insertAdjacentHTML('afterend', workPanel);
    this.setupBackButton();
    this.addTask();
    taskManager = new KanbanBoard();
  }

  addTask () {
    const addTask = document.querySelector('.add-task');
    addTask.addEventListener('click', () => {
      const taskInput = document.getElementById('taskInput');
      const taskTitle = taskInput.value.trim();
      taskManager.addTaskTitle(taskTitle);
      taskInput.value = '';
    });
  }

  setupBackButton () {
    const backBtn = document.getElementById('backBtn');
    backBtn.style.display = 'block';
    backBtn.addEventListener('click', () => {
      dashboard.style.display = 'block';
      loginPage.style.display = 'none';
      document.querySelector('.work-panel').style.display = 'none';
      backBtn.style.display = 'none';
    });
  }
}
