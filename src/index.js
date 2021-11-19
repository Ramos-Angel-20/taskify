import { BrowserRouter as Router } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './sass/index.scss';
import ProjectsProvider from './context/ProjectsProvider';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
