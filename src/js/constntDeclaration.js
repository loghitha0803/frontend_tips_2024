const logOutBtn = document.querySelector('#logout-btn');
const projectList = document.getElementById('project-list');
const todoTasks = document.getElementById('todoTasks');
const inprogressTasks = document.getElementById('inprogressTasks');
const reviewTasks = document.getElementById('reviewTasks');
const doneTasks = document.getElementById('doneTasks');
const addProjectBtn = document.getElementById('add-project-btn');
const deleteProjectBtn = document.getElementById('delete-project-btn');
const loginPage = document.getElementById('login-page');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const totalProjects = document.getElementsByClassName('total-pro');
const ProjectsCompleted = document.getElementsByClassName('completed-pro');
const projectNameInput = document.getElementById('project-name-input'); // Input field for project name
const teamNameInput = document.getElementById('team-name-input');
export {
  logOutBtn,
  projectNameInput, teamNameInput,
  projectList,
  todoTasks,
  inprogressTasks,
  reviewTasks,
  totalProjects,
  ProjectsCompleted,
  doneTasks,
  addProjectBtn,
  deleteProjectBtn,
  loginPage,
  dashboard,
  loginForm
};
