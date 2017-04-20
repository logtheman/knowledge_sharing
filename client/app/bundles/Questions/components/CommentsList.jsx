import React from 'react';
import Pluralize from 'pluralize';


const CommentsList = (props) => {

	let renderComments = "";
	if(props.numComments > 0){
		// console.log("should render comments");
		const allComments = 
			props.comments.map(comment=>{
				return(
					<div key={comment.id} className="comment-row">
						{comment.body}

					</div>
				);
			});
	 renderComments = (
				<div className="comments-container">
					<h2>{props.numComments} {Pluralize('Comment', props.numComments)}</h2>
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