
<template>
  <div>
     <table>
       <tr>
         <td>样本类别</td>
         <td>{{list.sampletype}}</td>
       </tr>
       <tr>
         <td>Key值</td>
         <td>{{list.keyvalue}}</td>
       </tr>
       <tr>
         <td>样本内容</td>
         <td>{{list.samplecontent}}</td>
       </tr>
     </table>
    <input type="hidden" ref="contractId" :value="list.contractid">
    <input type="button" title="关闭" value="关闭"  @click="closePage()"/>
  </div>
</template>
<script>
//import Header from '../components/Header.vue'
//import Footer from '../components/Footer.vue'
export default {
//  components:{Header,Footer},
  data(){
    return{
      sampleId:this.$route.params.sampleId,
      list:{}
    }
  },
  methods:{
    getData(){
      this.$http.get('/api/sample/'+this.sampleId+"/view.action",null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
            this.list=response.data.data
          }
        }).catch(function(err){
        console.error(err)
      })
    },closePage(){
      let contractId = this.contractId===undefined?this.$refs.contractId.value:this.contractId;
      this.$router.push({path:'/contract/sampleManageList/'+contractId});
    }
  },
 created(){
    this.getData()
 }
}
</script>
