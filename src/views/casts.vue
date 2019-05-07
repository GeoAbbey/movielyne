<template>
<section>
<v-sheet class="grey lighten-3">
  <v-container class="my-container" v-if="cast" grid-list-lg>
    <v-layout row wrap>
      <v-flex sm4 class="">
        <v-img v-if="cast.profile_path != null" class="poster mx-auto" contain :lazy-src="`http://image.tmdb.org/t/p/w92/${cast.profile_path}`" :src="`http://image.tmdb.org/t/p/w342/${cast.profile_path}`"></v-img>

        <v-sheet min-height="300" class="poster text-xs-center" v-else>
            <v-icon size="100" class="mt-5">account_circle</v-icon>
          </v-sheet>
      </v-flex>

      <v-flex sm8 :mt-5="this.$vuetify.breakpoint.lgAndUp">
        <span class="display-1 font-weight-black">{{ cast.name }}</span>

        <div class="font-weight-bold title mt-4 mb-1">Biography</div>
        <div>{{ cast.biography }}</div>

        <v-layout row wrap>
          <v-flex mt-4 sm4>
            <div class="font-weight-bold title mb-1">Also Known As</div>
            <div v-for="(aka, i) in cast.also_known_as" :key="i">{{ aka }}</div>
          </v-flex>

          <v-flex sm4 mt-4>
            <div>
              <div class="font-weight-bold title mb-1">Gender</div>
              <div v-if="cast.gender == 2">Male</div>
              <div v-if="cast.gender == 1">Female</div>
            </div>

            <div class="mt-3">
              <div class="font-weight-bold title mb-1">Birthday</div>
              <div>{{ cast.birthday }}</div>
            </div>
          </v-flex>

          <v-flex sm4 mt-4>
            <div>
              <div class="font-weight-bold title mb-1">Known for</div>
              <div>{{ cast.known_for_department }}</div>
            </div>

            <div class="mt-3">
              <div class="font-weight-bold title mb-1">Place of Birth</div>
              <div>{{ cast.place_of_birth }}</div>
            </div>
          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>
  </v-container>
</v-sheet>

<v-container class="my-container" grid-list-lg>
  <div class="title font-weight-bold white--text mb-2">ASSOCIATED MOVIES</div>
  <MovieCard :movies="associatedMovies" />
</v-container>
</section>
</template>

<style lang="scss" scoped>
.poster {
  border-radius: 15px;
  max-width: 350px;

  @media (max-width: 768px) {
    margin-top: 40px;
  }

  @media (max-width: 425px) {
    margin-top: 15px;
    max-width: 200px;
  }
}
</style>

<script>
import MovieCard from "@/components/movie-card";
import MoviesApi from "@/services/api";
import moment from 'moment'

export default {
  components: {
    MovieCard
  },

  data: () => ({
    cast: null,
    associatedMovies: null
  }),

  created() {
    MoviesApi.getSingleCast(this.$route.params.castId).then(cast => {
      this.cast = cast
    }).catch(e => console.log(e))
  },

  mounted() {
    MoviesApi.getCastMovies(this.$route.params.castId).then(movies => {
      this.associatedMovies = movies.cast
    }).catch(e => console.log(e))
  },

  filters: {
    formatDate: function (date) {
      if (!date) return ''
      date = date.substr(0, 10)
      return date ? moment(date).format('YYYY') : ''
    }
  }
}
</script>
