import React from 'react'
import {Text} from 'react-native'
import Card from './Card'
import TextMedium from './TextMedium'

export default props => {
  return (
    <Card>
      <TextMedium>
        {props.content}
      </TextMedium>
    </Card>
  )
}