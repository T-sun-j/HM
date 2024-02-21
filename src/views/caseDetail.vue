<template>
  <div>
    <div class="case-data">
      <!-- <div class="goback">返回 <van-icon name="arrow" /></div> -->
      <!-- <div style="height:.4rem;margin:.2rem" class="title-zone">
          <div class="case-title">{{ title }}</div>
        <div class="goback" @click="goback"><span style="margin-right:.2rem">返回</span><van-icon name="arrow" /><van-icon name="arrow" /></div>
      </div> -->
      <div class="title-zone">
        <div class="title-cont">{{ title }}</div>
        <div class="back-r">
          <img :src="require('../assets/img/back.png')" alt="" />
          <span @click="goback">返回</span>
        </div>
      </div>

      <div v-html="content" class="img_box"></div>
    </div>

    <div class="pro-list">
      <!-- <div class="title-zone">
        <indexTitle>案例相关产品</indexTitle>
        <div class="goback"><van-icon name="arrow" /><van-icon name="arrow" /></div>
      </div> -->
      <indexTitle>相关产品</indexTitle>
      <ul class="pro-ul">
        <li
          v-for="(item, index) in productListData"
          :key="index"
          @click="gotoDetail(item)"
        >
          <h4>{{ item.title }}</h4>
        </li>
        <!-- <li>
          <h4>AKG CS300</h4>
          
          
        </li>
        <li>
          <h4>AKG CS300</h4>
          <div class="over">
            <p>Lyra超高解析度多模式USB麦克风</p>
          </div>
          
        </li> -->
      </ul>
      <!-- <div class="case-list">
        <div v-for="(item,index) in list" :key="index" >
          <item :itemdata="item"></item>
        </div>
      </div> -->
    </div>
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { showToast, showSuccessToast, showFailToast } from "vant";
import { getData } from "../api";
export default {
  components: {
    indexHeader,
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      secret: "",
      title: "",
      content: "",
      productListData: [],
      index: 0,
      list: [
        {
          title: "好唱易嗨，酣畅淋漓！ ",
          // time:'中牟 MEET PARTY KTV ',
          img: require("@/assets/img/img/case-1.png"),
        },
        {
          title: "声享震撼，惊艳每一次观影！ ",
          // time:'太原铜锣湾影院 ',
          img: require("@/assets/img/img/case-2.png"),
        },
        {
          title: "分布式音视频系统助力高效互联！  ",
          // time:'南通万豪酒店 ',
          img: require("@/assets/img/img/case-3.png"),
        },
      ],
    };
  },
  created() {
    this.secret = this.$route.query.secret;
    this.initData();
  },
  methods: {
    initData() {
      const param = {
        action: "getCaseDetails",
        secret: this.secret,
      };
      getData(param).then((res) => {
        if (res.code == 0) {
          // this.cases = res.type_data;
          const { title, content, productListData } = res.data;
          this.title = title;
          this.content = content;
          this.productListData = productListData;
        } else {
          showToast(res.msg);
        }
      });
    },
    goback() {
      this.$router.go(-1);
    },
    gotoDetail(item) {
      this.$router.push({
        path: "/productDetail",
        query: {
          secret: item.secret,
        },
      });
    },
  },
};
</script>
<style>
.img_box img {
  max-width: 100%;
  height: auto;
}
</style>
<style lang="scss" scoped>
.case-data {
  position: relative;
  .goback {
    color: #fff;
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    font-size: 0.3rem;
  }
}
.img_box {
  padding: 0.1rem;
  font-size: 0.26rem;
  img {
    max-width: 100% !important;
    height: auto !important;
  }
}
.title-zone {
  position: relative;

  .case-title {
    font-size: 0.3rem;

    line-height: 0.4rem;

    margin-right: 1.5rem;
  }
  .goback {
    font-size: 0.3rem;
    color: #5a5a5a;
    position: absolute;
    top: 0.04rem;
    right: 0;
    & ::v-deep .van-icon-arrow {
      margin-left: -0.2rem;
    }
  }
}
.pro-list {
  margin: 0.2rem;
}
.pro-ul {
  margin-top: 0.2rem;
  li {
    h4 {
      font-size: 0.28rem;
      color: #616161;
      border-bottom: 1px solid #94b0cc;
      padding: 0.4rem 0;
    }
    .over {
      overflow: hidden;
      margin-top: 0.08rem;
    }
    p {
      float: left;
      background: #3db5e7;
      color: #fff;
      font-size: 0.24rem;
      height: 0.42rem;
      line-height: 0.42rem;
      padding: 0 0.2rem;
    }
  }
}
.title-zone {
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  background-color: #29629b;
  color: #fff;
  font-size: 0.3rem;
  .title-cont {
    width: 6rem;
    line-height: 1.4;
  }
  .back-r {
    display: flex;
    align-items: center;
    img {
      width: 0.17rem;
      height: 0.19rem;
      margin-right: 0.1rem;
    }
  }
}
</style>
