<template>
<v-app>
  <v-navigation-drawer v-model="sideNav.model" disable-resize-watcher width="200" app overflow left persistent>
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <router-link class="primary--text" to="/">
            <v-icon class="primary--text">home</v-icon>
          </router-link>
        </v-list-tile-action>
        <v-list-tile-content>
          <router-link class="primary--text font-weight-bold" to="/">Home</router-link>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <router-link class="primary--text" to="#">
            <v-icon class="primary--text">info</v-icon>
          </router-link>
        </v-list-tile-action>
        <v-list-tile-content>
          <router-link class="primary--text font-weight-bold" to="#">Trending</router-link>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <router-link class="primary--text" to="#">
            <v-icon class="primary--text">info</v-icon>
          </router-link>
        </v-list-tile-action>
        <v-list-tile-content>
          <router-link class="primary--text font-weight-bold" to="#">Popular</router-link>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile class="mt-4 nav-search-field">
        <v-list-tile-content>
          <v-text-field type="search" v-model="searchEntry" @keyup.enter="searchMovie" placeholder="Search..." single-line append-icon="search" solo box flat hide-details></v-text-field>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar flat app class="primary white--text">
    <v-toolbar-title v-if="this.$vuetify.breakpoint.smAndUp" class="body-2 font-weight-black">
      <router-link to="#" class="white--text">TRENDING</router-link>
      <router-link to="#" class="white--text ml-4">POPULAR</router-link>
    </v-toolbar-title>

    <v-spacer v-if="this.$vuetify.breakpoint.smAndUp"></v-spacer>

    <router-link to="/" class="logo white--text">MOVIELYNE</router-link>

    <v-layout v-if="this.$vuetify.breakpoint.xsOnly" justify-end>
      <v-toolbar-side-icon @click.stop="sideNav.model = !sideNav.model" class="mx-0 white--text"></v-toolbar-side-icon>
    </v-layout>

    <v-spacer v-if="this.$vuetify.breakpoint.smAndUp"></v-spacer>

    <span v-if="this.$vuetify.breakpoint.smAndUp" class="search-box-wrapper">
      <v-text-field type="search" v-model="searchEntry" @keyup.enter="searchMovie" placeholder="Search..." single-line append-icon="search" outline flat hide-details></v-text-field>
    </span>
  </v-toolbar>

  <v-content class="secondary">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </v-content>
</v-app>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Monoton");

.logo {
  font-family: "Monoton", cursive;
  font-size: 1.6em;

  @media (max-width: 425px) {
    font-size: 1.1em;
  }
}

@media (max-width: 425px) {
  .search-box-wrapper {
    margin: 0 auto;
  }
}
</style>

<script>
import Home from "./views/index";

export default {
  name: "App",
  components: {
    Home
  },
  data() {
    return {
      searchEntry: '',
      sideNav: {
        model: false,
        type: "persistent",
        clipped: false,
        floating: false,
        mini: false,
        stateless: true,
        scrolled: false
      }
    };
  },
  methods: {
    searchMovie() {
      this.$router.push('/search/' + this.searchEntry)
      this.searchEntry = ''
    }
  },
};
</script>
