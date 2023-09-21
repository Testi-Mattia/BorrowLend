import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import App from "./App.vue";


const firebaseConfig = {
  apiKey: "AIzaSyB9FtfO_BDczNeJpksoARoRcXYJqsjgVQ8",
  authDomain: "borrowlend-442c1.firebaseapp.com",
  databaseURL: "https://borrowlend-442c1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "borrowlend-442c1",
  storageBucket: "borrowlend-442c1.appspot.com",
  messagingSenderId: "939338763741",
  appId: "1:939338763741:web:ae0e3d4e987cb48e57fa34",
  measurementId: "G-K7L7057GLN"

};

const app = createApp(App);
const pinia = createPinia();
const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);
getDatabase(firebaseApp);

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("counter", JSON.stringify(state.counter));
  },
  { deep: true }
);

app.use(pinia);
app.mount("#app");

