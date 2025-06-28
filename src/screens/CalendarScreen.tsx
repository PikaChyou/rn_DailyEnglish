import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { commonStyles } from '../styles/commonStyles';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

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
          选择日期
        </Text>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#6750a4',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#6750a4',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#6750a4',
            selectedDotColor: '#ffffff',
            arrowColor: '#6750a4',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#2d4150',
            indicatorColor: '#6750a4',
            textDayFontFamily: 'System',
            textMonthFontFamily: 'System',
            textDayHeaderFontFamily: 'System',
            textDayFontWeight: '400',
            textMonthFontWeight: '600',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
        />
        {selectedDate ? (
          <Text variant="bodyLarge" style={styles.selectedDateText}>
            选择的日期: {selectedDate}
          </Text>
        ) : null}
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
