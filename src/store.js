import Vue from "vue";
import Vuex from "vuex";
import MoviesApi from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    popularMovies: [],
    trendingMovies: [],
    nowPlaying: []
  },

  mutations: {
    SET_POPULAR_MOVIES(state, payload) {
      state.popularMovies = payload;
    },

    SET_TRENDING_MOVIES(state, payload) {
      state.trendingMovies = payload;
    },

    SET_NOW_PLAYING(state, payload) {
      state.nowPlaying = payload;
    }
  },

  actions: {
    GET_POPULAR_MOVIES({ commit }, pageNo) {
      return MoviesApi.getPopularMovies(pageNo)
        .then(movies => {
          commit("SET_POPULAR_MOVIES", movies);
        })
        .catch(err => console.log(err));
    },

    GET_TRENDING_MOVIES({ commit }, pageNo) {
      return MoviesApi.getTrendingMovies(pageNo)
        .then(movies => {
          commit("SET_TRENDING_MOVIES", movies);
        })
        .catch(err => console.log(err));
    },

    GET_NOW_PLAYING({ commit }, pageNo) {
      return MoviesApi.getNowPlaying(pageNo)
        .then(movies => {
          commit("SET_NOW_PLAYING", movies);
        })
        .catch(err => console.log(err));
    }
  }
});
