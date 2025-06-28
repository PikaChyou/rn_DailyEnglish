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
  // 每日学习单词数量
  dailyWordCount: number = 20;

  // 选择的辞书类别
  selectedDictionary: string = 'CET4';

  constructor() {
    makeAutoObservable(this);
  }

  // 设置每日学习单词数量
  setDailyWordCount = (count: number) => {
    if (count >= 5 && count <= 100) {
      this.dailyWordCount = count;
    }
  };

  // 设置选择的辞书
  setSelectedDictionary = (dictionaryId: string) => {
    const exists = DICTIONARY_TYPES.some(dict => dict.id === dictionaryId);
    if (exists) {
      this.selectedDictionary = dictionaryId;
    }
  };

  // 获取当前选择的辞书信息
  get currentDictionary(): DictionaryType | undefined {
    return DICTIONARY_TYPES.find(dict => dict.id === this.selectedDictionary);
  }

  // 获取每日学习单词数量的显示文本
  get dailyWordCountText(): string {
    return `每天学习 ${this.dailyWordCount} 个单词`;
  }

  // 获取选择的辞书显示文本
  get selectedDictionaryText(): string {
    const dict = this.currentDictionary;
    return dict ? `${dict.description}` : '未选择';
  }
}

export default SettingsStore;
