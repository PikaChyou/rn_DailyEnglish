import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/commonStyles';
import { useStore } from '../contexts/StoreContext';

const CalendarScreen = () => {
  const { wordHistoryStore } = useStore();
  const [selectedDate, setSelectedDate] = useState('');
  const [visitedDates, setVisitedDates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);

  // 记录访问日期并通知Store
  const initializeVisitData = useCallback(async () => {
    setIsLoading(true);
    const today = new Date().toISOString().split('T')[0];

    try {
      // 添加轻微延迟以显示加载动画
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const stored = await AsyncStorage.getItem('visitedDates');
      const dates = stored ? JSON.parse(stored) : {};

      const isNewVisit = !dates[today];
      dates[today] = true;

      await AsyncStorage.setItem('visitedDates', JSON.stringify(dates));
      setVisitedDates(dates);

      if (isNewVisit && wordHistoryStore) {
        wordHistoryStore.loadVisitedDates();
      }
    } catch (error) {
      console.error('Error managing visit data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [wordHistoryStore]);

  useEffect(() => {
    initializeVisitData();
  }, [initializeVisitData]);

  // 生成日期标记样式
  const getMarkedDates = () => {
    const marked: any = {};

    // 访问过的日期添加绿色标记
    Object.keys(visitedDates).forEach(date => {
      marked[date] = {
        customStyles: {
          container: {
            backgroundColor: '#e8f5e8',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#00c853',
          },
          text: {
            color: '#2e7d32',
            fontWeight: 'bold',
          },
        },
      };
    });

    // 选中日期的高亮样式
    if (selectedDate) {
      const isVisited = visitedDates[selectedDate];
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: isVisited ? '#ff6b35' : '#6750a4',
        selectedTextColor: '#ffffff',
        customStyles: isVisited
          ? {
              container: {
                backgroundColor: '#ff6b35',
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#ff4500',
              },
              text: {
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 16,
              },
            }
          : undefined,
      };
    }

    return marked;
  };

  if (isLoading) {
    return (
      <View style={commonStyles.screenContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#663399" />
          <Text variant="bodyLarge" style={styles.loadingText}>
            正在加载日历数据...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={commonStyles.screenContainer}>
      <Surface
        style={[commonStyles.surface, styles.calendarContainer]}
        elevation={2}
      >
        <Text
          variant="headlineSmall"
          style={[commonStyles.title, styles.calendarTitle]}
        >
          活跃记录
        </Text>
        <Calendar
          style={styles.calendar}
          markingType="custom"
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#6750a4',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#6750a4',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            arrowColor: '#6750a4',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#2d4150',
            indicatorColor: '#6750a4',
            textDayFontWeight: '400',
            textMonthFontWeight: '600',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={getMarkedDates()}
        />
        {selectedDate && (
          <Text variant="bodyLarge" style={styles.selectedDateText}>
            选择的日期: {selectedDate}
          </Text>
        )}
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    paddingBottom: 20,
  },
  calendarTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#e7e0ec',
    borderRadius: 12,
  },
  selectedDateText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#6750a4',
    fontWeight: '500',
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

export default CalendarScreen;
