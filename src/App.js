import { Home } from './pages/Home';
import {Add} from './pages/Add'
import {Update} from './pages/Update'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/add",
    element: <Add/>
  },
  {
    path: "/update/:id",
    element: <Update/>
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
