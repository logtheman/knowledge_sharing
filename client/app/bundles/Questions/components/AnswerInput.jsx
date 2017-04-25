import React from 'react';


export default class AnswerInput extends React.Component {


	render(){
		const defaultResponse = this.props.answer ? this.props.answer.body : "";

		return(
		  <div >
		    <h4 >Answer</h4>
		    <form className="answer-form" onSubmit={() => this.props.handleSubmitAnswer(event, this.refs.body.value)} >
			    <textarea type="text" className="form-control" rows="5" defaultValue = {defaultResponse}  ref="body"></textarea>
			    <br/>
			    <button className="btn btn-default" type="submit" onClick={() => this.props.handleSubmitAnswer(event, this.refs.body.value)}>Submit Answer</button>
				</form>
		  </div>
		);
	}

}

