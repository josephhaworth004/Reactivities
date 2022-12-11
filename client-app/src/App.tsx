import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import ListItem from 'semantic-ui-react/dist/commonjs/elements/List/ListItem';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

function App() {

const [activities, setActivities] = useState([]);
useEffect(() => {
  axios.get('http://localhost:5000/api/activities')
    .then(response => {
      //console.log(response); // Will echo to screen so we can check return fomr the api
      setActivities(response.data)
    })
},[]) // This mean the axios.get will only be called once. Would cause an infinate loop otherwise

/**
 * The <ul> is to loop over the list of activities returned form the axios.get function above
 *
 */
  return (
    <div> 
        <Header as='h2' icon='users' content='Reactivities' />              
        <List>             
        {activities.map((activity: any) => (
          
          // The <List> is a semantic ui loop over the list of activities returned form the axios.get function above
          // <List.Item> needs a key for typescript to id it. Each one has to be unique
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
        </List>
    </div>
  );
}

export default App;
