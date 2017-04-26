import React from 'react';
import * as api from '../../Utils/utils'
import CommentsList from './CommentsList'
import AnswersList from './AnswersList'
import AnswerInput from './AnswerInput'
import QuestionDetail from './QuestionDetail'

const AddQuestionAnswerForm = -1;
const NoAnswerForm = -2;


export default class QuestionPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			question: this.props.question,
			comments: this.props.comments,
			answers: this.props.answers,
			showCommentForm: false,
			showAnswerFormID: NoAnswerForm,
			editQuestion: false,
			currentUser: props.currentUser,

		}

		this.handleAddComment = this.handleAddComment.bind(this);
		this.handleSubmitComment = this.handleSubmitComment.bind(this);
		this.handleAddAnswer = this.handleAddAnswer.bind(this);		
		this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
		this.fetch = this.fetch.bind(this);
		this.handleVote = this.handleVote.bind(this);
		this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
		this.handleShowEditForm = this.handleShowEditForm.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.fetch();
	  // this.interval = setInterval(this.fetchQuestions, 5 * 1000); //update questions
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
		  }
		};

		api.post(`/questions/${this.state.question.id}/comments`, payload)
		  .then(json=>{
		    this.fetch();
		 });
		this.refs.body.value = '';
	  this.handleAddComment(); //remove the form on each use
	}

	fetch() {
	  api.get(`/questions/${this.state.question.id}`)
	    .then(json=>{
	      this.setState({
	      	comments: json.comments,
	      	answers: json.answers,
	      	question: json.question

	      });
	  });
	}

// --------------- Answer Functions -------------------------------  //

	handleAddAnswer(e, idNum=NoAnswerForm) {
		if(idNum === this.state.showAnswerFormID){
			this.setState({showAnswerFormID: NoAnswerForm});
		}else{
			this.setState({showAnswerFormID: idNum});
		}
		
	}

	handleSubmitAnswer(e, body, type){
		e.preventDefault();
		const payload = {
		  answer: {
		    response: body,
		  }
		};
		if(type === "get"){ // if editing
			api.put(`/questions/${this.state.question.id}/answers/${this.state.showAnswerFormID}/edit`,"", payload)
			  .then(json=>{
			    this.fetch();
			 });
		}else{ //if new answer
			api.post(`/questions/${this.state.question.id}/answers`, payload)
			  .then(json=>{
			    this.fetch();
			 });
		}
	  this.handleAddAnswer(); //remove the form on each use
	}

	handleVote(e, answerId, type, voteType){
		e.preventDefault();
		const payload = this.state.question;
		let url = "";
		switch(type){
			case "answer":
				url = `/questions/${this.state.question.id}/answers/${answerId}/${voteType}`;
				break;
			case "question":
				url = `/questions/${this.state.question.id}/${voteType}`;
				break;
			default:
				url = "";
		}

		api.put(url, payload)
		  .then(json=>{
		    this.fetch();
		 });
	}

		/* ----------------- Functions for editing and deleting question--------------------------------- */
		handleShowEditForm(){
			this.setState({editQuestion: !this.state.editQuestion});
		}

		handleSubmitQuestion(e, title, detail="", type) {
			e.preventDefault();
		  const payload = {
		    question: {
		      title:  title,
		      detail: detail
		    }
		  };
		  api.put(`/questionspage/${this.state.question.id}/edit`, "", payload)
		    .then(json=>{
		      this.fetch();
		  }); 	

		  this.handleShowEditForm(); //remove the form on each use
		}

		handleDelete(type, answerID="", commentID=""){
			let URL = "";
			switch(type){
				case "question":
					URL = `/questionspage/${this.state.question.id}`;
					break;
				case "answer":
					URL = `/questions/${this.state.question.id}/answers/${answerID}`;
					break;
				case "question_comment":
					URL = `/questions/${this.state.question.id}/comments/${commentID}`
				default:
					return;
			} // end of switch

			api.deleteRequest(URL, "", this.state.question)
			  .then(json=>{
			  	if(type === "question"){
			  		window.location = "http://localhost:3000/"; //TODO - Need to implement routers
			  	}else{
			  		this.fetch();
			  	}
			  }
			);
		}

	render(){

		/* ------------------- Comment and Answer forms ------------------------------- */

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

		let answerForm = "";
		if(this.state.showAnswerFormID === AddQuestionAnswerForm){
			answerForm = this.props.currentUser ?
				<AnswerInput handleSubmitAnswer={this.handleSubmitAnswer} />
			  :
			  <h4 style={{marginTop: '20px'}}>Please login to answer this question </h4>;
		}

		// let answerForm = "";
		// if(this.state.showAnswerForm){
		// 	answerForm = this.props.currentUser ?
		// 	  <div >
		// 	    <h4 style={{marginTop: '20px'}}>Enter Answer</h4>
		// 	    <form className="answer-form" onSubmit={this.handleSubmitAnswer} >
		// 		    <textarea type="text" className="form-control" rows="10" ref="response"></textarea>
		// 		    <br/>
		// 		    <button className="btn btn-default" type="submit" onClick={this.handleSubmitAnswer}>Submit Answer</button>
		// 			</form>
		// 	  </div>
		// 	  :
		// 	  <h4 style={{marginTop: '20px'}}>Please login to answer this question </h4>;
		// }

		/* ----------------- Return for Render function --------------------------------- */

		return (
			<div className="questions-page-container">
				<div className="question-container">
					<QuestionDetail 
						question={this.state.question} 
						handleVote = {this.handleVote.bind(this)}
						editQuestion = {this.state.editQuestion}
						handleShowEditForm = {this.handleShowEditForm}
						handleSubmitQuestion = {this.handleSubmitQuestion}
						currentUser = {this.state.currentUser}
						handleDelete = {this.handleDelete}
					/>
					
					<div className="question-buttons">
		      	<button className="btn btn-default btn-sm" onClick={this.handleAddComment}>
			      	Comment
			      	<span className="badge"> {this.state.question.comments_count} </span>
		      	</button>
		      	<button className="btn btn-default btn-sm" onClick={() => this.handleAddAnswer(event, AddQuestionAnswerForm)}>
			      	Answer
			      	<span className="badge"> {this.state.question.answers_count} </span>
		      	</button>
	      	</div>
	      </div>
				{commentForm}
				{answerForm}

				<CommentsList 
					comments = {this.state.comments} 
					numComments = {this.state.question.comments_count} 
					currentUser = {this.state.currentUser}
					handleDelete = {this.handleDelete}
				/>
				<AnswersList 
					answers={this.state.answers} 
					numAnswers={this.state.question.answers_count} 
					handleVote = {this.handleVote.bind(this)}
					currentUser = {this.state.currentUser}
					handleDelete = {this.handleDelete}
					handleAddAnswer = {this.handleAddAnswer}
					editAnswerID = {this.state.showAnswerFormID}
					handleSubmitAnswer = {this.handleSubmitAnswer}

				/>
			</div>
		); //end of return
	} // end of render
}