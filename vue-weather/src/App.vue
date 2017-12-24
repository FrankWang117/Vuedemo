<template>
  <div id="app">
    <div class="headwrapper">
      <!-- <v-header></v-header> -->
      <div class="tab" >
        <transition name="zoom">
          <div class="tab-item now"  @click = "ChangeWidth($event)" >
            <router-link to="/first">Today</router-link>   
          </div>
        </transition>
      <div class="tab-item" @click = "ChangeWidth($event)" >
        <router-link to="/second">Forecast</router-link>
      </div>
      <div class="tab-item" @click = "ChangeWidth($event)" >
        <router-link to='/third'>Other</router-link>
      </div>
    </div>
    </div>
    <transition enter-active-class="animated zoomInUp">
      <keep-alive>
        <router-view :address="address"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
// import Header from "@/components/header/header";
var ipaddress = "https://weixin.jirengu.com/weather/ip";
export default {
  // components: {
  //   "v-header": Header
  // },
  data () {
    return {
      address:"",
    }
  },
  created (){
    var that = this;
     this.$http.get(ipaddress).then(function(response) {
      that.address = response.data.data;
      });
  },
  methods: {
    ChangeWidth(event) {
      var activediv = event.currentTarget;
      var divbox = event.currentTarget.parentNode;
      activediv.classList.add("now");
      for (var i = 0; i < 3; i++) {
        if (divbox.children[i] != activediv) {
          divbox.children[i].classList.remove("now");
        }
      }
    }
  },
};
</script>
<style  lang='scss'>
@import "../static/css/index.scss";
html {
  height: 100%;
  body {
    height: 100%;
    #app {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #b0695a;
      .headwrapper {
        flex: 0 0 40px;
        background: #a5b7a2;
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",sans-serif;
        .tab {
          display: flex;
          width: 100%;
          height: 40px;
          line-height: 40px;
          .tab-item {
            flex: 1;
            text-align: center;
            a {
              display: block;
              height: 100%;
              color: #fff;
              font-size: 22px;
            }
          }
          .now {
            flex: 2;
            background: #5f7462;
            border-radius: 5px;
            transition: all 1s;
            a {
              font-family: "Franklin Gothic Medium", "Arial Narrow", Arial,
                sans-serif;
            }
          }
          .zoom-enter,
          .zoom-leave-active {
            flex: 1;
          }
        }
      }
      &:last-child {
        flex: 1;
      }
    }
  }
}
</style>