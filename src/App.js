import { useEffect, useContext } from 'react';

import Navbar from './components/Navbar';
import Project from './components/Project';
import ProjectsContext from './context/projects-context';
import Sidebar from './components/Sidebar';

const App = () => {

  const projectsCtx = useContext(ProjectsContext);

  useEffect(() => {

    projectsCtx.getProjects('59b94f58-344c-4443-91f5-8a895e680248');
    console.log(projectsCtx.projects);
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
