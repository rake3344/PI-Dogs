import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DetailPage } from './components/DetailPage/DetailPage';
import { FormPage } from './components/FormPage/FormPage';
import { HomePage } from './components/HomePage/HomePage';
import { LandingPage } from './components/LandingPage/LandingPage';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <LandingPage />}></Route>
        <Route path='/home' element = { <HomePage /> }></Route>
        <Route path='/details/:idDog' element = { <DetailPage /> } />
        <Route path='/create' element = { <FormPage /> } />
      </Routes>
    </div>
  );
}

export default App;
