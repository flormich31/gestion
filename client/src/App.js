import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Groups from "./pages/groups";
import GroupsA from "./pages/groups-A";
import Activities from "./pages/activities";
import ActivityEditor from "./pages/activity-editor";
import ActivityEditorRead from "./pages/activity-editor-read";
import Reports from "./pages/reports";
import Profile from "./pages/profile";

export default function App() {
  document.title = "ABC Aprendiendo juntos";

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/groups-A">
            <GroupsA />
          </Route>
          <Route path="/activity-editor-read">
            <ActivityEditorRead />
          </Route>
          <Route path="/activity-editor">
            <ActivityEditor />
          </Route>
          <Route path="/activities">
            <Activities />
          </Route>
          <Route path="/reports">
            <Reports />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}
