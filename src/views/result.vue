<template>
  <div>
    <div class="title-zone">
      <indexTitle>搜索结果</indexTitle>
      <div @click="goback" class="goback">
        <span>返回</span>
        <van-icon name="arrow" /><van-icon name="arrow" />
      </div>
    </div>
    <div class="result-list" v-if="isShowList">
      <p
        v-for="(productInfo, productIndex) in productList"
        :key="productIndex"
        @click="jumpProduct(productInfo)"
      >
        <span class="type">[产品]</span>
        <span class="content">{{ productInfo.title }}</span>
      </p>
      <p
        v-for="(appcaseInfo, appcaseIndex) in appcaseList"
        :key="appcaseIndex"
        @click="jumpAppcase(appcaseInfo)"
      >
        <span class="type">[案例]</span>
        <span class="content">{{ appcaseInfo.title }}</span>
      </p>
      <p
        v-for="(dealerInfo, dealerIndex) in dealerList"
        :key="dealerIndex"
        @click="jumpDealer(dealerInfo)"
      >
        <span class="type">[资料]</span>
        <span class="content">{{ dealerInfo.title }}</span>
      </p>
    </div>
    <van-empty v-else description="查不到搜索的结果" />
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { getUserSearch } from "@/api/index.js";
import { showToast,showFailToast,showSuccessToast } from "vant";
export default {
  components: {
    indexHeader,
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      searchText: "",
      appcaseList: [],
      dealerList: [],
      productList: [],
      isShowList: false,
    };
  },
  mounted() {
    this.searchText = this.$route.query.searchText;
    this.getUserSearch();
  },
  updated() {
    if (this.$route.query.searchText !== this.searchText) {
      this.searchText = this.$route.query.searchText;
      this.getUserSearch();
    }
  },
  methods: {
    getUserSearch() {
      const param = {
        action: "userSearch",
      };
      if (this.searchText) {
        param.title = this.searchText;
      }

      getUserSearch(param).then((res) => {
        if (res && res.code === 0) {
          this.isShowList = true;
          this.appcaseList = res.appcaseList;
          this.dealerList = res.dealerList;
          this.productList = res.productList;
        } else {
          this.isShowList = false;
          showToast(res.msg);
        }
      });
    },
    goback() {
      this.$router.go(-1);
    },
    jumpProduct(productInfo) {
      this.$router.push({
        path: "/productDetail",
        query: {
          secret: productInfo.secret,
          type: "RESULT",
        },
      });
    },
    jumpDealer(dealerInfo) {
      this.coppy(dealerInfo.sharelink);
    },
    coppy(str) {
      this.$copyText(str).then(
        function (e) {
          showSuccessToast("内容已成功复制到剪贴板中");
          console.log(e);
        },
        function (e) {
          showFailToast("Can not copy");
          console.log(e);
        }
      );
    },
    jumpAppcase(appcaseInfo) {
      this.$router.push({
        path: "/caseDetail",
        query: {
          secret: appcaseInfo.secret,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.case-zone {
  overflow: hidden;
  height: 1.3rem;
  margin: 0.4rem 0;
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
.title-zone {
  position: relative;
  margin: 0 0.2rem 0.16rem 0.2rem;
  .goback {
    font-size: 0.3rem;
    color: #5a5a5a;
    position: absolute;
    top: 0;
    right: 0;
    span {
      margin-right: 0.2rem;
    }
    & ::v-deep .van-icon-arrow {
      margin-left: -0.2rem;
    }
  }
}
.result-list {
  padding: 0 0.2rem;
  p {
    font-size: 0.26rem;
    padding: 0 0.2rem;
    color: #5a5a5a;
    line-height: 0.4rem;
    border-bottom: 0.01rem solid #999;
    line-height: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .type {
    color: #0064a0;
    margin-right: 0.1rem;
  }
}
</style>
