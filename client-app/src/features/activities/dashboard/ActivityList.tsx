import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

// Return jsx
// Destructure from props above
export default observer(function ActivityList() {
  const {activityStore} = useStore();
  const {deleteActivity, activitiesByDate, loading} = activityStore; 

  const [target, setTarget] = useState("");

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>, id: string) {
    // Synthetic is a react event
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item.Content>
            <Item.Header as="a">{activity.title}</Item.Header>
            <Item.Meta>{activity.date}</Item.Meta>
            <Item.Description>
              <div>{activity.description}</div>
              <div>
                {activity.city}, {activity.venue}
              </div>
            </Item.Description>
            <Item.Extra>
              <Button as = {Link} to = {`/activities/${activity.id}`} floated="right" content="View" color="blue" />
              <Button
                name={activity.id}
                loading={loading && target === activity.id} // Loading will show only on the button we clicked
                onClick={(e) => handleActivityDelete(e, activity.id)} //'e' is a  react mouse event
                floated="right"
                content="Delete"
                color="red"
              />
              <Label basic content={activity.category} />
            </Item.Extra>
          </Item.Content>
        ))}
      </Item.Group>
    </Segment>
  );
})
