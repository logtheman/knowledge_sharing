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
			showAnswerForm: false

		}

		this.handleAddComment = this.handleAddComment.bind(this);
		this.handleSubmitComment = this.handleSubmitComment.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
	}

	handleSubmitComment(e){
		e.preventDefault();
		const payload = {
		  comment: {
		    question_id: this.state.question.id,
		    body: this.refs.body.value
		  }
		};

		api.post(`/questions/${this.state.question.id}/comments`, payload)
		  .then(json=>{
		    this.fetchComments();
		 });
		this.refs.body.value = '';
	  this.handleAddComment(); //remove the form on each use
	}

	fetchAnswers() {
	  api.get(`/questions/${this.state.question.id}`)
	    .then(json=>{
	      this.setState({answers: json.answers});
	  });
	}

	handleAddComment() {
		this.setState({showCommentForm: !this.state.showCommentForm});
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

	onComment(description) {
	  const payload = {
	    answer: {
	      question_id: this.state.question.id,
	      body: body
	    }
	  };

	  api.post('/comments', payload)
	    .then(json=>{
	      this.fetchComments();
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


		return (
			<div>
				<QuestionDetail question={this.state.question} />
      	<button className="btn btn-default btn-sm" onClick={this.handleAddComment}>
	      	{commentButton}
      	</button>
				{commentForm}
				<CommentsList comments={this.state.comments} numComments={this.state.question.comments_count} />
				<AnswersList answers={this.state.answers} numAnswers={this.state.question.answers_count} />
			</div>
		); //end of return
	} // end of render
}