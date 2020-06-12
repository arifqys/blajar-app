import React from 'react'
import {StyleSheet} from 'react-native'
import Card from './Card'
import TextMedium from './TextMedium'

export default props => {
  return (
    <Card>
      <TextMedium style={styles.content}>
        {props.content}
      </TextMedium>
    </Card>
  )
}

const styles = StyleSheet.create({
  content: {
    lineHeight: 20
  }
})