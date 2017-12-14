<template>
    <div class="content-first">
        <div class="w-icon">
            <img class="img-icon" :src='srcNow' height="128" width="128">
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

        <ul class="hourly">
            <li class="hourly-item" v-for="(item,index) in Hourlyforecast">
                <p class="time">{{item.time.slice(11)}}</p>
                <div class="hourly-img">
                    <img :src = "'static/weather-icon/'+item.cond_code +'.png'"  alt="">
                </div>
                <p class="hourly-temp"><span class="hourly-temp-span">{{item.tmp}}</span><span class="angle">°</span></p>
            </li>
        </ul>

    </div>
</template>

<script type="ecmascript-6">
const wURL = "https://free-api.heweather.com/s6/weather/?location=beijing&key=24f75f285e1946289fe5b8af7d2abf64";
export default {
    props:[

    ],
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
            console.log("weatherInfo.hourly.splice(0,4)");
            var hourly = weatherInfo.hourly.splice(0,4); //逐小时array
            var nowcode = now.cond_code;
            var arraysrc = [];
            that.Nowtmp = now.tmp;
            that.Htmp = forecast[0].tmp_max;
            that.Ltmp = forecast[0].tmp_min;
            that.Deslife = lifestyle[0].txt;
            that.Hourlyforecast = hourly;
            that.srcNow = 'static/weather-icon/' + nowcode+'.png';
        });
        }
    },
    created: function(){
        var that = this;
        this.$http.get(wURL).then(function (response) {
            response = response.data;
            // var forecastInfo = response.HeWeather6[0].daily_forecast;
            // console.log(forecastInfo);
            // that.allinfo = forecastInfo;
            // that.firstInfo = forecastInfo[0];
            // that.secondInfo = forecastInfo[1];
            // that.thirdInfo = forecastInfo[2];
            var weatherInfo = response.HeWeather6[0];
            var now = weatherInfo.now;//当前天气num
            var forecast = weatherInfo.daily_forecast;//预告array
            var lifestyle = weatherInfo.lifestyle;//生活指数array
            console.log(response);
            var hourly = weatherInfo.hourly.splice(0,4); //逐小时array
            var nowcode = now.cond_code;
            var arraysrc = [];
            that.Nowtmp = now.tmp;
            that.Htmp = forecast[0].tmp_max;
            that.Ltmp = forecast[0].tmp_min;
            that.Deslife = lifestyle[0].txt;
            that.Hourlyforecast = hourly;
            that.srcNow = 'static/weather-icon/' + nowcode+'.png';
        })
    },

    mounted:function(){
        // this.getWeather();

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
$temp-fontcolor:#DCE7EC;
$temp-description:#9BCFF0;
$time-color:#8395A3;
    .content-first {
        background: $first-bgc;
        font-family:'weatherfont';
        .w-icon {
            position: relative;
            width: 100%;
            text-align:center;
            .img-icon {
                width:80%;
                height:80%;
            }
        }
        .temp {
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
        .hourly {
            display: flex;
            margin: 0 auto;
            width: 90%;
            margin-top: 20px;
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
</style>
