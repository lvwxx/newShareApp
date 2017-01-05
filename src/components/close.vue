<template>
  <div class="">
    <div class="null-img">
      <img src="../assets/images/null.png" alt="">
      <p>该新闻已经关闭</p>
    </div>
    <footers v-show="footerShow"></footers>
  </div>
</template>

<script>
import Footer from './Footer.vue'
export default {
  data(){
    return {
      footerShow:true,
    }
  },
  components:{
    footers:Footer,
  },
}
</script>

<style>
.null-img{
  display: block;
  color:#a4a4a4;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform:translate(-50%,-50%);
          transform:translate(-50%,-50%);
}
.null-img img{
  width: 1.3rem;
}
</style>
