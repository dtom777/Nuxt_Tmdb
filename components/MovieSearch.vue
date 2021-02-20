<template>
  <div>
    <v-form ref="form" @submit.prevent>
      <v-text-field
        type="text"
        v-model="query"
        placeholder="Serach Movies"
        :prepend-inner-icon="iconMagnify"
        @keyup="SearchMovie"
        clearable
        class="mt-4"
      ></v-text-field>
    </v-form>
    <v-list v-show="movies" class="mt-4">
      <template v-for="movie in movies">
        <v-list-item :key="movie.id" :to="'/movies/' + movie.id + '/'">
          <v-list-item-avatar tile width="41" height="63">
            <v-img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`"
              class="rounded"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="d-block text-truncate subtitle-1 white--text">{{ movie.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ new Date(movie.release_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
export default {
  data() {
    return {
      query: '',
      movies: [],
      apiKey: process.env.TMDB_API_KEY,
      iconMagnify: mdiMagnify
    }
  },
  methods: {
    async SearchMovie() {
      if (this.query.trim() != ''){
        const movies = await this.$axios.$get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.query}`)
      this.movies = movies.results
      console.log(this.movies)
      }
    }
  },
}
</script>
