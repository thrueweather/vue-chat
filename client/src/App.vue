<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url("https://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
body {
  margin: 0;
}
#app {
  background-color: #ececec;
  font-family: 'Lato', sans-serif;
  height: 100vh;
}
</style>
