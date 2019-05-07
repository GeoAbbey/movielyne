import axios from "axios";

const KEY = "xxxxxx API_KEY xxxxxxx";

export default {
  // Fetch popular movies
  getPopularMovies(pageNo) {
    return axios
      .get(`/movie/popular?api_key=${KEY}&page=${pageNo}`)
      .then(response => {
        return response.data;
      });
  },

  // Fetch trending movies
  getTrendingMovies(pageNo) {
    return axios
      .get(`trending/movie/week?api_key=${KEY}&page=${pageNo}`)
      .then(response => {
        return response.data;
      });
  },

  // Fetch now playing movies
  getNowPlaying(pageNo) {
    return axios
      .get(`/movie/now_playing?api_key=${KEY}&page=${pageNo}`)
      .then(response => {
        return response.data;
      });
  },

  // Fetch a single movie and its details
  getSingleMovie(id) {
    return axios.get(`/movie/${id}?api_key=${KEY}`).then(response => {
      return response.data;
    });
  },

  // Fetch the casts and crew for a particular movie
  getCredits(id) {
    return axios.get(`/movie/${id}/credits?api_key=${KEY}`).then(response => {
      return response.data;
    });
  },

  // Fetch a single cast and his/her details
  getSingleCast(id) {
    return axios.get(`/person/${id}?api_key=${KEY}`).then(response => {
      return response.data;
    });
  },

  // Fetch all the movies a cast has participated in
  getCastMovies(id) {
    return axios
      .get(`/person/${id}/movie_credits?api_key=${KEY}`)
      .then(response => {
        return response.data;
      });
  },

  // Fetch movie(s) based on search entry
  searchMovies(movieName) {
    return axios
      .get(`/search/movie?api_key=${KEY}&query=${movieName}`)
      .then(response => {
        return response.data;
      });
  }
};
