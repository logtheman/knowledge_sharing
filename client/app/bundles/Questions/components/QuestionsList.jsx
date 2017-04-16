import React from 'react';
import QuestionsListItem from './QuestionsListItem'


// Questions List
export default class TopQuestionsList extends React.Component {

  render () {

    const questions = this.props.questions.map(question=>{
      return (
        <li key={question.id} style={{borderBottom: '1px solid #CCC', paddingBottom: '10px', paddingTop: '20px'}}>
         <QuestionsListItem question={question} />
        </li>
      );
    });

    return (
      <div>
        <h3 style={{borderBottom: '1px solid #CCC', paddingBottom: '20px', marginBottom:'0px'}}>
          Questions
        </h3>
        <ul className="list-unstyled">

            {questions}

        </ul>
      </div>
    );
  }
}