import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './sass/index.scss';
import ProjectsProvider from './context/ProjectsProvider';
import ErrorBoundary from './components/ErrorBoundary';


ReactDOM.render(
  <React.StrictMode>
    <Toaster position='top-center'/>
    <ErrorBoundary>
      <Router>
        <ProjectsProvider>
          <App />
        </ProjectsProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
