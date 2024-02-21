<template>
  <div class="pdf-zone">
    <div id="demo">
      <!-- pdf -->
    </div>
  </div>
</template>

<script>
import Pdfh5 from "pdfh5";
// 
export default {
  data(){
    return {
      list:[
        '/static/pdf/1-AMX.pdf',
        '/static/pdf/2-Martin灯光.pdf',
        '/static/pdf/3-固定安装.pdf',
        '/static/pdf/4-教育.pdf',
        '/static/pdf/5-专业酒吧舞台.pdf',
        '/static/pdf/6-专业娱乐系统.pdf',
      ]
    }
  },
  activated() {
    const index = parseInt(this.$route.query.index) || 0 ;
    console.log('index--->',index);
    new Pdfh5('#demo', {
      pdfurl: this.list[index]
    });
  },
}
</script>

<style lang="scss" scoped>
.pdf-zone{
  position: absolute;
  top:0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
<style>
/* @import 'pdfh5/css/pdfh5.css'; */

</style>