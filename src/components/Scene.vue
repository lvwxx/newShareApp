<template>
  <div v-cloak>
    <div class="scene-detail-box">
      <div class="scene-detail-title" ref="title">
        {{sceneDetail.nsTitle}}
      </div>
      <div class="hide-div" ref="title">
        {{sceneDetail.nsTitle}}
      </div>
      <div class="scene-detail-content" ref="detailContent">
        <div class="read-count">
          <span>{{sceneDetail.reportCount}}报道</span>
          <span>{{sceneDetail.pvCount}}人阅读</span>
        </div>
        <div class="scene-detail-intro">
          {{sceneDetail.nsIntro}}
        </div>
        <div class="scene-pro clearfix">
          <img :src="sceneDetail.userAvatar" class="person-img">
          <div>
            <span class="news-author" >创建人：{{sceneDetail.userNickName}}</span>
            <span >{{sceneDetail.releaseDate}}</span>
            <p class="new-address">地点：{{sceneDetail.nsAddress}}</p>
          </div>
        </div>
        <img src="../assets/images/map-3.png" alt="" class="scene-map" v-if="mapNum==3">
        <img src="../assets/images/map-1.png" alt="" class="scene-map" v-if="mapNum==1">
        <img src="../assets/images/map-2.png" alt="" class="scene-map" v-if="mapNum==2">
        <img src="../assets/images/map-4.png" alt="" class="scene-map" v-if="mapNum==4">
        <img src="../assets/images/map-5.png" alt="" class="scene-map" v-if="mapNum==5">
      </div>
    </div>
    <div class="scene-menu" ref="menu">
      <a :class="{active: isActive }" ><span @click="changeLive">现场直播</span></a>
      <a :class="{active: !isActive }" ><span @click="changeChat">边看边聊</span></a>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>

</template>

<script>
import axios from 'axios'
import isSupportSticky from '../assets/js/sticky.js'
import qs from 'qs'
export default {
  data(){
    return {
      sceneDetail:"",
      page:1,
      isActive:true,
      mapNum:1,
    }
  },
  mounted(){
    var mapNumber=Math.ceil(Math.random()*5);
    this.mapNum=mapNumber;
    this.getData()
    var _this=this;
    function scrollMenu(){
      if(_this.$refs.title==undefined){
        return ;
      }
      var height=_this.$refs.title.offsetHeight;
      _this.$refs.menu.style.top=height-1+'px';
      if(isSupportSticky()){
        _this.$refs.menu.className="sticky-menu";
        // console.log(_this.$refs.detailContent.offsetHeight,document.body.scrollTop)
      }else{
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(scrollTop>_this.$refs.detailContent.offsetHeight){
          _this.$refs.menu.className="fixed-menu";
        }else{
          _this.$refs.menu.className="scene-menu";
        }
      }
    }
    document.addEventListener('scroll',scrollMenu);
    document.addEventListener('touchmove',scrollMenu);
  },
  methods:{
    changeLive(){
      this.isActive=true;
      var id=this.$route.params.id;
      this.$router.push('/index/SceneId='+id);
    },
    changeChat(){
      this.isActive=false;
      var id=this.$route.params.id;
      this.$router.push('/chat/SceneId='+id);
    },
    getData(){
      console.log(this.$route.params.id);
      var id=this.$route.params.id;
      var _this=this;
      axios.post('shareScene.do',qs.stringify({shareId:this.$route.params.id
        })).then(function(res){
        console.log(res,res.data);
        if(res.data==null){
          _this.$router.push('/close');
          return;
        }
        _this.sceneDetail=res.data;
      })
    },

  }

}
</script>

<style>
.scene-detail-box{
  width: 100%;
  padding: 0 0.16rem;
  box-sizing: border-box;
}
.scene-detail-title{
  position: fixed;
  top: 0;left: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 0.1rem 0.16rem 0.1rem;
  background: #fff;
  color: #535353;
  font-size: 0.20rem;
  font-weight: bold;
  z-index: 9999;
}
.hide-div{
  box-sizing: border-box;
  width: 100%;
  padding: 0.1rem 0.16rem 0.1rem;
  background: #fff;
  color: #535353;
  font-size: 0.20rem;
  font-weight: bold;
  visibility: hidden;
}
.scene-detail-content{
  padding-top: 0.1rem;
  font-size: 0.12rem;
  color: #a4a4a4;
  border-top: 1px dashed #535353;
}
.scene-detail-intro{
  margin-top: 0.15rem;
  margin-bottom: 0.15rem;
  line-height: 0.22rem;
}
.read-count{
  overflow: hidden;
}
.read-count span{
  font-size: 0.12rem;
  color:#000;
}
.read-count span:nth-child(2){
  margin-left: 0.16rem;
}
.person-img{
  width: 0.2rem;
  float: left;
  border-radius: 50%;
}
.news-author{
  margin-right: 0.1rem;
  color: #535353;
}
.scene-pro div{
  float: left;
  margin-left: 0.1rem;
  margin-top: -0.05rem;
}
p.new-address{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
  overflow:hidden;
  width: 2.9rem;
}
.scene-map{
  display: block;
  margin-top: 0.15rem;
  width: 100%;
  height: 1rem;
  object-fit: cover;
}
.scene-menu{
  margin-top: 0.05rem;
  padding: 0 0.3rem;
  color: #535353;
  font-size: 0.14rem;
}
.sticky-menu {
  position: -webkit-sticky;
  position: sticky;
  margin-top: 0.05rem;
  padding: 0 0.3rem;
  color: #535353;
  font-size: 0.14rem;
  z-index:2;
  background: #fff;
}

.fixed-menu {
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: 0 0.3rem;
  color: #535353;
  font-size: 0.14rem;
  z-index:2;
}
.scene-menu a,.sticky-menu a,.fixed-menu a{
  display: inline-block;
  width: 0.8rem;
  height: 0.18rem;
  line-height: 0.18rem;
  text-align: center;
  color:#535353;
  margin-left: 0.5rem;
}
.active{
  border-bottom: 2px solid #c20000;
}
a{
  color:#535353;
}
</style>
