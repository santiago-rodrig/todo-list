import moment from 'moment';
import SecretKey from './secret.key.txt';

export default class TodoStorage {
  constructor() {
    this.storageEntry = SecretKey;

    if (localStorage.getItem(this.storageEntry)) {
      const parsed = JSON.parse(localStorage.getItem(this.storageEntry));

      this.projects = parsed.projects;
      this.nextId = parsed.nextId;
      this.tasksMode = parsed.tasksMode;
    } else {
      this.projects = {
        0: {
          title: 'Default',
          tasks: {
            0: {
              title: 'Create a task!',
              description: 'You can create some tasks by clicking the + button.',
              dueDate: moment().format('MMM Do YYYY h:mm a'),
              priority: 'normal',
              id: '0',
              completed: false,
            },
            1: {
              title: 'Tasks have colors!',
              description: 'Tasks have different colors depending on the priority.',
              dueDate: moment().format('MMM Do YYYY h:mm a'),
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
          nextId: 3,
          active: true,
          id: 0,
        },
      };

      this.nextId = 1;
      this.tasksMode = 'pending';
      this.updateStorage();
    }
  }

  swapTasksMode(mode) {
    this.tasksMode = mode;
    this.updateStorage();
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
            'task with the same title',
          ].join(' ');
        }
      } else if (tasks[key].id !== task.id) {
        if (tasks[key].title === task.title) {
          taskStatus.invalid = true;

          taskStatus.message = [
            'The current project already has a',
            'task with the same title',
          ].join(' ');
        }
      }
    }

    return taskStatus;
  }

  checkProjectStatus(project) {
    if (!project.title.trim().replace(/\W/gi, '')) {
      return { invalid: true, message: 'Invalid project title' };
    }

    const projects = Object.values(this.projects);
    const projectStatus = { invalid: false };

    projects.some(p => {
      if (p.title === project.title) {
        projectStatus.invalid = true;

        projectStatus.message = 'There is already a project with the same title';

        return true;
      }
    });

    return projectStatus;
  }

  changeToProject(project) {
    console.log('BEFORE:', this.projects);
    this.getActiveProject().active = false;
    this.projects[project.id].active = true;
    console.log('AFTER:', this.projects);

    this.updateStorage();
  }

  addProject(project) {
    this.projects[project.id] = project;
    this.nextId += 1;

    this.updateStorage();
  }

  removeProject(project) {
    delete this.projects[project.id];
    this.updateStorage();
  }

  updateProject(project) {
    this.projects[project.id] = project;
    this.updateStorage();
  }

  update() {
    const parsed = JSON.parse(localStorage.getItem(this.storageEntry));

    this.projects = parsed.projects;
    this.nextId = parsed.nextId;

    return this;
  }

  updateStorage() {
    const item = JSON.stringify(
      { projects: this.projects, nextId: this.nextId, tasksMode: this.tasksMode },
    );

    console.log(item);

    localStorage.setItem(this.storageEntry, item);
  }

  deleteTask(task) {
    const { tasks } = this.getActiveProject();

    delete tasks[task.id];

    this.updateStorage();
  }

  completeTask(task) {
    const { tasks } = this.getActiveProject();

    tasks[task.id].completed = true;
    tasks[task.id].completeDate = moment().format('MMM Do YYYY h:mm a');

    this.updateStorage();
  }

  addTask(task) {
    const project = this.getActiveProject();

    project.tasks[task.id] = task;
    project.nextId += 1;

    this.updateStorage();
  }

  updateTask(task) {
    const { tasks } = this.getActiveProject();

    tasks[task.id] = task;
    this.updateStorage();
  }

  getActiveProject() {
    const projects = Object.values(this.projects);
    let project;

    projects.some(p => {
      if (p.active) {
        project = p;
        return true;
      }
    });

    return project;
  }
}
