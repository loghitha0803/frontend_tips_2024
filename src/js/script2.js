import { loginPage, dashboard } from './constntDeclaration.js';
import { UserDashboard } from './dashboard.js';
import { KanbanBoard } from './kanbanBoard.js';

let taskManager;
export class User {
  constructor (username, password) {
    this.username = username;
    this.password = password;
  }
}

export class TeamMember extends User {
  constructor (username, password, team, position) {
    super(username, password);
    this.team = team;
    this.position = position;
  }

  moveToRespectiveProject (listItem) {
    dashboard.style.display = 'none';
    const workSpace = new Workenvironment(listItem);
  }
}
class Workenvironment {
  constructor (listItem) {
    this.projectName = listItem.textContent;
    this.render();
  }

  render () {
    const workPanel = `<div class='work-panel'>
    <input type="text" id="taskInput" class='task-input' placeholder="Enter task">
    <button class='add-task'>Add Task</button>
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

export class TeamLead extends TeamMember {
  constructor (username, password, team, position) {
    super(username, password, team, position);
    this.projects = [];
  }

  markProjectComplete (projectName) {
    const project = this.projects.find(project => project.name === projectName);
    if (project) {
      project.completed = true;
    }
  }
}

export class Admin extends TeamLead {
  constructor (username, password) {
    super(username, password);
    this.teams = {};
  }

  addProject (project) {
    const teamName = project.team;
    if (teamName) {
      this.teams[teamName] = project.name;
    } else {
      this.teams[teamName] = [project];
    }
  }

  deleteProject (projectName, teamName) {
    const projects = this.teams;
    if (projects) {
      for (const prop in projects) {
        if (projects[prop] === projectName) {
          delete projects[prop];
        }
      }
    }
  }
}

export class Project {
  constructor (name, teamName, completed = false) {
    this.name = name;
    this.team = teamName;
    this.completed = completed;
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const admin = new Admin('admin', 'admin123');
  const userDashboard = new UserDashboard(admin);
});
