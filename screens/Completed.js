import React from 'react'
import {StyleSheet, View, Button, Image} from 'react-native'
import colors from '../constants/colors'
import TextBold from '../components/TextBold'
import TextMedium from '../components/TextMedium'

export default ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.completed} source={require('../assets/completed.png')} />
      <TextBold style={styles.title}>Selamat!</TextBold>
      <TextMedium style={styles.subtitle}>Anda telah berhasil menyelesaikan materi ini</TextMedium>
      <Button title="Kembali ke daftar materi" color={colors.primary} onPress={() => navigation.navigate('Daftar Materi')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingTop: 20,
    paddingHorizontal: 30
  },
  completed: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    marginBottom: 20
  }
})