
import React from 'react';
import QuestionsList from './QuestionsList';

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
	  this.get('/react_index')
	    .then(json=>{
	      this.setState({questions: json.questions});
	    })
	}

	_fetch(url, options) {
	  return fetch(url, options)
	    .then(response=>{
	      return response.json();
	    })
	    .catch(err=>{
	      console.log('There was an error processing your request');
	      console.log(err);
	    });
	}

	get(url, options={}) {

	  const defaultOptions = {
	    headers: {
	      'Accept':       'application/json',
	      'Content-Type': 'application/json'
	    }
	  };

	  return this._fetch(url, Object.assign({}, defaultOptions, options));
	}

	post(url, payload, options) {

	  const defaultOptions = {
	    method: 'POST',
	    body: JSON.stringify(payload),
	    headers: {
	      'X-CSRF-Token':  document.getElementsByName("csrf-token")[0].content,
	      'Accept':       'application/json',
	      'Content-Type': 'application/json'
	    },
	    credentials: 'same-origin'
	  };

	  return this._fetch(url, Object.assign({}, defaultOptions, options));
	}

	handleSubmit() {
	  const payload = {
	    question: {
	      title:       this.refs.title.value,
	      description: this.refs.description.value
	    }
	  };

	  this.post('/questions', payload)
	    .then(json=>{
	      this.fetchQuestions();
	    });

	  this.refs.title.value = '';
	  this.refs.description.value = '';
	}

	handleAddForm() {
		if(!this.state.showForm){
			this.setState({showForm: true});
		}else{
			this.setState({showForm: false});
		}
	}

	render(){

		let questionForm = "";
		let buttonText = "Ask a Question";
		if(this.state.showForm){
			buttonText = "Hide Form";
			questionForm = this.state.currentUser ?
					  <div>
					    <h4 style={{marginTop: '20px'}}>Ask a question</h4>
					      <form>
					        <div className="form-group">
					          <input type="text" className="form-control" placeholder="Title" ref="title"></input>
					        </div>
					        <div className="form-group">
					          <textarea className="form-control" rows="10" placeholder="Description" ref="description"></textarea>
					        </div>
					        <br/>
					        <button className="btn btn-default pull-right" onClick={this.handleSubmit}>Submit</button>
					      </form>
					  </div> // end of if user is signed in
					  :
					  <h4 style={{marginTop: '20px'}}>Please <a href="/users/sign_in" role="button">login</a> to ask a question</h4>;
					  // If user is not signed in
		}
		return (
		  <div>
			  <div className="row">

			  </div>
		    <div className="row">
		      <div className="col-md-9">
		        <QuestionsList questions={this.state.questions} />
		      </div>
		      <div className="col-md-3" style={{marginTop: '40px'}}>
		      	<button className="btn btn-primary btn-lg" onClick={this.handleAddForm}>
			      	{buttonText}
		      	</button>
		      </div>
		      <div className="col-md-3">
		      	{questionForm}
		      </div>
		    </div>
		  </div>
		);
	}	

}

