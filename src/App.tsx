import React from 'react';
import logo from './logo.svg';
import './App.css';
//import {FirestoreCollection, FirestoreMutation, FirestoreProvider} from '@react-firebase/firestore';
import {FirestoreCollection, FirestoreMutation, FirestoreProvider} from './modules/firestore';

import firebase from 'firebase'
import { RunMutation } from '@react-firebase/firestore/dist/components/FirestoreMutation';
import { FirestoreDocument } from './modules/firestore/components/FirestoreDocument';

const config = {
  apiKey: "AIzaSyB34W9Lik9NP5Vmcm2Ayt8M-wkRya1WBhI",
  authDomain: "book-switch.firebaseapp.com",
  databaseURL: "https://book-switch-default-rtdb.firebaseio.com",
  projectId: "book-switch",
  storageBucket: "book-switch.appspot.com",
  messagingSenderId: "1020655036061",
  appId: "1:1020655036061:web:d316bc5c8ab54c14151674"
}

function App() {
  const [state, setState] = React.useState(0)

  return (
    <div className="App">
      <FirestoreProvider {...config} firebase={firebase}>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={()=>setState(state+1)}>{state}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload. <br/>
          {/* <FirestoreCollection path="/test/" orderBy={[{field: "t", type: "asc"}]}>
            {d => {
              return d.isLoading ? "Loading" : 
             (d.value.map && d.value.map( ({t, value}:{t: {seconds: number, milliseconds: number}, value: any}) => <span>{value} - </span>))
            }}
          </FirestoreCollection> */}
          <FirestoreDocument path="/books/BtL4thhSYtLye4nu08MI">
            {(data) => (
              <span>{data.value.title} - {state}</span>
            )}
          </FirestoreDocument>
        </p>
        <FirestoreMutation path="/test" type="add" dependencies={[state]}>
          {({runMutation}) => (
            <button onClick={ async () => {
              console.log("click")
              let r = await runMutation({
                t: new Date(),
                value: state
              }, {merge: true})
              setState(state => state+1)
              console.log(r)
            }}>add: {state}</button>
          )}
        </FirestoreMutation>
        
      </header>
      </FirestoreProvider>
    </div>
  );
}

export default App;
