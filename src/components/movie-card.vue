<template>
<v-layout justify-center v-if="movies" row wrap>
  <v-flex xs6 sm3 lg2 v-for="(movie, i) in movies" :key="i">
    <div v-if="movie.poster_path != null">
      <v-hover>
        <v-img class="poster" slot-scope="{ hover }" :lazy-src="`http://image.tmdb.org/t/p/w92/${movie.poster_path}`" :src="`http://image.tmdb.org/t/p/w342/${movie.poster_path}`" alt="Poster">
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </template>

          <v-expand-transition>
            <div v-if="hover" class="white--text secondary darken-2 v-card--reveal py-4 px-2" style="height: 100%;">
              <div class="font-weight-black text-uppercase caption movie-title">{{ movie.title }}</div>

              <div class="mt-1 mb-4">
                <span class="font-weight-bold primary--text">{{ movie.release_date | formatDate }}</span>
                <v-avatar size="30" style="float: right" small color="primary" class="white--text caption">{{ movie.vote_average }}</v-avatar>
              </div>

              <div class="caption overview">{{ movie.overview }}</div>

              <v-btn @click="getMovie(movie.id)" small flat class="primary caption mx-0">VIEW DETAILS</v-btn>
            </div>
          </v-expand-transition>
        </v-img>
      </v-hover>
    </div>

    <div v-else>
      <v-hover>
        <v-sheet class="poster white" slot-scope="{ hover }">
          <v-expand-transition>
            <div v-if="hover" class="white--text secondary darken-2 v-card--reveal py-4 px-2" style="height: 100%; border-radius: 6.5px">
              <div class="font-weight-black text-uppercase caption movie-title">{{ movie.title }}</div>

              <div class="mt-1 mb-4">
                <span class="font-weight-bold primary--text">{{ movie.release_date | formatDate }}</span>
                <v-avatar size="30" style="float: right" small color="primary" class="white--text caption">{{ movie.vote_average }}</v-avatar>
              </div>

              <div class="caption overview">{{ movie.overview }}</div>

              <v-btn @click="getMovie(movie.id)" small flat class="primary caption mx-0">VIEW DETAILS</v-btn>
            </div>

            <div class="v-card--reveal-2 font-weight-bold black--text" v-else>
              No Image
            </div>
          </v-expand-transition>
        </v-sheet>
      </v-hover>
    </div>
  </v-flex>
</v-layout>
</template>

<style lang="scss" scoped>
.v-card--reveal {
  opacity: .9;
  display: block !important;
}

.v-card--reveal-2 {
  align-items: center;
  top: 50%;
  text-align: center;
  justify-content: center;
  position: absolute;
  width: 100%;
}

.poster {
  border-radius: 8px;

  @media (min-width: 320px) {
    height: 206px;
  }

  @media (min-width: 375px) {
    height: 245px;
  }

  @media (min-width: 425px) {
    height: 267px;
  }
}

.movie-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 155px;

  @media (max-width: 375px) {
    max-width: 100px;
  }
}

.overview {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-height: 90px;
  margin-bottom: 10px;

  @media (max-width: 425px) {
    max-height: 70px;
  }

  @media (max-width: 375px) {
    max-height: 40px;
  }
}
</style>

<script>
import moment from 'moment'
import {
  mapState
} from "vuex";

export default {
  props: ['movies'],

  methods: {
    getMovie(id) {
      this.$router.push('/movie/' + id)
    }
  },

  computed: {
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
  },

  filters: {
    formatDate: function (date) {
      if (!date) return ''
      date = date.substr(0, 10)
      return date ? moment(date).format('YYYY') : ''
    }
  }
};
</script>
