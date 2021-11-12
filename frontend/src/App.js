import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { RouteWithNav } from "./components/RouteWithNav";
import CreateAssignment from "./components/CreateAssignment";
import AssignmentAdjustments from "./components/AssignmentAdjustments";
import CreateNewCourse from "./pages/CreateNewCourse";
import NewCourse from "./pages/NewCourse";
import PostDetail from "./pages/PostDetail";
import Register from "./pages/Register";
import ProfileEdit from "./pages/ProfileEdit";
import PostEdit from "./pages/PostEdit";
import RouteGuest from "./components/RouteGuest";
import RouteForTeacher from "./components/middlewares/RouteForTeacher";
import RouteForStudent from "./components/middlewares/RouteForStudent";
import Toast from "./components/Toast";
import Submit from "./pages/Submit";
import MaterialLayout from "./components/layouts/MaterialLayout";
import UpdateMaterialLayout from "./components/layouts/UpdateMaterialLayout";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <RouteGuest exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <RouteWithNav exact path="/" component={Home} />
          <RouteForTeacher
            exact
            path="/new-course"
            component={CreateNewCourse}
          />
          {/* Assignment Management */}
          <RouteForTeacher
            exact
            path="/assignment/create/:id"
            component={CreateAssignment}
          />
          <RouteForTeacher
            exact
            path="/assignment/update/:id"
            component={AssignmentAdjustments}
          />
          {/* Submissions Management */}
          <RouteForStudent
            exact
            path="/submission/submit/:id"
            component={Submit}
          />
          {/* Materials Management */}
          <RouteForTeacher
            exact
            path="/material/create/:id"
            component={MaterialLayout}
          />

          <RouteForTeacher
            exact
            path="/material/update/:id"
            component={UpdateMaterialLayout}
          />
          <RouteWithNav exact path="/courses/:id" component={CourseDetail} />
          <RouteWithNav exact path="/courses/new/:id" component={NewCourse} />
          <RouteWithNav exact path="/courses" component={Courses} />
          <RouteWithNav exact path="/forum" component={Forum} />
          <RouteWithNav exact path="/forum/:id" component={PostDetail} />
          <RouteWithNav exact path="/forum/edit/:id" component={PostEdit} />
          <RouteWithNav exact path="/profile" component={Profile} />
          <RouteWithNav exact path="/profile/edit" component={ProfileEdit} />
          <RouteWithNav exact path="/" component={Home} />
        </Switch>
      </Router>
      <Toast />
    </>
  );
}

export default App;
