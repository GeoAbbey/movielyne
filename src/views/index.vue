<template>
<section>
  <v-carousel hide-delimiters interval="10000">
    <v-carousel-item v-for="(movie, i) in nowPlaying.results" :key="i" :src="`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`" :lazy-src="`http://image.tmdb.org/t/p/w92/${movie.backdrop_path}`">
      <div class="bg-content">
        <div class="desc">Now Playing</div>
        <router-link :to="`/movie/${movie.id}`">
          <div class="movie-title font-weight-black mt-3 primary--text">{{ movie.title }}</div>
        </router-link>
      </div>
    </v-carousel-item>
  </v-carousel>

  <v-container class="my-container" grid-list-lg>
    <div v-if="refinedPopularMovies.length" class="title font-weight-bold white--text mb-2">
      POPULAR MOVIES
      <v-btn class="mt-0" dark icon to="/popular">
        <v-icon size="27">chevron_right</v-icon>
      </v-btn>
    </div>
    <MovieCard :movies="refinedPopularMovies" />

    <div v-if="refinedTrendingMovies.length" class="title font-weight-bold white--text mb-2 mt-5">
      TRENDING MOVIES
      <v-btn class="mt-0" dark icon to="/trending">
        <v-icon size="27">chevron_right</v-icon>
      </v-btn>
    </div>
    <MovieCard :movies="refinedTrendingMovies" />

  </v-container>
</section>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Monoton");

.bg-content {
  @media (max-width: 425px) {
    padding: 0 10%;
    margin: 45% auto 0 auto;
    text-align: center;
  }

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}

.desc {
  font-size: 2em;
  color: white;
  text-shadow: 0px 15px 5px rgba(0, 0, 0, 0.1), 10px 20px 5px rgba(0, 0, 0, 0.05), -10px 20px 5px rgba(0, 0, 0, 0.05);
  font-family: "Monoton", cursive;

  @media (max-width: 425px) {
    font-size: 1.5rem;
  }
}

.movie-title {
  font-size: 3rem;

  @media (max-width: 425px) {
    font-size: 2.5rem;
  }
}
</style>

<script>
import moment from "moment";
import MovieCard from "@/components/movie-card";
import {
  mapState
} from "vuex";

export default {
  data: () => ({
    refinedTrendingMovies: [],
    refinedPopularMovies: [],
    page: 1
  }),

  components: {
    MovieCard
  },

  created() {
    this.$store.dispatch("GET_POPULAR_MOVIES", this.page).then(popularMovies => {
      this.refinedPopularMovies = this.popularMovies.results.slice(0, 12);
    })

    this.$store.dispatch("GET_TRENDING_MOVIES", this.page).then(trendingMovies => {
      this.refinedTrendingMovies = this.trendingMovies.results.slice(0, 12);
    })

    this.$store.dispatch("GET_NOW_PLAYING", this.page)
  },

  computed: {
    ...mapState(["trendingMovies", "popularMovies", "nowPlaying"])
  },

  filters: {
    formatDate: function (date) {
      if (!date) return "";
      date = date.substr(0, 10);
      return date ? moment(date).format("YYYY") : "";
    }
  }
};
</script>
