import { AnyTxtRecord } from "dns";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    // Synthetic is a react event
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
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
              <Button
                onClick={() => selectActivity(activity.id)}
                floated="right"
                content="View"
                color="blue"
              />
              <Button
                name={activity.id}
                loading={submitting && target === activity.id} // Loading will show only on the button we clicked
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
}
