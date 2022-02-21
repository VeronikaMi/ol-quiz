import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import History from "./components/History/History";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="history" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
