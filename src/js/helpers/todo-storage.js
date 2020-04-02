import moment from 'moment';
import SecretKey from './secret.key.txt';

export default class TodoStorage {
  constructor() {
    this.storageEntry = SecretKey;

    if (localStorage.getItem(this.storageEntry)) {
      const parsed = JSON.parse(localStorage.getItem(this.storageEntry));

      this.projects = parsed;
    } else {
      this.projects = {
        default: {
          title: 'Default',
          tasks: {
            createATask: {
              title: 'Create a task!',
              description: 'You can create some tasks by clicking the + button.',
              dueDate: moment().format('MMM Do YYYY HH:mm'),
              priority: 'normal',
              id: 'create-a-task',
              completed: false,
            },
            taskHasColors: {
              title: 'Tasks have colors!',
              description: 'Tasks have different colors depending on the priority.',
              dueDate: moment().format('MMM Do YYYY HH:mm'),
              priority: 'important',
              id: 'tasks-have-colors',
              completed: false,
            },
            deleteATask: {
              title: 'Delete a task if you want to',
              description: 'Remove an unwanted task any time.',
              dueDate: 'No due date',
              priority: 'optional',
              id: 'delete-a-task-if-you-want-to',
              complete: false,
            },
          },
          active: true,
        },
      };

      this.updateStorage();
    }
  }

  checkProjectStatus(projectName) {
    const key = this.titleToCamelCase(projectName);

    if (!key) return { invalid: true, message: 'The project title is invalid'};

    const projectStatus = { invalid: false };

    if (this.projects[key]) {
      projectStatus.invalid = true;
      projectStatus.message = 'That project already exists';
    }

    return projectStatus;
  }

  checkTaskStatus(task) {
    if (!task.id) return { invalid: true, message: 'Invalid task name' }

    const { tasks } = this.getActiveProject();
    const taskKeys = Object.keys(tasks);
    const taskStatus = { invalid: false };
    let key;

    console.log(tasks);
    for (let i = 0; i < taskKeys.length; i += 1) {
      key = taskKeys[i];

      if (tasks[key].id === task.id) {
        taskStatus.invalid = true;

        taskStatus.message = [
          'The current project already has a',
          'task with the same title'
        ].join(' ');
      }
    }

    return taskStatus;
  }

  titleToCamelCase(projectName) {
    let camelCased = '';
    let words = [];

    projectName = projectName.trim().split(' ').map(e => {
      return e.replace(/\W/gi, '').trim().toLowerCase();
    });

    words.push(projectName[0]);

    for (let i = 1; i < projectName.length; i += 1) {
      camelCased = projectName[i].split('').slice(1);
      camelCased = projectName[i][0].toUpperCase() + camelCased.join('');
      words.push(camelCased);
    }

    words = words.join('');

    return words;
  }

  changeToProject(projectName) {
    const key = this.titleToCamelCase(projectName);

    this.getActiveProject().active = false;
    this.projects[key].active = true;

    this.updateStorage();
  }

  addProject(projectName) {
    const key = this.titleToCamelCase(projectName);

    this.projects[key] = {
      title: projectName,
      tasks: {},
      active: true,
    };

    this.getActiveProject().active = false;

    this.updateStorage();
  }

  removeProject(projectName) {
    const key = this.titleToCamelCase(projectName);
    delete this.projects[key];
    this.projects.default.active = true;
    this.updateStorage();
  }

  updateStorage() {
    const item = JSON.stringify(this.projects);

    localStorage.setItem(this.storageEntry, item);
  }

  getTaskKeyById(taskId) {
    const { tasks } = this.getActiveProject();
    const taskKeys = Object.keys(tasks);
    console.log(taskKeys);
    let taskKey;

    for (let i = 0; i < taskKeys.length; i += 1) {
      if (tasks[taskKeys[i]].id === taskId) {
        taskKey = taskKeys[i];

        break;
      }
    }

    // it might be null
    return taskKey;
  }

  deleteTask(taskId) {
    const { tasks } = this.getActiveProject();
    const taskKey = this.getTaskKeyById(taskId);

    delete tasks[taskKey];

    this.updateStorage();
  }

  completeTask(taskId) {
    const { tasks } = this.getActiveProject();
    const taskKey = this.getTaskKeyById(taskId);

    tasks[taskKey].completed = true;

    this.updateStorage();
  }

  addTask(task) {
    const key = this.titleToCamelCase(task.title);

    this.getActiveProject().tasks[key] = task;

    this.updateStorage();
  }

  updateTask(previousId, taskId, task) {
    const { tasks } = this.getActiveProject();
    const previousKey = this.getTaskKeyById(previousId);
    const newKey = this.getTaskKeyById(taskId);

    if (previousKey === newKey) {
      tasks[newKey] = task;
    } else {
      delete tasks[previousKey];
      tasks[newKey] = task;
    }

    this.updateStorage();
  }

  getActiveProject() {
    const projectKeys = Object.keys(this.projects);

    for (let i = 0; i < projectKeys.length; i += 1) {
      if (this.projects[projectKeys[i]].active) {
        return this.projects[projectKeys[i]];
      }
    }
  }
}
