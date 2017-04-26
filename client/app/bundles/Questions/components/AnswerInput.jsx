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
		// editing an existing answer
		if(this.props.answer){
			defaultResponse = this.props.answer.response;
			buttonText = "Edit Answer";
			styling = "edit-answer";
			buttonStyling = "btn btn-primary btn-sm";
			backButton = (
			    <button className={buttonStyling} type="submit" onClick={() => this.props.handleAddAnswer(event)}>Cancel</button>
				)
			requestType = "get";
		}

		return(
		  <div className={styling}>
		    <h4 >Answer</h4>
		    <form className="answer-form" onSubmit={() => this.props.handleSubmitAnswer(event, this.refs.body.value, requestType)} >
			    <textarea type="text" className="form-control" defaultValue = {defaultResponse}  ref="body"></textarea>
			    <button className={buttonStyling} type="submit" onClick={() => this.props.handleSubmitAnswer(event, this.refs.body.value, requestType)}>{buttonText}</button>
			    {backButton}
				</form>
		  </div>
		);
	}

}

