import React from 'react';
import * as api from '../../Utils/utils'
import CommentsList from './CommentsList'
import AnswersList from './answersList'



export default class QuestionPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			question: this.props.question,
			comments: this.props.comments,
			answers: this.props.answers

		}


		this.handleSubmit = this.handleSubmitComment.bind(this);
		// this.fetchComments = this.fetchComments.bind(this);
	}

	handleSubmitComment(e){
		e.preventDefault();

	}


	render(){

		const commentForm = this.props.currentUser ?
		  <div >
		    <h4 style={{marginTop: '20px'}}>Enter Comment</h4>
		    <form className="comment-form" onSubmit={this.handleSubmitComment} >
			    <textarea className="form-control" rows="1" ref="body"></textarea>
			    <br/>
			    <button className="btn btn-default" type="submit" onClick={this.handleSubmitComment}>Submit</button>
				</form>
		  </div>
		  :
		  <h4 style={{marginTop: '20px'}}>Please login to comment this question </h4>;



		return (
			<div>
				<h2>{this.state.question.title}</h2>
				<p>{this.state.question.detail}</p>
				<CommentsList comments={this.state.comments} />
				<AnswersList answers={this.state.answers} />
			</div>
		); //end of return
	} // end of render
}