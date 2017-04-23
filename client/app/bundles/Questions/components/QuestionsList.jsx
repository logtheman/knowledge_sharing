import React from 'react';
import QuestionsListItem from './QuestionsListItem'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

// Questions List
export default class TopQuestionsList extends React.Component {
  handleActiveClass(currentButton){
    let classString = "btn btn-default btn-sm";
    if(currentButton === this.props.currentSort){
      classString += " active";
    }
    return classString;
  }

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
              <li><button className={this.handleActiveClass("recent")} onClick={() => {this.props.handleSort("?sort_by=date_newest", "recent")}}>Recent </button></li>
              <li><button className={this.handleActiveClass("oldest")} onClick={() => {this.props.handleSort("?sort_by=date_oldest", "oldest")}}>Oldest </button></li>
              <li><button className={this.handleActiveClass("answered")} onClick={() => {this.props.handleSort("?sort_by=most_answers", "answered")}}>Answered </button></li>
              <li><button className={this.handleActiveClass("commented")} onClick={() => {this.props.handleSort("?sort_by=most_comments", "commented")}}>Commented </button></li>
              <li><button className={this.handleActiveClass("voted")} onClick={() => {this.props.handleSort("?sort_by=most_voted", "voted")}}>Voted </button></li>

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