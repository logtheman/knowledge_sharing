import React from 'react';
import Pluralize from 'pluralize';
import CommentDisplay from './CommentDisplay'


const CommentsList = (props) => {

	let renderComments = "";
	if(props.numComments > 0){
		const allComments = 
			props.comments.map(comment=>{
				return(
					<div key={comment.id} className="comment-row">
						<CommentDisplay 
							handleSubmitComment={props.handleSubmitComment} 
							comment = {comment}
							username = {comment.username}
							currentUser = {props.currentUser}
							handleDelete = {props.handleDelete}
						/>
					</div>
				);
			});
	 renderComments = (
				<div className="comments-container">
					<div className="comment-header">
						<h2>{props.numComments} {Pluralize('Comment', props.numComments)}</h2>
					</div>
					{allComments}
				</div>
				);
	}
	return (
		<div >
			{renderComments}

		</div>
	)
}

export default CommentsList;