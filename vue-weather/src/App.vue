<template>
  <div id="app">
    <div class="headwrapper">
      <v-header></v-header>
          <div class="tab border-1px" >
      <div class="tab-item now"  @click = "ChangeWidth($event)" >
        <router-link to="/first">first</router-link>   
      </div>
      <div class="tab-item" @click = "ChangeWidth($event)" >
        <router-link to="/second">second</router-link>
      </div>
      <div class="tab-item" @click = "ChangeWidth($event)" >
        <router-link to='/third'>third</router-link>
      </div>
    </div>
    </div>
    <transition mode='out-in' enter-active-class="animated fadeInRight" leave-active-class="animated flipoutY" >
        <router-view/>
    </transition>

  </div>
</template>

<script>
import Header from "@/components/header/header";
var wURL =
  "https://free-api.heweather.com/s6/weather/?location=beijing&key=24f75f285e1946289fe5b8af7d2abf64";

export default {
  name: "app",
  components: {
    "v-header": Header
  },
  data() {
    return {
      heweather: {}
    };
  },
  methods: {
    ChangeWidth(event) {
      console.log(event.currentTarget);
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
  created: function() {
    var that = this;
    this.$http.get(wURL).then(function(response) {
      console.log(response.data + "from app.ve");
      that.heweather = response.data;
      console.log(that.heweather);
    });
  },
  mounted() {
    console.log("app.vue  mounted");
  }
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
      .headwrapper {
        flex: 0 0 80px;
        background: #a5b7a2;
      }
      &:last-child {
        flex: 1;
      }
    }
  }
}

.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  // @include border-1px(red);
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      display: block;
      height: 100%;
      color: #fff;
      font-size: 18px;
    }
  }
  .now {
    flex: 2;
    background: #5f7462;
    border-radius: 5px;
    a {
      font-weight: 700;
    }
  }
}
</style>