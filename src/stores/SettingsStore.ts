import { makeAutoObservable } from 'mobx';

export interface DictionaryType {
  id: string;
  name: string;
  description: string;
}

export const DICTIONARY_TYPES: DictionaryType[] = [
  { id: 'CET4', name: 'CET-4', description: '大学英语四级词汇' },
  { id: 'CET6', name: 'CET-6', description: '大学英语六级词汇' },
  { id: 'Kaoyan', name: '考研', description: '考研英语词汇' },
  { id: 'TOEFL', name: 'TOEFL', description: '托福词汇' },
  { id: 'SAT', name: 'SAT', description: 'SAT词汇' },
];

class SettingsStore {
  dailyWordCount = 20;
  selectedDictionary = 'CET4';

  constructor() {
    makeAutoObservable(this);
  }

  setDailyWordCount = (count: number) => {
    if (count >= 5 && count <= 100) {
      this.dailyWordCount = count;
    }
  };

  setSelectedDictionary = (dictionaryId: string) => {
    if (DICTIONARY_TYPES.some(dict => dict.id === dictionaryId)) {
      this.selectedDictionary = dictionaryId;
    }
  };

  get currentDictionary() {
    return DICTIONARY_TYPES.find(dict => dict.id === this.selectedDictionary);
  }

  get dailyWordCountText() {
    return `每天学习 ${this.dailyWordCount} 个单词`;
  }

  get selectedDictionaryText() {
    return this.currentDictionary?.description || '未选择';
  }
}

export default SettingsStore;
