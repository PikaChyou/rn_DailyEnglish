import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1c1b1f',
  },
  description: {
    lineHeight: 20,
    color: '#49454f',
  },
  divider: {
    marginBottom: 16,
    backgroundColor: '#e7e0ec',
  },
});
