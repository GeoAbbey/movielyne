<template>
<section>
  <section v-if="movie !== null">
    <v-img class="backdrop" :src="`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`" :lazy-src="`http://image.tmdb.org/t/p/w92/${movie.backdrop_path}`" cover>
      <v-container class="my-container" grid-list-lg>
        <v-layout row wrap>
          <v-flex sm4>
            <v-img class="poster mx-auto" :lazy-src="`http://image.tmdb.org/t/p/w92/${movie.poster_path}`" :src="`http://image.tmdb.org/t/p/w342/${movie.poster_path}`"></v-img>
          </v-flex>

          <v-flex style="z-index: 4" sm8 class="white--text" :mt-5="this.$vuetify.breakpoint.lgAndUp">
            <div>
              <span class="display-1 font-weight-black">{{ movie.title }}</span>
              <span class="headline ml-2">({{ movie.release_date | formatDate }})</span>
            </div>

            <div>
              <span class="mr-3 font-weight-medium" v-for="(genre, id) in movie.genres" :key="id">{{ genre.name }}</span>
            </div>

            <v-layout row wrap mt-4>
              <v-flex sm6 :order-xs2="this.$vuetify.breakpoint.xsOnly">
                <div>
                  <v-avatar size="40" small color="primary" class="white--text font-weight-black caption">{{ movie.vote_average }}</v-avatar>
                  <span class="font-weight-bold ml-2">Average rating</span>
                </div>
              </v-flex>

              <v-flex sm6 :order-xs1="this.$vuetify.breakpoint.xsOnly">
                <div class="font-weight-bold mt-2">Runtime: {{ movie.runtime }} mins</div>
              </v-flex>
            </v-layout>

            <div class="mt-4">
              <div class="title font-weight-black">Overview</div>
              <div class="mt-2">{{ movie.overview }}</div>
            </div>

            <div v-if="credits !== null" class="mt-4">
              <div class="title font-weight-black">Featured Crew</div>

              <v-layout row wrap>
                <v-flex xs6 sm4 lg3 v-for="(crew, id) in featuredCrew" :key="id" class="mt-2">
                  <div class="font-weight-bold">{{ crew.name }}</div>
                  <div class="caption">{{ crew.job }}</div>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </section>

  <v-container class="my-container" grid-list-lg>
    <div class="title font-weight-bold white--text mb-2 mt-4">TOP BILLED CASTS</div>
    <v-layout v-if="credits !== null" row wrap mt-4>
      <v-flex xs6 sm3 lg2 v-for="cast in topCasts" :key="cast.id">
        <v-sheet @click="getCast(cast.id)" class="profile-wrapper white">
          <v-img v-if="cast.profile_path != null" max-height="220" class="profile-image" :lazy-src="`http://image.tmdb.org/t/p/w92/${cast.profile_path}`" :src="`http://image.tmdb.org/t/p/w342/${cast.profile_path}`"></v-img>

          <v-sheet min-height="220" class="text-xs-center profile-image" v-else>
            <v-icon size="100" class="mt-5">account_circle</v-icon>
          </v-sheet>

          <v-flex pa-3>
            <div class="font-weight-bold text-truncate">{{ cast.name }}</div>
            <div class="text-truncate caption mt-2">{{ cast.character }}</div>
          </v-flex>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</section>
</template>

<style lang="scss" scoped>
.backdrop {
  height: 610px;

  @media (max-width: 425px) {
    height: unset;
  }

  &::before {
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 0;
    background-color: rgba(5, 98, 197, 0.83);
  }
}

.poster {
  border-radius: 15px;

  @media (max-width: 768px) {
    margin-top: 40px;
  }

  @media (max-width: 425px) {
    margin-top: 15px;
    max-width: 200px;
  }
}

.profile-wrapper {
  border-radius: 20px 20px 8px 8px;
  cursor: pointer;
}

.profile-image {
  border-radius: 8px 8px 0 0;
}
</style>

<script>
import MoviesApi from "@/services/api";
import moment from 'moment'

export default {
  data: () => ({
    movie: null,
    credits: null
  }),

  props: ['id'],

  created() {
    MoviesApi.getSingleMovie(this.id).then(movie => {
        this.movie = movie
      }),

      MoviesApi.getCredits(this.id).then(credits => {
        this.credits = credits
      })
  },

  methods: {
    getCast(castId) {
      this.$router.push('/casts/' + castId)
    }
  },

  computed: {
    topCasts() {
      return this.credits.cast.slice(0, 6)
    },

    featuredCrew() {
      return this.credits.crew.slice(0, 6)
    }
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
