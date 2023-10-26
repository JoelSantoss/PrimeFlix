import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from '../../services/api';
import './filme_info.css';

function Films(){
    const { id } = useParams();
    const[filme, setFilme] = useState({});
    const navigate = useNavigate();
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
       async function loadFilme(){
          await api.get(`/movie/${id}`, {
            params:{
                api_key:'b22fbd9646c634c335bd11c59396cf50',
                language:"pt-BR",
            }
          })
          .then((response)=>{
             setFilme(response.data);
             setLoading(false);
          })
          .catch(()=>{
            console.log("FILME NÃO ENCONTRADO")
            navigate('/', {replace:true})
            return;
          })
       }
       loadFilme();

       return()=>{
        console.log("Componente desmontado.")
       }

    }, [navigate, id]) 

    function salveFilm(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const temFilme = filmesSalvos.some((filmeSalvo)=>
            filmeSalvo.id === filme.id
        )

        if ( temFilme ){
            toast.warn("Filme Já Salvo");
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso")
       }

    if(loading){
        return(
            <div className="filme-info">
             <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
           <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/> 

           <h3>Sinopse</h3>
           <p className="span">{filme.overview}</p>
           <strong>Avaliação: {filme.vote_average} / 10</strong>

           <div className="area-button">
              <button onClick={salveFilm}>Salvar</button>
              <button>
                <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>
                    Trailer
                </a>
              </button>
           </div>
        </div>

    )
}

export default Films;