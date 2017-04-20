import React from 'react';

const CommentsList = (props) => {
	const renderComments = props.comments.map(comment=>{
		return(
			<div key={comment.id} className="comment-row">
				{comment.body}

			</div>
		);
	});
	return (
		<div className="comments-container">
			<h2>Comments</h2>
			{renderComments}

		</div>
	)
}

export default CommentsList;