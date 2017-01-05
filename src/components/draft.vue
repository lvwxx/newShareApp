<template>
  <div >
    <div class="header">
      {{detail.nsTitle}}
    </div>
    <div class="hide-draft-div">
      {{detail.nsTitle}}
    </div>
    <div class="draft-pro">
      <img src="../assets/images/source.png" alt="">
      <span>{{detail.nsNewsSource}}</span>
      <img src="../assets/images/time.png" alt="">
      <span>{{detail.releaseDate}}</span>
    </div>
    <div class="content" v-html="detail.nsNewsContent">

    </div>
    <footers v-show="footerShow"></footers>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import Footer from './Footer.vue'
export default {
  data(){
    return {
      detail:"",
      footerShow:true,
    }
  },
  components:{
    footers:Footer,
  },
  mounted(){
    this.getData();
    var _this=this;
    window.addEventListener('scroll',function(){
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      var documentHeight=document.documentElement.offsetHeight;
      var screenHeight=window.screen.height;
      // console.log(scrollTop+screenHeight)
      if(scrollTop+screenHeight>=documentHeight){
        _this.footerShow=false;
      }else{
        _this.footerShow=true;
      }
    })

  },
  methods:{
    getData(){
      console.log(this.$route.params.id);
      var id=this.$route.params.id;
      var _this=this;
      axios.post('shareScene.do',qs.stringify({shareId:this.$route.params.id
        })).then(function(res){
        console.log(res);
        _this.detail=res.data;
      })
    },
  }
}
</script>

<style lang="css">
.header{
  position: fixed;
  top: 0;
  padding: 0.12rem 0.16rem 0.1rem 0.1rem;
  font-size: 0.2rem;
  color: #535353;
  font-weight: bold;
  background: white;
  z-index: 99;
}
.hide-draft-div{
  padding: 0.12rem 0.16rem 0.1rem 0.1rem;

  max-width: 590px;
  font-size: 0.2rem;
  visibility: hidden;
}
.draft-pro img{
  width: 0.14rem;
  vertical-align: sub;
}
.draft-pro img:nth-of-type(2){
  margin-left: 0.2rem;
}
.draft-pro{
  margin-top: 0.15rem;
  padding: 0 0.16rem 0.1rem;
  font-size: 0.11rem;
  color: #a4a4a4;
  border-bottom: 1px dashed #a4a4a4;
}
.content img{
  width: 100%;
}
.content{
  padding: 0.1rem 0.16rem 0;
}
</style>
