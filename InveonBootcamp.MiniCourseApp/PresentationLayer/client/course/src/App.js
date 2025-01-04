import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Course from "./components/Course";
import MyCourse from './components/MyCourse';
import CourseForm from './components/CourseForm';
import CourseAnalytics from './components/CourseAnalytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/course" element={<Course />}/>
        <Route path="/myCourse" element={<MyCourse />}/>
        <Route path="/courseForm" element={<CourseForm />}/>
        <Route path="/courseAnalytics" element={<CourseAnalytics />}/>
      </Routes>
    </Router>
  );
}

export default App;