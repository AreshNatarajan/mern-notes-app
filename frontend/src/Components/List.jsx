import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import profile from '../assets/man.png'
import education from '../assets/book.png'
import health from '../assets/health-check.png'
import financial from '../assets/money-stack.png'
import work from '../assets/suitcase.png'
import travel from '../assets/travel-and-tourism.png'

//modes image
import moon from '../assets/moon.png'
import sun from '../assets/sun.png'

function List({ notes, setIsLight , isLight }) {

  const finishedCount = notes.filter(item => item.finished === true);
  const notFinished = notes.filter(item => item.finished === false)
  const list = [
    { title: 'Profile', img: profile, category: 'personal' },
    { title: "Education", img: education, category: 'education' },
    { title: "Health", img: health, category: 'health' },
    { title: "Financial", img: financial, category: 'financial' },
    { title: "Work", img: work, category: 'work' },
    { title: "Travel", img: travel, category: 'travel' }
  ]

  // { minHeight: '100vh', backgroundColor: '#0B192C' }

  const handleMode = () =>{
    setIsLight(!isLight)
  }
  return (
    <><div  style={{backgroundColor: isLight ? '#DDDDDD' : '#0B192C', minHeight:'100vh' }}  className='container-fluid d-flex flex-column align-items-center justify-content-center m-0'>
      <div className="container  d-flex flex-column align-items-center justify-content-center mt-2 ">
        <div className="title w-100 p-2  mb-2">
          <div className="row ">
            <div className="col col-12 col-md-6 "> <h1 style={{color : isLight ? '#0B192C' : '#DDDDDD'}} >Create Your Notes</h1></div>
            <div className="col col-12 col-md-6 d-flex align-items-center justify-content-end ">
              {
                isLight ? (
                  <div className="mode  d-flex align-items-center p-2 justify-content-end">
                  <img onClick={handleMode}  className='mode_img mx-3' src={moon} alt="moon" />
               </div>
             ) : (
                 
            
<div className="mode  d-flex align-items-center p-2 justify-content-end">
<img onClick={handleMode} className='mode_img mx-3' src={sun} alt="moon" />
</div>
                   
              )
              }
            </div>
          </div>
        </div>
        <div className="row mb-3  p-3  w-100">
          <div className="col col-12 col-md-6 counts p-2">
            <div style={{backgroundColor:'#F05454'}} className=' d-flex align-items-center justify-content-around h-100 rounded count' >
              <div className="text_finished d-flex flex-column">
                <span className='fs-2' >Finished</span>
                <span>Notes</span>
              </div>
              <h4 style={{ fontWeight: '700' }} className='display-2' >{finishedCount.length}</h4>
            </div>
          </div>
          <div className="col col-12 col-md-6 counts p-2">
            <div className='bg-warning d-flex align-items-center justify-content-around h-100 rounded count' >
              <div className="text_finished d-flex flex-column">
                <span className='fs-2' >Unfinished</span>
                <span>Notes</span>
              </div>
              <h4 style={{ fontWeight: '700' }} className='display-2' >{notFinished.length}</h4>
            </div>
          </div>
        </div>

        <div className="row place-items-center p-3">
          {
            list.map((item, index) => (
              <Link to={`/notes/${item.category}`} key={index} className=' col col-12 col-md-6 text-decoration-none' >
                <div style={{ backgroundColor: '#1E3E62' }} className=" d-flex align-items-center justify-content-between p-2 mb-1 list rounded ">
                  <img className=' listImg' src={item.img} alt={item.title} />
                  <h4 style={{color:'#DDDDDD'}} >{item.title}</h4>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>

    </>
  )
}

export default List