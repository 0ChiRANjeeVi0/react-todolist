import React,{useState} from 'react';
import {Card,Modal,Button,FormControl} from 'react-bootstrap';
import firebaseApp from '../firebase';
import {deleteDoc, doc,setDoc,getFirestore,serverTimestamp} from 'firebase/firestore';

export default function Todo(props){
const db = getFirestore();
const[show, setShow] = useState(false);
const[input, setInput] = useState('');
const handleClose =() => setShow(false);
const handleOpen = () =>setShow(true);

const deleteTodo = async() =>{
	try{
		const docRef = doc(db,props.userRef,props.id)
		await deleteDoc(docRef);
	}catch(err){
		console.log(err);
	}

}
const updateData = async() =>{
	try{
		const docRef = doc(db,props.userRef,props.id);
		await setDoc(docRef,{
			todo:input,
			
		},{merge:true})
	}catch(err){
		console.log(err);
	}
	handleClose();
	setInput('');
}
	return(
		<div className="container">
			<Card className="mt-3 border-secondary">
				<div className="d-flex align-items-center">
					<Card.Body className="">
						<h5 onClick={handleOpen}>{props.todo}</h5>
					</Card.Body>	
					<div className="ms-auto">
						<button onClick={deleteTodo} className="btn btn-primary mx-2">Delete</button>
					</div>
				</div>
			</Card>
			<Modal show={show} onHide={handleClose}>
		        <Modal.Header closeButton>
		          <Modal.Title>Enter Todo</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	<FormControl value={input} onChange={(e) => setInput(e.target.value)} placeholder={props.todo}></FormControl>
			        	<Button onClick={updateData} varient="primary" className="btn mt-2">Update Todo</Button>
			        </Modal.Body>
		    </Modal>
		</div>
	)
}