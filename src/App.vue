<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button v-on:click="getData()">Say what</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
          getData(){
            this.$http.get('http://localhost:8001/api/test').then(function(re){
              alert(re.bodyText);
              },function(){
                  console.log("get email error")
              })
          }
      }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
