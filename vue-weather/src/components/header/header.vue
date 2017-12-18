<template>
    <div class="header">
        <div class="logo">
            <img width="122" height="40" src="./logox.png" alt="logo">
        </div>
        <div class="other">
            <p class="name">Weather By Vue</p>
        </div>
    </div>
</template>

<script type="ecmascript-6">
    export default {};
</script>

<style rel="stylesheet/scss" lang="scss">
    .header {
        display: flex;
        height: 40px;
        .logo {
            flex: 0 0  122px;
        }
        .other {
            flex: 1;
            // background: white;
            .name {
                line-height: 40px;
                color: #fff;
                font-size: 28px;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            }
        }
    }
</style>