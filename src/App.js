import { useEffect, useContext } from 'react';

import Navbar from './components/Navbar';
import Project from './components/Project';
import ProjectsContext from './context/projects-context';
import Sidebar from './components/Sidebar';

const App = () => {

  const projectsCtx = useContext(ProjectsContext);

  useEffect(() => {

    projectsCtx.getProjects('8afa0425-c2c2-47e9-9451-1d2373bb9834');
    
  }, []);

  return (
    <>
      <main>
        <Sidebar/>
        <Project />
      </main>

    </>
  );

}

export default App;
