import React from 'react';
import AnswerInput from './AnswerInput'
import * as api from '../../Utils/utils'



export default class AnswerDisplay extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showEdit: false
		}

		this.handleToggleEdit = this.handleToggleEdit.bind(this);
	}

	handleToggleEdit(){
		this.setState({showEdit: !this.state.showEdit});
	}

	render(){
		let showContent = "";
		let showEditDelete = "";
		if(this.state.showEdit){
			showContent = (
				<div className="answer-row edit-answer">
					<AnswerInput 
						handleSubmitAnswer={this.props.handleSubmitAnswer} 
						answer={this.props.answer}
						handleToggleEdit = {this.handleToggleEdit}
					/> 
				</div>
				)
			}else{
				showContent = 			
				(
					<div className="answer-row">
						<div className="answer-vote">
							<button type="button" className="btn btn-default btn-sm upvote" onClick={() => {this.props.handleVote(event, this.props.answer.id, "answer", "like")}}>
							  <span className="glyphicon glyphicon-menu-up"></span>
							</button>
							 <div className="answer-count">{this.props.answer.cached_votes_score !== 0 ? this.props.answer.cached_votes_score : 0}</div>
							<button type="button" className="btn btn-default btn-sm downvote" onClick={()=> {this.props.handleVote(event, this.props.answer.id, "answer", "dislike")}}>
							  <span className="glyphicon glyphicon-menu-down"></span>
							</button>
						</div>
						<div className="answer-body">
								<div className="answer-content">
									<div>{api.HtmlConverterComponent(this.props.answer.response)}</div>
									{this.props.currentUser.username === this.props.answer.username &&
										<div className="edit-section">
											<a className="edit-link" onClick={this.handleToggleEdit} >Edit</a>
											<a className="delete-link" onClick={() => this.props.handleDelete("answer", this.props.answer.id)}> Delete</a>
										</div>
									}
								</div>
								<div className="answer-author">
									Answered {this.props.answer.created} ago by {this.props.answer.username} 
								</div>
							</div>
						</div>
					)
			}


		return(
			<div>
				{showContent}
			</div>

		);
	}
}