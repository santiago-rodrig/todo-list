import moment from 'moment';
import SecretKey from './secret.key.txt';

export default class TodoStorage {
  constructor() {
    this.storageEntry = SecretKey;

    if (localStorage.getItem(this.storageEntry)) {
      const parsed = JSON.parse(localStorage.getItem(this.storageEntry));

      this.projects = parsed.projects;
      this.nextId = parsed.nextId;
    } else {
      this.projects = {
        0: {
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
          nextId: 3,
          active: true,
          id: 0
        },
      };

      this.nextId = 1;
      this.updateStorage();
    }
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

  changeToProject(projectId) {
    this.getActiveProject().active = false;
    this.projects[projectId].active = true;

    this.updateStorage();
  }

  addProject(project) {
    this.getActiveProject().active = false;
    this.projects[project.id] = project;
    this.nextId += 1;

    this.updateStorage();
  }

  removeProject(project) {
    delete this.projects[project.id];
    this.projects['0'].active = true;
    this.updateStorage();
  }

  updateStorage() {
    const item = JSON.stringify(
      { projects: this.projects, nextId: this.nextId }
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

    tasks[taskId].completed = true;

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
    const projectKeys = Object.keys(this.projects);

    for (let i = 0; i < projectKeys.length; i += 1) {
      if (this.projects[projectKeys[i]].active) {
        return this.projects[projectKeys[i]];
      }
    }
  }
}
