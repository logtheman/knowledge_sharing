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
			answers: this.props.answers

		}


		this.handleSubmitComment = this.handleSubmitComment.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
	}

	handleSubmitComment(e){
		e.preventDefault();
		console.log("question id: ", this.state.question.id);
		console.log("body content: ", this.refs.body.value);

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

	}

	fetchComments() {
	  api.get(`/questions/${this.state.question.id}`)
	    .then(json=>{
	      this.setState({comments: json.comments});
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
				<QuestionDetail question={this.state.question} />
				{commentForm}
				<CommentsList comments={this.state.comments} numComments={this.state.question.comments_count} />
				<AnswersList answers={this.state.answers} numAnswers={this.state.question.answers_count} />
			</div>
		); //end of return
	} // end of render
}