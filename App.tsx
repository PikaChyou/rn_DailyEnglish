import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider, BottomNavigation } from 'react-native-paper';
import { StoreProvider } from './src/contexts/StoreContext';
import CalendarScreen from './src/screens/CalendarScreen';
import CardScreen from './src/screens/CardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ReviewScreen from './src/screens/ReviewScreen';

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'card',
      title: '卡片',
      focusedIcon: 'school',
      unfocusedIcon: 'school-outline',
    },
    {
      key: 'review',
      title: '复习',
      focusedIcon: 'book',
      unfocusedIcon: 'book-outline',
    },
    {
      key: 'calendar',
      title: '日历',
      focusedIcon: 'calendar',
      unfocusedIcon: 'calendar-outline',
    },
    {
      key: 'profile',
      title: '个人',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    calendar: CalendarScreen,
    card: CardScreen,
    review: ReviewScreen,
    profile: ProfileScreen,
  });

  return (
    <StoreProvider>
      <PaperProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#f5f5f5"
          translucent={false}
        />
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          sceneAnimationEnabled
          sceneAnimationType="opacity"
          activeColor="#6750a4"
          inactiveColor="#757575"
          labeled={false}
          shifting
        />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
