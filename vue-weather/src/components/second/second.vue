<template>
    <div class="forecast-wrapper">
        <ul class="item">
            <li class = "item-content" :class = "classMap[index]" v-for = "(item,index,key) in allinfo" :key = "key">
                <div class="left">
                    <img width="128" height="128" :src = "'../../../static/weather-icon/' + item.cond_code_d + '.png'" alt="">
                </div>
                <div class="right">
                    <p class="data">{{ item.date.slice(5,10) }}</p>
                    <p class="destext"><span class="daytext">{{ item.cond_txt_d }}</span></p>
                    <p class="tmp"><span class="ltmp">{{ item.tmp_min }}°</span>~<span class="htmp">{{ item.tmp_max }}°</span></p>
                    <!-- <p class="wind"><span class="wind_dir">{{ item.wind_dir }}</span>--<span class="wind_sc">{{ item.wind_sc}}</span></p> -->
                </div>
            </li>
        </ul>
        <div class="button-festive" @click="festiveshow">
            <span>+</span>
        </div>
        <transition name="festiveimg">
        <div class="festive" v-show="fshow" @click="festiveshow">
            <div class="img"><img src="./Chr.gif" alt="节日快乐"  ></div>
            
        </div>
        </transition>
    </div>
</template>

<script>
const wURL = "https://free-api.heweather.com/s6/weather/forecast?location=beijing&key=24f75f285e1946289fe5b8af7d2abf64";
export default {
    props:{
            heweather:{
                type:Object
            }
        },
    data() {
        return {
            classMap:['first','second','third','fourth'],
            allinfo:[],
            fshow:false,

        }
    },
    methods:{
        festiveshow() {
            this.fshow = !this.fshow;
        }
    },
    created() {
        var that = this;
            this.$http.get(wURL).then(function (response) {
            response = response.data;
            var forecastInfo = response.HeWeather6[0].daily_forecast;
            console.log(forecastInfo);
            forecastInfo.length = 5;
            forecastInfo.shift();
            that.allinfo = forecastInfo;
            })
        },
        mounted() {
            // var that = this;
            // var forecastInfo = that.heweather.HeWeather6[0].daily_forecast;
            // console.log(forecastInfo);
            // forecastInfo.length = 5;
            // forecastInfo.shift();
            // that.allinfo = forecastInfo;
        }
    }
</script>

<style lang="scss">
$fullheight: 100%;
    .forecast-wrapper {
        display: flex;
        height: 100%;
        // flex-direction: column;
        .item {
            display: flex;
            flex: 1;
            flex-direction: column;
            height: 100%;
            .item-content {
                display: flex;
                flex: 1;
                align-items: center;
                padding:10px;
                .left,.right {
                    flex: 1;    
                }
                .left {
                    vertical-align: middle;
                    padding-left: 20px;
                    .img {
                        display: table-cell;
                    }
                }
                .right {
                    .data {
                        font-size: 18px;
                        color: #E0D9D1;
                    }
                    .tmp {
                        padding: 5px 0;
                        font-size: 24px;
                        color: #fff;
                        letter-spacing: 2px;
                    }
                    .destext {
                        // text-indent: 20px;
                        font-size: 22px;
                        font-weight: lighter;
                        color: #fff;
                    }
                    // .wind {
                    //     padding: 5px 0;
                    //     font-size: 18px;
                    //     color: #fff;
                    // }
                }

            }
        }
        .first {
            background: #E3BB88;
        }
        .second {
            background: #db9864;
        }
        .third {
            background: #b0695A;
        }
        .fourth {
            background: #644749;
        }
        .button-festive {
            position: fixed;
            bottom: 40px;
            right: 40px;
            width: 30px;
            height: 30px;
            background:rgba($color: orange, $alpha: 0.5);
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            color: #fff;
            font-size: 0;
            span {
                font-size: 18px;
            font-weight: 700;                
            }
        }
        .festive {
            position: fixed;
            width: 100%;
            height: 100%;
            background:rgba(0, 0, 0, .5);
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            padding-top: 20px;
            text-align: center;
            overflow: hidden;
            .img {
                position: relative;
                width: 90%;
                margin:0 auto;
                top: 50%;
                margin-top: -50%;
                img {
                    width: 100%;
                }
            }
        }
        .festiveimg-enter,.festiveimg-leave-active {
            opacity: 0;
            transform: translate3d(0,20%,0);
        }
        .festiveimg-enter-active,.festiveimg-leave-active {
            transition: all .5s cubic-bezier(0.4,0,0,1.5);
        }
    }

</style>