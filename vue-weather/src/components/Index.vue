<template>
 <div>
   <h1 class="logo">cnode js Api Test</h1>

   <ul class="list">
     <li v-for = "item in lists" v-text = "item.title"></li>
   </ul>
 </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      lists:[]
    }
  },
  created(){
    this.get_data()
  },
  methods: {
    get_data:function(params) {
      var v = this;
      if(!params) params = {}
        v.$api.get('topics',params,function (r){
          v.lists = r.data
        })
    }
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "scss">
.logo {
  color: red;
}
.list{
  line-height: 2;
  list-style: none;
  li{ border-bottom: 1px solid #ddd }
}
</style>
