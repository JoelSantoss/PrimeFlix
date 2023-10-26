import './header.css';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <header>
            <div className='container'>
            <Link className='logo' to='/'>Prime<span>Flix</span></Link>
            <Link className='fav' to='/favoritos'>Meus Filmes</Link>
            </div>
              
        </header>
    )
}

export default Header;