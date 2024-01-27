import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

function App() {

  return (
    <>
      <Router>
        <Header />
        <Footer />    
        <Routes>
        </Routes>
      </Router>
    </>
  )
}

export default App
