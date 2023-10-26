import{ BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';

import Home from './pastes/Home';
import Films from './pastes/Films';
import Favoritos from './pastes/Favoritos'
import Error from './pastes/Error';

function RoutesApp(){

    return(
        <div>
        <BrowserRouter>
        <Header/>
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/filme/:id' element={<Films/>}/>
            <Route path='/favoritos' element={<Favoritos/>}/>

            <Route path='*' element={<Error/>}/>
         </Routes>
        </BrowserRouter>
        </div>
    )
}

export default RoutesApp