import React from 'react';
import {Card} from 'react-bootstrap';
import db from '../firebase';
import {deleteDoc, doc} from 'firebase/firestore';
export default function Todo(props){

const deleteTodo = async() =>{
	try{
		await deleteDoc(doc(db,"todos",props.id))
	}catch(err){
		console.log(err);
	}

}
	return(
		<div className="container">
			<Card className="mt-3 border-secondary">
				<div className="d-flex align-items-center">
					<Card.Body className="">
						<h5>{props.todo}</h5>
					</Card.Body>	
					<div className="ms-auto">
						<button onClick={deleteTodo} className="btn btn-primary mx-2">Delete</button>
					</div>
				</div>
			</Card>
		</div>
	)
}