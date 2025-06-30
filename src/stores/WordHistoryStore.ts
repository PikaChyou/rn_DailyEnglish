import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  selectWordsByHash,
  createHashSeed,
  getTodayString,
} from '../utils/wordUtils';

export interface WordItem {
  word: string;
  translations: Array<{
    translation: string;
    type: string;
  }>;
  phrases?: Array<{
    phrase: string;
    translation: string;
  }>;
}

class WordHistoryStore {
  visitedDates: string[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadVisitedDates();
  }

  loadVisitedDates = async () => {
    try {
      const stored = await AsyncStorage.getItem('visitedDates');
      if (stored) {
        const datesObj = JSON.parse(stored);
        this.visitedDates = Object.keys(datesObj).filter(
          date => datesObj[date],
        );
      }
    } catch (error) {
      console.error('Failed to load visited dates:', error);
    }
  };

  private selectWords = (wordData: WordItem[], count: number, seed: string) => {
    return selectWordsByHash(wordData, count, seed);
  };

  private getAllLearnedWords = (
    wordData: WordItem[],
    dailyWordCount: number,
    selectedDictionary: string,
  ) => {
    if (this.visitedDates.length === 0) return [];

    const learnedWords: WordItem[] = [];
    const wordSet = new Set<string>();

    this.visitedDates.forEach(date => {
      const seed = createHashSeed(date, dailyWordCount, selectedDictionary);
      const dailyWords = this.selectWords(wordData, dailyWordCount, seed);

      dailyWords.forEach(word => {
        if (!wordSet.has(word.word)) {
          learnedWords.push(word);
          wordSet.add(word.word);
        }
      });
    });

    return learnedWords;
  };

  getTodayReviewWords = (
    wordData: WordItem[],
    reviewCount: number,
    dailyWordCount: number,
    selectedDictionary: string,
  ) => {
    const learnedWords = this.getAllLearnedWords(
      wordData,
      dailyWordCount,
      selectedDictionary,
    );

    if (learnedWords.length === 0) return [];

    const seed = createHashSeed(
      getTodayString(),
      dailyWordCount,
      selectedDictionary,
      '-review',
    );

    return this.selectWords(
      learnedWords,
      Math.min(reviewCount, learnedWords.length),
      seed,
    );
  };
}

export default WordHistoryStore;
