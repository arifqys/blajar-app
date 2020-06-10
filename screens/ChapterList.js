import React from 'react'
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import Hello from '../components/Hello'
import Card from '../components/Card'
import colors from '../constants/colors'
import TextBold from '../components/TextBold'
import TextMedium from '../components/TextMedium'

export default chapterList = ({navigation}) => {
  const items = ['Pendahuluan', 'RDF', 'Linked Data', 'SPARQL']

  return (
    <ScrollView style={styles.container}>
      <Hello />
      <TextBold style={styles.subject}>Teknologi Web</TextBold>
      {items.map(item => (
        <TouchableOpacity
          key={item} 
          onPress={() => navigation.navigate('Materi', {
            title: item
          })}
        >
          <Card>
            <TextMedium style={styles.chapter}>{item}</TextMedium>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30
  },
  subject: {
    fontSize: 20,
    marginBottom: 10
  },
  chapter: {
    fontSize: 18
  }
})