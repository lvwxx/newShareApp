<template>
  <div>
    <keep-alive>
      <scene></scene>
    </keep-alive>
  </div>
</template>

<script>
import Scene from './components/Scene'

export default {
  data(){
    return {
      swiperOption: {}
    }
  },
  components:{
    Scene,

  },
  methods:{

  },
}
</script>

<style>
body{
  font-size: 0.16rem;
  background: #fff;
}
[v-cloak]{
  display: none;
}
#app {
  width: 100%;
}
.clearfix:after{
  content: ".";
  height: 0;
  visibility: hidden;
  display: block;
  clear: both;
}

</style>
