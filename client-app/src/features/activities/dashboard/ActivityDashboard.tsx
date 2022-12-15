import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities, selectActivity, selectedActivity, deleteActivity,
    cancelSelectActivity, editMode, openForm, closeForm, createOrEdit}: Props) {
    return (
        // Grid is oart of semantic UI styling
        // width = '10' is the number of columns in the grid
        // Max grid size 16
        // the grid under is 6 to make 16
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}    
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails
                    activity={selectedActivity}
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}    
                />}
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}