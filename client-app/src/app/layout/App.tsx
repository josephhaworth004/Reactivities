import { Fragment, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

// Typescript made to look like HTML a .tsx file
function App() {
  // Makes use of the hook useStore() in store.ts
  // Gets an object with an activityStore inside.
  // It is destructured here
  const { activityStore } = useStore();

  // Two hooks. useState() and useEffect()
  // UseState returns a stateful value and a function to update it. Eg [activities, setActivities]
  // In a component, state is data we import — typically to show the user — that is subject to change.
  // Stateful components are keeping track of changing data, while stateless components print
  // out what is given to them via props, or they always render the same thing.

  // useEffect() uses a callback function () =>
  // A function passed into another function as an argument, which is then invoked inside the outer function

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); // These dependencies ensure the axios.get will only be called once. Would cause an infinite loop otherwise

  

  

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" />;
  // The <Fragment> below is in place of a <div> It returns all of its children as one thing
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

// Export app within a MObX observer
export default observer(App); // Observe is a higher order function that will return our app with observer powers
