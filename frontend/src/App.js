import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForumTest from "./pages/ForumTest";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/courses" component={Courses} />
          {/* <Route path="/forum" component={Forum} /> */}
          <Route path="/forum" component={ForumTest} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
