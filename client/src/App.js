import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import Update from './Movies/Update';
import Add from './Movies/Add'

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const [items, setItems] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />
      
      }} />
<Route path="/movies/:id" render={props => {
        return <Update {...props} component={Update} />
        }}
        
      />
      <Route exact path="/add-movie" render={props => (
         <Add {...props} items={items} />
      )} />
          <Link to={`/add-movie`}>
      <button>Add</button>
    </Link>
    </>
  );
};

export default App;
