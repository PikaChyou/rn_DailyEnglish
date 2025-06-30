/**
 * wordUtils 工具函数测试
 */

import {
  hash,
  createHashSeed,
  selectWordsByHash,
  getTodayString,
} from '../src/utils/wordUtils';

describe('wordUtils 测试套件', () => {
  // 测试哈希函数的一致性
  test('哈希函数应该对相同输入产生相同输出', () => {
    const input = 'test-word-seed-123';
    const hash1 = hash(input);
    const hash2 = hash(input);

    expect(hash1).toBe(hash2);
    expect(typeof hash1).toBe('number');
    expect(hash1).toBeGreaterThan(0);
  });

  // 测试不同输入产生不同输出
  test('哈希函数应该对不同输入产生不同输出', () => {
    const hash1 = hash('input1');
    const hash2 = hash('input2');

    expect(hash1).not.toBe(hash2);
  });

  // 测试种子生成
  test('创建哈希种子应该按正确格式', () => {
    const seed = createHashSeed('2025-06-30', 20, 'CET4');
    expect(seed).toBe('2025-06-30-20-CET4');

    const seedWithSuffix = createHashSeed('2025-06-30', 20, 'CET4', '-review');
    expect(seedWithSuffix).toBe('2025-06-30-20-CET4-review');
  });

  // 测试今天日期字符串
  test('获取今天日期应该返回正确格式', () => {
    const today = getTodayString();

    // 检查格式是否为 YYYY-MM-DD
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    // 检查是否为有效日期
    const date = new Date(today);
    expect(date.toISOString().split('T')[0]).toBe(today);
  });

  // 测试单词选择功能
  test('selectWordsByHash 应该返回正确数量的单词', () => {
    const mockWords = Array.from({ length: 100 }, (_, i) => ({
      word: `word${i}`,
      translations: [{ translation: `翻译${i}`, type: 'n.' }],
    }));

    const selected = selectWordsByHash(mockWords, 10, 'test-seed');

    expect(selected).toHaveLength(10);
    expect(selected[0]).toHaveProperty('word');
    expect(selected[0]).toHaveProperty('translations');
  });

  // 测试边界情况
  test('selectWordsByHash 处理边界情况', () => {
    const mockWords = Array.from({ length: 5 }, (_, i) => ({
      word: `word${i}`,
      translations: [{ translation: `翻译${i}`, type: 'n.' }],
    }));

    // 请求的数量超过可用单词数量
    const selected = selectWordsByHash(mockWords, 10, 'test-seed');
    expect(selected).toHaveLength(5);

    // 空数组
    const emptySelected = selectWordsByHash([], 10, 'test-seed');
    expect(emptySelected).toHaveLength(0);
  });

  // 测试相同种子的一致性
  test('相同种子应该产生相同的单词选择', () => {
    const mockWords = Array.from({ length: 50 }, (_, i) => ({
      word: `word${i}`,
      translations: [{ translation: `翻译${i}`, type: 'n.' }],
    }));

    const selected1 = selectWordsByHash(mockWords, 10, 'same-seed');
    const selected2 = selectWordsByHash(mockWords, 10, 'same-seed');

    expect(selected1).toEqual(selected2);
  });
});
