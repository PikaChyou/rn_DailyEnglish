import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { Text, Button, Chip } from 'react-native-paper';
import { commonStyles } from '../styles/commonStyles';

// 导入词汇数据
const CET4_DATA = require('../../assets/CET4.json');
const CET6_DATA = require('../../assets/CET6.json');
const KAOYAN_DATA = require('../../assets/Kaoyan.json');
const SAT_DATA = require('../../assets/SAT.json');
const TOEFL_DATA = require('../../assets/TOEFL.json');

const { width: screenWidth } = Dimensions.get('window');

interface Translation {
  translation: string;
  type: string;
}

interface Phrase {
  phrase: string;
  translation: string;
}

interface WordItem {
  word: string;
  translations: Translation[];
  phrases?: Phrase[];
}

const CardScreen = () => {
  const [_currentIndex, _setCurrentIndex] = useState(0);
  const [dailyWords, setDailyWords] = useState<WordItem[]>([]);

  // 随机选择50个词汇
  useEffect(() => {
    const allWords = [
      ...CET4_DATA,
      ...CET6_DATA,
      ...KAOYAN_DATA,
      ...SAT_DATA,
      ...TOEFL_DATA,
    ];
    const shuffled = allWords.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 50);
    setDailyWords(selected);
  }, []);

  const renderWordCard = ({
    item,
    index,
  }: {
    item: WordItem;
    index: number;
  }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.wordCard}>
          <View style={styles.cardContent}>
            <Text variant="headlineLarge" style={styles.wordText}>
              {item.word}
            </Text>

            <View style={styles.translationsContainer}>
              {item.translations.map((trans, idx) => (
                <View key={idx} style={styles.translationRow}>
                  <Chip style={styles.typeChip} compact>
                    {trans.type}
                  </Chip>
                  <Text variant="bodyLarge" style={styles.translationText}>
                    {trans.translation}
                  </Text>
                </View>
              ))}
            </View>

            {item.phrases && item.phrases.length > 0 && (
              <View style={styles.phrasesContainer}>
                <Text style={styles.phrasesTitle}>常用短语</Text>
                {item.phrases.slice(0, 2).map((phrase, idx) => (
                  <View key={idx} style={styles.phraseRow}>
                    <View style={styles.phraseContent}>
                      <Text style={styles.phraseText}>{phrase.phrase}</Text>
                      <Text style={styles.phraseTranslation}>
                        {phrase.translation}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.cardActions}>
            <Text variant="bodySmall" style={styles.progressText}>
              {index + 1} / {dailyWords.length}
            </Text>
            <View style={styles.actionButtons}>
              <Button
                mode="outlined"
                onPress={() => console.log('标记为困难')}
                style={styles.actionButton}
              >
                困难
              </Button>
              <Button
                mode="contained"
                onPress={() => console.log('已掌握')}
                style={styles.actionButton}
              >
                掌握
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (dailyWords.length === 0) {
    return (
      <View style={commonStyles.screenContainer}>
        <View style={styles.loadingCard}>
          <Text variant="headlineSmall" style={styles.loadingText}>
            正在加载今日词汇...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={dailyWords}
        renderItem={renderWordCard}
        keyExtractor={(item: WordItem, index: number) =>
          `${item.word}-${index}`
        }
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContainer}
        getItemLayout={(data: any, index: number) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flatListContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    width: screenWidth,
    padding: 20,
    flex: 1,
  },
  wordCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: 28,
  },
  wordText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#663399',
    marginBottom: 32,
    fontSize: 32,
    letterSpacing: 0.5,
  },
  translationsContainer: {
    marginBottom: 28,
  },
  translationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 4,
  },
  typeChip: {
    marginRight: 16,
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
  },
  translationText: {
    flex: 1,
    fontSize: 18,
    color: '#333333',
    lineHeight: 26,
    fontWeight: '500',
  },
  phrasesContainer: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#7845AC',
  },
  phrasesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7845AC',
    marginBottom: 16,
  },
  phraseRow: {
    marginBottom: 20,
  },
  phraseContent: {
    paddingLeft: 0,
  },
  phraseText: {
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 6,
    fontSize: 16,
    lineHeight: 22,
  },
  phraseTranslation: {
    color: '#6D6D70',
    fontSize: 15,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  progressText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    minWidth: 80,
    borderRadius: 20,
  },
  loadingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 40,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 18,
  },
});

export default CardScreen;
