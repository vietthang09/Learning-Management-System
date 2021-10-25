import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/courses"
            render={({ match: { url } }) => (
              <>
                <Route exact path={`${url}/`} component={Courses} />
                <Route path={`${url}/course`} component={CourseDetail} />
              </>
            )}
          />
          <Route path="/forum" component={Forum} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
