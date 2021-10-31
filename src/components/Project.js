import { ReactSortable } from 'react-sortablejs';
import { useState } from 'react';

const Project = () => {

    const [todo, setTodo] = useState([
        { id: 1, name: "shrek" },
        { id: 2, name: "fiona" }
    ]);
    const [development, setDevelopment] = useState([
        { id: 3, name: "burro" },
        { id: 4, name: "drake" }
    ]);
    const [finished, setFinished] = useState([
        { id: 5, name: "stephen" },
        { id: 6, name: "tony" }
    ]);
    const [bugs, setBugs] = useState([
        { id: 7, name: "bruce" },
        { id: 8, name: "reed" }
    ]);

    return (
        <div className='project'>
            <h2>To Do</h2>
            <ReactSortable list={todo} setList={setTodo} animation={200} group='project-tasks' className='project__container'>
                {
                    todo.map(item => (
                        <li className='project__item' key={item.id}>{item.name}</li>
                    ))
                }
            </ReactSortable>
            
            <h2>Under development</h2>
            <ReactSortable list={development} setList={setDevelopment} animation={200} group='project-tasks' className='project__container'>
                {
                    development.map(item => (
                        <li key={item.id} className='project__item'>{item.name}</li>
                    ))
                }
            </ReactSortable>

            <h2>Finished</h2>
            <ReactSortable list={finished} setList={setFinished} animation={200} group='project-tasks' className='project__container'>
                {
                    finished.map(item => (
                        <li key={item.id} className='project__item'>{item.name}</li>
                    ))
                }
            </ReactSortable>

            <h2>Bugs!</h2>
            <ReactSortable list={bugs} setList={setBugs} animation={200} group='project-tasks' className='project__container'>
                {
                    bugs.map(item => (
                        <li key={item.id} className='project__item'>{item.name}</li>
                    ))
                }
            </ReactSortable>
        </div>
    );
}

export default Project;
