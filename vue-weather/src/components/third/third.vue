<template>
    <div class="content-third">
        <p>now ,it is third page finally</p>
    </div>
</template>

<script type="ecmascript-6">
    export default {
        props: {
            heweather: {
                type: Object
            }
        },
        data() {
            return {
                basic:{}
            }
        },
        created() {

            
        },
        mounted() {

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .content-third {
    	color:green;
    	font-size: 30px;
    }
</style>