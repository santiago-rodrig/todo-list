import SecretKey from './secret.key.txt';

export default class TodoStorage {
  constructor() {
    this.storageEntry = SecretKey;

    if (localStorage.getItem(this.storageEntry)) {
      const parsed = JSON.parse(localStorage.getItem(this.storageEntry));

      this.projects = parsed.projects;
    } else {
      this.projects = {
        default: {
          title: 'Default',
          tasks: {},
          active: true
        }
      };

      this.alterStorage();
    }
  }

  alterStorage() {
    localStorage.setItem(this.storageEntry, JSON.stringify(this.projects));
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
