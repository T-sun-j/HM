<template>
  <div class="dealer-tab">
    <div class="pro-nav">
      <div class="pro-item" :class="[active==index?'active':'']" @click="changeTab(index)" v-for="(item,index) in navs" :key="index">{{ item }}</div>
    </div>
    <!-- <van-search
      v-if="[0,1,2].includes(active)"
      v-model="searchText"
      placeholder="搜索"
      input-align="center"
    /> -->
    <!-- <van-button @click="coppy" type="primary">主要按钮</van-button> -->
    <ul v-if="active==0" class="zip-list">
      <li v-for="(item,index) in logoList" :key="index">
        <h3>{{ item.title }} </h3>
        <div class="handle-zip">
          <div @click="getCode(item)" class="zip-cell">
            <img src="../assets/img/dealer/download-icon-1.png" alt="">
            <span>获取提取码</span>
          </div>
          <div @click="goLoad(item)" class="zip-cell">
            <img src="../assets/img/dealer/download-icon-1.png" alt="">
            <span>文件下载</span>
          </div>
          <div class="zip-cell" @click="share(item)">
            <img src="../assets/img/dealer/download-icon-1.png" alt="">
            <span>分享地址</span>
          </div>
        </div>
      </li>
    </ul>
    <ul v-if="active==1" class="zip-list">
      <li v-for="(item,index) in proList" :key="index">
        <h3>{{ item.title }}</h3>
        <div class="handle-zip">
          <div class="zip-cell" @click="getCode(item)">
            <img src="../assets/img/dealer/download-icon-1.png" alt="">
            <span>获取提取码</span>
          </div>
          <div @click="goLoad(item)" class="zip-cell">
            <img src="../assets/img/dealer/download-icon-1.png" alt="">
            <span>文件下载</span>
          </div>
          <div @click="share(item)" class="zip-cell">
            <img src="../assets/img/dealer/download-icon-1.png" alt="">
            <span>分享地址</span>
          </div>
        </div>
      </li>
    </ul>
    <ul v-if="active==2" class="zip-list">
      <li v-for="(item,index) in marketList" :key="index">
        <h3>{{ item.title }}</h3>
        <div class="handle-zip">
          <div  @click="getCode(item)" class="zip-cell">
            <img src="../assets/img/dealer/download-icon-1.png" alt="">
            <span>获取提取码</span>
          </div>
          <div @click="goLoad(item)" class="zip-cell">
            <img src="../assets/img/dealer/download-icon-1.png" alt="">
            <span>文件下载</span>
          </div>
          <div @click="share(item)" class="zip-cell">
            <img src="../assets/img/dealer/download-icon-1.png" alt="">
            <span>分享地址</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="form" v-if="active==3">
      <div class="tops">
        <div class="top-title">展会申请通道 * </div>
        <div class="norm">
          <van-icon name="search" />
          <span>查看展会赞助标准</span>
        </div>  
      </div>
      <van-cell-group inset>
        <van-field
        v-model="formParams.expotype"
        is-link
        readonly
        label=""
        placeholder="展会类型"
        @click="showPicker = true"
      />
      <van-field v-model="formParams.exponame" label="" placeholder="展会名称(请填写全称):  " />
      <!-- <van-cell class="date" title="选择单个日期" :value="formParams.expotime" @click="show = true" /> -->
      <van-field
        v-model="formParams.expotime"
        is-link
        readonly
        label=""
        placeholder="选择单个日期"
        @click="show = true"
      />
      <van-field type="number" v-model="formParams.area" label="" placeholder="展位面积(m2):  " />
      <van-field type="number" v-model="formParams.proportion" label="" placeholder="哈曼展品占比(%):  " />
      </van-cell-group>
      <div class="btn-zone">
      <van-button block color="#0064a0" @click="submit" type="primary" size="small">确定</van-button>
    </div>
    </div>
    
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-calendar v-model:show="show" @confirm="timeConfirm" />
    <foot></foot>
  </div>
</template>

