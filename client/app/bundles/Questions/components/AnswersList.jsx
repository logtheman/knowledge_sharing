import React from 'react';
import Pluralize from 'pluralize';



const AnswersList = (props) => {
	console.log(props);

	let renderAnswers = "";
	if(props.numAnswers > 0){
		const allAnswers = props.answers.map(answer=>{
			return (
				<div key={answer.id} className="answer-row">
					<div className="answer-vote">
						<button type="button" className="btn btn-default btn-sm upvote" onClick={() => {props.handleVote(event, answer.id, "answer", "like")}}>
						  <span className="glyphicon glyphicon-menu-up"></span>
						</button>
						 <div className="answer-count">{answer.cached_votes_score !== 0 ? answer.cached_votes_score : 0}</div>
						<button type="button" className="btn btn-default btn-sm downvote" onClick={()=> {props.handleVote(event, answer.id, "answer", "dislike")}}>
						  <span className="glyphicon glyphicon-menu-down"></span>
						</button>
					</div>
					<div className="answer-body">
						<div className="answer-content">
							<p>{answer.response}</p>
						</div>
						<div className="answer-author">
							Answered {answer.created} ago by {answer.username} 
						</div>
					</div>
				</div>
				);
		});
		renderAnswers = (
			<div className="answers-container">
				<div className="answer-header">
					<h2>{props.numAnswers} {Pluralize('Answer', props.numAnswers)} </h2>
				</div>
				{allAnswers}
			</div>
		);
	}	

	return (
		<div>
			{renderAnswers}
		</div>
	);
}

export default AnswersList;

