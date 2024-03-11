<template>
  <div>
    <!-- <indexHeader :active="1"></indexHeader> -->
    <div class="case-zone">
      <ul class="case-list">
        <li
          class="case-item"
          :class="[active == index ? 'active' : '']"
          @click="setCurrent(index, item)"
          v-for="(item, index) in cases"
          :key="index"
        >
          <div class="icon-box">
            <img
              :src="(item.pic.includes('https') ? '' : env.imgUrl) + item.pic"
              alt=""
            />
          </div>

          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <div class="case-ul" v-if="proList.length">
      <div v-for="(item, index) in proList" :key="index">
        <item :itemdata="item"></item>
      </div>
    </div>
    <p v-else class="doing">暂无数据...</p>
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
      active: 0,
      typeSecret: "",
      env: window.env,
      cases: [],
      list: [
        {
          title: "舞动在唇齿间的AKG D5 AKG x CN Beatbox Championship(CNBC)",
          //time:'AKG x CN Beatbox Championship(CNBC)',
          img: require("@/assets/img/img/case-1.png"),
          index: 0,
        },
      ],
      proList: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const param = {
        action: "getCaseList",
        type_secret: this.typeSecret,
      };
      getData(param).then((res) => {
        if (res.code == 0) {
          this.cases = res.type_data;
          this.proList = res.case_data.map((item) => {
            return {
              ...item,
              pic: (item.pic.includes("https") ? "" : this.env.imgUrl) + item.pic,
              type: "secret",
            };
          });
        } else {
          showToast(res.msg);
        }
      });
    },
    setCurrent(index, item) {
      this.active = index;
      this.typeSecret = item.secret;
      this.initData();
    },
  },
};
</script>

<style lang="scss" scoped>
.case-zone {
  overflow: hidden;
  height: 1.3rem;
  margin: 0.4rem 0 0;
}
.case-list {
  text-align: center;
  white-space: nowrap;
  overflow-x: scroll;
  padding-bottom: 0.25rem;
  .case-item {
    display: inline-block;
    text-align: center;
    margin: 0 0.3rem;
    white-space: nowrap;
    overflow-y: auto;
    &.active {
      .icon-box {
        background-color: #0064a0;
      }
      p {
        color: #0064a0;
      }
    }
    .icon-box {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #949494;
      margin: 0 auto;
      img {
        width: 0.36rem;
        height: 0.36rem;
      }
    }
    p {
      color: #949494;
      font-size: 0.26rem;
      text-align: center;
      line-height: 2;
    }
  }
}
.doing {
  text-align: center;
  font-size: 0.28rem;
  margin: 2rem 0 4rem;
}
</style>
