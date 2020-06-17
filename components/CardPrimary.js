import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import colors from '../constants/colors'
import TextBold from './TextBold'
import TextMedium from './TextMedium'

export default props => (
  <View style={{...styles.container, ...props.style}}>
    <View>
      <Image style={styles.avatar} source={props.source} />
    </View>
    <View>
    <TextBold style={styles.title}>{props.title}</TextBold>
      <TextMedium style={styles.subtitle}>{props.subtitle}</TextMedium>
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