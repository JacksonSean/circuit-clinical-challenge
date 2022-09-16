import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TrialTable } from './components/TrialTable';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchComponent from './components/SearchComponent';
import { ResultsComponent } from './components/ResultsComponent';

function App() {

 const [isSearched, setIsSearched] = useState(false);
  return (
    <>
    <Navbar className="navbar" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-brand" href="/" onClick={(e) => setIsSearched(false)}><b>PhaseOne</b></Navbar.Brand>
      </Container>
    </Navbar>
    <Container id="app-container" fluid className='d-grid h-100'>
       <Router>
        <Routes>
          <Route path="/" element={isSearched ?  <ResultsComponent /> : <SearchComponent isSearched={isSearched} setIsSearched={setIsSearched}/>} />
          <Route path="/results" element={<ResultsComponent />} />
         <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Router>
    </Container>
    </>
  );
}

export default App;
