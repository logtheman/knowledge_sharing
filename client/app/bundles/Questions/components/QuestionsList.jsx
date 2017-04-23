import React from 'react';
import QuestionsListItem from './QuestionsListItem'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

// Questions List
export default class TopQuestionsList extends React.Component {

  render () {

    const questions = this.props.questions.map(question=>{
      return (
        <li key={question.id} className="question-row " >
         <QuestionsListItem question={question} />
        </li>
      );
    });

    return (
      <div className="question-list">
        <div className="questions-sort-header">
          <h3>
            Questions
          </h3>
          <ul className="nav nav-tabs">
              <li><button className="btn btn-default btn-sm" onClick={() => {this.props.handleSort("?sort_by=date_newest")}}>Recent </button></li>
              <li><button className="btn btn-default btn-sm" onClick={() => {this.props.handleSort("?sort_by=date_oldest")}}>Oldest </button></li>
              <li><button className="btn btn-default btn-sm" onClick={() => {this.props.handleSort("?sort_by=most_answers")}}>Answered </button></li>
              <li><button className="btn btn-default btn-sm" onClick={() => {this.props.handleSort("?sort_by=most_comments")}}>Commented </button></li>
              <li><button className="btn btn-default btn-sm" onClick={() => {this.props.handleSort("?sort_by=most_voted")}}>Voted </button></li>

          </ul>
        </div>
        <ul className="list-unstyled ">
        <CSSTransitionGroup
          transitionName="questionButton"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={300} >
            {questions}
           </CSSTransitionGroup>
        </ul>
      </div>
    );
  }
}