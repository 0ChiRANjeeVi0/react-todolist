import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';


const firebaseApp = initializeApp({
  
})

const db = getFirestore();
export default db;