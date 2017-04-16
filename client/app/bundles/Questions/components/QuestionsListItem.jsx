import React from 'react';
import Pluralize from 'pluralize';
import TimeAgo from 'react-timeago'


// Questions List Item
export default class QuestionsListItem extends React.Component {

  render() {

    const question = this.props.question;
    let askBy = "";
    if (question.username) {
      askBy = " by " + question.username;
    }

    return (
      <div>
        <ul className="list-inline text-center" style={{display:'inline-block'}}>
          <li style={{width: '33%'}}><p className="text-center">{question.cached_votes_score}</p>{Pluralize('vote', question.cached_votes_score)}</li>
          <li style={{width: '33%'}}><p className="text-center">{question.answers_count}</p>{Pluralize('answer', question.answers_count)}</li>
          <li style={{width: '33%'}}><p className="text-center">{question.comments_count}</p>{Pluralize('comment', question.comments_count)}</li>
        </ul>
        <div style={{display: 'inline-block', verticalAlign:'top'}}>
          <a href={`/questions/${question.id}`}>{question.title}</a>
        </div>
        <p className="pull-right">asked <TimeAgo date= {question.created_at} /> {askBy}</p>
      </div>
    );
  }
};