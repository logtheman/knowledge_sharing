import React from 'react';


export default class AnswerInput extends React.Component {


	render(){
		console.log(this.props);
		let defaultResponse = "";
		let buttonText = "Submit Answer"
		let styling = "";
		let buttonStyling = "btn btn-default";
		let backButton = "";
		let requestType;
		let answerID = "";
		// editing an existing answer
		if(this.props.answer){
			defaultResponse = this.props.answer.response;
			answerID = this.props.answer.id;
			buttonText = "Edit Answer";
			styling = "edit-answer";
			buttonStyling = "btn btn-success btn-sm";
			backButton = (
			    <button className={buttonStyling} type="submit" onClick={this.props.handleToggleEdit}>Cancel</button>
				)
			requestType = "get";
		}

		return(
		  <div className={styling}>
		    <h4 >Answer</h4>
		    <form className="answer-form"  >
			    <textarea type="text" className="form-control" defaultValue = {defaultResponse}  ref="body"></textarea>
			    <button className={buttonStyling} type="submit" onClick={() => this.props.handleSubmitAnswer(event, this.refs.body.value, answerID, requestType)}>{buttonText}</button>
			    {backButton}
				</form>
		  </div>
		);
	}

}

