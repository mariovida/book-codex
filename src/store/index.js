import { createStore } from "vuex";
import router from '@/router'
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default createStore({
  state: {
    user: null,
    displayName: null
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user,
      state.displayName = user.displayName
    },
    CLEAR_USER (state) {
      state.user = null
    },
    SET_USED_MAIL_ERROR (state) {
      state.error = "Unesena e-mail adresa se već koristi!";
    },
    SET_INVALID_MAIL_ERROR (state) {
      state.error = "Neispravna e-mail adresa!";
    },
    SET_WEAK_PASS_ERROR (state) {
      state.error = "Slaba lozinka!";
    },
    NO_USER_ERROR (state) {
      state.error = "Kriva e-mail adresa ili lozinka.";
    },
    PASSWORD_ERROR (state) {
      state.error = "Kriva e-mail adresa ili lozinka.";
    },
  },
  actions: {
    async login ({ commit }, details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            //alert("User not found")
            commit('NO_USER_ERROR')
            break
          case 'auth/wrong-password':
            //alert("Wrong password")
            commit('PASSWORD_ERROR')
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/profil')
    },

    async register ({ commit }, details) {
      const { name, email, password } = details
      const username = name

      try {
        await createUserWithEmailAndPassword(auth, email, password)
        updateProfile(auth.currentUser, {
          displayName: username
        })
      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            // alert("Unesena e-mail adresa se već koristi!")
            commit('SET_USED_MAIL_ERROR')
            break
          case 'auth/invalid-email':
            //alert("Neispravna e-mail adresa!")
            commit('SET_INVALID_MAIL_ERROR')
            break
          case 'auth/weak-password':
            //alert("Slaba lozinka!")
            commit('SET_WEAK_PASS_ERROR')
            break
          default:
            alert("Something went wrong!")
        }

        return
      }

      //commit('SET_USER', auth.currentUser)
      commit('CLEAR_USER')
      router.push('/')
    },
    async logout ({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/')
    },

    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user, user.displayName)

          if (router.isReady() && router.currentRoute.value.path === '/prijava') {
            router.push('/profil')
          }
          if (router.isReady() && router.currentRoute.value.path === '/registracija') {
            router.push('/profil')
          }
        }
      })
    }
  },
  modules: {},
});