<script>
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { showToast,showSuccessToast,showFailToast } from 'vant';
import { getData } from "../api";
import dayjs from 'dayjs'
export default {
  components: {
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      navs:['Logo','市场资料','新产品资料','展会申请通道'],
      searchText:'',
      active:0,
      showPicker:false,
      date: '',
      show:false,
      columns:[
        { text: '独立展会', value: '独立展会' },
        { text: '联合展会', value: '联合展会' },
      ],
      formParams:{
        action:'postDealerExpo',
        secret:localStorage.getItem('dealersecret'),
        expotype:'',
        exponame:'',
        expotime:'',
        area:'',
        proportion:''
      },
      logoList:[
        {
          name:'Logo JBL',
          code:'spzu',
          file:'https://pan.baidu.com/s/1iPYSzcQilAqFCHKh_mo-Xw',
          link:'链接：https://pan.baidu.com/s/1iPYSzcQilAqFCHKh_mo-Xw 提取码：spzu 复制这段内容后打开百度网盘手机App，操作更方便哦--来自百度网盘超级会员V5的分享'
        }
      ],
      proList:[
        {
          name:'AMX宣传画册',
          code:'rwlz',
          file:'https://pan.baidu.com/s/17CMn6sqDlC7fi5dZS3qQYw',
          link:'链接：https://pan.baidu.com/s/17CMn6sqDlC7fi5dZS3qQYw 提取码：rwlz 复制这段内容后打开百度网盘手机App，操作更方便哦'
        }
      ],
      marketList:[
        {
          name:'年度产品手册',
          code:'7f5r',
          file:'https://pan.baidu.com/s/1BvQIvhGtI09TzjSlxzGcJw',
          link:'链接:https://pan.baidu.com/s/1BvQIvhGtI09TzjSlxzGcJw  密码:7f5r'
        }
      ]
    };
  },
  created() {
    this.active = parseInt(this.$route.query.index) ;
    switch (this.active) {
      case 0:
        this.getDealerLogo();
        break;
        case 1:
        this.getDealerMarket();
        break;
    }
  },
  methods: {
    getDealerLogo(){
      const param = {
        action:'getDealerLogo',
        secret:localStorage.getItem('dealersecret')
      }
      getData(param).then(res => {
        if(res.code == 0){
          
          this.logoList = res.data
          
        } else {
          showToast(res.msg)
        }
      })
    },
    getDealerMarket(){
      const param = {
        action:'getDealerMarket',
        secret:localStorage.getItem('dealersecret')
      }
      getData(param).then(res => {
        if(res.code == 0){
          
          this.proList = res.data
          
        } else {
          showToast(res.msg)
        }
      })
    },
    getDealerProduct(){
      const param = {
        action:'getDealerProduct',
        secret:localStorage.getItem('dealersecret')
      }
      getData(param).then(res => {
        if(res.code == 0){
          
          this.marketList = res.data
          
        } else {
          showToast(res.msg)
        }
      })
    },
    changeTab(index){
      this.active = index;
      switch (this.active) {
        case 0:
          this.getDealerLogo();
          break;
          case 1:
          this.getDealerMarket();
          break;
          case 2:
          this.getDealerProduct();
          break;
      }
    },
    onConfirm({selectedValues, selectedOptions, selectedIndexes}){
      this.showPicker = false;
     
      this.formParams.expotype = selectedValues[0];
    },
    timeConfirm(val){
      const day = dayjs(val).format('YYYY-MM-DD');
      this.formParams.expotime = day;
      this.show = false;
    },
    submit(){
      if(!this.formParams.expotype){
        return showToast('请选择展会类型')
      }
      if(!this.formParams.exponame.trim().length){
        return showToast('请输入展会名称')
      }
      if(!this.formParams.expotime){
        return showToast('选择单个日期')
      }
      console.log(this.formParams.area)
      console.log(Number(this.formParams.area))
      if(!this.formParams.area || Number(this.formParams.area)<=0){
        return showToast('请输入正确的展位面积')
      }
      if(!this.formParams.proportion || Number(this.formParams.proportion)<=0){
        return showToast('请输入正确的占比')
      }
      const param = {
        ...this.formParams,
        area:this.formParams.area+'平方米',
        proportion:this.formParams.proportion+'%'
      }
      getData(param).then(res => {
        if(res.code == 0){
          showToast('提交成功')
          
          
        } else {
          showToast(res.msg)
        }
      })
    },
    getCode(item){
      this.coppy(item.code)
    },
    goLoad(item){
      window.open(item.link)
    },
    share(item){
      // console.log()
      this.coppy(item.sharelink)
    },
    coppy(str){
      this.$copyText(str).then(function (e) {
        showSuccessToast('内容已成功复制到剪贴板中')
          console.log(e)
        }, function (e) {
          showFailToast('Can not copy')
          console.log(e)
        })

    }
  },
};
</script>

<style lang="scss" scoped>
.dealer-tab{

.pro-nav{
  display: flex;
  height: .82rem;
  background-color: #a7a7a7;
  margin-top: .2rem;
  .pro-item{
    width:25%;
    box-sizing: border-box;
    line-height: .82rem;
    text-align: center;
    font-size: .24rem;
    color: #fff;
    
    border-right: 1px solid #fff;
    &:last-child{
      border:none;
    }
    &.active{
      background-color: #0064a0;
    }
  }
}
.zip-list{
  padding:0 12px;
  li{
    border-bottom: 1px solid #d5d5d5;
    
    h3{
      font-size: .28rem;
      height: .9rem;
      line-height: .9rem;
      color: #458eba;
    }
    .handle-zip{
      display: flex;
      justify-content: space-between;
      font-size: .24rem;
      color: #616161;
      margin:.1rem 0 .2rem;
      .zip-cell{
        display: flex;
        align-items: center;
        span{
          margin-left: 0.05rem;
        }
      }
      img{
        width: .28rem;
        height: .28rem;
        
      }
    }
  }
  
}
.btn-zone{
  margin:.4rem 32px;
}
.tops{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:.3rem 32px;
    margin-top: .2rem;
    .top-title{
      font-size: .3rem;
      color: #0064a0;
    }
    .norm{
      font-size: .24rem;
      span{
        text-decoration: underline;
      }
    }
  }
}
.date ::v-deep .van-cell__title{
  color: #ccc !important;
}
</style>
