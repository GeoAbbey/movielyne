<template>
<v-container grid-list-lg>
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
</template>

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
  },

  computed: {
    ...mapState(["trendingMovies", "popularMovies"])
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
