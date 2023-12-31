import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
   <Router>
    <Header/>
    <Route exact path='/' Component={Home} />
    <Footer/>
   </Router>
  );
}

export default App;
