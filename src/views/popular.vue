<template>
<v-container v-if="popularMovies.results" grid-list-lg>
  <div class="title font-weight-bold white--text mb-2">POPULAR MOVIES</div>
  <MovieCard :movies="popularMovies.results" />

  <div style="max-width: 600px" class="text-xs-center mt-5 mx-auto">
    <v-pagination class="white--text caption" v-model="page" circle :length="popularMovies.total_pages" @input="pageChange"></v-pagination>
  </div>
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
    page: 1
  }),

  components: {
    MovieCard
  },

  methods: {
    pageChange() {
      this.$store.dispatch("GET_POPULAR_MOVIES", this.page)
    }
  },

  created() {
    this.$store.dispatch("GET_POPULAR_MOVIES", this.page)
  },

  computed: mapState(["popularMovies"]),

  filters: {
    formatDate: function (date) {
      if (!date) return "";
      date = date.substr(0, 10);
      return date ? moment(date).format("YYYY") : "";
    }
  }
};
</script>
