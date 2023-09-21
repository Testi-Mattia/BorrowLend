<template>
  <div>
    <div>
      <div class="select-trigger">
        <i v-if="!user" class="anonymous-icon" @click="loginWithGoogle"></i>
        <img v-if="user && user.photoURL" :src="store.user.photoURL" alt="Profile Picture" class="profile-picture" @click="toggleSelect">
        <p v-if="user && user.photoURL" class="username" @click="toggleSelect">{{ store.user.displayName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useCounterStore } from "@/store/counter.js";

export default {
  name: 'App',
  data() {
    return {
      user: null,
      store: null,
    };
  },
  methods: {
    loginWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((userCredential) => {
          // Login success
          this.user = userCredential.user;
          this.store.logIn();
          this.store.setUser(this.user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
        });
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Logout success
          this.user = null;
          this.store.logOut();
          this.store.setUser(null);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    toggleSelect() {
      if (this.user) {
        this.logout();
      } else {
        this.loginWithGoogle();
      }
    },
  },
  mounted() {
    this.store = useCounterStore();
    this.user = this.store.user;
  },
};
</script>

<style>
.select-trigger {
  position: relative;
  display: inline-block;
}

.anonymous-icon,
.profile-picture {
  display: inline-block;
  width: 50px;
  height: 40px;
  background-size: cover;
  cursor: pointer;
}

.anonymous-icon {
  background-image: url("https://cdn-icons-png.flaticon.com/512/16/16363.png"); /* Aggiungi il percorso all'icona anonima */
}

.profile-picture {
  border-radius: 50%;
  margin-left: 10px;
}

.username {
  display: inline-block;
  margin-left: 10px;
  font-size: 18px;
}

</style>
