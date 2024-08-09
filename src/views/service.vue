<template>
  <div>
    <!-- <indexHeader :active="5"></indexHeader> -->
    <div class="ser-title">
      <img src="../assets/img/service/service-icon.png" alt="" />
      <p>售后服务</p>
    </div>
    <div class="contact">
      <p>哈曼专业音视产品服务热线</p>
      <p>40011667806</p>
      <p>客户服务邮箱</p>
      <p>ChinaPRO.Service@harman.com</p>
    </div>

    <div class="band">
      <div class="band-title">
        <img src="../assets/img/service/service-icon-4.png" alt="" />
        <span>保修政策</span>
      </div>

      <div class="slide" @click="handleShow(1)">
        <div class="dot" :class="[show1 ? 'up-status' : '']"></div>
        <!-- <p>点击展开全部</p> -->
      </div>
    </div>

    <div class="policy" v-if="show1">
      <h4 class="po-title">哈曼专业音视产品保修政策</h4>
      <span class="po-sub">保修条款（仅适于中国大陆）</span>
      <div class="tab-zone">
        <table width="100%" border="0">
          <tbody>
            <tr class="firstRow">
              <td
                style="background: #bbdde6; text-align: center; padding: 5px"
                width="20%"
              >
                <span style="font-size: 10px"><strong>品牌</strong></span>
              </td>
              <td style="background: #bbdde6; text-align: center" width="50%">
                <span style="font-size: 10px"><strong>产品类别</strong></span>
              </td>
              <td style="background: #bbdde6; text-align: center" width="30%">
                <span style="font-size: 10px"
                  ><strong>保修期（年）</strong></span
                >
              </td>
            </tr>
            <tr>
              <td
                style="background: #eaf5f7; text-align: center"
                rowspan="2"
                colspan="1"
              >
                <span style="font-size: 10px">AKG<br /></span>
              </td>
              <td style="background: #eaf5f7; text-align: center; padding: 5px">
                <span style="font-size: 10px"
                  >AKG专业耳机，耳机麦克风，KM200无线麦克风</span
                >
              </td>
              <td style="background: #eaf5f7; text-align: center">
                <span style="font-size: 10px">1</span>
              </td>
            </tr>
            <tr>
              <td style="background: #eaf5f7; text-align: center; padding: 5px">
                <span style="font-size: 10px">其余AKG产品整机</span>
              </td>
              <td style="background: #eaf5f7; text-align: center">
                <span style="font-size: 10px">3</span>
              </td>
            </tr>
            <tr>
              <td
                style="background: #f5fafb; text-align: center"
                rowspan="3"
                colspan="1"
              >
                <span style="font-size: 10px">JBL<br /></span>
              </td>
              <td style="background: #f5fafb; text-align: center; padding: 5px">
                <span style="font-size: 10px"
                  >JBL娱乐系列音箱， JBL娱乐系列功放，Rock
                  one、VM系列麦克风，KX、KX系列麦克风 ,Beyond系列一体机等</span
                >
              </td>
              <td style="background: #f5fafb; text-align: center">
                <span style="font-size: 10px">1</span>
              </td>
            </tr>
            <tr>
              <td style="background: #f5fafb; text-align: center; padding: 5px">
                <span style="font-size: 10px"
                  >NANO
                  K系列、IRX系列、104、LSR3系列，LSR7系列，CSS系列、8124/8128吸顶喇叭，音箱内置电池等</span
                >
              </td>
              <td style="background: #f5fafb; text-align: center">
                <span style="font-size: 10px">1</span>
              </td>
            </tr>
            <tr>
              <td style="background: #f5fafb; text-align: center; padding: 5px">
                <span style="font-size: 10px">其余JBL产品整机</span>
              </td>
              <td style="background: #f5fafb; text-align: center">
                <span style="font-size: 10px">3</span>
              </td>
            </tr>
            <tr>
              <td
                style="background: #eaf5f7; text-align: center"
                rowspan="2"
                colspan="1"
              >
                <span style="font-size: 10px">Crown<br /></span>
              </td>
              <td style="background: #eaf5f7; text-align: center; padding: 5px">
                <span style="font-size: 10px"
                  >Crown娱乐系列功放（Xli/T系列）</span
                >
              </td>
              <td style="background: #eaf5f7; text-align: center">
                <span style="font-size: 10px">1</span>
              </td>
            </tr>
            <tr>
              <td style="background: #eaf5f7; text-align: center; padding: 5px">
                <span style="font-size: 10px">其余Crown产品</span>
              </td>
              <td style="background: #eaf5f7; text-align: center">
                <span style="font-size: 10px">3</span>
              </td>
            </tr>
            <tr>
              <td
                style="background: #f5fafb; text-align: center"
                rowspan="2"
                colspan="1"
              >
                <span style="font-size: 10px">AMX<br /></span>
              </td>
              <td style="background: #f5fafb; text-align: center; padding: 5px">
                <span style="font-size: 10px">触摸屏组件</span>
              </td>
              <td style="background: #f5fafb; text-align: center">
                <span style="font-size: 10px">1</span>
              </td>
            </tr>
            <tr>
              <td style="background: #f5fafb; text-align: center; padding: 5px">
                <span style="font-size: 10px">其余AMX产品整机</span>
              </td>
              <td style="background: #f5fafb; text-align: center">
                <span style="font-size: 10px">3</span>
              </td>
            </tr>
            <tr>
              <td style="background: #eaf5f7; text-align: center">
                <span style="font-size: 10px">Martin</span>
              </td>
              <td style="background: #eaf5f7; text-align: center; padding: 5px">
                <span style="font-size: 10px">所有Martin产品整机</span>
              </td>
              <td style="background: #eaf5f7; text-align: center">
                <span style="font-size: 10px">2</span>
              </td>
            </tr>
            <tr>
              <td style="background: #f5fafb; text-align: center; padding: 5px">
                <span style="font-size: 10px"
                  >Lexicon<br />Soundcraft<br />BSS<br />DBX</span
                >
              </td>
              <td style="background: #f5fafb; text-align: center; padding: 5px">
                <span style="font-size: 10px">所有品牌整机</span>
              </td>
              <td style="background: #f5fafb; text-align: center">
                <span style="font-size: 10px">1</span>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          所有前述产品如在酒吧、KTV等娱乐场所使用，则整机保修期为1年。<br />
        </p>
        <p>
          <br />
        </p>
        <p>
          上述产品类别所含的具体型号请登录哈曼官网专业音视系统子网站https://pro.harman.com/查看。
        </p>
        <p>
          <br />
        </p>
        <p>
          上述保修期自最终用户最初购买之日（即，购买发票所述的日期）起算。保修期以及保修范围内，如果哈曼专业音视产品出现损坏或故障，哈曼将为您提供免费修理及零件更换。
        </p>
        <p>
          <br />
        </p>
        <p>
          <br />
        </p>
        <p>
          二、哈曼专业音视产品保修及维修服务仅限于哈曼中国服务中心及哈曼中国特约服务网点（请登录哈曼官网专业音视系统子网站https://pro.harman.com/，查看特约服务网点的具体信息）。
        </p>
        <p>
          <br />
        </p>
        <p>
          <br />
        </p>
        <p>三、延长保修期限服务</p>
        <ul class="list-paddingleft-2">
          <li>
            <p>
              用户需先通过“哈曼专业服务与支持微信小程序”上“你注册，我保障”选项，成功注册所购买的哈曼专业音视产品，每件产品在同一时间仅能注册在一位用户名下，为更好享受延长保修服务，用户须如实填写个人信息及购买信息。
            </p>
          </li>
          <li>
            <p>
              用户须在购买产品后的180天以内上传产品注册，以发票或有效的购买凭证为准。
            </p>
          </li>
          <li>
            <p>
              支持注册的产品仅限于哈曼专业JBL Entertainment
              娱乐系列音箱、功放、处理器、话筒， Crown娱 乐系列功放，AKG专业耳机
              K52、K72、K92、K371、K371BT。
            </p>
          </li>
          <li>
            <p>
              成功提交注册后，用户将在
              5个工作日内收到确认回复，告知注册结果及是否享受延长保修期限。
            </p>
          </li>
          <li>
            <p>
              成功获得延长保修期限服务的产品将在本政策第一条约定的基本保修服务期限的基础上，获得
              180天的延长保修服务，包括免费的维修零件及维修人工费。
            </p>
          </li>
          <li>
            <p>延长保修期限服务活动有效期至2024年12月31日止。</p>
          </li>
        </ul>
        <p>
          <br />
        </p>
        <p>
          <br />
        </p>
        <p>
          四、保修期和延长保修期限内，下列情形不属于保修范围。但，哈曼中国服务中心及哈曼中国特约服务网点可按相关规定实行收费维修：
        </p>
        <ul class="list-paddingleft-2">
          <li>
            <p>
              用户因使用、维护、保管和搬运不当造成损坏的，例如过荷或反馈而烧坏。
            </p>
          </li>
          <li>
            <p>因使用环境不当或恶劣而引起的损坏，例如电压输入过高，受潮等。</p>
          </li>
          <li>
            <p>用户未按照哈曼提供的安装指引而做出了不正确的安装或拆动。</p>
          </li>
          <li>
            <p>非哈曼中国服务中心及哈曼中国特约服务网点所维修造成损坏的。</p>
          </li>
          <li>
            <p>
              无保修卡及有效的购买发票，或购买发票与保修卡不符，或购买发票被涂改或无法辨认。
            </p>
          </li>
          <li>
            <p>因不可抗拒的自然灾害或自然损耗所造成损坏的。</p>
          </li>
          <li>
            <p>处理品或已超过保修期的专业音视产品。</p>
          </li>
          <li>
            <p>电池和灯泡更换。</p>
          </li>
        </ul>
        <p>
          <br />
        </p>
        <p>
          <br />
        </p>
        <p>
          五、发生下列任何情形，哈曼中国服务中心及哈曼中国特约服务网点将不给予任何维修服务：
        </p>
        <ul class="list-paddingleft-2">
          <li>
            <p>
              未经哈曼授权擅自打开专业音视产品机盖或者对专业音视产品进行维修。
            </p>
          </li>
          <li>
            <p>
              专业音视产品上无机身编号、编号被涂改、破坏、转换及编号未能显示在哈曼销售记录内之专业音视产品。
            </p>
          </li>
        </ul>
        <p>
          <br />
        </p>
        <p>
          <br />
        </p>
        <p>
          六、哈曼中国不负责任何由于专业音视产品损坏或故障而直接或间接招致的损失。
        </p>
        <p>
          <br />
        </p>
        <p>
          <br />
        </p>
        <p>七、本政策仅适用于作为最终用户的原始购买者。</p>
        <p>
          <br />
        </p>
        <p>
          <br />
        </p>
      </div>
    </div>
    <div class="band">
      <div class="band-title">
        <img src="../assets/img/service/service-icon-5.png" alt="" />
        <span>服务中心</span>
      </div>
      <div class="slide" @click="handleShow(2)">
        <div class="dot" :class="[show2 ? 'up-status' : '']"></div>
      </div>
    </div>
    <ul class="addres-list" v-if="show2">
      <li>
        <h4>哈曼深圳客户服务中心</h4>
        <p>深圳市南山区招商街道工业三路1号招商局港口大厦12楼1203室</p>
        <p>联系人：马雅丽/李玲</p>
        <p>电话：18923783881;0755-86360539</p>
      </li>
      <li>
        <h4>哈曼上海客户服务中心</h4>
        <p>上海市普陀区同普路1175弄14号406室</p>
        <p>邮箱：Info@jointav.com</p>
        <p>联系人：李謇遐</p>
        <p>电话：15692103181/021-62598351</p>
      </li>
      <li>
        <h4>哈曼广州客户服务中心</h4>
        <p>广东省广州市越秀区大沙头三马路1号之4</p>
        <p>邮箱：630497547@qq.com</p>
        <p>联系人：陈锦标</p>
        <p>电话：18688870988</p>
      </li>
      <li>
        <h4>哈曼北京客户服务中心</h4>
        <p>北京市通州区北苑155号大唐高新技术创业园北小院2号</p>
        <p>联系人：陈勇</p>
        <p>电话：13701206544</p>
      </li>
      <li>
        <h4>哈曼成都客户服务中心</h4>
        <p>成都市金牛区黄金东二路413号</p>
        <p>联系人：李兰宁</p>
        <p>电话：028-87685253/87743433</p>
      </li>
      <li>
        <h4>哈曼专业台湾客户服务中心</h4>
        <p>台北市中华路一段76巷10弄3号</p>
        <p>邮箱：service76103@gmail.com</p>
        <p>联系人：简先生 ATTN: Mr. Jian</p>
        <p>电话：+886-2-23822568#66</p>
      </li>
    </ul>
    <div class="band">
      <div class="band-title">
        <img src="../assets/img/service/service-icon-6.png" alt="" />
        <span>JBL Entertainment 防伪服务中心</span>
      </div>
      <div class="slide" @click="handleShow(3)">
        <div class="dot" :class="[show3 ? 'up-status' : '']"></div>
      </div>
    </div>
    <ul class="addres-list" v-if="show3">
      <li>
        <h4>JBL Entertainment 防伪服务中心</h4>
        <p>杭州市拱墅区萍水路333号，新武林商业中心1273号</p>
        <p>联系人：陈春霞</p>
        <p>电话：18106522939</p>
      </li>
      <li>
        <h4>JBL Entertainment 防伪服务中心</h4>
        <p>重庆市渝中区新华路鸥鹏大厦负一楼F001商铺</p>
        <p>联系人：冯娟</p>
        <p>电话：4008788891</p>
      </li>
      <li>
        <h4>JBL Entertainment 防伪服务中心</h4>
        <p>香港九龙深水埗长沙湾道248 号地铺</p>
        <p>联系人：Kam Yuki</p>
        <p>电话：00852-28111259</p>
      </li>
      <li>
        <h4>JBL Entertainment 防伪服务中心</h4>
        <p>广州市番禺区沙头街南双玉村工业二路1 号（中智集团）</p>
        <p>联系人：朱慧兰</p>
        <p>电话：13420549922</p>
      </li>
      <li>
        <h4>JBL Entertainment 防伪服务中心</h4>
        <p>广州市番禺区南里路3号一楼（广州汇艺）</p>
        <p>联系人：刘娟</p>
        <p>电话：13112263640</p>
      </li>
      <li>
        <h4>JBL Entertainment 防伪服务中心</h4>
        <p>西安市雁塔区唐延路旺座现代城B座2902室</p>
        <p>联系人：赵增虎</p>
        <p>电话：13891900216</p>
      </li>
      <li>
        <h4>JBL Entertainment 防伪服务中心</h4>
        <p>贵阳市西南国际商贸城4号楼B区3楼14号</p>
        <p>联系人：王军</p>
        <p>电话：13802927166</p>
      </li>
      <li>
        <h4>JBL Entertainment 防伪服务中心</h4>
        <p>成都市成华区华盛路58号9幢</p>
        <p>联系人：伍孔希</p>
        <p>电话：13982032688</p>
      </li>
    </ul>
    <div class="card-more">
      <!-- path="/pages/XXX" -->
      <!-- wx2a64e67662a5d95d appid="wx2a64e67662a5d95d"-->
      <div class="card-item">
        <img src="../assets/img/service/service-icon-1.png" alt="" />
        <wx-open-launch-weapp
          id="launch-btn1"
          username="gh_c965586ee466"
          path="pages/security/security"
          style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          "
        >
          <div
            v-is="'script'"
            type="text/wxtag-template"
            style="
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            "
          >
            <div
              style="
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 100%;
              "
              class="open-btn"
            >
              打开小程序
            </div>
          </div>
        </wx-open-launch-weapp>
      </div>
      <div class="card-item">
        <img src="../assets/img/service/service-icon-2.png" alt="" />
        <wx-open-launch-weapp
          id="launch-btn2"
          username="gh_c965586ee466"
          path="pages/service/service?serviceId=1"
          style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          "
        >
          <div
            v-is="'script'"
            type="text/wxtag-template"
            style="
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            "
          >
            <div
              style="
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 100%;
              "
              class="open-btn"
            >
              打开小程序
            </div>
          </div>
        </wx-open-launch-weapp>
      </div>
      <div class="card-item">
        <img src="../assets/img/service/service-icon-3.png" alt="" />
        <wx-open-launch-weapp
          id="launch-btn3"
          username="gh_c965586ee466"
          path="pages/service/service?serviceId=3"
          style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          "
        >
          <div
            v-is="'script'"
            type="text/wxtag-template"
            style="
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            "
          >
            <div
              style="
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 100%;
              "
              class="open-btn"
            >
              打开小程序
            </div>
          </div>
        </wx-open-launch-weapp>
      </div>
      <!-- <img src="../assets/img/service/service-icon-2.png" alt="" />
      <img src="../assets/img/service/service-icon-3.png" alt="" /> -->
    </div>
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
// import { getWXData } from "../api/index";
export default {
  components: {
    indexHeader,
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
    };
  },
  created() {
    var pageUrl = "https://www.harmanpro.net/#/service";
    //var pageUrl = location.href;
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

          var launchBtn3 = document.getElementById("launch-btn3");
          launchBtn3.addEventListener("ready", function (e) {
            console.log("开放标签 ready3");
          });
          launchBtn3.addEventListener("launch", function (e) {
            console.log("开放标签 success3");
          });
          launchBtn3.addEventListener("error", function (e) {
            console.log("开放标签 fail3", e.detail);
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
    handleShow(num) {
      if (num == 1) {
        this.show1 = !this.show1;
      } else if (num == 2) {
        this.show2 = !this.show2;
      } else {
        this.show3 = !this.show3;
      }
    },
    // getWX() {
    //   getWXData().then((res) => {
    //     console.log("res---->", res);
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.ser-title {
  background-color: #0064a0;
  height: 1.22rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.4rem;
  font-weight: bold;
  img {
    width: 0.48rem;
    height: 0.48rem;
  }
  p {
    margin-left: 0.2rem;
  }
}
.contact {
  font-size: 0.26rem;

  padding: 0.4rem 0;
  p {
    text-align: center;
    line-height: 1.8;
    &:nth-child(2) {
      margin-bottom: 0.25rem;
    }
  }
}
.band {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.92rem;
  background-color: #3db5e7;
  color: #fff;
  padding: 0 0.48rem;
  margin-bottom: 2px;
  .band-title {
    img {
      width: 0.36rem;
      height: 0.36rem;
    }
    span {
      margin-left: 0.1rem;
    }
    font-size: 0.26rem;
    display: flex;
    align-items: center;
  }
  .slide {
    font-size: 0.24rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.8rem;
    height: 0.8rem;
    .dot {
      width: 0;
      height: 0;
      border-top: 0.1rem solid #fff;
      border-right: 0.1rem solid transparent;
      border-left: 0.1rem solid transparent;
      &.up-status {
        transform: rotate(180deg);
      }
    }
    p {
      margin-left: 0.1rem;
    }
  }
}
.policy {
  padding: 0.5rem;
}
.po-title {
  font-size: 0.3rem;
  font-weight: bold;
  margin-bottom: 0.1rem;
}
.po-sub {
  display: block;
  color: #9b9b9b;
  font-size: 0.26rem;
}
.para {
  color: #202020;
  font-size: 0.26rem;
  line-height: 1.6;
  margin-bottom: 0.4rem;
}
.addres-list {
  margin: 0.4rem 0.5rem;
  li {
    font-size: 0.26rem;
    margin-bottom: 0.4rem;
    line-height: 1.5;
    h4 {
      color: #0e3b73;
      margin-bottom: 0.08rem;
      font-weight: 500;
    }
    p {
      margin-bottom: 0.08rem;
      color: #535353;
    }
  }
}
.card-more {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0.2rem;
  .card-item {
    width: 2.28rem;
    height: 1.56rem;
    position: relative;
  }
  img {
    width: 2.28rem;
    height: 1.56rem;
  }
}
.tab-zone {
  margin: 0.25rem 0;
  table {
    th {
      height: 0.5rem;
      line-height: 0.5rem;
    }
    td {
      height: 0.5rem;

      line-height: 0.5rem;
      span {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
      }
    }
  }
  p {
    font-size: 0.26rem;
    line-height: 1.5;
  }
  table td {
    border: 1px solid #fff;
  }
}
.list-paddingleft-2 {
  font-size: 0.26rem;
  line-height: 1.5;

  li {
    list-style: disc;
    margin-left: 0.6rem;
  }
}
</style>
