import SettingsStore from './SettingsStore';

class RootStore {
  settingsStore: SettingsStore;

  constructor() {
    this.settingsStore = new SettingsStore();
  }
}

export default RootStore;
