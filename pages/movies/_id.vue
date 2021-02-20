<template>
  <v-container fluid>
    <v-row>
      <v-col align-self="center" cols=12 sm=8>
          <!-- <h1 class="font-weight-bold">{{ movie.title }}</h1> -->
          <h2 class="font-weight-bold">{{ movie.title }}</h2>
          <h3 class="subtitle-1 font-weight-light font-italic" v-show="movie.tagline">〜{{ movie.tagline }}〜</h3>
          <p class="body-2">{{ movie.overview }}</p>
          <p class="font-weight-light">
            {{ new Date(movie.release_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}}(Released)
          </p>
          <v-chip-group column>
            <v-chip outlined label class="font-weight-bold"  :small='$vuetify.breakpoint.xsOnly'>Genres</v-chip>
            <v-chip v-for="genre in genres" :key="genre" class="font-weight-light" :small='$vuetify.breakpoint.xsOnly'>{{ genre }}</v-chip>
          </v-chip-group>
          <v-chip-group column>
            <v-chip outlined label class="font-weight-bold" :small='$vuetify.breakpoint.xsOnly'>Cast</v-chip>
            <v-chip class="font-weight-light" :small='$vuetify.breakpoint.xsOnly'>{{ credits[0] }}</v-chip>
            <v-chip class="font-weight-light" :small='$vuetify.breakpoint.xsOnly'>{{ credits[1] }}</v-chip>
            <v-chip class="font-weight-light" :small='$vuetify.breakpoint.xsOnly'>{{ credits[2] }}</v-chip>
          </v-chip-group>
          <div>
            <v-chip outlined label class="font-weight-bold" :small='$vuetify.breakpoint.xsOnly'>Popularity</v-chip>
            <v-rating
              :empty-icon="iconStarOutline"
              :full-icon="iconStar"
              :half-icon="iconStarHalf"
              :value="movie.vote_average/2"
              length="5"
              readonly
              size="35"
              color="orange"
              class="d-inline"
              :class='{ "px-0": $vuetify.breakpoint.xsOnly }'
            ></v-rating>
            <p class="d-inline">{{ Math.round(movie.vote_average/2 * 10) /10 }} / 5</p>
          </div>
      </v-col>
      <v-col cols=12 sm=4>
        <v-img
          :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
          class="rounded"
        ></v-img>
      </v-col>
      <v-col cols="12">
        <v-form ref="form">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Watched date"
                :prepend-inner-icon="iconCalendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="date"
              :max="new Date().toISOString().substr(0, 10)"
              min="1980-01-01"
              @change="preserve"
            ></v-date-picker>
          </v-menu>
          <v-select
            v-model="who"
            :items="items"
            label="Who do you recommend to?"
            :prepend-inner-icon="iconKiss"
          ></v-select>
          <v-textarea
            v-model="good"
            outlined
            :prepend-inner-icon="iconHandOkay"
            label="Good thing"
            hide-details="auto"
            class="mt-4"
            rows="3"
          ></v-textarea>
          <v-textarea
            v-model="bad"
            outlined
            :prepend-inner-icon="iconHandLeft"
            label="Bad thing"
            hide-details="auto"
            class="mt-4"
            rows="3"
          ></v-textarea>
          <div class="d-flex justify-center">
            <v-btn @click="add" class="mt-4 py-4 mr-4" color="blue" aria-label="Save">Save</v-btn>
            <v-btn @click="reset" class="mt-4 py-4" outlined aria-label="Clear">Clear</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiCalendar, mdiEmoticonKiss, mdiHandOkay, mdiHandLeft, mdiStarOutline, mdiStar, mdiStarHalfFull} from '@mdi/js'
// import axios from 'axios'
// import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: String
    }
  },
  head() {
    return {
      title: 'moives'
    }
  },
  data() {
    return {
      iconCalendar: mdiCalendar,
      iconKiss: mdiEmoticonKiss,
      iconHandOkay: mdiHandOkay,
      iconHandLeft: mdiHandLeft,
      iconStarOutline: mdiStarOutline,
      iconStar: mdiStar,
      iconStarHalf: mdiStarHalfFull,
      value: 5,
      menu: false,
      date: null,
      who: '',
      items: ['Family', 'Lover', 'Fridends', 'Coworker'],
      good: '',
      bad: '',
      movieId: this.$route.params.id,
    }
  },
  watch: {
    menu(val){
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  async asyncData({ $axios, $config, params }) {
    const movie = await $axios.$get(`${$config.apiUrl}/movie/${params.id}?api_key=${$config.tmdbApiKey}`)
    const credits = await $axios.$get(`${$config.apiUrl}/movie/${params.id}/credits?api_key=${$config.tmdbApiKey}`)
      return { movie, genres: movie.genres.map(obj => obj.name), credits: credits.cast.map(obj => obj.name)}
  },
  methods: {
    preserve(date){
      this.$refs.menu.save(date)
    },
    add() {
      let obj = {
        poster_path: this.movie.poster_path,
        date: this.date,
        who: this.who,
        good: this.good,
        bad: this.bad,
        movieId: this.movieId,
        title: this.movie.title
      }
      this.$store.dispatch('add', obj)
      this.date = ''
      this.who = ''
      this.good = ''
      this.bad = ''
      alert('Save completed!')
      this.$router.push('/storage')
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>
