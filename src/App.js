import { Switch, Route } from 'react-router-dom';


import Project from './components/Project';
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
  

  return (
    <Switch>
      <main>
        <Route path='/projects' component={ProjectsPage}/>
        <Route path='/project/:projectId' component={Project}/>
      </main>
    </Switch>
  );

}

export default App;
