import React from 'react';
import CommentInput from './CommentInput'

export default class CommentDisplay extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showEdit: false
		}

		this.handleToggleEdit = this.handleToggleEdit.bind(this);
		this.handleDeleteComment = this.handleDeleteComment.bind(this);
	}

	handleToggleEdit(){
		this.setState({showEdit: !this.state.showEdit});
	}

	handleDeleteComment(){
		this.props.handleDelete("question_comment", "", this.props.comment.id);

	}

	render(){
		let showContent = "";
		let showEditDelete = "";
		if(this.state.showEdit){
			showContent = (
				<div className="comment-row edit-comment">
					<CommentInput 
						handleSubmitComment={this.props.handleSubmitComment} 
						comment={this.props.comment}
						handleToggleEdit = {this.handleToggleEdit}
					/> 
				</div>
				)
		}else{
			showContent = 			
			(
				<div>
					<p>{this.props.comment.body}</p>
					{this.props.currentUser.username === this.props.comment.username &&
						<div className="edit-section">
							<a className="edit-link" onClick={this.handleToggleEdit} >Edit</a>
							<a className="delete-link" onClick={this.handleDeleteComment}> Delete</a>
						</div>
					}
					<div className="comment-author">
						Commented {this.props.comment.created} ago by {this.props.comment.username}
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