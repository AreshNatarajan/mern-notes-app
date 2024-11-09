import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'
// import {Fa} from 'react-icons'
import { FaRegTrashAlt, FaArrowCircleLeft } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { Link } from 'react-router-dom';

function NoteList({ notes, isLight }) {
  useEffect(() => {

  }, [])
  const { category } = useParams();
  const filterNotes = notes.filter(item => category === item.category)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('')
  const [categoryValue, setCategoryValue] = useState('')
  const [isNewDivOpened, setIsNewDivOpened] = useState(false)
  const [msg, setMsg] = useState('')
  const [isMsg, setIsMsg] = useState(false)

  // const [isUpdate, setIsUpdate] = useState(false)
  const [isUpdateForm, setIsUpdateForm] = useState(false)
  //ref
  const titleRef = useRef()
  const handleOpenNewDiv = () => {
    setTitle('')
    setContent('')
    setCategoryValue('')
    setIsNewDivOpened(true)
    // setIsUpdate(false)
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSaveData = () => {
    const r = Math.floor(Math.random() * 255); // Red (0-127)
    const g = Math.floor(Math.random() * 255); // Green (0-127)
    const b = Math.floor(Math.random() * 255); // Blue (0-127)
    const darkColor = `rgb(${r}, ${g}, ${b})`;
    axios
      .post("http://localhost:5000/notes/api/post", { title: title, content: content, category: categoryValue, color: darkColor }).then((res) => {
        console.log(res);
        setMsg(res.data.message);
        setIsMsg(!isMsg)
        setTimeout(() => {
          setMsg('');
          setIsMsg(false)
        }, 1000);
        setIsNewDivOpened(!isNewDivOpened)
      })
      .catch(err => console.error(err));
  }

  const handleUpdateData = async (item) => {
    await axios.put(`http://localhost:5000/notes/api/edit/${item._id}`, { title: title, content: content, category: categoryValue }).then((res) => {
      setMsg(res.data.message);
      setIsMsg(!isMsg)
      setTimeout(() => {
        setMsg('');
        setIsMsg(false)
      }, 1000);
    })
    setIsUpdateForm(false)
  }

  const handleFinished = (item) => {
    const finished = item.finished
    axios.put(`http://localhost:5000/notes/api/updatefinished/${item._id}`, { finished: !finished }).then((res) => {
      setMsg(res.data.message);
      setIsMsg(!isMsg)
      setTimeout(() => {
        setMsg('');
        setIsMsg(false)
      }, 1000);
    }).catch((err) => {
      setMsg(err)
    })
  }

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/notes/api/delete/${id}`)
      .then(res => {
        setMsg(res.data.message);
        setIsMsg(!isMsg)
        setTimeout(() => {
          setMsg('');
          setIsMsg(false)
        }, 1000);
      })
      .catch(err => console.error(err));
  }
  const handleUpdate = (item) => {
    // setIsNewDivOpened(true)
    setIsUpdateForm(item._id)
    setTitle('')
    setContent('')
    setCategoryValue('')
    setTitle(item.title)
    setContent(item.content)
    setCategoryValue(item.categoryValue);
    // setIsUpdate(true)
  }
  return (
    <>

      <div style={{ display: isMsg ? "flex" : "none" }} className="modal_msg">
        <div className="modal-box">
          <h4 style={{ fontSize: '14px' }}>{msg.charAt(0).toUpperCase() + msg.slice(1)}</h4>
        </div>
      </div>
      <div style={{ minHeight: '100vh', backgroundColor: isLight ? '#DDDDDD' : '#0B192C' }} className="container-fluid">
        <Link className='btn fs-2' to='/'><FaArrowCircleLeft fill={`${isLight ? '#0B192C' : '#DDDDDD'}`} /></Link>
        <div className="row notes justify-content-center gap-2 p-2 ">
          {
            isNewDivOpened ? (
              <div className="col col-12 col-md-4 col-lg-3 d-flex flex-column justify-content-between note newNote p-0">
                <input ref={titleRef} placeholder='Title' value={title} type="text" onChange={(e) => setTitle(e.target.value)} className='w-100 p-2 mb-1 newNoteTitle' />
                <textarea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} className='w-100 p-2 newNoteContent' name="" id=""></textarea>
                <div className="btn-group mt-1 w-100">
                  <select value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)} className='w-50' name="" id="">
                    <option value="none">Category</option>
                    <option value="personal"> Personal</option>
                    <option value="education">Education</option>
                    <option value="travel">Travel</option>
                    <option value="health">Health</option>
                    <option value="financial">Financial</option>
                    <option value="financial">Work</option>
                  </select>
                  <button onClick={handleSaveData} className="btn">
                    add
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ borderStyle: 'dashed', borderColor: isLight ? '#0B192C' : '#DDDDDD', color: isLight ? '#0B192C' : '#DDDDDD' }} onClick={handleOpenNewDiv} className=" p-2 note col col-12 col-md-4 col-lg-3 d-flex flex-column align-items-center justify-content-center">
                <h1 className='display-1' >+</h1>
              </div>
            )
          }
          {
            filterNotes.map((item, index) => (
              <>
              <React.Fragment key={index}>
                {isUpdateForm === item._id ? (
                  <div key={index} className="col col-12 col-md-4 col-lg-3 d-flex flex-column justify-content-between note newNote p-0">
                    <input ref={titleRef} placeholder='Title' value={title} type="text" onChange={(e) => setTitle(e.target.value)} className='w-100 p-2 mb-1 newNoteTitle' />
                    <textarea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} className='w-100 p-2 newNoteContent' name="" id=""></textarea>
                    <div className="btn-group mt-1 w-100">
                      <select value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)} className='w-50' name="" id="">
                    
                    <option value="personal"> Personal</option>
                    <option value="education">Education</option>
                    <option value="travel">Travel</option>
                    <option value="health">Health</option>
                    <option value="financial">Financial</option>
                    <option value="financial">Work</option>
                      </select>
                      <button onClick={() => handleUpdateData(item)} className="btn">
                        Update
                      </button>
                    </div>
                  </div>
                ) : (<div key={index} style={{ backgroundColor: `${item.color}`, color: 'white' }}  className=" note col col-12 col-md-4 col-lg-3 d-flex flex-column justify-content-between  p-2 ">
 
                  <div className="title_ok d-flex align-items-center justify-content-between p-2">
                    <h5 style={{ fontWeight: '700' }} className='m-0 text-dark'>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h5>
                    {item.finished ? (<button onClick={() => handleFinished(item)} className='p-0 btn_tick'> <TiTick fill='green' /></button>) : (<button onClick={() => handleFinished(item)} className='p-0 btn_tick'> <TiTick fill='black' /></button>)}

                  </div>

                  <p style={{ fontWeight: '400' }} className='text-dark p-1' >{item.content.charAt(0).toUpperCase() + item.content.slice(1)}</p>
                  <div className="date_delete d-flex align-items-center justify-content-between p-1 ">
                    <span style={{ fontWeight: '900' }} className='data text-dark' >{formatDate(item.saveDate)}</span>
                    <div className="opration btn-group bg-white p-1">
                      <button onClick={() => handleUpdate(item)} className=" btn p-0  "><FaPen className='p-0 mx-2' fill='green' /></button>
                      <button onClick={() => handleDelete(item._id)} className="btn p-0"><FaRegTrashAlt className='p-0' fill='red' /></button>
                    </div>
                  </div>

                </div>)}
                </React.Fragment>
              </>

            ))
          }
        </div>
      </div>
    </>
  )
}

export default NoteList