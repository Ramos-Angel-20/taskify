import { useEffect, useContext } from 'react';

import Navbar from './components/Navbar';
import Project from './components/Project';
import ProjectsContext from './context/projects-context';
import Sidebar from './components/Sidebar';

const App = () => {

  const projectsCtx = useContext(ProjectsContext);

  useEffect(() => {

    projectsCtx.getProjects('53df1367-0969-45e6-b584-4af300c35dc6');
    
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
