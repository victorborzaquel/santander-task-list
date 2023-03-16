const $ = selector => document.querySelector(selector);

const $progress = $('#progress-bar');
const $tasks = $('#tasks');
const $inputTitle = $('#input-title');
const $inputDescription = $('#input-description');

let currentTaskId = 0;

const tasks = [
  {
    id: currentTaskId++,
    title: 'Learn JavaScript',
    description: 'Learn JavaScript basics',
    completed: true
  },
  {
    id: currentTaskId++,
    title: 'Learn Angular',
    description: 'Learn Angular basics',
    completed: false
  }
];

renderChanges();

function handleAddTask(event) {
  event.preventDefault();
  addTask();
}

function toggleCompletedTask(id) {
  const task = tasks.find(task => task.id === id);
  task.completed = !task.completed;
  
  renderChanges();
}

function removeTask(id) {
  tasks.splice(tasks.findIndex(task => task.id === id), 1);

  renderChanges();
}

function addTask() {
  const title = $inputTitle.value;
  const description = $inputDescription.value || '';

  if (title) {
    tasks.push({
      id: currentTaskId++,
      title,
      description,
      completed: false
    });

    $inputTitle.value = '';
    $inputDescription.value = '';

    renderChanges();
  }
}

function renderChanges() {
  renderUpdateProgress();
  renderUpdateTasks();
}

function renderUpdateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const allTasks = tasks.length;
  const progress = Math.round(completedTasks / allTasks * 100);

  $progress.style.width = `${progress}%`;
}

function renderUpdateTasks() {
  $tasks.innerHTML = tasks.map(task => `
    <div class="card mb-4">
      <div class="card-body p-0 d-flex justify-content-between align-items-center">
        <div onclick='toggleCompletedTask(${task.id})' class='task d-flex align-items-center w-100 p-3 ps-4'>
          <span class="glyphicon ${task.completed ? 'glyphicon-check text-secondary' : 'glyphicon-unchecked'}"></span>

          <div class="px-4 ${task.completed && 'text-secondary text-decoration-line-through'}">
            <h4 class="card-title">${task.title}</h4>
            <p class="card-text">${task.description}</p>
         </div>
        </div>

        <span class="trash p-3 pe-4 glyphicon glyphicon-trash text-danger" onclick='removeTask(${task.id})'></span>
      </div>
    </div>
  `).join('');
}