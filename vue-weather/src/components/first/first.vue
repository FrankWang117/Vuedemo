<template>
    <div class="content-first">
        <div class="w-icon">
            <img class="img-icon" :src='srcNow' height="128" width="128">
            <div class="basicinfo" @click="showInfo">
                <p class="city">{{City}}</p>
                <p class="time">{{Nowtime}}</p>
            </div>
            <div class="airqinfo">
                <p class="text">AQI</p>
                <p class="airq" :class="Airqclass"><span>{{Airq.aqi}}</span>
                <span>{{Airq.qlty}}</span></p>
            </div>
            <div class="showinfo" @click="closeInfo" v-show="show">
                <h2>今日天气详情</h2>
                <!-- <p class="locationcity">{{City}}</p> -->
                <p class="time">{{Nowtime}}</p>
                <div class="sun"><p class="sr">日出时间:  {{todayforecast.sr}}</p><p class="ss">日落时间:  {{todayforecast.ss}}</p></div>
                <p class="wind">{{nowWeather.wind_dir}},  级数:  {{nowWeather.wind_sc}}  级</p>
                <p class="uv" v-if="lifestyle[7]">紫外线强度: {{lifestyle[7].brf}}</p>
            </div>
        </div>
        <div class="temp">
            <div class="temp-content">
                <div class="temp-now">
                    <p><span class="now">{{nowWeather.tmp}}</span><span class="angle">°</span></p>
                </div>
                <div class="temp-horl">
                    <p><span class="arrow">↑</span><span class="temp-h">{{todayforecast.tmp_max}}</span><span class="angle">°</span><span class="arrow">↓</span><span class="temp-l">{{todayforecast.tmp_min}}</span><span class="angle">°</span></p>
                </div>
            </div>
            <div class="temp-desc">
                <p ref="deslift" @click="showDeslife" v-if="lifestyle[0]">{{lifestyle[0].txt}}</p>
            </div>
        </div>
        <div class="hourly-wrapper">
            <ul class="hourly">
            <li class="hourly-item" v-for="(item,index,key) in Hourlyforecast" :key = key>
                <p class="time">{{item.time.slice(11)}}</p>
                <div class="hourly-img">
                    <img :src = "'static/weather-icon/'+item.cond_code +'.png'"  alt="">
                </div>
                <p class="hourly-temp"><span class="hourly-temp-span">{{item.tmp}}</span><span class="angle">°</span></p>
            </li>
        </ul>
        </div>
    </div>
</template>

