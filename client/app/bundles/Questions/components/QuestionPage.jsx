import React from 'react';
import * as api from '../../Utils/utils'
import CommentsList from './CommentsList'
import AnswersList from './AnswersList'
import QuestionDetail from './QuestionDetail'


export default class QuestionPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			question: this.props.question,
			comments: this.props.comments,
			answers: this.props.answers,
			showCommentForm: false,
			showAnswerForm: false,
			currentUser: props.currentUser

		}

		this.handleAddComment = this.handleAddComment.bind(this);
		this.handleSubmitComment = this.handleSubmitComment.bind(this);
		this.handleAddAnswer = this.handleAddAnswer.bind(this);		
		this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
		this.handleVote = this.handleVote.bind(this);
		// this.handleDownvote = this.handleDownvote.bind(this);

	}

	componentDidMount() {
		this.fetchComments();
		this.fetchAnswers();
	  this.interval = setInterval(this.fetchQuestions, 5 * 1000); //update questions
	}

// --------------- Comment Functions -------------------------------  //


	handleAddComment() {
		this.setState({showCommentForm: !this.state.showCommentForm});
	}

	handleSubmitComment(e){
		e.preventDefault();
		const payload = {
		  comment: {
		    body: this.refs.body.value,
		    user_id: this.state.currentUser.id
		  }
		};

		api.post(`/questions/${this.state.question.id}/comments`, payload)
		// api.post(`/comments`, payload)
		  .then(json=>{
		    this.fetchComments();
		 });
		this.refs.body.value = '';
	  this.handleAddComment(); //remove the form on each use
	}

	fetchComments() {
	  api.get(`/questions/${this.state.question.id}`)
	    .then(json=>{
	      this.setState({
	      	comments: json.comments,
	      	question: json.question

	      });
	  });
	}

// --------------- Answer Functions -------------------------------  //

	handleAddAnswer() {
		this.setState({showAnswerForm: !this.state.showAnswerForm});
	}

	fetchAnswers() {
	  api.get(`/questions/${this.state.question.id}`)
	    .then(json=>{
	      this.setState({answers: json.answers});
	  });
	}

	handleSubmitAnswer(e){
		e.preventDefault();
		const payload = {
		  answer: {
		    response: this.refs.response.value,
		    // user_id: this.state.currentUser.id
		  }
		};

		api.post(`/questions/${this.state.question.id}/answers`, payload)
		  .then(json=>{
		    this.fetchAnswers();
		 });
		this.refs.response.value = '';
	  this.handleAddAnswer(); //remove the form on each use
	}

	handleVote(e, answerId, type){
		e.preventDefault();
		const payload = this.state.question;
		api.put(`/questions/${this.state.question.id}/answers/${answerId}/${type}`, payload)
		  .then(json=>{
		    this.fetchAnswers();
		 });
	}


	render(){

		let commentButton = "Comment";
		let commentForm = "";
		if(this.state.showCommentForm){
			commentForm = this.props.currentUser ?
			  <div >
			    <h4 style={{marginTop: '20px'}}>Enter Comment</h4>
			    <form className="comment-form" onSubmit={this.handleSubmitComment} >
				    <input type="text" className="form-control" rows="2" ref="body"></input>
				    <br/>
				    <button className="btn btn-default" type="submit" onClick={this.handleSubmitComment}>Submit</button>
					</form>
			  </div>
			  :
			  <h4 style={{marginTop: '20px'}}>Please login to comment this question </h4>;
		}

		let answerButton = "Answer";
		let answerForm = "";
		if(this.state.showAnswerForm){
			answerForm = this.props.currentUser ?
			  <div >
			    <h4 style={{marginTop: '20px'}}>Enter Answer</h4>
			    <form className="answer-form" onSubmit={this.handleSubmitAnswer} >
				    <textarea type="text" className="form-control" rows="10" ref="response"></textarea>
				    <br/>
				    <button className="btn btn-default" type="submit" onClick={this.handleSubmitAnswer}>Submit Answer</button>
					</form>
			  </div>
			  :
			  <h4 style={{marginTop: '20px'}}>Please login to answer this question </h4>;
		}


		return (
			<div className="questions-page-container">
				<QuestionDetail question={this.state.question} />
      	<button className="btn btn-default btn-sm" onClick={this.handleAddComment}>
	      	{commentButton}
      	</button>
      	<button className="btn btn-default btn-sm" onClick={this.handleAddAnswer}>
	      	{answerButton}
      	</button>
				{commentForm}
				{answerForm}
				<CommentsList 
					comments = {this.state.comments} 
					numComments = {this.state.question.comments_count} 
				/>
				<AnswersList 
					answers={this.state.answers} 
					numAnswers={this.state.question.answers_count} 
					handleVote = {this.handleVote.bind(this)}
				/>
			</div>
		); //end of return
	} // end of render
}