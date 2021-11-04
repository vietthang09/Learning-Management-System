import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import ForumTest from "./pages/ForumTest";
import Login from "./pages/Login";
import { RouteWithNav } from "./components/RouteWithNav";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <RouteWithNav exact path="/" component={Home} />
          <RouteWithNav exact path="/courses/:id" component={CourseDetail} />
          <RouteWithNav exact path="/courses" component={Courses} />
          <RouteWithNav exact path="/forum" component={Forum} />
          <RouteWithNav exact path="/profile" component={Profile} />
          <RouteWithNav exact path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
