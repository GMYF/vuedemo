
<template>
  <div>
    <table>
      <tr>
        <td>名称</td>
        <td>{{list.scriptname}}</td>
      </tr>
      <tr>
        <td>脚本语言</td>
        <td>{{list.scriptlanguagevalue}}</td>
      </tr>
      <tr>
        <td>脚本内容</td>
        <td><textarea rows="30" cols="100" readonly="true" v-text="list.scriptcontent"/></td>
      </tr>
    </table>
    <input type="hidden" ref="sampleTypeId" :value="list.sampleTypeId">
    <input type="button" title="关闭" value="关闭"  @click="closePage()"/>
  </div>
</template>
<script>
  export default {

    data(){
      return{
        sampleScriptId:this.$route.params.sampleScriptId,
        list:{}
      }
    },
    methods:{
      getData(){
        this.$http.get('/api/sampleScript/'+this.sampleScriptId+"/view.action",null)
          .then((response)=> {
            //箭头函数"=>"使this指向vue
            if(response.data.result===1){
              this.list=response.data.data
            }
          }).catch(function(err){
          console.error(err)
        })
      },closePage(){
        let sampleTypeId = this.sampleTypeId===undefined?this.$refs.sampleTypeId.value:this.sampleTypeId;
        this.$router.push({path:'/sampletype/goSampleScriptList/'+sampleTypeId})
      }
    },
    created(){
      this.getData()
    }
  }
</script>
