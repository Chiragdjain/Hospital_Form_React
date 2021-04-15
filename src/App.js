
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';


import Navbar from './components/Navbar'
import MainForm from "./pages/Form";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={MainForm} />
      </Switch>
    </Router>
  );
}

export default App;
