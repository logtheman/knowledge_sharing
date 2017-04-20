
import React from 'react';
import QuestionsList from './QuestionsList';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import * as api from '../../Utils/utils'

export default class QuestionsIndex extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
			questions: this.props.questions,
			showForm: false
		}
		this.fetchQuestions = this.fetchQuestions.bind(this);
		this.handleSubmit   = this.handleSubmit.bind(this);
		this.handleAddForm   = this.handleAddForm.bind(this);

	}

	componentDidMount() {
	  this.interval = setInterval(this.fetchQuestions, 5 * 1000); //update questions
	}

	componentWillUnmount() {
	  clearInterval(this.interval);
	}

	fetchQuestions() {
	  api.get('/react_index')
	    .then(json=>{
	      this.setState({questions: json.questions});
	    })
	}

	handleSubmit(e) {
		e.preventDefault();
	  const payload = {
	    question: {
	      title:       this.refs.title.value,
	      detail: this.refs.detail.value
	    }
	  };

	  api.post('/questions', payload)
	    .then(json=>{
	      this.fetchQuestions();
	    });

	  this.refs.title.value = '';
	  this.refs.detail.value = '';
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
					  <div>
					    <h4 style={{marginTop: '20px'}}>Ask a question</h4>
					      <form onSubmit={this.handleSubmit}>
					        <div className="form-group">
					          <input type="text" className="form-control" placeholder="Title" ref="title"></input>
					        </div>
					        <div className="form-group">
					          <textarea className="form-control" rows="10" placeholder="Description" ref="detail"></textarea>
					        </div>
					        <br/>
					        <button className="btn btn-default pull-right" type="submit">Submit</button>
					      </form>
					  </div> // end of if user is signed in
					  :
					  <h4 style={{marginTop: '20px'}}>Please <a href="/users/sign_in" role="button">login</a> to ask a question</h4>;
					  // If user is not signed in
		}
		return (
		  <div>
		    <div className="row">
		      <div className="col-md-9 question-container">
		        <QuestionsList questions={this.state.questions} />
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

