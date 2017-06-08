
import React from 'react';
import QuestionsList from './QuestionsList';
import QuestionInput from './QuestionInput';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import * as api from '../../Utils/utils'

export default class QuestionsIndex extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
			questions: this.props.questions,
			questionInput: {
				title: "",
				body: ""
			},
			showForm: false,
			currentSort: ""
		}
		this.fetchQuestions = this.fetchQuestions.bind(this);
		this.handleSubmitQuestion   = this.handleSubmitQuestion.bind(this);
		this.handleAddForm   = this.handleAddForm.bind(this);
		this.handleSort = this.handleSort.bind(this);

	}
	
	componentWillMount() {
		this.fetchQuestions();

	}

	componentDidMount() {
	  // this.interval = setInterval(this.fetchQuestions, 5 * 1000); //update questions
	}

	componentWillUnmount() {
	  // clearInterval(this.interval);
	}

	handleSort(sortPath, currentSort){
		this.state.currentSort = currentSort;
		this.fetchQuestions(sortPath);

	}

	fetchQuestions(sortPath="") {
	  api.get(`/react_index${sortPath}`)
	    .then(json=>{
	      this.setState({questions: json.questions});
	    })
	}

	handleSubmitQuestion(e, title, detail="", tag_list, type) {
		e.preventDefault();
	  const payload = {
	    question: {
	      title:  title,
	      detail: detail,
	      tag_list: tag_list
	    }
	  };
	  
	  api.post('/questions', payload)
	    .then(json=>{
	      this.fetchQuestions();
	  }); 	

	  this.handleAddForm(); //remove the form on each use
	}

	handleAddForm() {
		this.setState({showForm: !this.state.showForm});
	}


	onComment(description) {
	  const payload = {
	    comment: {
	      question_id: this.state.question.id,
	      body: body
	    }
	  };

	  post('/answers', payload)
	    .then(json=>{
	      this.fetchAnswers();
	    });
	}

	render(){

		let questionForm = "";
		let buttonText = "Ask a Question";
		if(this.state.showForm){
			buttonText = "Hide Form";
			questionForm = this.state.currentUser ?
					  <QuestionInput handleSubmit={this.handleSubmitQuestion} /> 
					  :
					  <h4>Please <a href="/users/sign_in" role="button">login</a> to ask a question</h4>;// If user is not signed in
		}
		return (
		  <div>
		    <div className="row">
		      <div className="col-md-9 question-container">
		        <QuestionsList 
		        	questions={this.state.questions} 
		        	handleSort={this.handleSort} 
		        	currentSort={this.state.currentSort}
		        />
		      </div>
		      <div className="col-md-3" style={{marginTop: '40px'}}>
		      	<button className="btn btn-primary btn-lg" onClick={this.handleAddForm}>
			      	{buttonText}
		      	</button>
		      </div>
		      <div className="col-md-3">
		       <CSSTransitionGroup
		         transitionName="questionButton"
		         transitionEnterTimeout={1000}
		         transitionLeaveTimeout={300} >
		       	{questionForm}
		      	</CSSTransitionGroup>
		      </div>
		    </div>
		  </div>
		);
	}	

}

