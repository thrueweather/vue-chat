<template>
  <div id="app">
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
  box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.3);
}
#app {
  background-color: #ececec;
  font-family: 'Lato', sans-serif;
  display: flex;
  align-items: center;
  height: 100vh;
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1170px;
  }
}
@media only screen and (max-width : 991px) {
	.chat {
		width: 60%;
	}
}
@media only screen and (max-width : 767px) {
	.chat {
		width: 70%;
	}
}
@media only screen and (max-width : 320px) {
	.chat {
		width: 100%;
	}
}
</style>