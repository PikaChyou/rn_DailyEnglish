// 共享的单词学习工具函数

// 统一的词汇数据源
export const WORD_DATA = [
  ...require('../../assets/CET4.json'),
  ...require('../../assets/CET6.json'),
  ...require('../../assets/Kaoyan.json'),
  ...require('../../assets/SAT.json'),
  ...require('../../assets/TOEFL.json'),
];

// DJB2哈希算法
export const hash = (str: string): number => {
  let hashValue = 5381;
  for (let i = 0; i < str.length; i++) {
    hashValue = (hashValue * 33 + str.charCodeAt(i)) % 2147483647;
  }
  return Math.abs(hashValue);
};

// 生成哈希种子
export const createHashSeed = (
  date: string,
  dailyWordCount: number,
  selectedDictionary: string,
  suffix = '',
) => {
  return `${date}-${dailyWordCount}-${selectedDictionary}${suffix}`;
};

// 获取今天的日期字符串
export const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

// 通用的单词选择函数
export const selectWordsByHash = (
  wordData: any[],
  count: number,
  seed: string,
) => {
  const wordsWithHash = wordData.map((word, index) => ({
    ...word,
    hash: hash(word.word + seed + index),
  }));

  return wordsWithHash.sort((a, b) => a.hash - b.hash).slice(0, count);
};
