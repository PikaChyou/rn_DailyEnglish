import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { useStore } from '../contexts/StoreContext';
import { commonStyles } from '../styles/commonStyles';
import { WORD_DATA } from '../utils/wordUtils';
import type { WordItem } from '../stores/WordHistoryStore';

const ReviewScreen = observer(() => {
  const { settingsStore, wordHistoryStore } = useStore();
  const [reviewWords, setReviewWords] = useState<WordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReviewWords = async () => {
      setIsLoading(true);

      // 添加轻微延迟以显示加载动画
      await new Promise(resolve => setTimeout(resolve, 200));

      if (wordHistoryStore?.getTodayReviewWords) {
        const reviewCount = Math.floor(settingsStore.dailyWordCount / 2);
        const words = wordHistoryStore.getTodayReviewWords(
          WORD_DATA,
          reviewCount,
          settingsStore.dailyWordCount,
          settingsStore.selectedDictionary,
        );
        setReviewWords(words);
      }

      setIsLoading(false);
    };

    loadReviewWords();
  }, [
    wordHistoryStore,
    settingsStore.dailyWordCount,
    settingsStore.selectedDictionary,
    wordHistoryStore?.visitedDates?.length,
  ]);

  const renderWordItem = ({ item }: { item: WordItem }) => (
    <Card style={styles.wordCard} mode="outlined">
      <Card.Content>
        <Text variant="headlineSmall" style={styles.wordText}>
          {item.word}
        </Text>

        <View style={styles.translationsContainer}>
          {item.translations.map((trans, idx) => (
            <View key={idx} style={styles.translationRow}>
              <Chip style={styles.typeChip} compact>
                {trans.type}
              </Chip>
              <Text variant="bodyMedium" style={styles.translationText}>
                {trans.translation}
              </Text>
            </View>
          ))}
        </View>

        {item.phrases && item.phrases.length > 0 && (
          <View style={styles.phrasesContainer}>
            <Text style={styles.phrasesTitle}>常用短语</Text>
            {item.phrases.slice(0, 1).map((phrase, idx) => (
              <View key={idx} style={styles.phraseRow}>
                <Text style={styles.phraseText}>{phrase.phrase}</Text>
                <Text style={styles.phraseTranslation}>
                  {phrase.translation}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Text variant="bodySmall" style={styles.dateText}>
          复习单词
        </Text>
      </Card.Content>
    </Card>
  );

  if (isLoading) {
    return (
      <View style={commonStyles.screenContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#663399" />
          <Text variant="bodyLarge" style={styles.loadingText}>
            正在加载复习内容...
          </Text>
        </View>
      </View>
    );
  }

  if (reviewWords.length === 0) {
    return (
      <View style={commonStyles.screenContainer}>
        <View style={styles.emptyContainer}>
          <Text variant="headlineSmall" style={styles.emptyText}>
            暂无复习内容
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubText}>
            复习内容基于您之前访问app的日期计算，多使用几天后这里就会有内容了
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          今日复习
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          从之前学习过的单词中选择{' '}
          {Math.floor(settingsStore.dailyWordCount / 2)} 个进行复习
        </Text>
      </View>

      <FlatList
        data={reviewWords}
        renderItem={renderWordItem}
        keyExtractor={(item, index) => `${item.word}-${index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#663399',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#666666',
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  wordCard: {
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  wordText: {
    fontWeight: 'bold',
    color: '#663399',
    marginBottom: 12,
  },
  translationsContainer: {
    marginBottom: 12,
  },
  translationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeChip: {
    marginRight: 12,
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
  },
  translationText: {
    flex: 1,
    color: '#333333',
  },
  phrasesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  phrasesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7845AC',
    marginBottom: 8,
  },
  phraseRow: {
    marginBottom: 8,
  },
  phraseText: {
    fontWeight: '500',
    color: '#1D1D1F',
    marginBottom: 2,
    fontSize: 14,
  },
  phraseTranslation: {
    color: '#6D6D70',
    fontSize: 13,
    fontStyle: 'italic',
  },
  dateText: {
    color: '#999999',
    marginTop: 8,
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 12,
  },
  emptySubText: {
    textAlign: 'center',
    color: '#999999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#663399',
    fontWeight: '500',
  },
});

export default ReviewScreen;
