import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";

// Typescript made to look like HTML a .tsx file
function App() {
const location = useLocation();

  return (
    <>
    {location.pathname === '/' ? <HomePage /> : (
      <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
      </>
    )}    
    </>
  );
}

// Export app within a MObX observer
export default observer(App); // Observe is a higher order function that will return our app with observer powers
