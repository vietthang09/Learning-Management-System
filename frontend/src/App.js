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
import CreateAssignment from "./components/CreateAssignment";
import AssignmentAdjustments from "./components/AssignmentAdjustments";
import CreateMaterial from "./components/CreateMaterial";
import MaterialAdjustments from "./components/MaterialAdjustments";
import CreateNewCourse from "./pages/CreateNewCourse";
import NewCourse from "./pages/NewCourse";
import PostDetail from "./pages/PostDetail";
import Register from "./pages/Register";
import ProfileEdit from "./pages/ProfileEdit";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <RouteWithNav exact path="/" component={Home} />
          <RouteWithNav exact path="/new-course" component={CreateNewCourse} />
          <RouteWithNav
            exact
            path="/create-assignment/:id"
            component={CreateAssignment}
          />
          <RouteWithNav
            exact
            path="/update-assignment/:id"
            component={AssignmentAdjustments}
          />
          <RouteWithNav
            exact
            path="/create-material/:id"
            component={CreateMaterial}
          />
          <RouteWithNav
            exact
            path="/update-material/:id"
            component={MaterialAdjustments}
          />
          <RouteWithNav exact path="/courses/:id" component={CourseDetail} />
          <RouteWithNav exact path="/new/:id" component={NewCourse} />
          <RouteWithNav exact path="/courses" component={Courses} />
          <RouteWithNav exact path="/forum" component={Forum} />
          <RouteWithNav exact path="/forum/:id" component={PostDetail} />
          <RouteWithNav exact path="/profile" component={Profile} />
          <RouteWithNav exact path="/profile/edit" component={ProfileEdit} />
          <RouteWithNav exact path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
