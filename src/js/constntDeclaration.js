const logOutBtn = document.querySelector('#logoutBtn');
const projectList = document.getElementById('projectList');
const todoTasks = document.getElementById('todoTasks');
const inprogressTasks = document.getElementById('inprogressTasks');
const reviewTasks = document.getElementById('reviewTasks');
const doneTasks = document.getElementById('doneTasks');
const addProjectBtn = document.getElementById('addProjectBtn');
const deleteProjectBtn = document.getElementById('deleteProjectBtn');
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
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
