import React from 'react';
import Pluralize from 'pluralize';
import AnswerDisplay from './AnswerDisplay'


const AnswersList = (props) => {

	let renderAnswers = "";
	if(props.numAnswers > 0){
		const allAnswers = props.answers.map(answer=>{	
			console.log("Username in in answerList: ", answer.username);

				return (
					<div key={answer.id}>
						<AnswerDisplay 
							handleSubmitAnswer={props.handleSubmitAnswer} 
							answer = {answer}
							username = {answer.username}
							handleAddAnswer = {props.handleAddAnswer}
							currentUser = {props.currentUser}
							handleDelete = {props.handleDelete}
						/>
					</div>
				); // end of return statement
			}
		);// end of Map function
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

