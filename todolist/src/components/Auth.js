import React,{useState} from 'react';
import {Modal,Form} from 'react-bootstrap';
import {firebaseApp} from "../firebase.js";
import {getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut} from 'firebase/auth';

export default function Auth(props){
const auth = getAuth();
const [signin, setSignin] = useState(false);
const [signup, setSignup] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const createUser = async() =>{
	try{
		const user = await createUserWithEmailAndPassword(auth,email,password)
		.then((userDetails) =>{
			props.setAuthStateTrue();
			props.userRef(userDetails.user.uid);
		})
	}catch(err){
		console.log(err);
	}
	setEmail('');
	setPassword('');
	setSignup(false);

}
const login = async() =>{
	try{
		await signInWithEmailAndPassword(auth,email,password)
		.then((userDetails) =>{
		props.userRef(userDetails.user.uid);
		props.setAuthStateTrue();
		setSignin(false);
	})
	}catch(err){
		console.log(err);
	}
}
const logout = async() => {
	await signOut(auth)
	props.setAuthStateFalse();
	props.userRef("");
}
	if(!props.authState){
		return(
		<div className="">
			<Modal size="md" centered show={signup}>
				<Modal.Header>
					<Modal.Title>Sign Up</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Label>Enter Email Address</Form.Label>
						<Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
						<Form.Label>Enter Password</Form.Label>
						<Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
					</Form>
					<button onClick={createUser} className="mt-2 btn btn-primary">Sign Up</button>
					<button onClick={(e) => setSignup(false)} className="mt-2 mx-2 btn btn-danger">Close</button>
				</Modal.Body>
				
			</Modal>
			<Modal size="md" centered show={signin}>
				<Modal.Header>
					<Modal.Title>Sign In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Label>Enter Email Address</Form.Label>
						<Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
						<Form.Label>Enter Password</Form.Label>
						<Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
					</Form>
					<button onClick={login} className="mt-2 btn btn-primary">Sign In</button>
					<button onClick={(e) => setSignin(false)} className="mt-2 mx-2 btn btn-danger">Close</button>
				</Modal.Body>
				
			</Modal>
			<button onClick={(e) => setSignin(true)} className="btn btn-primary">Sign In</button>
            <button onClick={(e) => setSignup(true)} className="btn btn-primary mx-2">Sign Up</button>
		</div>
	)
	}else{
		return(
		<div className="">
			<button onClick={logout} className="btn btn-primary">Logout</button>
		</div>
		)
	}
}
