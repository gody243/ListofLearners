import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import AddLearner from "./pages/AddLearner";
import UpdateLearner from "./pages/UpdateLearner";
import { Nav, Navbar } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Navbar bg="dark">
        <Nav>
          <ul>
            <li>
              <Nav.Item>
                <Link to="/">Home</Link>
              </Nav.Item>
            </li>
            <li>
              <Nav.Item>
                <Link to="/add-learner">AddLearner</Link>
              </Nav.Item>
            </li>
          </ul>
        </Nav>
      </Navbar>
      <Switch>
        <Route path="/add-learner" exact>
          <AddLearner />
        </Route>
        <Route path="/update/:id" exact>
          <UpdateLearner />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
