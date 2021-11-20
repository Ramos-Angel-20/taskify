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

    projectsCtx.getProjects('750b4e4b-79c7-4cad-9a84-3e8944966d28');
    
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
