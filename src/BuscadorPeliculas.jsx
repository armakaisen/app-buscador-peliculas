import { useState } from "react";

export const BuscadorPeliculas = () => {
  // https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=API_KEY

  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "0d9658c88fdb5ad9e9b48c2b4fef52a3";

  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
    //console.log("lo que ingresó", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setPeliculas(data.results);

      console.log(data.results);

      /*  console.log(dato.results[0].id);
      console.log(dato.results[0].original_title);
      console.log(dato.results[0].overview); */
    } catch (error) {
      console.error("ocurró error:", error.message);
    }
  };

  //console.log("las peliculas", peliculas);

  return (
    <div className="container">
      <h1>BuscadorPeliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={busqueda}
          onChange={handleInputChange}
          placeholder="Escriba nombre de película"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
            ></img>
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
