import React, {useState} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import colors from '../constants/colors'
import TextMedium from './TextMedium'

export default props => {
  const [isSelected, setIsSelected] = useState(false)
  const selectedHandler = () => {
    const selected = !isSelected
    setIsSelected(selected)
    if (selected) {
      props.clicked(props.code)
    }
  }

  return (
    <TouchableOpacity onPress={selectedHandler}>
      <View style={isSelected ? styles.containerSelected : styles.container}>
        <TextMedium style={styles.answer}>{props.children}</TextMedium>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 20,
    borderColor: colors.selected,
    borderWidth: 1,
    borderRadius: 10
  },
  containerSelected: {
    backgroundColor: colors.selected,
    marginVertical: 5,
    padding: 20,
    borderColor: colors.selected,
    borderWidth: 1,
    borderRadius: 10
  },
  answer: {
    fontSize: 14,
  }
})