import {
  loginPage, dashboard, addProjectBtn, deleteProjectBtn, projectNameInput, teamNameInput, loginForm, logOutBtn,
  projectList,
  todoTasks,
  inprogressTasks,
  reviewTasks,
  doneTasks
} from './constntDeclaration.js';
import { Workenvironment } from './taskPanel.js';
export let allowedTransitions;
let completedProjects = 0;

export class User {
  constructor (username, password) {
    this.username = username;
    this.password = password;
    this.loginBtn = loginForm;
    this.logOutBtn = logOutBtn;
    this.projectList = projectList;
    this.todoTasks = todoTasks;
    this.inprogressTasks = inprogressTasks;
    this.reviewTasks = reviewTasks;
    this.doneTasks = doneTasks;
    this.addProjectBtn = addProjectBtn;
    this.deleteProjectBtn = deleteProjectBtn;
    this.loginPage = loginPage;
    this.dashboard = dashboard;
    this.loginForm = loginForm;
    this.projectNameInput = projectNameInput;// Input field for project name
    this.teamNameInput = teamNameInput; // Input field for team name

    this.loginForm.addEventListener('submit', (e) => this.login(e));
    this.logOutBtn.addEventListener('click', (e) => this.logOut(e));
  }

  login (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let authenticatedUser;
    if (username === 'admin' && password === 'admin123') {
      authenticatedUser = new Admin(username, password);
    } else {
      if (username === 'lead' && password === 'lead123') {
        authenticatedUser = new TeamLead(username, password, 'Team A');
      }
      if (username === 'member' && password === 'member123') {
        authenticatedUser = new TeamMember(username, password, 'Team A');
      }
    }
    if (authenticatedUser) {
      this.user = authenticatedUser;
      this.showDashboard();
    } else {
      alert('Invalid username or password');
    }
  }

  showDashboard () {
    this.loginPage.style.display = 'none';
    this.dashboard.style.display = 'block';
    this.logOutBtn.style.display = 'block';
  }
}

export class TeamMember extends User {
  constructor (username, password, team, position) {
    super(username, password);
    this.team = team;
    this.projects = [];
    this.position = position;
    this.removeButtons();
    this.assignallowedTransitons();
  }

  assignallowedTransitons () {
    allowedTransitions = {
      ToDo: ['InProgress'],
      InProgress: ['Review','ToDo']
    };
  }

  removeButtons () {
    addProjectBtn.style.display = 'none';
    deleteProjectBtn.style.display = 'none';
    projectNameInput.style.display = 'none';
    teamNameInput.style.display = 'none';
  }

  moveToRespectiveProject (listItem) {
    dashboard.style.display = 'none';
    const workSpace = new Workenvironment(listItem);
  }

  logOut (event) {
    event.preventDefault();
    this.loginPage.style.display = 'flex';
    this.dashboard.style.display = 'none';
    this.logOutBtn.style.display = 'none';
    const workPanel = document.querySelector('.work-panel');
    if (workPanel) {
      workPanel.style.display = 'none';
    }
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }
}

export class TeamLead extends TeamMember {
  constructor (username, password, team, position) {
    super(username, password, team, position);
    this.changeAllowedTransitions();
  }

  changeAllowedTransitions () {
    allowedTransitions = {
      ToDo: ['InProgress'],
      InProgress: ['Review','ToDo'],
      Review: ['InProgress', 'Done']
    };
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
    this.dispayButtons();
    this.addProjectBtn.addEventListener('click', () => this.getProject());
    this.deleteProjectBtn.addEventListener('click', () => this.deleteMainProject());
  }

  updateDashboard () {
    console.log(this.teams);
    const totalProjects = Object.keys(this.teams).length;
    const projectStatsElement = document.getElementById('projectStats');
    projectStatsElement.textContent = `Total Projects: ${totalProjects}, Completed: ${completedProjects}`;
  }

  populateProjectList () {
    this.projectList.innerHTML = '';
    const notifiedObject = document.querySelector('.notification');
    if (notifiedObject) { notifiedObject.remove(); }
    const notification = '<div class=\'notification\'><div>To Mark the projects as complete checkout the checkbox </div><div class=\'notification\'>To delete the project Click on the project you need to delete and click the delete project Button</div><div class=\'notification\'>To move into the workpanel double click the project</div></div>';
    // const notification = `<div class='notification'>To delete the project Click on the project you need to delete and click the delete project Button</div>`;
    // const notification = `<div class='notification'>To move into the workpanel double click the project</div>`;
    this.projectList.insertAdjacentHTML('beforebegin', notification);
    for (const [key, value] of Object.entries(this.teams)) {
      const listItem = document.createElement('li');
      listItem.textContent = value;
      listItem.classList.add('project');
      const completedCheckbox = document.createElement('input');
      completedCheckbox.type = 'checkbox';
      completedCheckbox.id = 'completedCheckbox_' + key;
      completedCheckbox.addEventListener('change', () =>
        this.markProjectCompleted(value, completedCheckbox.checked)
      );
      listItem.appendChild(completedCheckbox);
      listItem.addEventListener('click', () => {
        this.selectProject(listItem);
      });
      listItem.addEventListener('dblclick', () =>
        this.moveToRespectiveProject(listItem)
      );
      this.projectList.appendChild(listItem);
    }
  }

  markProjectCompleted (projectName, completed) {
    if (completed === true) {
      completedProjects++;
    } else {
      completedProjects--;
    }
    this.updateDashboard();
  }

  selectProject (projectItem) {
    const selectedProject = this.projectList.querySelector('.selected');
    if (selectedProject) {
      selectedProject.classList.remove('selected');
    }
    projectItem.classList.add('selected');
  }

  dispayButtons () {
    addProjectBtn.style.display = 'block';
    deleteProjectBtn.style.display = 'block';
    projectNameInput.style.display = 'block';
    teamNameInput.style.display = 'block';
  }

  addProject (project) {
    const teamName = project.team;
    console.log(teamName);
    if (teamName) {
      console.log(this.teams);
      this.teams[teamName] = project.name;
      console.log(this.teams);
    } else {
      this.teams[teamName] = [project];
    }
  }

  getProject () {
    if (this.user instanceof Admin) {
      const projectName = this.projectNameInput.value.trim(); // Get project name from input field
      const teamName = this.teamNameInput.value.trim(); // Get team name from input field
      if (projectName) {
        this.addProject(new Project(projectName, teamName, false));
        this.updateDashboard();
        this.populateProjectList();
        this.projectNameInput.value = ''; // Clear input field after adding project
        this.teamNameInput.value = ''; // Clear input field after adding project
      } else {
        alert('Please enter both project name and team name.');
      }
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

  deleteMainProject () {
    const selectedProject = this.projectList.querySelector('.selected');
    console.log(selectedProject);
    const projectName = (selectedProject.textContent).split('C')[0];
    this.deleteProject(projectName);
    this.updateDashboard();
    this.populateProjectList();
    if (!this.projectList) {
      alert('Please select a project to delete.');
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
  const user = new Admin('admin', 'admin123');
});
