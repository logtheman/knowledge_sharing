import React from 'react';

export default class QuestionInput extends React.Component{


	render(){
		console.log("QuestionInput Question info: ", this.props.question);
		const defaultTitle = this.props.question ? this.props.question.title : "";
		const defaultDetail = this.props.question? this.props.question.detail : "";

		return(
			<div>
			  <h4>Ask a question</h4>
			    <form onSubmit={() => this.props.handleSubmit(event, this.refs.title.value, this.refs.detail.value)}>
			      <div className="form-group">
			        <input type="text" className="form-control"  defaultValue = {defaultTitle} placeholder="Title" ref="title"></input>
			      </div>
			      <div className="form-group">
			        <textarea className="form-control" rows="5" defaultValue = {defaultDetail} placeholder="Description" ref="detail"></textarea>
			      </div>
			      <br/>
			      <button className="btn btn-default pull-right" type="submit">Submit</button>
			    </form>
			</div> // end of if user is signed in

		) // end of return 
	} // end of render
}

