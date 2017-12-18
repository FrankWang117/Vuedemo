<template>
    <div class="content-first">
        <div class="w-icon">
            <img class="img-icon" :src='srcNow' height="128" width="128">
            <div class="basicinfo" @click="showInfo">
                <div class="city">{{City}}</div>
                <div class="airq"><span>{{Airq.aqi}}</span>
                <span>{{Airq.qlty}}</span></div>
            </div>
            <div class="showinfo" @click="closeInfo" v-show="show">
                <p class="locationcity">当前地点{{City}}</p>
                <p class="time">时间</p>
                <p>空气质量</p>
            </div>
        </div>
        <div class="temp">
            <div class="temp-content">
                <div class="temp-now">
                    <p><span class="now">{{Nowtmp}}</span><span class="angle">°</span></p>
                </div>
                <div class="temp-horl">
                    <p><span class="arrow">↑</span><span class="temp-h">{{Htmp}}</span><span class="angle">°</span><span class="arrow">↓</span><span class="temp-l">{{Ltmp}}</span><span class="angle">°</span></p>
                </div>
            </div>
            <div class="temp-desc">
                <p>{{Deslife}}</p>
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
            // nowWeather: {},
            Nowtmp: 2,
            Htmp: 0,
            Ltmp: 0,
            Deslife: '',
            Hourlyforecast:{},
            srcNow: 'static/weather-icon/100.png',
            srcHourly: '',
            Forecasttmp: 4,
            Airq: {},
            City:'北京',
            show: false,
        }
    },
    methods:{
        getWeather()  {
            var that = this;
            this.$http.get(wURL).then(function (response) {
            response = response.data;
            var weatherInfo = response.HeWeather6[0];
            var now = weatherInfo.now;//当前天气num
            var forecast = weatherInfo.daily_forecast;//预告array
            var lifestyle = weatherInfo.lifestyle;//生活指数array
            var hourly = weatherInfo.hourly.splice(0,4);//逐小时array
            var nowcode = now.cond_code;
            var arraysrc = [];
            that.Nowtmp = now.tmp;
            that.Htmp = forecast[0].tmp_max;
            that.Ltmp = forecast[0].tmp_min;
            that.Deslife = lifestyle[0].txt;
            that.Hourlyforecast = hourly;
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
        }
    },
    created: function(){
        console.log("created");
    },
    mounted:function(){
        this.getWeather();
        this.getAirq();
    },
    beforeMount:function() {
        console.log("beforeMount" + this.Nowtmp)
    },
    beforeUpdate:function(){
        console.log("beforeupdata" + this.Nowtmp);
    },
    updated:function(){
        console.log("updated" + this.Nowtmp)
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
            .img-icon {
                width:80%;
                height:80%;
            }
            .basicinfo {
                position: absolute;
                display:inline-block;
                left: 40px;
                top: 40px;
                width: 50px;
                height: 40px;
                border:1px solid #eee;
                border-radius: 5px;
                // box-shadow: 2px 2px 2px 2px #eee;
                color: #fff;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                font-size: 0;
                .city {
                    font-size: 14px;
                }
                .airq {
                    font-size: 14px;
                }
            }
            .showinfo {
                position: absolute;
                top:0;
                left:0;
                width: 100%;
                height: 100%;
                background: #eee;
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
                    font-size: 38px;
                    color: $temp-description;
                    &>p{
                        line-height: 48px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis     
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
                padding:10px 0;
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