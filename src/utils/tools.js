export const getSystem = function () {
  const na = navigator.userAgent.toLowerCase();
  const system = {
    isWeixin: na.indexOf("micromessenger") > -1,
    isQQ: na.indexOf("qq/") > -1,
    isApp: na.indexOf("meradmin") > -1,
    isIos: na.indexOf("iphone") > -1,
    isAndroid: na.indexOf("android") > -1,
    isIphoneX:
      (/iphone/gi.test(navigator.userAgent) &&
        window.screen.height === 812 &&
        window.screen.width === 375) ||
      (/iphone/gi.test(window.navigator.userAgent) &&
        window.devicePixelRatio &&
        window.devicePixelRatio === 3 &&
        window.screen.width === 414 &&
        window.screen.height === 896) ||
      (/iphone/gi.test(window.navigator.userAgent) &&
        window.devicePixelRatio &&
        window.devicePixelRatio === 2 &&
        window.screen.width === 414 &&
        window.screen.height === 896),
  };
  return system;
};

// export const getUrlString = (name) => {
//   const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");

//   const r = window.location.search.substr(1).match(reg);
//   if (r != null) return decodeURIComponent(r[2]);
//   return null;
// };

export const getUrlString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  if(window.location.href.indexOf('?')<0){
    return null;
  }
  let r = window.location.hash.split("?")[1].match(reg);
  
  if (r != null) return decodeURIComponent(r[2]);
  return null;
};

export const ruleNumber10 = (number) => {
  let checkreg = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}$/;
  let res = number.search(checkreg);
  if (res > -1) {
    return true;
  } else {
    return false;
  }
};

export const stripscript = (value) => {
  let pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
  ); //
  let rs = "";
  for (let i = 0; i < value.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
};

/**
 * 时间戳转换成指定格式日期
 * @param formats(Y-m-d, Y-m-d H:i:s, Y年m月d日, Y年m月d日 H时i分)
 * @param timestamp 时间戳
 * */
export function timestampToYear(timestamp, formats, add) {
  if (!timestamp) return "";
  formats = formats || "Y-m-d";
  let zero = function (value) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };
  let myDate;
  if (timestamp && timestamp.toString().length === 10) {
    timestamp = parseInt(timestamp);
    myDate = new Date(timestamp * 1000);
  } else {
    timestamp = parseInt(timestamp);
    myDate = new Date(timestamp);
  }
  let year = myDate.getFullYear();
  let month = zero(myDate.getMonth() + 1);
  let day;
  if (add && add == "day1") {
    day = zero(myDate.getDate() + 1);
  } else {
    day = zero(myDate.getDate());
  }
  // let day = zero(myDate.getDate());
  let hour = zero(myDate.getHours());
  let minite = zero(myDate.getMinutes());
  let second = zero(myDate.getSeconds());
  return formats.replace(/Y|m|d|H|i|s/gi, function (matches) {
    return {
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second,
    }[matches];
  });
}

/**
 * 金额转化为最多小数点后两位
 * @param newNumber
 * */
export function numberTwo(newNumber) {
  let reg = newNumber.match(/\d+\.?\d{0,2}/);
  let txt = "";
  if (reg != null) {
    txt = reg[0];
  }
  return txt;
  // let reg = /^(\d+)(.\d{0,2})?$/
  // let dataList=newNumber.match(reg)
  // let a ;
  // let c="";
  // let b =reg.test(newNumber)
  // if(b){
  //     a =dataList[0]
  //     //a=Math.floor(dataStr*100)/100
  //     sessionStorage.setItem("money",a)
  //     return a
  // }else{
  //     debugger
  //     c= sessionStorage.getItem("money")
  //     setTimeout(() => {
  //         sessionStorage.clear()
  //     }, 200);
  //     console.log("ccc--",c)
  //     return c
  // }
}
export function inputBlur() {
  console.log("input reset----1----");
  let u = navigator.userAgent;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    console.log("input reset----执行----");
    setTimeout(() => {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop || 0;
      window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 200);
  }
}

export function compareVersion(newV, oldV) {
  if (!newV || !oldV) return;
  let versionArr1 = newV
    .replace(/[a-zA-Z]/g, (match, i) => "." + match.charCodeAt())
    .split(/[^\d]/);
  let versionArr2 = oldV
    .replace(/[a-zA-Z]/g, (match, i) => "." + match.charCodeAt())
    .split(/[^\d]/);

  // 保证两个数据长度一样，面向 `v1.2` 和 `v1.2.3` 这样的情况
  if (versionArr1.length > versionArr2.length) {
    versionArr2.splice(
      versionArr2.length,
      0,
      ...Array(versionArr1.length - versionArr2.length).fill(0)
    );
  } else {
    versionArr1.splice(
      versionArr1.length,
      0,
      ...Array(versionArr2.length - versionArr1.length).fill(0)
    );
  }
  // 按节比较
  for (let i = 0; i < versionArr1.length; i++) {
    if (+versionArr1[i] > +versionArr2[i]) {
      return true;
    } else if (+versionArr1[i] < +versionArr2[i]) {
      return false;
    }
  }
}

export function inputBlur2() {
  console.log("input reset----1----");

  setTimeout(() => {
    const scrollHeight =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  }, 200);
}
/**
 * 递归替换对象内的null和undefined，讲这些值处理为空字符串，并返回新对象
 * @param  {Object} 目标对象
 * @return {Object} 返回处理后的新对象
 */
export function removeNullVal(targetObj) {
  if (targetObj === null) return "";

  const newObj = {};

  for (const key in targetObj) {
    const curValue = targetObj[key];

    switch (typeof curValue) {
      case "object":
        newObj[key] = removeNullVal(curValue);
        break;
      default:
        newObj[key] = curValue ? curValue : "";
    }
  }
  return newObj;
}

export function inputReset() {
  let isReset = true; // 是否归位
  let ele = document.documentElement || document.body;
  ele.addEventListener("focusin", () => {
    isReset = false; // 聚焦时键盘弹出，焦点在输入框之间切换时，会先触发上一个输入框的失焦事件，再触发下一个输入框的聚焦事件
  });
  ele.addEventListener("focusout", () => {
    isReset = true;
    setTimeout(() => {
      // 当焦点在弹出层的输入框之间切换时先不归位
      if (isReset) {
        window.scroll(0, 0); // 确定延时后没有聚焦下一元素，是由收起键盘引起的失焦，则强制让页面归位
      }
    }, 300);
  });
}
export const detectOrient = () => {
  var width = document.documentElement.clientWidth,
    height = document.documentElement.clientHeight,
    $wrapper = document.getElementById("J_wrapper"),
    style = "";
  if (width >= height) {
    // 横屏
    style += "width:" + width + "px;"; // 注意旋转后的宽高切换
    style += "height:" + height + "px;";
    style += "-webkit-transform: rotate(0); transform: rotate(0);";
    // style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
    style += "-webkit-transform-origin: 0 0;";
    style += "transform-origin: 0 0;";
  } else {
    // 竖屏
    style += "width:" + height + "px;";
    style += "height:" + width + "px;";
    style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
    // 注意旋转中点的处理
    style +=
      "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;";
    style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
  }
  $wrapper.style.cssText = style;
};

export const shuffle = (array) => {
  let j, x, i;
  for (i = array.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = array[i - 1];
    array[i - 1] = array[j];
    array[j] = x;
  }
  return array;
};
export const getTotal = (arr) => {
  let sum = 0;
  for(let i=0; i<arr.length; i++){
      sum += arr[i] 
  }
  return sum
}

