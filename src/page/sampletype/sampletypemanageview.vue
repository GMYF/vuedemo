
<template>
  <div>
     <table>
       <tr>
         <td>Key值</td>
         <td>{{list.keyvalue}}</td>
       </tr>
       <tr>
         <td>样本类别</td>
         <td>{{list.sampletype}}</td>
       </tr>
     </table>
      <input type="button" title="关闭" value="关闭"  @click="closePage()"/>
  </div>
</template>
<script>
export default {

  data(){
    return{
      sampleTypeId:this.$route.params.id,
      list:{}
    }
  },
  methods:{
    getData(){
      this.$http.get('/api/sampletype/'+this.sampleTypeId+"/view.action",null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
            this.list=response.data.data
          }
        }).catch(function(err){
        console.error(err)
      })
    },closePage(){
      this.$router.push({path:'/sampleType/manageList'})
    }
  },
 created(){
    this.getData()
 }
}
</script>
