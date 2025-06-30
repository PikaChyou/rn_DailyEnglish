/**
 * WordHistoryStore 测试
 * 注意：这里我们模拟 AsyncStorage 来避免真实的文件系统操作
 */

import WordHistoryStore from '../src/stores/WordHistoryStore';

// 模拟 AsyncStorage
const mockAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

// 模拟 @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe('WordHistoryStore 测试套件', () => {
  let store: WordHistoryStore;

  beforeEach(() => {
    // 重置所有模拟
    jest.clearAllMocks();
    store = new WordHistoryStore();
  });

  // 测试初始状态
  test('应该有正确的初始状态', () => {
    expect(store.visitedDates).toEqual([]);
  });

  // 测试加载访问日期
  describe('loadVisitedDates', () => {
    test('应该处理空存储情况', async () => {
      mockAsyncStorage.getItem.mockResolvedValue(null);

      await store.loadVisitedDates();

      expect(store.visitedDates).toEqual([]);
    });

    test('应该处理存储读取错误', async () => {
      mockAsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));

      // 使用 console.error 的模拟来捕获错误日志
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await store.loadVisitedDates();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load visited dates:',
        expect.any(Error),
      );
      expect(store.visitedDates).toEqual([]);

      consoleSpy.mockRestore();
    });
  });

  // 测试复习单词获取
  describe('getTodayReviewWords', () => {
    const mockWordData = [
      { word: 'apple', translations: [{ translation: '苹果', type: 'n.' }] },
      { word: 'book', translations: [{ translation: '书', type: 'n.' }] },
      { word: 'cat', translations: [{ translation: '猫', type: 'n.' }] },
      { word: 'dog', translations: [{ translation: '狗', type: 'n.' }] },
      { word: 'eat', translations: [{ translation: '吃', type: 'v.' }] },
    ];

    test('没有访问历史时应该返回空数组', () => {
      store.visitedDates = [];

      const reviewWords = store.getTodayReviewWords(
        mockWordData,
        3,
        20,
        'CET4',
      );

      expect(reviewWords).toEqual([]);
    });

    test('有访问历史时应该返回复习单词', () => {
      // 设置一些访问日期
      store.visitedDates = ['2025-06-29', '2025-06-28'];

      const reviewWords = store.getTodayReviewWords(mockWordData, 2, 3, 'CET4');

      expect(reviewWords.length).toBeLessThanOrEqual(2);
      expect(reviewWords.length).toBeGreaterThan(0);

      // 验证返回的是有效的单词对象
      reviewWords.forEach(word => {
        expect(word).toHaveProperty('word');
        expect(word).toHaveProperty('translations');
        expect(Array.isArray(word.translations)).toBe(true);
      });
    });

    test('请求数量超过可用单词时应该返回所有可用单词', () => {
      store.visitedDates = ['2025-06-29'];

      // 请求100个单词，但实际只有很少的学习过的单词
      const reviewWords = store.getTodayReviewWords(
        mockWordData,
        100,
        2,
        'CET4',
      );

      expect(reviewWords.length).toBeLessThanOrEqual(mockWordData.length);
    });

    test('相同参数应该返回相同的复习单词（一致性测试）', () => {
      store.visitedDates = ['2025-06-29', '2025-06-28'];

      const reviewWords1 = store.getTodayReviewWords(
        mockWordData,
        2,
        3,
        'CET4',
      );
      const reviewWords2 = store.getTodayReviewWords(
        mockWordData,
        2,
        3,
        'CET4',
      );

      expect(reviewWords1).toEqual(reviewWords2);
    });

    test('不同参数应该可能返回不同的复习单词', () => {
      store.visitedDates = ['2025-06-29', '2025-06-28'];

      const reviewWords1 = store.getTodayReviewWords(
        mockWordData,
        2,
        3,
        'CET4',
      );
      const reviewWords2 = store.getTodayReviewWords(
        mockWordData,
        2,
        3,
        'CET6',
      );

      // 注意：由于哈希的随机性，这个测试可能偶尔失败，但大多数情况下应该通过
      // 如果经常失败，可以使用更大的数据集来测试
      expect(reviewWords1).not.toEqual(reviewWords2);
    });
  });

  // 测试私有方法的行为（通过公共方法间接测试）
  describe('内部逻辑测试', () => {
    test('应该正确去重已学习的单词', () => {
      const mockWordData = [
        { word: 'test1', translations: [{ translation: '测试1', type: 'n.' }] },
        { word: 'test2', translations: [{ translation: '测试2', type: 'n.' }] },
      ];

      // 设置多个访问日期，这样同一个单词可能在不同日期被选中
      store.visitedDates = ['2025-06-29', '2025-06-28', '2025-06-27'];

      const reviewWords = store.getTodayReviewWords(
        mockWordData,
        10,
        1,
        'CET4',
      );

      // 验证没有重复的单词
      const uniqueWords = new Set(reviewWords.map(word => word.word));
      expect(uniqueWords.size).toBe(reviewWords.length);
    });
  });
});
