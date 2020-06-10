import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import colors from '../constants/colors'
import TextBold from './TextBold'
import TextMedium from './TextMedium'

export default () => (
  <View style={styles.container}>
    <View>
      <Image style={styles.avatar} source={require('../assets/avatar.png')} />
    </View>
    <View>
      <TextBold style={styles.title}>Halo Rifqy!</TextBold>
      <TextMedium style={styles.subtitle}>Mau blajar apa hari ini?</TextMedium>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 1
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 20
  },
  title: {
    flex: 1,
    color: 'white',
    fontSize: 20,
  },
  subtitle: {
    color: 'white',
  }
})