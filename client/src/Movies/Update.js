import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Update = props => {
    console.log(props);
    const [updated, setUpdated] = useState({
      id: '',
      title: '',
      director: '',
      metascore: '',
      stars: [],
    });

    useEffect(() => {
        console.log(props.match.params.id)
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => {
          setUpdated(res.data)
        })
      }, [props.match.params.id])


      const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'stars') {
          value = [value]
        }
    
        setUpdated({
          ...updated,
          [e.target.name]: value,
          id: props.match.params.id
        });
      };


    // const handleChanges = e => {
    // //     e.persist();
    // // let value = e.target.value;
    // // if (e.target.name === 'price') {
    // //   value = parseInt(value, 10);
    

    //     setUpdated({
    //         ...updated, [e.target.name]: e.target.value
    //     })
    // }

    const handleSubmit =  e => {
        e.preventDefault();
        // make a PUT request to edit the item
        console.log(updated)
        axios
          .put(`http://localhost:5000/api/movies/${updated.id}`, updated)
          .then(res => {
            document.querySelector("form").reset();
            window.location.reload()
            // res.data ==> full array with updated item
            // usually APIs return just the updated item, or just the id of the update item - you need to make a new array with all the old items, and replace the updated item with the updated item
            // const newItemsArr = props.items.map
            console.log(props)
            // setItem(res.data);
            props.history.push(`/movies/${updated.id}`);
          })
          .catch(err => console.log(err));
      };
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
        <button type="submit">Update Movie</button>
      </form>
    </div>
    )
}

export default Update
