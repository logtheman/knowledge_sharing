import React from 'react'


const AnswersList = (props) => {

	const renderAnswers = props.answers.map(answer=>{
		return (
			<div key={answer.id} className="answer-row">
				<p>{answer.response}</p>
			</div>
			);
	});

	return (
		<div className="answers-container">
			<h2>Answers</h2>
			{renderAnswers}
		</div>
	);
}

export default AnswersList;

