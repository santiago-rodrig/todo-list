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
          tasks: {},
          active: true
        }
      };

      this.updateStorage();
    }
  }

  updateStorage(source={}) {
    const item = JSON.stringify(Object.assign(this.projects, source));

    localStorage.setItem(this.storageEntry, item);
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
