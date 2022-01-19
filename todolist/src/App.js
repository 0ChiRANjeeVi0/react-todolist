import React,{useState,useEffect} from 'react';
import{Navbar, Container,InputGroup,FormControl} from "react-bootstrap";
import Todo from './components/Todo.js';
import {getFirestore} from 'firebase/firestore';
import{collection, addDoc, onSnapshot,orderBy} from "firebase/firestore";
import firebaseApp from './firebase.js';


export default function App(){
  const db = getFirestore();
  const [input, setInput] = useState('');
  const[todos, setTodos] = useState([]);
  const addTodo = async() =>{
    try{
      const userRef = collection(db,"todos");
      await addDoc(userRef,{
        todo:input,
        id:todos.length,
      })
    }catch(err){
      console.log(err);
    }
    console.log("data added successfully");
    setInput('');
  }
  useEffect(() =>{
    const getData = async() =>{
      try{
        const userRef = collection(db,"todos") 
        await onSnapshot(userRef,(snapshot) =>{
        setTodos(snapshot.docs.map((doc) =>({id:doc.id,todo:doc.data().todo,idx:doc.data().id})))
      })
      }catch(err){
        console.log(err);
      }
    }
    getData()
},[])
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
                  <button className="btn btn-primary">Sign In</button>
                  <button className="btn btn-primary mx-2">Sign Up</button>
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
              <InputGroup.Text type="submit" className="btn btn-primary" disabled={!input} onClick={addTodo}>Add Todo</InputGroup.Text>
          </InputGroup>
        </Container>
      </section>
      {/*Todos*/}
      <section>
       {
        todos.map((todo) =>(
          <Todo id={todo.id} todo={todo.todo}/>
          ))
       }
      </section>
    </div>
  )
}