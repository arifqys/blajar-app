import React from 'react'
import {StyleSheet, View} from 'react-native'

export default props => (
  <View style={styles.container}>
    {props.children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 15,
    borderRadius: 20,
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 1
  }
})