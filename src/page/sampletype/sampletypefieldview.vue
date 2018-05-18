
<template>
  <div>
    <table>
      <tr>
        <td>Key值</td>
        <td>{{list.keyvalue}}</td>
      </tr>
      <tr>
        <td>字段名称</td>
        <td>{{list.fieldname}}</td>
      </tr>
    </table>
    <input type="hidden" ref="sampleTypeId">
    <input type="button" title="关闭" value="关闭"  @click="closePage()"/>
  </div>
</template>
<script>
  export default {

    data(){
      return{
        sampleFileldId:this.$route.params.sampleFieldId,
        list:{}
      }
    },
    methods:{
      getData(){
        this.$http.get('/api/sampleField/'+this.sampleFileldId+"/view.action",null)
          .then((response)=> {
            //箭头函数"=>"使this指向vue
            if(response.data.result===1){
              this.list=response.data.data
              this.$refs.sampleTypeId.value=response.data.data.sampletypeid;
            }
          }).catch(function(err){
          console.error(err)
        })
      },closePage(){
        this.$router.push({path:'/sampletype/goSampleFieldList/'+this.$refs.sampleTypeId.value})
      }
    },
    created(){
      this.getData()
    }
  }
</script>
