import moment from 'moment';
import SecretKey from './secret.key.txt';

export default class TodoStorage {
  constructor() {
    this.storageEntry = SecretKey;

    if (localStorage.getItem(this.storageEntry)) {
      const parsed = JSON.parse(localStorage.getItem(this.storageEntry));

      this.projects = parsed.projects;
      this.lastId = parsed.lastId;
    } else {
      this.projects = {
        default: {
          title: 'Default',
          tasks: {
            0: {
              title: 'Create a task!',
              description: 'You can create some tasks by clicking the + button.',
              dueDate: moment().format('MMM Do YYYY HH:mm'),
              priority: 'normal',
              id: '0',
              completed: false,
            },
            1: {
              title: 'Tasks have colors!',
              description: 'Tasks have different colors depending on the priority.',
              dueDate: moment().format('MMM Do YYYY HH:mm'),
              priority: 'important',
              id: '1',
              completed: false,
            },
            2: {
              title: 'Delete a task if you want to',
              description: 'Remove an unwanted task any time.',
              dueDate: 'No due date',
              priority: 'optional',
              id: '2',
              complete: false,
            },
          },
          active: true,
        },
      };

      this.nextId = 3;
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

  checkTaskStatus(task, action) {
    if (!task.title.trim().replace(/\W/gi, '')) {
      return { invalid: true, message: 'Invalid task name' };
    }

    const { tasks } = this.getActiveProject();
    const taskKeys = Object.keys(tasks);
    const taskStatus = { invalid: false };
    let key;

    for (let i = 0; i < taskKeys.length; i += 1) {
      key = taskKeys[i];

      if (action !== 'edit') {
        if (tasks[key].title === task.title) {
          taskStatus.invalid = true;

          taskStatus.message = [
            'The current project already has a',
            'task with the same title'
          ].join(' ');
        }
      } else {
        if (tasks[key].id !== task.id) {
          if (tasks[key].title === task.title) {
            taskStatus.invalid = true;

            taskStatus.message = [
              'The current project already has a',
              'task with the same title'
            ].join(' ');
          }
        }
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
    const item = JSON.stringify(
      { projects: this.projects, lastId: this.nextId }
    );

    localStorage.setItem(this.storageEntry, item);
  }

  deleteTask(taskId) {
    const { tasks } = this.getActiveProject();

    delete tasks[taskId];

    this.updateStorage();
  }

  completeTask(taskId) {
    const { tasks } = this.getActiveProject();

    tasks[task.id].completed = true;

    this.updateStorage();
  }

  addTask(task) {
    this.getActiveProject().tasks[task.id] = task;
    this.nextId += 1;

    this.updateStorage();
  }

  updateTask(task) {
    const { tasks } = this.getActiveProject();

    tasks[task.id] = task;
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
