import React from 'react';

const QuestionDetail = (props) => {

	return (
		<div className="question-row">
			<div className="question-vote">
				<button type="button" className="btn btn-default btn-sm upvote" onClick={() => {props.handleVote(event, props.question.id, "question", "like")}}>
				  <span className="glyphicon glyphicon-menu-up"></span>
				</button>
				 <div className="question-count">{props.question.cached_votes_score !== 0 ? props.question.cached_votes_score : 0}</div>
				<button type="button" className="btn btn-default btn-sm downvote" onClick={()=> {props.handleVote(event, props.question.id, "question", "dislike")}}>
				  <span className="glyphicon glyphicon-menu-down"></span>
				</button>
			</div>


			<div className="question-detail">
				<h2>{props.question.title}</h2>
				<p>{props.question.detail}</p>
			</div>
		</div>
	);
}

export default QuestionDetail;