import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes, Switch} from 'react-router-dom';

import Index from "../src/components/Index";
import Menu from "../src/components/Menu.js";
import Problem1 from "../src/components/Problem-1";
import Problem2 from "../src/components/Problem-2";

import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <div>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/" element={<Menu />}>
                <Route path="problem-1" element={<Problem1 />} />
                <Route path="problem-2" element={<Problem2 />} />
              </Route>
            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
