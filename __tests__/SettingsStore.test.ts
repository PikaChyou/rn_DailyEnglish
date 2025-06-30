/**
 * SettingsStore 测试
 */

import SettingsStore, { DICTIONARY_TYPES } from '../src/stores/SettingsStore';

describe('SettingsStore 测试套件', () => {
  let store: SettingsStore;

  // 每个测试前重新创建 store 实例
  beforeEach(() => {
    store = new SettingsStore();
  });

  // 测试默认值
  test('应该有正确的默认值', () => {
    expect(store.dailyWordCount).toBe(20);
    expect(store.selectedDictionary).toBe('CET4');
  });

  // 测试单词数量设置
  describe('setDailyWordCount', () => {
    test('应该正确设置有效的单词数量', () => {
      store.setDailyWordCount(50);
      expect(store.dailyWordCount).toBe(50);

      store.setDailyWordCount(5);
      expect(store.dailyWordCount).toBe(5);

      store.setDailyWordCount(100);
      expect(store.dailyWordCount).toBe(100);
    });

    test('应该拒绝无效的单词数量', () => {
      const originalCount = store.dailyWordCount;

      // 小于最小值
      store.setDailyWordCount(4);
      expect(store.dailyWordCount).toBe(originalCount);

      // 大于最大值
      store.setDailyWordCount(101);
      expect(store.dailyWordCount).toBe(originalCount);

      // 负数
      store.setDailyWordCount(-10);
      expect(store.dailyWordCount).toBe(originalCount);
    });
  });

  // 测试词典选择
  describe('setSelectedDictionary', () => {
    test('应该正确设置有效的词典', () => {
      store.setSelectedDictionary('CET6');
      expect(store.selectedDictionary).toBe('CET6');

      store.setSelectedDictionary('TOEFL');
      expect(store.selectedDictionary).toBe('TOEFL');
    });

    test('应该拒绝无效的词典ID', () => {
      const originalDictionary = store.selectedDictionary;

      store.setSelectedDictionary('INVALID_DICT');
      expect(store.selectedDictionary).toBe(originalDictionary);

      store.setSelectedDictionary('');
      expect(store.selectedDictionary).toBe(originalDictionary);
    });
  });

  // 测试计算属性
  describe('计算属性', () => {
    test('currentDictionary 应该返回正确的词典对象', () => {
      store.setSelectedDictionary('CET6');
      const current = store.currentDictionary;

      expect(current).toBeDefined();
      expect(current?.id).toBe('CET6');
      expect(current?.name).toBe('CET-6');
      expect(current?.description).toBe('大学英语六级词汇');
    });

    test('dailyWordCountText 应该返回正确的显示文本', () => {
      store.setDailyWordCount(30);
      expect(store.dailyWordCountText).toBe('每天学习 30 个单词');
    });

    test('selectedDictionaryText 应该返回正确的显示文本', () => {
      store.setSelectedDictionary('Kaoyan');
      expect(store.selectedDictionaryText).toBe('考研英语词汇');

      // 测试无效词典的情况
      store.selectedDictionary = 'INVALID';
      expect(store.selectedDictionaryText).toBe('未选择');
    });
  });

  // 测试词典常量
  test('DICTIONARY_TYPES 应该包含所有预期的词典', () => {
    expect(DICTIONARY_TYPES).toHaveLength(5);

    const ids = DICTIONARY_TYPES.map(dict => dict.id);
    expect(ids).toContain('CET4');
    expect(ids).toContain('CET6');
    expect(ids).toContain('Kaoyan');
    expect(ids).toContain('TOEFL');
    expect(ids).toContain('SAT');

    // 检查每个词典对象的结构
    DICTIONARY_TYPES.forEach(dict => {
      expect(dict).toHaveProperty('id');
      expect(dict).toHaveProperty('name');
      expect(dict).toHaveProperty('description');
      expect(typeof dict.id).toBe('string');
      expect(typeof dict.name).toBe('string');
      expect(typeof dict.description).toBe('string');
    });
  });
});
