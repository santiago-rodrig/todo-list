export default class Project {
  constructor(project) {
    this.title = project.title;
    this.tasks = project.tasks;
    this.active = project.active;
    this.id = project.id;
    this.nextId = project.nextId ? project.nextId : 0;
  }
}
