import React, { useState, useEffect }from 'react';
import './row.css';
import axios from '../../../utils/Axios';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

function Row({title,fetchUrl,isLargeRow}) {
  let [movies, setMovie] = useState([]);
  let [trailerUrl, setTrailerUrl] = useState("");


  let base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try{
        console.log(fetchUrl);
        let request = await axios.get(fetchUrl);
        console.log(request);
        setMovie(request.data.results);
      }catch(error) {
        console.log(error);
      }
    })()
  }, [fetchUrl]);


  let handleClick = (movie) => {
    if(trailerUrl) {
      setTrailerUrl('')
    }else{
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
          .then((url) => {
            console.log(url)
            let urlParams = new URLSearchParams(new URL(url).search)
            console.log(urlParams)
            console.log(urlParams.get('v'))
            setTrailerUrl(urlParams.get('v'));
          })
    }
  }

  let opts = {
    height: '390',
    width: '100%',
    playervars: {
      autoplay: 1,
  }
  }

  return (
    <div className="row">
      <h1 className="title">{title}</h1>
      <div className="row_posters">
        {movies?.map((movie,index) => (
          <img 
            onClick = {() => handleClick(movie)}
            key = {index} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt="movie.name" className={`row_poster ${isLargeRow && "row_posterLarge"}`}/>
        ))}
      </div>
      <div style = {{padding: '40px'}}>
        {trailerUrl && <YouTube videoID = {trailerUrl} opts = {opts}/>}
      </div>
    </div>
  )
}

export default Row;