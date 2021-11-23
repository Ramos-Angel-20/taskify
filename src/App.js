import { Toaster } from 'react-hot-toast';
import { Switch, Route } from 'react-router-dom';

import { useEffect, useContext } from 'react';

import Navbar from './components/Navbar';
import Project from './components/Project';
import ProjectsContext from './context/projects-context';
import Sidebar from './components/Sidebar';
import Projects from './pages/Projects';

const App = () => {
  

  return (
    <Switch>
      <main>
        <Route path='/projects' component={Projects}/>
        <Route path='/project/:projectId' component={Project}/>
      </main>
    </Switch>
  );

}

export default App;
