import React, { useEffect } from 'react'
import { use } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AddNote from '../components/AddNote';
import NoteCard from '../components/NoteCard';
function Home() {

    const navigate = useNavigate();
    // if(!localStorage.getItem('token')){

    //     console.log(localStorage.getItem('token'))

    //     navigate('/auth');
    // }
    // const [userInfo,setUserInfo] = React.useState(JSON.parse(localStorage.getItem('user')));
    // console.log(userInfo.provider);
    const msgStyle = {
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        height: "50vh",
        color: "#aaa",
        letterSpacing: "1px",
        fontSize: "1.3em",
    };

    useEffect(()=>{
        async function getData(){
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}note`,{withCredentials:true});
            console.log(res.data);
            setNotes(res.data);
        }
        getData();
    })
    let [notes,setNotes] = React.useState([]);
  return (
    <div>
            <h1 className="headline">
                Save Your <span>Notes</span> Here
            </h1>

            <div className="cards">
                {notes && notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteCard key={note._id} note={note} />
                    ))
                ) : (
                    <p style={msgStyle}>No Notes To Show</p>
                )}
            </div>
            
            <AddNote />
        </div>
  )
}

export default Home