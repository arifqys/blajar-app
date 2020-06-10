import React from 'react'
import Card from './Card'
import QuestionAnswer from './QuestionAnswer'

export default props => {
  const answerSelectedHandler = () => {

  }

  return (
    <Card>
      {props.answers.map(answer => 
        <QuestionAnswer key={answer.id}>{answer.label}</QuestionAnswer>
      )}
    </Card>
  )
}