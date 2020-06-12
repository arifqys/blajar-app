import React, {useState, useEffect} from 'react'
import {StyleSheet, View, ScrollView, Button} from 'react-native'
import {AppLoading} from 'expo'
import axios from 'axios'
import Material from '../components/Material'
import Question from '../components/Question'
import colors from '../constants/colors'
import TextBold from '../components/TextBold'
import TextMedium from '../components/TextMedium'

export default contentSlides = ({route, navigation}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [contents, setContents] = useState([])
  const [dataCompletion, setDataCompletion] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    axios.get(`https://blajar-app.firebaseio.com/chapters/${route.params.id}/contents.json`)
      .then(res => {
        setContents(res.data)
        setDataCompletion({data: res.data, chapter_id: route.params.id, user_id: "-M9aF1MH_8cyaECjvrh_"})
        setIsLoaded(true)
      })
  }, [])

  const answerHandler = (selectedAnswer) => {
    const newData = {...dataCompletion}
    newData.data[currentSlide].selectedAnswer = selectedAnswer
    setDataCompletion(newData)
  }

  const nextSlideHandler = () => {
    setCurrentSlide(currentSlide + 1)
  }

  const submitCompletionHandler = () => {
    axios.post('https://blajar-app.firebaseio.com/answers.json', dataCompletion)
      .then(() => navigation.navigate('Selesai'))
  }

  if (!isLoaded) {
    return <AppLoading />
  } else if (!contents) {
    return (
      <View style={styles.container}>
        <TextBold style={styles.title}>Konten belum tersedia</TextBold>
      </View>
    )
  } 
  else {
    let content = <Material content={contents[currentSlide].content} />
    if (contents[currentSlide].type == 'question') {
      content = <Question answers={contents[currentSlide].answers} clicked={answerHandler} />
    }
  
    let next = <Button title="Lanjut" color={colors.primary} onPress={nextSlideHandler}/>
    if (currentSlide === contents.length-1) {
      next = <Button title="Selesai" color={colors.success} onPress={submitCompletionHandler}/>
    }
  
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <TextBold style={styles.title}>{contents[currentSlide].title} </TextBold>
          <TextMedium style={styles.pages}>{`Halaman ${currentSlide + 1} dari ${contents.length}`}</TextMedium>
          {content}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Kembali" color="gray" onPress={() => setCurrentSlide(currentSlide - 1)} disabled={currentSlide === 0 ? true : false}/>
          </View>
          <View style={styles.button}>
            {next}
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 20
  },
  pages: {
    color: 'gray', 
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 30
  },
  button: {
    width: 80,
    marginLeft: 10
  }
})