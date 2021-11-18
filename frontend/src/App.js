import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EditScreen from "./screens/EditScreen";
import CreateScreen from "./screens/CreateScreen";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/edit/:id" element={<EditScreen />} />
          <Route path="/create" element={<CreateScreen />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
