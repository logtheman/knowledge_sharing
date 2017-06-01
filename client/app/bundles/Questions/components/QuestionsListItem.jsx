import React from 'react';
import Pluralize from 'pluralize';
import TimeAgo from 'react-timeago'
import * as api from '../../Utils/utils'


// Questions List Item
export default class QuestionsListItem extends React.Component {

  render() {

    const question = this.props.question;
    let askBy = "by anonymously";
    if (question.username) {
      askBy = " by " + question.username;
    }

    return (
      <div className="question-row border">
        <ul className="list-inline text-center question-stat">
          <li><p className="text-center">{question.cached_votes_score}</p>
            <span>{Pluralize('vote', question.cached_votes_score)}</span>
          </li>
          <li><p className="text-center">{question.answers_count}</p>
            <span>{Pluralize('answer', question.answers_count)}</span>
          </li>
          <li><p className="text-center">{question.comments_count}</p>
            <span>{Pluralize('comment', question.comments_count)}</span>
          </li>
          <li><p className="text-center">{question.views_count}</p>
            <span>{Pluralize('view', question.views_count)}</span>
          </li>
        </ul>
        <div className="question-content">
          <a href={`/questionpage/${question.id}`}>{question.title}</a>
          <p>{api.truncate(question.detail, 80)}</p>
          <ul className="list-inline">
            <li className="list-inline-item tag-item"> <a href='#'>tag1</a> </li>
            <li className="list-inline-item tag-item"> <a href='#'>tag2</a> </li>
            <li className="list-inline-item tag-item"> <a href='#'>tag3</a> </li>
            <li className="list-inline-item tag-item"> <a href='#'>tag4</a> </li>


          </ul>
        </div>
        <p className="question-author">asked {question.created} {askBy}</p>
      </div>
    );
  }
};