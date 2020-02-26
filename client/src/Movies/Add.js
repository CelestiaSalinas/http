import React, { useState } from "react"

import axios from "axios"

const Add = (props) => {
    console.log(props);

    const [appState, setAppState] = useState(props.items)
    console.log("appState", appState)

    const [newMovie, setNewMovie] = useState({
        id: "",
        title: "",
        director: "",
        metascore: Number(""),
        stars: []
    });

    const handleChanges = e => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value

        })
        console.log(newMovie)
    };


    const handleSubmit = (e) => {
        e.preventDefault();


        const movieUpdate = {
            id: Date.now(),
           title: newMovie.title,
           director: newMovie.director,
           metascore: Number(newMovie.metascore),
           stars: [newMovie.stars]
        }


      console.log("updated movie", movieUpdate)
        handleNewMovie(movieUpdate);
    }

    const handleNewMovie = (movie) => {
        axios.post("http://localhost:5000/api/movies", movie)
            .then(res => {
                setAppState([...appState, movie])
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
      <h1>Editor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChanges}
          placeholder="Title"
        />
        <br />
        <input
          type="text"
          name="director"
          onChange={handleChanges}
          placeholder="Director"
        />
        <br />
        <input
          type="text"
          name="metascore"
          onChange={handleChanges}
          placeholder="Score"
        />
        <br />
        <input
          type="text"
          name="stars"
          onChange={handleChanges}
          placeholder="Stars"
        />
        <button>Add Movie</button>
      </form>
    </div>
    )
}

export default Add
