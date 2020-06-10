import React, {useState} from 'react'
import {StyleSheet, View, ScrollView, Button} from 'react-native'
import Material from '../components/Material'
import Question from '../components/Question'
import colors from '../constants/colors'
import TextBold from '../components/TextBold'
import TextMedium from '../components/TextMedium'

export default contentSlides = ({route, navigation}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const data = [
    {
      type: 'material',
      title: 'Definisi RDF',
      content: `Resource Description Framework (RDF) adalah spesifikasi yang dibuat oleh W3C sebagai metode umum untuk memodelkan informasi dengan menggunakan sekumpulan format sintaks. Ide dasar dari RDF adalah bagaimana kita dapat membuat pernyataan mengenai sebuah resource Web dalam bentuk ekpresi “Subjet-Predikat-Objek”. Dalam terminology RDF, SPO ini seringkali disebut dengan istilah N-triple.`    
    },
    {
      type: 'material',
      title: 'Subjek Predikat',
      content: `Subjek mengacu pada resource yang ingin dideksripsikan. Predikat menggambarkan kelakuan atau karakteristik dari resource tersebut dan mengekspresikan hubungan antara subjek dan objek.`    
    },
    {
      type: 'material',
      title: 'Contoh',
      content: `<http://www.itmaranatha.org/jadwal> <http://purl.org/dc/elements/1.1/title> “Jadwal Ujian” <http://www.itmaranatha.org/jadwal> <http://purl.org/dc/elements/1.1/publisher> “Fakultas IT UKM”` 
    },
    {
      type: 'question',
      title: 'RDF kepanjangan dari...',
      answers: [
        {
          id: 'A',
          label: 'Resource Description Framework'
        },
        {
          id: 'B',
          label: 'Resource Delimited Framework'
        }
      ],
      correctAnswer: 'A'
    }
  ]

  let content = <Material content={data[currentSlide].content} />

  if (data[currentSlide].type == 'question') {
    content = <Question answers={data[currentSlide].answers} />
  }

  let next = <Button title="Lanjut" color={colors.primary} onPress={() => setCurrentSlide(currentSlide + 1)}/>

  if (currentSlide === data.length-1) {
    next = <Button title="Selesai" color={colors.success} onPress={() => navigation.navigate('Selesai')}/>
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <TextBold style={styles.title}>{data[currentSlide].title} </TextBold>
        <TextMedium style={styles.pages}>{`Halaman ${currentSlide + 1} dari ${data.length}`}</TextMedium>
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