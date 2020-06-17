import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, View, ScrollView, Button} from 'react-native'
import {AppLoading} from 'expo'
import axios from 'axios'
import Material from '../components/Material'
import Question from '../components/Question'
import colors from '../constants/colors'
import TextBold from '../components/TextBold'
import TextMedium from '../components/TextMedium'
import { set } from 'react-native-reanimated'

export default contentSlides = ({route, navigation}) => {
  let INITIAL_COUNTDOWN_TIME = 10;
  if (route.params.completed) {
    INITIAL_COUNTDOWN_TIME = 0;
  }
  const [currentSlide, setCurrentSlide] = useState(0)
  const [contents, setContents] = useState([])
  const [dataCompletion, setDataCompletion] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [counter, setCounter] = useState(INITIAL_COUNTDOWN_TIME)

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
    setCounter(INITIAL_COUNTDOWN_TIME)
  }

  const prevSlideHandler = () => {
    setCurrentSlide(currentSlide - 1)
    setCounter(0)
  }

  const submitCompletionHandler = () => {
    axios.post('https://blajar-app.firebaseio.com/answers.json', dataCompletion)
      .then(() => navigation.navigate('Selesai'))
  }

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    setCounter(counter - 1);
  }, 1000);

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
  
    let next = <Button title="Lanjut" color={colors.primary} onPress={nextSlideHandler} disabled={counter > 0}/>
    if (currentSlide === contents.length-1) {
      next = <Button title="Selesai" color={colors.success} onPress={submitCompletionHandler} disabled={counter > 0}/>
      if (route.params.completed) {
        next = <Button title="Selesai" color={colors.success} disabled/>
      }
    }
  
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <View>
          <TextBold style={styles.title}>{contents[currentSlide].title}</TextBold>
            <TextMedium style={styles.pages}>{`Halaman ${currentSlide + 1} dari ${contents.length}`}</TextMedium>
          </View>
          {counter > 0 ? 
            <View style={styles.countdown}>
              <TextMedium style={styles.countdownText}>tunggu <TextBold>{counter}</TextBold> detik untuk lanjut</TextMedium>
            </View>
            : null
          }
        </View>
          {content}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Kembali" color="gray" onPress={prevSlideHandler} disabled={currentSlide === 0 ? true : false}/>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  countdown: {
    backgroundColor: 'red',
    width: 160,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  countdownText: {
    color: 'white',
    fontSize: 10
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