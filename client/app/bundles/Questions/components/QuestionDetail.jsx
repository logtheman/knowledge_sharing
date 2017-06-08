import React from 'react';
import QuestionInput from './QuestionInput';
import * as api from '../../Utils/utils'



const QuestionDetail = (props) => {
	let showContent = "";
	let showEditDelete = "";
	if(props.editQuestion){
		showContent = <QuestionInput handleSubmit={props.handleSubmitQuestion} question={props.question}/> 
	}else{
		const tags = props.question.tag_list ? 
		  props.question.tag_list.map((tag, i) => {
		    console.log("tag:", tag);
		    return (
		      <li key={i} className="list-inline-item tag-item">
		        <a href="#">{tag}</a>
		      </li>
		    );
		 }) : "";
		showContent = 			
		(
				<div>
					<h2>{props.question.title}</h2>
					<ul className="list-inline">
						{tags}
					</ul>
					{api.HtmlConverterComponent(props.question.detail)}
				</div>

		)
		if(props.currentUser.username === props.question.username){
			showEditDelete = (
				<div className="edit-section">
					<a className="edit-link" onClick={props.handleShowEditForm} >Edit</a>
					<a className="delete-link" onClick={() => props.handleDelete("question")}> Delete</a>
				</div>
			)
		}
	}

	return (
		<div className="question-row">
			<div className="question-vote">
				<button type="button" className="btn btn-default btn-sm upvote" onClick={() => {props.handleVote(event, props.question.id, "question", "like")}}>
				  <span className="glyphicon glyphicon-menu-up"></span>
				</button>
				 <div className="question-count">{props.question.cached_votes_score !== 0 ? props.question.cached_votes_score : 0}</div>
				<button type="button" className="btn btn-default btn-sm downvote" onClick={()=> {props.handleVote(event, props.question.id, "question", "dislike")}}>
				  <span className="glyphicon glyphicon-menu-down"></span>
				</button>
			</div>


			<div className="question-detail">
				{showContent}
				{showEditDelete}
			</div>
		</div>
	);
}

export default QuestionDetail;