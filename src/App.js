import { Toaster } from 'react-hot-toast';
import { Switch, Route } from 'react-router-dom';

import { useEffect, useContext } from 'react';

import Navbar from './components/Navbar';
import Project from './components/Project';
import ProjectsContext from './context/projects-context';
import Sidebar from './components/Sidebar';

const App = () => {

  const projectsCtx = useContext(ProjectsContext);

  useEffect(() => {

    projectsCtx.getProjects('e4686f11-e453-46b3-baed-2d784a428d69');
    
  }, []);

  return (
    <Switch>
      <main>
        <Toaster/>
        <Sidebar/>
        <Project />
      </main>
    </Switch>
  );

}

export default App;
