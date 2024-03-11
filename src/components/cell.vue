<template>
  <div>
    <!-- @click="goDetail(itemdata)" -->
    <div class="item" @click="goDetail(itemdata)">
      <div class="img-box">
        <img
          :src="
            (itemdata.pic.includes('https') ? '' : env.imgUrl) + itemdata.pic
          "
          alt=""
        />
      </div>
      <div class="img-cont">
        <h4>{{ itemdata.title }}</h4>
        <!-- <div class="over">
        <p v-if="itemdata.time">{{ itemdata.time }}</p>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemdata: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      env: window.env,
    };
  },
  methods: {
    goDetail(item) {
      console.log("item :", item);

      this.$router.push({
        path: "/caseDetail",
        query: {
          secret: item.secret,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  overflow: hidden;
  padding: 0.25rem 0.2rem;
  border-bottom: 1px solid #a5a5a5;
  .img-box {
    float: left;
    width: 1.84rem;
    height: 1.35rem;
    margin-right: 0.16rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img-cont {
    overflow: hidden;
    h4 {
      font-size: 0.24rem;
      line-height: 1.2;
      color: #333;
      margin: 0.16rem 0 0.1rem;
      word-wrap: break-word;
    }
    .over {
      overflow: hidden;
    }
    p {
      float: left;
      height: 0.32rem;
      padding: 0 0.15rem;
      line-height: 0.34rem;
      color: #fff;
      font-size: 0.24rem;
      background-color: #3db5e7;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
