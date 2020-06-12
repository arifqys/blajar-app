import React from 'react'
import Card from './Card'
import QuestionAnswer from './QuestionAnswer'

export default props => {
  return (
    <Card>
      {props.answers.map(answer => 
        <QuestionAnswer key={answer.id} code={answer.id} clicked={props.clicked}>{answer.label}</QuestionAnswer>
      )}
    </Card>
  )
}