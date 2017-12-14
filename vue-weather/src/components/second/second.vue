<template>
    <div class="forecast-wrapper">
        <ul class="item">
            <li class = "item-content" :class = "classMap[index]"   v-for = "(item,index,key) in allinfo" :key = "key">
                <div class="left">
                    <img width="128" height="128" :src = "'../../../static/weather-icon/' + item.cond_code_d + '.png'" alt="">
                </div>
                <div class="right">
                    <p class="data">{{item.date}}</p>
                    <p class="tmp"><span class="ltmp">{{item.tmp_min}}°</span>~<span class="htmp">{{item.tmp_max}}</span></p>
                    <p class="destext"><span class="daytext">{{item.cond_txt_d}}</span>~<span class="nighttext">{{item.cond_txt_n}}</span></p>
                    <p class="wind"><span class="wind_dir">{{item.wind_dir}}</span>--<span class="wind_sc">{{item.wind_sc}}</span></p>
                </div>
            </li>
        </ul>

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
    data () {
        return {
            classMap:['first', 'second', 'third'],
            allinfo:[],
            firstInfo:{},
            secondInfo: {},
            thirdInfo: {}
        }
    },
    created () {
        var that = this;
        this.$http.get(wURL).then(function (response) {
        response = response.data;
        var forecastInfo = response.HeWeather6[0].daily_forecast;
        console.log(forecastInfo);
        that.allinfo = forecastInfo;
        that.firstInfo = forecastInfo[0];
        that.secondInfo = forecastInfo[1];
        that.thirdInfo = forecastInfo[2];
        })
    },
    mounted () {

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
    }

</style>
