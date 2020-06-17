import React, {useState, useEffect} from 'react'
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native'
import axios from 'axios'
import Hello from '../components/Hello'
import Card from '../components/Card'
import CardPrimary from '../components/CardPrimary'
import TextBold from '../components/TextBold'
import TextMedium from '../components/TextMedium'
import {Feather} from '@expo/vector-icons';

export default chapterList = ({navigation}) => {
  const [chapters, setChapters] = useState([])
  const [completedChapters, setCompletedChapters] = useState([])
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    axios.get('https://blajar-app.firebaseio.com/chapters.json')
      .then(res => {
        setChapters(Object.entries(res.data))
      })
    axios.get('https://blajar-app.firebaseio.com/answers.json')
      .then(res => {
        setCompletedChapters(
          Object.values(res.data)
            .filter((item) => item.user_id === "-M9aF1MH_8cyaECjvrh_")
            .map((item) => item.chapter_id)
        )
      })
  }, [refresh])

  return (
    <ScrollView>
      <View style={styles.container}>
        <ScrollView style={{marginBottom: 20}} horizontal>
          <Hello style={{marginRight: 10}} title="Halo Rifqy!" subtitle="Mau belajar apa hari ini?" source={require('../assets/avatar.png')} />
          <Hello title={completedChapters.length +' Materi'} subtitle="telah kamu selesaikan" source={require('../assets/check.png')} />
        </ScrollView>
        <View style={styles.subject}>
          <View>
            <TextBold style={styles.subjectText}>Daftar Materi</TextBold>
          </View>
          <View>
            <TouchableOpacity onPress={() => setRefresh(refresh+1)}>
              <Feather name="refresh-ccw" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        {chapters.map(item => (
          <TouchableOpacity
            key={item[0]} 
            onPress={() => navigation.navigate('Materi', {
              id: item[0],
              title: item[1].title,
              completed: completedChapters.includes(item[0])
            })}
          >
            <Card>
              <View style={styles.chapter}>
                <View>
                  <TextMedium style={styles.chapterText}>{item[1].title}</TextMedium>
                </View>
                {completedChapters.includes(item[0]) ? 
                  (
                    <View>
                      <TextMedium style={{fontSize: 10, color: 'green'}}><Feather name="check-circle" size={10} color="green" style={{marginRight: 5}} /> completed</TextMedium>
                    </View>
                  ) 
                  : null
                }
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  subject: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  subjectText: {
    fontSize: 20,
  },
  chapter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chapterText: {
    fontSize: 18
  }
})