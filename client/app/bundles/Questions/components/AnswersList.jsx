import React from 'react';
import Pluralize from 'pluralize';



const AnswersList = (props) => {

	let renderAnswers = "";
	if(props.numAnswers > 0){

		const allAnswers = props.answers.map(answer=>{
			return (
				<div key={answer.id} className="answer-row">
					<p>{answer.response}</p>
				</div>
				);
		});
		renderAnswers = (
			<div className="answers-container">
				<h2>{props.numAnswers} {Pluralize('Answer', props.numAnswers)} </h2>
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

