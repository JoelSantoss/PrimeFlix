import { useEffect, useState } from 'react';
import './favoritos.css'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])
    },[])

    function excluirFilme(id){
       let filtroFilmes = filmes.filter((item)=>{
           return (item.id !== id)
       })

       setFilmes(filtroFilmes)
       localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes))
       toast.success("Filme removido")
    }

    return(
        <div className='meus-filmes'> 
           <h1>Meus filmes</h1>
           {filmes.length === 0 && <h3>Você não possui filmes salvos :/</h3>}
           <ul>
            {filmes.map((item)=>{
                return(
                    <li key={item.id}>
                       <p>{item.title}</p> 
                       <div>
                        <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                        <button onClick={()=> excluirFilme(item.id)}>Excluir</button>
                       </div>
                    </li>
                )
            })}
           </ul>
        </div>
    )
}

export default Favoritos;