<script type="ecmascript-6">
// const location = "";
const wURL = "https://free-api.heweather.com/s6/weather/?location=beijing&key=24f75f285e1946289fe5b8af7d2abf64";
const airURL = "https://free-api.heweather.com/s6/air/now?location=beijing&key=24f75f285e1946289fe5b8af7d2abf64";
export default {
    props: {},
    data() {
        return {
            nowWeather: {},
            todayforecast:{},
            Hourlyforecast:{},
            lifestyle: [],
            srcNow: 'static/weather-icon/100.png',
            srcHourly: '',
            Forecasttmp: 4,
            Airq: {},
            City:'北京',
            show: false,
            showdeslife: false,
            Nowtime:'',
        }
    },
    methods:{
        getWeather()  {
            var that = this;
            this.$http.get(wURL).then(function (response) {
            response = response.data;
            var weatherInfo = response.HeWeather6[0];
            that.nowWeather = weatherInfo.now;//当前天气num
            that.todayforecast = weatherInfo.daily_forecast[0];//预告array
            that.lifestyle = weatherInfo.lifestyle;//生活指数array
            var nowcode = weatherInfo.now.cond_code;
            that.Hourlyforecast = weatherInfo.hourly.splice(0,4);//逐小时array
            that.srcNow = 'static/weather-icon/' + nowcode+'.png';
        });
        },
        getAirq() {
            var that = this;
            this.$http.get(airURL).then(function (response) {
            console.log("this is from first vue");
            response = response.data.HeWeather6[0];
            console.log(response);
            that.Airq = response.air_now_city;
            console.log(that.Airq)
        });
        },
        showInfo() {
            this.show = true;
        },
        closeInfo() {
            this.show = false;
        },
        showDeslife() {
            this.showdeslife = !this.showdeslife;
            if (this.showdeslife) {
                this.$refs.deslift.style.whiteSpace= "normal";
                this.$refs.deslift.style.lineHeight= 36+ 'px';
            } else {
                this.$refs.deslift.style.whiteSpace= "nowrap";
                this.$refs.deslift.style.lineHeight= 48 + 'px';
            }
        }
    },
    created: function(){
        console.log("created");
    },
    mounted:function(){
        this.getWeather();
        this.getAirq();
        this.Nowtime = new Date().toLocaleDateString().slice(5);
    },
    computed:{
        Airqclass: function () {
            if (this.Airq.aqi < 50) {
                return 'green';
            } else if (this.Airq.aqi < 100) {
                return "orange";
            } else {
                return "red";
            }
        },
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$first-bgc:#1D1F21;
$iconbgc:#E3BB88;
$tmpbgc:#DB9864;
$hourlybgc: #B0695A;
$temp-fontcolor:#DCE7EC;
$temp-description:#9BCFF0;
$time-color:#8395A3;
    .content-first {
        // background: $first-bgc;
        font-family:'weatherfont';
        .w-icon {
            position: relative;
            width: 100%;
            text-align:center;
            background:$iconbgc;
            color: #fff;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            .img-icon {
                width:80%;
                height:80%;
            }
            .basicinfo {
                position: absolute;
                display:inline-block;
                left: 20px;
                top: 20px;
                // font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                font-size: 0;
                .city {
                    font-size: 22px;
                }
                .time,.airq {
                    height: 35px;
                    font-size: 20px;
                    line-height: 35px;
                }
            }
            .airqinfo {
                position: absolute;
                right: 20px;
                top: 20px;
                font-size: 0;
                .text {
                    font-size: 22px;
                    height: 26px;
                    line-height: 26px;
                }
                .airq {
                    line-height: 35px;
                    height: 35px;
                    font-size: 20px;
                    width: 80px;
                }
                .red {
                    background: red;
                    border-radius: 17px;
                }
                .orange {
                    background: orange;
                    border-radius: 17px;
                }
                .green {
                    background: green;
                    border-radius: 17px;
                }
                // color: #fff;
            }
            .showinfo {
                position: absolute;
                top:0;
                left:0;
                width: 100%;
                height: 100%;
                background: rgba(7, 17, 27, .6);
                h2 {
                    margin: 10px 0px;
                    font-size: 28px;
                }
                .locationcity,.time,.wind {
                    font-size: 22px;
                    padding: 5px;
                }
                .sun {
                    display: flex;
                    padding: 5px 0;
                    font-size: 0px;
                    .sr,.ss {
                        flex: 1;
                        font-size: 22px;
                    }
                }
                .wind {
                    
                }
            }
        }
        .temp {
            background: $tmpbgc;
            .temp-content {
                width:90%;
                margin:0 auto;
                .temp-now {
                    font-size: 90px;
                    color: $temp-fontcolor;
                    &>p {
                        line-height:100px;
                    }    
                    .now {
 
                    }
                }
                .temp-horl {
                    font-size: 26px;
                    color: $temp-fontcolor;
                    .arrow {
                    }
                    &>p {
                        line-height: 36px;
                    }
                }

                }
            }
            .temp-desc {
                    width: 90%;
                    margin: 0 auto;
                    font-size: 26px;
                    color: $temp-description;
                    &>p{
                        line-height: 48px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #fff;     
                    }
            }
    .hourly-wrapper {
        background: $hourlybgc;
        .hourly {
            display: flex;
            margin: 0 auto;
            width: 90%;
            padding-top: 20px;
            .hourly-item {
                flex: 1;
                text-align:center;
                .time {
                    color:$time-color;
                }
            }
            .hourly-img {
                text-align:center;
                // padding:10px 0;
                img {
                    width:70%;
                }
            }
            .hourly-temp {
                color: $temp-fontcolor;
            }
        }
    }
        
    }
</style>