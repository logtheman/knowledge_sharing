import React from 'react';

export default class CommentInput extends React.Component {

	render(){
		let defaultBody = "";
		let buttonText = "Submit Comment"
		let styling = "";
		let buttonStyling = "btn btn-default";
		let backButton = "";
		let requestType;
		let commentID = "";
		let header = (<h4 >Comment</h4>);
		// editing an existing answer
		if(this.props.comment){
			header = "";
			defaultBody = this.props.comment.body;
			commentID = this.props.comment.id;
			buttonText = "Edit Answer";
			styling = "edit-answer";
			buttonStyling = "btn btn-success btn-sm";
			backButton = (
			    <button className={buttonStyling} type="submit" onClick={this.props.handleToggleEdit}>Cancel</button>
				)
			requestType = "put";
		}

		return(
		  <div className={styling}>
		    {header}
		    <form className="comment-form"  >
			    <textarea type="text" className="form-control" defaultValue = {defaultBody}  ref="body"></textarea>
			    <button className={buttonStyling} type="submit" onClick={() => this.props.handleSubmitComment(event, this.refs.body.value, commentID, requestType)}>{buttonText}</button>
			    {backButton}
				</form>
		  </div>
		);
	}

}