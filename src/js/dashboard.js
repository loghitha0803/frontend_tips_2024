import {
  logOutBtn,
  projectList,
  todoTasks,
  inprogressTasks,
  reviewTasks,
  doneTasks,
  addProjectBtn,
  deleteProjectBtn,
  loginPage,
  dashboard,
  loginForm
} from './constntDeclaration.js';
import { Admin, TeamLead, TeamMember, Project } from './script.js';
let completedProjects = 0;

export class UserDashboard {
  constructor (user) {
    this.user = user;
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
    this.projectNameInput = document.getElementById('project-name-input'); // Input field for project name
    this.teamNameInput = document.getElementById('team-name-input'); // Input field for team name

    this.loginForm.addEventListener('submit', (e) => this.login(e));
    this.addProjectBtn.addEventListener('click', () => this.addProject());
    this.deleteProjectBtn.addEventListener('click', () => this.deleteProject());
    this.logOutBtn.addEventListener('click', (e) => this.logOut(e));
    this.updateDashboard();
    this.populateProjectList();
  }

  updateDashboard () {
    const totalProjects = Object.keys(this.user.teams).length;
    const projectStatsElement = document.getElementById('projectStats');
    projectStatsElement.textContent = `Total Projects: ${totalProjects}, Completed: ${completedProjects}`;
  }

  addProject () {
    if (this.user instanceof Admin) {
      const projectName = this.projectNameInput.value.trim(); // Get project name from input field
      const teamName = this.teamNameInput.value.trim(); // Get team name from input field
      if (projectName && teamName) {
        this.user.addProject(new Project(projectName, teamName, false));
        this.updateDashboard();
        this.populateProjectList();
        this.projectNameInput.value = ''; // Clear input field after adding project
        this.teamNameInput.value = ''; // Clear input field after adding project
      } else {
        alert('Please enter both project name and team name.');
      }
    }
  }

  deleteProject () {
    const selectedProject = this.projectList.querySelector('.selected');
    if (selectedProject) {
      const projectName = (selectedProject.textContent).split('C')[0];
      this.user.deleteProject(projectName);
      this.updateDashboard();
      this.populateProjectList();
    } else {
      alert('Please select a project to delete.');
    }
  }

  populateProjectList () {
    this.projectList.innerHTML = '';
    for (const [key, value] of Object.entries(this.user.teams)) {
      const listItem = document.createElement('li');
      listItem.textContent = value;
      listItem.classList.add('project');
      const completedCheckbox = document.createElement('input');
      completedCheckbox.type = 'checkbox';
      completedCheckbox.id = 'completedCheckbox_' + key;
      completedCheckbox.addEventListener('change', () =>
        this.markProjectCompleted(value, completedCheckbox.checked)
      );

      // Create label element for the checkbox
      const completedLabel = document.createElement('label');
      completedLabel.textContent = 'Completed';
      completedLabel.setAttribute('for', completedCheckbox.id); // Associate label with checkbox

      // Append the label and checkbox to the listItem
      listItem.appendChild(completedCheckbox);
      listItem.appendChild(completedLabel);

      listItem.addEventListener('click', () => {
        this.selectProject(listItem);
      });
      listItem.addEventListener('dblclick', () =>
        this.user.moveToRespectiveProject(listItem)
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

  login (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let authenticatedUser;
    if (username === 'admin' && password === 'admin123') {
      this.addProjectBtn.style.display = 'block';
      this.deleteProjectBtn.style.display = 'block';
      this.projectNameInput.style.display = 'block';
      this.teamNameInput.style.display = 'block';
      authenticatedUser = new Admin(username, password);
    } else {
      if (username === 'lead' && password === 'lead123') {
        authenticatedUser = new TeamLead(username, password, 'Team A');
      }
      if (username === 'member' && password === 'member123') {
        authenticatedUser = new TeamMember(username, password, 'Team A');
      }
      this.addProjectBtn.style.display = 'none';
      this.deleteProjectBtn.style.display = 'none';
      this.projectNameInput.style.display = 'none';
      this.teamNameInput.style.display = 'none';
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
