
import React from 'react';
import * as api from '../../Utils/utils'


export default class QuestionInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			suggestions: '',
		}
		this.handleTagging = this.handleTagging.bind(this);
	}

	handleTagging(e){
		e.preventDefault();
		this.setState({suggestions: api.displayMatches(e.target.value)});
	}

	render(){
		const defaultTitle = this.props.question ? this.props.question.title : "";
		const defaultDetail = this.props.question? this.props.question.detail : "";
		const defaultTags = this.props.question? this.props.question.tag_list : "";


		return(
			<div>
			  <h4>Ask a question</h4>
			    <form onSubmit={() => this.props.handleSubmit(event, this.refs.title.value, this.refs.detail.value, this.refs.tag_list.value)}>
			      <div className="form-group">
			        <input type="text" className="form-control"  defaultValue = {defaultTitle} placeholder="Title" ref="title"></input>
			      </div>
			      <div className="form-group">
			        <textarea className="form-control" rows="5" defaultValue = {defaultDetail} placeholder="Description" ref="detail"></textarea>
			      </div>
			      <div className="form-group">
			        <input type="text" className="form-control tagging" defaultValue = {defaultTags} placeholder="Add tags" ref="tag_list" />
			      </div>
			      <button className="btn btn-default pull-right" type="submit">Submit</button>
			    </form>
			</div> // end of if user is signed in

		) // end of return 
	} // end of render
}


// <input type="text" className="form-control tagging" onChange={this.handleTagging} placeholder="Add tags" />
// <div className="">{this.state.suggestions}</div>
