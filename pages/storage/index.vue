<template>
  <v-container fluid>
    <v-row>
      <v-col cols=12>
        <p class="title d-flex justify-center">Your Storage</p>
        <v-divider class=""></v-divider>
      </v-col>
      <v-col cols=12>
        <p class="d-flex justify-center">{{ movieCount }} movie records have been recorded !</p>
      </v-col>
      <v-col :class='{ "px-0" : $vuetify.breakpoint.xsOnly }'>
        <ul :class='{ "px-0" : $vuetify.breakpoint.xsOnly }'>
          <li class="d-flex mb-4" v-for="movie in movies" :key="movie.id">
            <v-col cols=6 sm=4>
              <v-card>
                <v-img
                  :src="`http://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`"
                  max-width=""
                  class="rounded"
                ></v-img>
                <div :class='{"d-flex justify-space-between": $vuetify.breakpoint.smAndUp}'>
                  <v-btn :href="'/movies/' + movie.movieId + '/'" class="blue" :width="$vuetify.breakpoint.smAndUp ? '50%': '100%'"  :small='$vuetify.breakpoint.xsOnly' aria-label="Edit Movie"><v-icon>{{ iconPencil }}</v-icon>EDIT</v-btn>
                  <v-btn @click="remove(movie.id)" class="red" :width="$vuetify.breakpoint.smAndUp ? '50%': '100%'" :small='$vuetify.breakpoint.xsOnly' aria-label="Delete Movie"><v-icon>{{ iconDelete }}</v-icon>DELETE</v-btn>
                </div>
              </v-card>
            </v-col>
            <v-col cols=6 sm=4>
              <div>
                <v-text-field
                  v-model="movie.title"
                  label="Title"
                  readonly
                  :prepend-inner-icon="iconMovie"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="movie.date"
                  label="Watched date"
                  readonly
                  :prepend-inner-icon="iconCalendar"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="movie.who"
                  label="Recommend for"
                  readonly
                  :prepend-inner-icon="iconKiss"
                  outlined
                ></v-text-field>
                <div :hidden='$vuetify.breakpoint.smAndUp'>
                  <v-textarea
                    v-model="movie.good"
                    label="Good thing"
                    readonly
                    :prepend-inner-icon="iconHandOkay"
                    outlined
                    rows="2"
                  ></v-textarea>
                  <v-textarea
                    v-model="movie.bad"
                    label="Bad thing"
                    readonly
                    :prepend-inner-icon="iconHandLeft"
                    outlined
                    rows="2"
                  ></v-textarea>
                </div>
              </div>
            </v-col>
            <v-col cols=4 sm=4 :hidden='$vuetify.breakpoint.xsOnly'>
              <div>
                <v-textarea
                  v-model="movie.good"
                  label="Good thing"
                  readonly
                  prepend-inner-icon="mdi-hand-okay"
                  outlined
                ></v-textarea>
                <v-textarea
                  v-model="movie.bad"
                  label="Bad thing"
                  readonly
                  prepend-inner-icon="mdi-hand-left"
                  outlined
                ></v-textarea>
              </div>
            </v-col>
          </li>
        </ul>
        <v-pagination :length="length" v-model="page" @input="onchange" :prev-icon="iconMenuLeft" :next-icon="iconMenuRight"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script defer>
import { mapGetters } from 'vuex'
import { mdiPencil, mdiDelete, mdiMovie, mdiCalendar, mdiEmoticonKiss, mdiHandOkay, mdiHandLeft, mdiMenuLeft, mdiMenuRight } from '@mdi/js'

export default {
  head() {
    return {
      title: 'storage'
    }
  },
  data() {
    return {
      iconPencil: mdiPencil,
      iconDelete: mdiDelete,
      iconMovie: mdiMovie,
      iconCalendar: mdiCalendar,
      iconKiss: mdiEmoticonKiss,
      iconHandOkay: mdiHandOkay,
      iconHandLeft: mdiHandLeft,
      iconMenuLeft: mdiMenuLeft,
      iconMenuRight: mdiMenuRight,
      movie: '',
      page: 1,
      length:0,
      pageSize: 3,
      movies: []
    }
  },
  computed: mapGetters(['movieCount', 'getRangeByPage']),
  created() {
    this.$store.dispatch('init')
  },
  methods:{
    remove(id) {
      this.$store.dispatch('remove', id)
    },
    onchange(page) {
      this.movies = this.getRangeByPage(page)
    }
  },
  beforeUpdate() {
    this.onchange(this.page)
    this.length = Math.ceil(this.movieCount/this.pageSize);
  },
  mounted() {
    console.log(process.env.NODE_ENV);
  }
}
</script>

<style scoped>
li{list-style:none}@media screen and (max-width: 600px){.v-text-field{height:65px;font-size:12px}.v-textarea{height:73px}}
/* li {
  list-style: none;
}
@media screen and (max-width: 600px) {
  .v-text-field {
    height: 65px;
    font-size: 12px;
  }
  .v-textarea {
    height: 73px;
  }
} */
</style>>
