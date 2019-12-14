<template>
  <div id="app">
    <router-view/>
    <!-- <el-button @click='button_handle()'>click test</el-button> -->
  </div>
</template>


<script>
import DataManager from './components/DataManager'
export default {
  name: '',
  data () {
    return {}
  },
  methods:{
    button_handle(){
      console.log('click')
      DataManager.test({'key': 'value'}).then((res) => {
        console.log(res)
      }).catch(err => {
        if(err){
          console.log(err)
          return;
        }
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
}

</style>
