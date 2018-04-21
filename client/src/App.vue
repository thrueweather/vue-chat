<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div id="chat" class="chat">
	    <NavBar/>
	    <router-view/>
	</div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  data: () => ({
  	
  }),
  components: { NavBar }
}
</script>

<style>
@import url("https://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
body {
  margin: 0;
}
.chat {
  background-color: white;
  width: 50%;
  margin: auto;
}
#app {
  background-color: #ececec;
  font-family: 'Lato', sans-serif;
  height: 100vh;
}
</style>
