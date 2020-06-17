import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import colors from '../constants/colors'
import TextBold from './TextBold'
import TextMedium from './TextMedium'

export default props => (
  <View style={{...styles.container, ...props.style}}>
    {props.children}
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
  }
})