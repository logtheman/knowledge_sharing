import React from 'react';

const QuestionDetail = (props) => {

	return (
		<div>
			<h2>{props.question.title}</h2>
			<p>{props.question.detail}</p>
			</div>
	);
}

export default QuestionDetail;