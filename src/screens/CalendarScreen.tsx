import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/commonStyles';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [visitedDates, setVisitedDates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // 记录并加载访问日期
  const initializeVisitData = async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const storedDates = await AsyncStorage.getItem('visitedDates');
      const dates = storedDates ? JSON.parse(storedDates) : {};
      
      // 记录今天的访问
      dates[today] = true;
      await AsyncStorage.setItem('visitedDates', JSON.stringify(dates));
      setVisitedDates(dates);
    } catch (error) {
      console.error('Error managing visit data:', error);
    }
  };

  useEffect(() => {
    initializeVisitData();
  }, []);

  // 生成日期标记样式
  const getMarkedDates = () => {
    const marked: any = {};

    // 为访问过的日期添加绿色圆形标记
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

    // 为选中的日期添加高亮样式
    if (selectedDate) {
      const isVisited = visitedDates[selectedDate];
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: isVisited ? '#ff6b35' : '#6750a4',
        selectedTextColor: '#ffffff',
        customStyles: isVisited ? {
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
        } : undefined,
      };
    }

    return marked;
  };

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
          活跃日期
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
});

export default CalendarScreen;
