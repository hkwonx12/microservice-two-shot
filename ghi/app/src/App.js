import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ShoesList from './ShoesList';
import ShoesBinForm from './components/shoes/ShoesBinForm';
import Nav from './Nav';
import HatsList from './components/hats/hatsList';
import HatsLocationForm from './hatsLocationForm';


function App(props) {
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
          
            <Route path="hats">
              <Route index element={<HatsList />}/>
              <Route path="new" element={<HatsLocationForm />}/>
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
