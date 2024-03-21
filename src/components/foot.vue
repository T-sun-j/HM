<template>
  <div class="foot">
    <img class="my-logo" src="../assets/img/general/foot-logo.png" alt="" />
    <div class="logos">
      <img
        @click="goto(item, index)"
        v-for="(item, index) in brand"
        :key="index"
        :src="(item.logo.includes('https') ? '' : env.imgUrl) + item.logo"
        alt=""
      />
    </div>
    <!-- <p>© 2023 HARMAN International. All Rights Reserved. <br>Privacy Policy | Cookies | Terms of Use</p> -->
  </div>
</template>

<script>
// AKG，AMX，BBS，Crown，dbx，JBL，Lexicon，Martin，Soundcraft
import { getHome } from "../api";
import { showToast } from "vant"
export default {
  data() {
    return {
      env: window.env,
      brand: [],
    };
  },
  mounted() {
    this.brand = localStorage.getItem("brand")
      ? JSON.parse(localStorage.getItem("brand"))
      : [];
      console.log("this.brand：",this.brand)
    if (this.brand.length == 0) {
      getHome().then((res) => {
        if (res.code == 0) {
          this.brand = res.brand;
          localStorage.setItem("brand", JSON.stringify(res.brand));
        } else {
          showToast(res.msg);
        }
      });
    }
  },
  methods: {
    goto(item, index) {
      let i = 0;
      if (index <= 5) {
        i = index;
      } else {
        i = index + 1;
      }
      this.$router.push({
        path: "/baikeDetail",
        query: {
          title: item.title,
          index: i,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.foot {
  margin-bottom: 0.7rem;
  .my-logo {
    display: block;
    width: 1.56rem;
    height: 0.92rem;
    margin: 0.45rem auto 0.45rem;
  }
  .logos {
    display: flex;
    justify-content: center;
    margin-bottom: 0.35rem;
    img {
      width: 0.64rem;
      height: 0.64rem;
      margin: 0 0.05rem;
    }
  }
  p {
    font-size: 0.2rem;
    color: #616661;
    text-align: center;
  }
}
</style>
