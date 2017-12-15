<template>
    <div class="header">
        <div class="logo">
            <img width="122" height="40" src="./logox.png" alt="logo">
        </div>
        <div class="other">other</div>
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
            background: white;
        }
    }
</style>