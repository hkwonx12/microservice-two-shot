import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ShoesList from './ShoesList';
import ShoesBinForm from './ShoesBinForm';
import Nav from './Nav';
import HatsList from './hatsList';

function App(props) {
<<<<<<< HEAD
=======

>>>>>>> main
  return (
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="shoes">
              <Route index element={<ShoesList />}/>
              <Route path="new" element={<ShoesBinForm />}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;



 