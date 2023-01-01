import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

// Destructure the Activity[] from props from above to give type-safety 
// No need to prefix things with props.
export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
    return (
        // Grid is part of semantic UI styling
        // width = '10' is the number of columns in the grid
        // Max grid size 16
        // the grid under is 6 to make 16
        // Only display an activity if we have one (not null)
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails    
                />}
                {editMode &&
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})