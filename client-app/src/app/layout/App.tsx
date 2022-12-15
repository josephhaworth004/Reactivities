import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

/*
Says we don;t need these?
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import ListItem from 'semantic-ui-react/dist/commonjs/elements/List/ListItem';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Z_ASCII } from 'zlib';
*/

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        //console.log(response); // Will echo to screen so we can check return fomr the api
        setActivities(response.data)
      })
  }, []) // This mean the axios.get will only be called once. Would cause an infinate loop otherwise

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }
  
  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, {...activity, id: uuid()}]) 
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity (id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  // The <Fragment> below is in place of a <div> It returns all of its children as one thing
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
          <ActivityDashboard
            activities={activities}
          selectedActivity={selectedActivity}
          selectActivity = {handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit = {handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        /> 
      </Container>

    </Fragment>
  );
}

export default App;
