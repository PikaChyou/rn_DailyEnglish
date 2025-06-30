import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import {
  Text,
  Avatar,
  Button,
  Divider,
  List,
  Surface,
  Drawer,
  Portal,
  TextInput,
} from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { useStore } from '../contexts/StoreContext';
import { commonStyles } from '../styles/commonStyles';
import { DICTIONARY_TYPES } from '../stores/SettingsStore';

const ProfileScreen = observer(() => {
  const { settingsStore } = useStore();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [nickname, setNickname] = useState('张三');
  const [email, setEmail] = useState('zhangsan@example.com');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  const openDrawer = (title: string) => {
    setDrawerTitle(title);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.3,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => setDrawerVisible(false));
  };

  useEffect(() => {
    if (drawerVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [drawerVisible, fadeAnim, scaleAnim]);

  return (
    <View style={commonStyles.screenContainer}>
      <Surface
        style={[commonStyles.surface, styles.profileContainer]}
        elevation={2}
      >
        <View style={styles.profileHeader}>
          <Avatar.Image
            size={80}
            source={require('../../assets/ktn.jpg')}
            style={styles.avatar}
          />
          <Text
            variant="headlineSmall"
            style={[commonStyles.title, styles.profileName]}
          >
            {nickname}
          </Text>
          <Text variant="bodyMedium" style={styles.profileEmail}>
            {email}
          </Text>
        </View>

        <Divider style={commonStyles.divider} />

        <List.Section>
          <List.Item
            title="用户信息"
            description="修改昵称和邮箱"
            left={props => <List.Icon {...props} icon="account-edit" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => openDrawer('用户信息')}
          />
          <List.Item
            title="社交头像"
            description="更换或编辑个人头像"
            left={props => <List.Icon {...props} icon="camera" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => openDrawer('自定义头像')}
          />
          <List.Item
            title="学习计划"
            description={settingsStore.dailyWordCountText}
            left={props => <List.Icon {...props} icon="account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => openDrawer('学习计划')}
          />
          <List.Item
            title="辞书选择"
            description={settingsStore.selectedDictionaryText}
            left={props => <List.Icon {...props} icon="cog" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => openDrawer('辞书选择')}
          />
          <List.Item
            title="关于我们"
            description="了解更多关于我们的信息"
            left={props => <List.Icon {...props} icon="account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => openDrawer('关于我们')}
          />
        </List.Section>

        <Button
          mode="outlined"
          onPress={() => console.log('退出登录')}
          style={styles.logoutButton}
          buttonColor="#fff"
          textColor="#d32f2f"
        >
          退出登录
        </Button>
      </Surface>

      <Portal>
        {drawerVisible && (
          <Animated.View
            style={[styles.overlay, { opacity: fadeAnim }]}
            onTouchEnd={closeDrawer}
          >
            <Animated.View
              style={[
                styles.drawerContainer,
                {
                  transform: [{ scale: scaleAnim }],
                },
              ]}
              onTouchEnd={e => e.stopPropagation()}
            >
              <Text variant="headlineSmall" style={styles.drawerTitle}>
                {drawerTitle}
              </Text>

              {drawerTitle === '用户信息' && (
                <>
                  <Text variant="bodyLarge" style={styles.inputLabel}>
                    编辑个人信息
                  </Text>
                  <TextInput
                    label="昵称"
                    value={nickname}
                    onChangeText={setNickname}
                    mode="outlined"
                    style={styles.textInput}
                    placeholder="请输入昵称"
                  />
                  <TextInput
                    label="邮箱"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={styles.textInput}
                    placeholder="请输入邮箱地址"
                    keyboardType="email-address"
                  />
                  <Button
                    mode="contained"
                    onPress={() => {
                      console.log(`更新昵称为: ${nickname}`);
                      console.log(`更新邮箱为: ${email}`);
                      closeDrawer();
                    }}
                    style={styles.confirmButton}
                  >
                    保存修改
                  </Button>
                </>
              )}

              {drawerTitle === '自定义头像' && (
                <>
                  <Drawer.Item
                    label="从相册选择"
                    icon="image"
                    onPress={() => console.log('从相册选择')}
                  />
                  <Drawer.Item
                    label="使用默认头像"
                    icon="account-circle"
                    onPress={() => console.log('使用默认头像')}
                  />
                </>
              )}

              {drawerTitle === '学习计划' && (
                <>
                  <Text variant="bodyLarge" style={styles.inputLabel}>
                    请输入每天学习的单词数量
                  </Text>
                  <TextInput
                    label="单词数量"
                    value={settingsStore.dailyWordCount.toString()}
                    onChangeText={text => {
                      const count = parseInt(text, 10);
                      if (!isNaN(count)) {
                        settingsStore.setDailyWordCount(count);
                      }
                    }}
                    keyboardType="numeric"
                    mode="outlined"
                    style={styles.textInput}
                    placeholder="请输入5-100之间的数字"
                  />
                  <View style={styles.buttonRow}>
                    {[20, 40, 60].map(count => (
                      <Button
                        key={count}
                        mode="outlined"
                        onPress={() => settingsStore.setDailyWordCount(count)}
                        style={styles.presetButton}
                      >
                        {count}
                      </Button>
                    ))}
                  </View>
                  <View style={styles.buttonRow}>
                    {[80, 100].map(count => (
                      <Button
                        key={count}
                        mode="outlined"
                        onPress={() => settingsStore.setDailyWordCount(count)}
                        style={styles.presetButton}
                      >
                        {count}
                      </Button>
                    ))}
                  </View>
                  <Button
                    mode="contained"
                    onPress={() => {
                      const count = settingsStore.dailyWordCount;
                      if (count >= 5 && count <= 100) {
                        console.log(`设置单词数量为: ${count}`);
                        closeDrawer();
                      } else {
                        console.log('请输入5-100之间的有效数字');
                      }
                    }}
                    style={styles.confirmButton}
                  >
                    确认设置
                  </Button>
                </>
              )}

              {drawerTitle === '辞书选择' && (
                <>
                  {DICTIONARY_TYPES.map(dict => (
                    <Drawer.Item
                      key={dict.id}
                      label={`${dict.description}`}
                      icon={
                        settingsStore.selectedDictionary === dict.id
                          ? 'check-circle'
                          : 'book-education'
                      }
                      onPress={() => {
                        settingsStore.setSelectedDictionary(dict.id);
                        console.log(`选择辞书: ${dict.name}`);
                        closeDrawer();
                      }}
                      style={[
                        settingsStore.selectedDictionary === dict.id &&
                          styles.selectedItem,
                      ]}
                    />
                  ))}
                </>
              )}

              {drawerTitle === '关于我们' && (
                <>
                  <Text variant="bodyLarge" style={styles.aboutText}>
                    Ciallo～(∠・ω{'<'} )⌒★
                  </Text>
                </>
              )}
            </Animated.View>
          </Animated.View>
        )}
      </Portal>
    </View>
  );
});

const styles = StyleSheet.create({
  profileContainer: {
    paddingBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 16,
  },
  profileName: {
    marginBottom: 4,
  },
  profileEmail: {
    color: '#49454f',
  },
  logoutButton: {
    marginTop: 10,
    borderColor: '#d32f2f',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  drawerContainer: {
    width: 320,
    maxHeight: '80%',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 8,
    padding: 20,
  },
  drawerTitle: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  inputLabel: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#666',
  },
  textInput: {
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  presetButton: {
    flex: 0.28,
  },
  confirmButton: {
    marginTop: 15,
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
  aboutText: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 48,
  },
});

export default ProfileScreen;
