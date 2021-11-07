import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './sass/index.scss';
import ProjectsProvider from './context/ProjectsProvider';


ReactDOM.render(
  <React.StrictMode>
    <ProjectsProvider>
      <App />
    </ProjectsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
