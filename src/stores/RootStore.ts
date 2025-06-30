import SettingsStore from './SettingsStore';
import WordHistoryStore from './WordHistoryStore';

class RootStore {
  settingsStore: SettingsStore;
  wordHistoryStore: WordHistoryStore;

  constructor() {
    this.settingsStore = new SettingsStore();
    this.wordHistoryStore = new WordHistoryStore();
  }
}

export default RootStore;
