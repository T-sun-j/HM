<template>
  <div>
    <!-- <indexHeader></indexHeader> -->

    <div class="slide">
      <van-swipe class="my-swipe" :autoplay="1000" indicator-color="white">
        <van-swipe-item>
          <img class="slide-img" src="../assets/img/banner-4.png" alt="" />
          <wx-open-launch-weapp
            style="
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
            "
            id="launch-btn1"
            username="gh_c965586ee466"
            path="pages/index/index"
          >
            <div
              v-is="'script'"
              type="text/wxtag-template"
              style=" position: absolute;
              top: 0;
              left: 0;display: block; width: 100%; height: 100%"
            >
            <div style=" position: absolute;
              top: 0;
              left: 0;display: block; width: 100%; height: 100%" class="open-btn">打开小程序</div>
            </div>
          </wx-open-launch-weapp>
        </van-swipe-item>
        <van-swipe-item v-for="(item,index) in focusMap" :key="index">
          <img @click="gotoThat(item)" class="slide-img" :src="env.imgUrl+item.pic" alt="" />
        </van-swipe-item>
        
        
      </van-swipe>
    </div>
    <div class="index-main">
      <index-title>热门搜索</index-title>
      <div class="tags">
        <div v-for="(item,index) in hotspot" :key="index" @click="goto(item)" class="tag">{{ item.title }}</div>
        
      </div>
      <div class="hot-zone">
        <index-title>您可能感兴趣</index-title>
      </div>
    </div>
    <div class="hot-list">
      <div class="wx-box">
        <wx-open-launch-weapp
            style="
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
            "
            id="launch-btn2"
            username="gh_c965586ee466"
            path="pages/register/register"
          >
            <div
              v-is="'script'"
              type="text/wxtag-template"
              style=" position: absolute;
              top: 0;
              left: 0;display: block; width: 100%; height: 100%"
            >
            <div style=" position: absolute;
              top: 0;
              left: 0;display: block; width: 100%; height: 100%" class="open-btn">打开小程序</div>
            </div>
          </wx-open-launch-weapp>
      </div>
      <!-- @click="gotoThat(index)" -->
      <div class="hot-item" > 
        <item :itemdata="item" v-for="(item, index) in list" :key="index"></item>
      </div>
      <div class="hot-item" v-for="(item, index) in likeList" :key="index"> 
        <item :itemdata="item"></item>
      </div>

      <!-- <p v-for="(item,index) in list" :key="index">{{item.title}}</p> -->
    </div>
    <div class="ads">
      <img v-for="(item,index) in advertisement" :key="index" @click="gotoThat(item)" :src="item.pic" alt="" />
    </div>
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { getHome } from "../api";
import axios from 'axios'
export default {
  components: {
    indexHeader,
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      env: window.env,
      list: [
        {
          title: "你注册，我保障！",
          time: "",
          pic: require("@/assets/img/1.png"),
          type:1
        },
        // {
        //   title: "音乐新ONE法我们一起拭目以待",
        //   time: "",
        //   img: require("@/assets/img/2.png"),
        // },
        // {
        //   title: "AMX SVSI N2600系列",
        //   time: "",
        //   img: require("@/assets/img/3.png"),
        // },
      ],
      advertisement:[],
      brand:[],
      focusMap:[],
      hotspot:[],
      likeList:[],
      user: []
    };
  },
  created() {
    this.initData();
    //https://www.harmanpro.net/#/index  location.href;
    var pageUrl = "https://www.harmanpro.net/#/index";
    $.ajax({
      url: "share.php",
      dataType: "json",
      type: "post",
      data: { url: pageUrl },
      success: function (data) {
        console.log("data-->", data);
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            "checkJsApi",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "hideMenuItems",
            "showMenuItems",
            "hideAllNonBaseMenuItem",
            "showAllNonBaseMenuItem",
            "translateVoice",
            "startRecord",
            "stopRecord",
            "onRecordEnd",
            "playVoice",
            "openLocation",
            "pauseVoice",
            "openCard",
          ],
          openTagList: ["wx-open-launch-weapp"],
        });
        // shareFn();
        wx.ready(function (res2) {
          console.log("ready------>", res2);
          var launchBtn1 = document.getElementById("launch-btn1");
          launchBtn1.addEventListener("ready", function (e) {
            console.log("开放标签 ready1");
          });
          launchBtn1.addEventListener("launch", function (e) {
            console.log("开放标签 success1");
          });
          launchBtn1.addEventListener("error", function (e) {
            console.log("开放标签 fail1", e.detail);
          });

          var launchBtn2 = document.getElementById("launch-btn2");
          launchBtn2.addEventListener("ready", function (e) {
            console.log("开放标签 ready2");
          });
          launchBtn2.addEventListener("launch", function (e) {
            console.log("开放标签 success2");
          });
          launchBtn2.addEventListener("error", function (e) {
            console.log("开放标签 fail2", e.detail);
          });
        });
        wx.error(function (err) {
          console.log("err---2--->", err);
          // config信息验证失败会执行 error 函数，如签名过期导致验证失败，具体错误信息可以打开 config 的debug模式查看，也可以在返回的 res 参数中查看，对于 SPA 可以在这里更新签名
        });
      },
    });
  },
  methods: {
    initData(){
     
      getHome().then(res => {
        if(res.code == 0){
          this.advertisement = res.advertisement,
          this.brand =res.brand;
          this.focusMap =res.focusMap;
          this.hotspot =res.hotspot;
          this.likeList =res.likeList.map((item) => {
            return {
              ...item,
              pic:env.imgUrl+item.pic,
              
            }
          });
          this.user = res.user
        }
      })
    },
    goto(item) {
      window.open(item.urllink,"_blank")
    },
    gotoThat(item){
      console.log(item.urllink)
      window.open(item.urllink,"_blank")
    }
  },
};
</script>

<style lang="scss" scoped>
.slide-img {
  width: 100%;
  height: 5rem;
}
.index-main {
  margin: 0.38rem 0.18rem 0.18rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  margin: 0.2rem -0.1rem 0 0;
}
.tag {
  width: 1.3rem;
  height: 0.45rem;
  text-align: center;
  line-height: 0.45rem;
  color: #707070;
  border: 1px solid #707070;
  font-size: 0.24rem;
  margin: 0 0.1rem 0.1rem 0;
}
.hot-list{
  position: relative;
  .wx-box{
    position: absolute;
    width: 100%;
    height: 1.8rem;
    // background-color: rgba(0,0,0,0.4);
  }
}
.hot-zone {
  margin-top: 0.25rem;
}
.ads {
  margin: 0.18rem;
  img {
    width: 100%;
    margin-bottom: 0.1rem;
  }
}
</style>
