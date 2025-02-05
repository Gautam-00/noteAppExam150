import { Link } from "react-router-dom";
import axios from 'axios';

export default function NoteCard({note}) {
    async function deleteNote() {
        let response = await axios.post(`http://localhost:5000/notes/${note._id}`);
        console.log(response);
    }
    return (
        <div className="noteCard">
            <h2 className="title">
                <Link to={`/`} style={{textDecoration: 'none', color: '#f5400f'}}>{note.title}</Link>
                <Link to={`/`} style={{color: '#f5400f'}}><i className="fa-solid fa-ellipsis-vertical"></i></Link>
            </h2>
            <p className="details">
                {note.details}
            </p>
            <button className="bg-red-400 text-white">Delete</button>
        </div>
    );
}
