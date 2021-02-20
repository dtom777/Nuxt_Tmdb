<template>
  <v-container fluid>
    <v-row>
      <v-col cols=12>
        <p class="title d-flex justify-center page-title">Now Playing Movie</p>
        <v-divider class="mb-4"></v-divider>
      </v-col>
      <v-col v-for="movie in results" :key="movie.id" cols=6 sm=3>
        <v-card>
          <a rel="preload" :href="'/movies/' + movie.id + '/'">
            <v-img
              :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`"
              class="rounded"
            ></v-img>
            <v-card-title class="d-block text-truncate subtitle-1 white--text">{{ movie.title }}</v-card-title>
            <v-card-subtitle>{{ movie.release_date}}</v-card-subtitle>
          </a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({$axios, $config }) {
    const { results } = await $axios.$get(
      `${$config.apiUrl}/movie/now_playing?api_key=${$config.tmdbApiKey}`
      )
      return { results }
  },
}
</script>

<style>
*{text-decoration:none}
/* * {
  text-decoration: none;
} */
</style>
