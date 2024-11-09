import React, {useEffect, useState} from 'react'
import List from './Components/List'
import NoteList from './Components/NoteList'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
function App() {
  const [notes, setNotes] = useState([])
  const [isLight, setIsLight] = useState(false);
  useEffect(()=>{
    axios.get('http://localhost:5000/notes/api/read').then((res)=>{
    setNotes(res.data.data)
    }).catch((err)=>{
    })
  },[notes])


  
  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<List notes={notes} isLight={isLight} setIsLight={setIsLight} />} />
        <Route path='/notes/:category' element={<NoteList notes={notes} isLight={isLight} setIsLight={setIsLight} />} />
      </Routes>
    </Router>
    </>
  )
}

export default App