import React,{useState,useEffect} from 'react';
import{Navbar, Container,InputGroup,FormControl} from "react-bootstrap";
import Todo from './components/Todo.js';
import {getFirestore} from 'firebase/firestore';
import{collection, addDoc, onSnapshot,orderBy,query,serverTimestamp} from "firebase/firestore";
import firebaseApp from './firebase.js';
import Auth from "./components/Auth.js";


export default function App(){
  const db = getFirestore();
  const [usercollectionref, setUserCollectionRef] = useState("");
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [authState, setAuthState] = useState(false);
  const addUserref = (e) =>{
    setUserCollectionRef(e);
  }
  const setAuthStateTrue = () =>{
    setAuthState(true);
  }
  const setAuthStateFalse = () =>{
    setAuthState(false);
    setTodos([]);
  }
  const addTodo = async() =>{
    if(!usercollectionref){
      alert("login to add");
    }else{
      try{
        const userRef = collection(db,usercollectionref);
        await addDoc(userRef,{
          todo:input,
          timestamp:serverTimestamp(),
      })
      }catch(err){
        console.log(err);
      }
      setInput('');
    }
     
  }
  useEffect(() =>{
    const getData = async() =>{
      try{
        const userRef = collection(db,usercollectionref) 
        const q = query(userRef,orderBy("timestamp"));
        await onSnapshot(q,(snapshot) =>{

        setTodos(snapshot.docs.map((doc) =>({id:doc.id,todo:doc.data().todo})))
      })
      }catch(err){
        console.log(err);
      }
    }
    getData()
},[usercollectionref])
  return(
    <div className="">
    {/*navigation bar */}
      <section>
          <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
              <Navbar.Brand href="#" className="text-white">Todo-List Application</Navbar.Brand>
               <Navbar.Toggle aria-controls="nav-collapse" />
              <Navbar.Collapse id="nav-collapse">
                <div className="ms-auto">
                  <Auth userRef={addUserref} authState={authState} setAuthStateTrue={setAuthStateTrue} setAuthStateFalse={setAuthStateFalse}/>
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      </section>
      {/*input*/}
      <section>
        <Container>
          <InputGroup className="mt-3">
              <FormControl value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter Todo"></FormControl>
              <button type="submit" className="btn btn-primary" disabled={!input} onClick={addTodo}>Add Todo</button>
          </InputGroup>
        </Container>
      </section>
      {/*Todos*/}
      <section>
       {
        todos.map((todo) =>(
          <Todo id={todo.id} todo={todo.todo} userRef={usercollectionref}/>
          ))
       }
      </section>
    </div>
  )
}