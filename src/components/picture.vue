<template>
  <div class="mg-bg swiper-container" @click="closePic">
    <swiper :options="swiperOption" ref="mySwiperA">
       <swiper-slide v-for="slide in swiperSlides"><img :src="slide" alt=""></swiper-slide>
    </swiper>
    <div class="swiper-pagination"  slot="pagination"></div>
  </div>

</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data(){
    return{
      swiperOption: {
        notNextTick: true,
        pagination : '.swiper-pagination',
      },
      swiperSlides:[]
    }
  },
  props:["ImgArr","number"],
  component:{
    swiper,
    swiperSlide
  },
  computed: {
   swiper() {
     return this.$refs.mySwiperA.swiper
   }
 },
 methods:{
   closePic(){
     this.$emit('closePic')
   }
 },
  mounted() {
    var imgArray=[];
    console.log(this.ImgArr[1])
    for(var i=0;i<this.ImgArr.length;i++){
      if(this.ImgArr[i]!=""){
        imgArray.push(this.ImgArr[i]+"?x-oss-process=style/cover_detail")
      }
    }
    this.swiperSlides=imgArray;
    console.log(this.swiperSlides)
    this.swiper.slideTo(this.number, 0, false)
 }
}
</script>

<style>

.swiper-slide img{
  position: absolute;
  top: 50%;left: 50%;
  transform: translate(-50%,-50%);
  max-width: 100%;
  max-height: 100%;
}
.mg-bg.swiper-container{
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  top:0;
  width:100%;
  height: 100%;
  background-color: rgba(0, 0,0, 0.9);
  z-index: 99999;
  overflow: hidden;
}
.swiper-container {
  top:0.35rem;
  height: 90%
}

</style>
