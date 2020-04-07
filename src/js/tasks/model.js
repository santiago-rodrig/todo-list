export default class Task {
  constructor(task) {
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.priority = task.priority;
    this.id = task.id;
    this.completed = task.completed;
    this.completeDate = task.completeDate;
  }
}
