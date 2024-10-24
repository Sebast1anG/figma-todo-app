import ToDoList from './ToDoList';
import { TaskProvider } from './TaskProvider';
import './index.css';

const App = () => {
  return (
    <TaskProvider>
      <div className="App min-h-screen">
        <ToDoList />
      </div>
    </TaskProvider>
  );
};

export default App;
