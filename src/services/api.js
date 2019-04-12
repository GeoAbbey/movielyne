import axios from "axios";

// const KEY = "c120980454891f98e1fc45b68661d5ec";
const KEY = "xxxxxx API_KEY xxxxxxx";


export default {
  getPopularMovies(pageNo) {
    return axios
      .get(`/movie/popular?api_key=${KEY}&page=${pageNo}`)
      .then(response => {
        return response.data;
      });
  },

  getTrendingMovies(pageNo) {
    return axios
      .get(`trending/movie/week?api_key=${KEY}&page=${pageNo}`)
      .then(response => {
        return response.data;
      });
  },

  getSingleMovie(id) {
    return axios.get(`/movie/${id}?api_key=${KEY}`).then(response => {
      return response.data;
    });
  },

  getCredits(id) {
    return axios.get(`/movie/${id}/credits?api_key=${KEY}`).then(response => {
      return response.data;
    });
  },

  getSingleCast(id) {
    return axios.get(`/person/${id}?api_key=${KEY}`).then(response => {
      return response.data;
    });
  },

  getCastMovies(id) {
    return axios.get(`/person/${id}/movie_credits?api_key=${KEY}`).then(response => {
      return response.data;
    });
  },

  searchMovies(movieName) {
    return axios.get(`/search/movie?api_key=${KEY}&query=${movieName}`).then(response => {
      return response.data;
    });
  }
};
