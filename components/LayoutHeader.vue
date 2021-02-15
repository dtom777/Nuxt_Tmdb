<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-container>
        <v-list nav>
          <v-list-item v-show="$store.state.login_user">
            <v-list-item-avatar>
              <v-img v-if="photoURL" :src="photoURL"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ userName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mb-2"></v-divider>
          <template v-for="nav_list in nav_lists">
            <v-list-item
              v-if="!nav_list.lists"
              :to="nav_list.link"
              :key="nav_list.name"
              @click="menu_close"
            >
              <v-list-item-icon>
                <v-icon>{{ nav_list.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ nav_list.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-group
              v-else
              no-action
              :prepend-icon="nav_list.icon"
              :key="nav_list.name"
              v-model="nav_list.active"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ nav_list.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="list in nav_list.lists"
                :key="list.name"
                :to="list.link"
              >
              <v-list-item-title>
                {{ list.name }}
              </v-list-item-title>
              </v-list-item>
            </v-list-group>
          </template>
        </v-list>
        <v-divider></v-divider>
        <MovieSearch />
      </v-container>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>{{ iconMenu }}</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn color="red" @click="logout" v-if="$store.state.login_user" aria-label="Logout">LOGOUT</v-btn>
      <v-btn color="info" @click="login" v-else aria-label="Login">LOGIN</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions,mapGetters } from 'vuex'
import { mdiHome, mdiMovie, mdiWardrobe, mdiMenu } from '@mdi/js'

export default {
  data () {
    return {
      iconMenu: mdiMenu,
      clipped: false,
      drawer: false,
      nav_lists:[
        {
          name: 'Home',
          icon: mdiHome,
          link: '/'
        },
        {
          name: 'Movie',
          icon: mdiMovie,
          link: '',
          active: false,
          lists:[
            {
              name :'Popular', link:'/movies/popular'
            },
            {
              name :'Top Rated', link:'/movies/toprated'
            },
            {
              name :'Upcoming', link:'/movies/upcoming'
            },
          ]
        },
        {
          name: 'Storage',
          icon: mdiWardrobe,
          link: '/storage'
        },
      ],
      miniVariant: false,
      title: 'Nuxt × TMDB'
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, photoURL } = user
        this.setLoginUser({ uid, displayName, photoURL})
        this.$store.dispatch('init')
      } else {
        this.deleteLoginUser()
        this.$router.push('/')
      }
    })
  },
  computed: {
    ...mapGetters(['userName', 'photoURL','getMovieById'])
  },
  methods:{
    ...mapActions(['login','setLoginUser','logout','deleteLoginUser']),
    menu_close(){
      this.nav_lists.forEach( nav_list => nav_list.active = false)
    }
  },
}
</script>
