<template>
  <v-container fluid>
    <v-row>
      <v-col cols=12>
        <p class="title d-flex justify-center">{{ title }} Movies</p>
        <v-divider class="mb-4"></v-divider>
      </v-col>
      <v-col v-for="movie in movies" :key="movie.id" cols=6 sm=3>
        <v-card>
          <a :href="'/movies/' + movie.id + '/'">
            <v-img
              :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`"
            ></v-img>
            <v-card-title class="d-block text-truncate subtitle-1 white--text">{{ movie.title }}</v-card-title>
            <v-card-subtitle>{{ movie.release_date}}</v-card-subtitle>
          </a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script async>
export default {
  props:{
    title: {
      type: String,
      default:''
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      movies:[],
      apiKey: process.env.TMDB_API_KEY
    }
  },
  methods: {
    async getMovies() {
      const movies = await this.$axios.$get(`https://api.themoviedb.org/3/movie/${this.title.toLowerCase()}?api_key=${this.apiKey}`)
      this.movies = movies.results
    },
  },
  mounted() {
    this.getMovies();
  },
}

</script>

<style>
*{text-decoration:none}
/* * {
  text-decoration: none;
} */
</style>
