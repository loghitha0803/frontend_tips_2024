import { allowedTransitions } from './script.js';
export class KanbanBoard {
  constructor () {
    this.tasks = [];
    this.board = document.getElementById('board');
    this.render();
  }

  render () {
    this.board.innerHTML = '';
    ['ToDo', 'InProgress', 'Review', 'Done'].forEach((status) => {
      const column = document.createElement('div');
      column.classList.add('column');
      column.innerHTML = `<h3>${status.charAt(0).toUpperCase() + status.slice(1)}</h3>`;
      column.addEventListener('drop', (e) => this.drop(e));
      column.addEventListener('dragover', (e) => this.allowDrop(e));
      column.id = status;
      const tasksForStatus = this.tasks.filter((task) => task.status === status);
      tasksForStatus.forEach((task) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.setAttribute('draggable', true);
        taskElement.addEventListener('dragstart', (e) => this.drag(e));
        taskElement.id = task.id;
        const titleElement = document.createElement('div');
        titleElement.textContent = `${task.title}`; // Display due date after task title
        const duedate = document.createElement('div');
        const dueDateInput = new Date(task.dueDate); // Parse the due date string into a Date object
        const formattedDueDate = `${dueDateInput.getDate()} ${dueDateInput.toLocaleString('default', { month: 'short' })} ${dueDateInput.getFullYear()}`; // Format the date
        duedate.textContent = formattedDueDate;
        titleElement.contentEditable = true;
        titleElement.addEventListener('blur', () => this.updateTaskTitle(task.id, titleElement.textContent));
        const commentsElement = document.createElement('textarea');
        commentsElement.value = task.comments;
        commentsElement.placeholder = 'Add comments...';
        commentsElement.addEventListener('blur', () => this.updateTaskComments(task.id, commentsElement.value));
        const addCommentsBtn = document.createElement('button');
        const keenlyWatchEmoji = String.fromCodePoint(0x1f440); // Unicode value for the keenly watch emoji
        addCommentsBtn.textContent = `✍️ Comments ${keenlyWatchEmoji}👁`; // Including the emoji in the button text content
        addCommentsBtn.addEventListener('click', () => {
          commentsElement.style.display = 'block';
        });
        taskElement.appendChild(titleElement);
        taskElement.appendChild(duedate);
        taskElement.appendChild(commentsElement);
        taskElement.appendChild(addCommentsBtn);
        column.appendChild(taskElement);
      });
      this.board.appendChild(column);
    });
  }

  updateTaskTitle (taskId, newTitle) {
    const taskIndex = this.tasks.findIndex(
      (task) => task.id === parseInt(taskId)
    );
    this.tasks[taskIndex].title = newTitle;
  }

  updateTaskComments (taskId, newComments) {
    const taskIndex = this.tasks.findIndex(
      (task) => task.id === parseInt(taskId)
    );
    this.tasks[taskIndex].comments = newComments;
    this.render(); // Update the board after adding comments
  }

  addTaskTitle (taskTitle, dueDate) {
    if (taskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        dueDate,
        comments: '',
        status: 'ToDo'
      };
      this.tasks.push(newTask);
      this.render(newTask);
    }
  }

  drag (ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  allowDrop (ev) {
    ev.preventDefault();
  }

  drop (ev) {
    ev.preventDefault();
    const taskId = ev.dataTransfer.getData('text');
    const taskElement = document.getElementById(taskId);
    const fromColumnId = taskElement.parentElement.id;
    const toColumnId = ev.currentTarget.id; // get the target column id

    // Define the allowed transitions
    // const currentUser = document.getElementById('username').value;

    if (
      allowedTransitions[fromColumnId] &&
      allowedTransitions[fromColumnId].includes(toColumnId)
    ) {
      taskElement.parentElement.removeChild(taskElement); // Remove task from previous column
      ev.currentTarget.appendChild(taskElement); // Append task to new column
      const taskIndex = this.tasks.findIndex(
        (task) => task.id === parseInt(taskId)
      );
      this.tasks[taskIndex].status = toColumnId;
    }
  }
}
