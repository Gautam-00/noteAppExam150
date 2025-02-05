import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddForm() {
    const [note, setNote] = useState({
        title: "",
        details: "",
    });

    const changeHandler = (event) => {
      const { name, value} = event.target;
      setNote( {...note, [name]: value});
    };

    const navigate = useNavigate();
    const submitHandler = (event) => {
      event.preventDefault();
      axios
        .post(`${import.meta.env.VITE_SERVER_URL}note`, note)
        .then(() => {
          navigate('/');
        })
        .catch((err) => {err.data.msg});
    };
    return (
        <div>
            <h1 className="headline">
                Add <span>Note</span>
            </h1>
            <form className="note-form">
                <input
                    type="text"
                    name="title"
                    value={note.title}
                    onChange={changeHandler}
                    placeholder="Title of Note ..."
                    required
                />
                <textarea
                    name="details"
                    rows="5"
                    defaultValue={note.details}
                    onChange={changeHandler}
                    placeholder="Descride Your Note ..."
                    required
                ></textarea>
                <button type="submit" onClick={submitHandler}>Save Note</button>
            </form>
        </div>
    );
}
