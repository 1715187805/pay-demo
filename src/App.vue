<template>
  <div id="app">


      <router-view></router-view>

  </div>
</template>

<script>



export default {
    name: 'App',
    data:()=>{
        return {

        }
    },
    components: {

    },
    mounted(){

    },
    methods:{}

}
</script>

<style>
    body{
        background-color: #F5F5F5;
        padding: 0;
    }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;


}

</style>
