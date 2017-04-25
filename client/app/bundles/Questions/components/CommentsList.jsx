import React from 'react';
import Pluralize from 'pluralize';


const CommentsList = (props) => {

	let renderComments = "";
	if(props.numComments > 0){
		const allComments = 
			props.comments.map(comment=>{
				return(
					<div key={comment.id} className="comment-row">
						<p>{comment.body}</p>
						{props.currentUser.username === comment.username &&
							<div className="edit-section">
								<a className="edit-link" onClick="" >Edit</a>
								<a className="delete-link" onClick={() => props.handleDelete("question_comment", comment.id)}> Delete</a>
							</div>
						}
						<div className="comment-author">
							Commented {comment.created} ago by {comment.username}
						</div>
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