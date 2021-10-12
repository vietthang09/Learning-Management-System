import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
// Import components
import Navbar from "./components/Navbar";
// Import pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Forum from "./pages/Forum";
import Annoucements from "./pages/Announcements";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/course" component={Courses} />
        <Route path="/forum" component={Forum} />
        <Route path="/annoucements" component={Annoucements} />
      </Router>
    </>
  );
}

export default App;
