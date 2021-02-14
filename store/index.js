import orderBy from 'lodash/orderBy'
import firebase from '~/plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'


export const state = () => ({
  movies: [],
  login_user: null
})

export const mutations = {
  ...vuexfireMutations,
  setLoginUser(state, user) {
    state.login_user = user
  },
  deleteLoginUser(state) {
    state.login_user = null
  }
}

export const getters = {
  allMovies: state => {
    return state.movies
  },
  movieCount: state => {
    return state.movies.length
  },
  getRangeByPage: state => {
    return page => {
      const SIZE = 3
      return orderBy(state.movies, 'created', 'desc').slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
    }
  },
  userName: state => state.login_user ? state.login_user.displayName : '',
  photoURL: state => state.login_user ? state.login_user.photoURL : '',
  uid: state => state.login_user ? state.login_user.uid : null,
  getMovieById: state => id => state.movies.find(movie => movie.movieId == id )
}

export const actions = {
  login() {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider)
  },
  logout() {
    firebase.auth().signOut()
  },
  setLoginUser({commit}, user) {
    commit('setLoginUser', user)
  },
  deleteLoginUser({commit}) {
    commit('deleteLoginUser')
  },
  init: firestoreAction(({ bindFirestoreRef, getters }) => {
    const moviesRef = firebase.firestore().collection(`users/${getters.uid}/movies`)
    bindFirestoreRef('movies', moviesRef)
  }),
  add: firestoreAction(({ getters }, obj) => {
    const moviesRef = firebase.firestore().collection(`users/${getters.uid}/movies`)
    moviesRef
      .doc(obj.movieId)
      .set({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        poster_path: obj.poster_path,
        date: obj.date,
        who: obj.who,
        good: obj.good,
        bad: obj.bad,
        movieId: obj.movieId,
        title: obj.title,
    })
  }),
  remove: firestoreAction(({ getters }, id) => {
    const moviesRef = firebase.firestore().collection(`users/${getters.uid}/movies`)
    moviesRef.doc(id).delete()
  }),
}
