<template>
<v-container class="my-container" grid-list-lg>
  <div v-if="noMovie" class="text-xs-center white--text title mt-5">Movie titled {{ searchEntry }} not found</div>
  <MovieCard v-else :movies="moviesFound" />
</v-container>
</template>

<script>
import MovieCard from "@/components/movie-card";
import MoviesApi from "@/services/api";
import moment from 'moment'

export default {
  props: ['searchEntry'],

  components: {
    MovieCard
  },

  data: () => ({
    moviesFound: null,
    noMovie: false
  }),

  methods: {
    getMovies (value) {
      MoviesApi.searchMovies(value).then(movies => {
        if (movies.total_results > 0) {
          this.moviesFound = movies.results
          this.noMovie = false
        }else {
          this.noMovie = true
        }
      }).catch(e => console.log(e))
    }
  },

  mounted() {
    this.getMovies(this.searchEntry)
  },

  watch: {
    searchEntry(value) {
      this.getMovies(value)
    }
  }
}

</script>