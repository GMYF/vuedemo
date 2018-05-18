
<template>
  <div>
    <table>
      <tr>
        <td>Key值<em>*</em></td>
        <td><input type="text" ref="keyValue"/></td>
      </tr>
      <tr>
        <td>字段名称<em>*</em></td>
        <td>
          <input type="text" ref="fieldName"/>
        </td>
      </tr>
      <tr>
        <td>
            <input type="button" value="保存" style="width: 70px" @click="submitData()"/>
        </td>
        <td><input type="button"  value="关闭" style="width: 70px" @click="closeSelf()"/></td>
      </tr>
    </table>
    <div>
       <input type="hidden" ref="sampleTypeId">
    </div>
  </div>
</template>
<script>
  import qs from 'qs';
export default {

  data(){
    return{
      sampleFieldId:this.$route.params.sampleFieldId,
      sampleTypeId:this.$route.params.sampleTypeId
    }
  },
  methods:{
    getData(){
      this.sampleFieldId = this.sampleFieldId === undefined?0:this.sampleFieldId;
      this.$http.get('/api/sampleField/'+this.sampleFieldId+'/view.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
//            this.list=response.data.data
              this.$refs.keyValue.value=response.data.data.keyvalue;
              this.$refs.fieldName.value=response.data.data.fieldname;
              this.$refs.sampleTypeId.value=response.data.data.sampletypeid;
          }
        }).catch(function(err){
          console.error(err)
        })
    },submitData(){
      const msg = this.$options.methods.checkFormElements.bind(this)();
      if(msg !==""){
         alert(msg);
         return ;
      }
      let params={};
      params["keyValue"]=this.$refs.keyValue.value;
      params["fieldName"]=this.$refs.fieldName.value;
      params["sampleFieldId"]=this.sampleFieldId;
      params["sampleTypeId"]=this.sampleTypeId;
      params = qs.stringify(params);
      this.$http.post('/api/sampleField/save.action',params)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
            window.alert(response.data.message);
            let sampleTypeId = this.sampleTypeId===undefined?this.$refs.sampleTypeId.value:this.sampleTypeId;
            this.$router.push({path:'/sampletype/goSampleFieldList/'+sampleTypeId})
          }
        })
    },closeSelf(){
        console.log(this.sampleFieldId+"--"+this.$refs.sampleTypeId.value);
      let sampleTypeId = this.sampleTypeId===undefined?this.$refs.sampleTypeId.value:this.sampleTypeId;
      this.$router.push({path:'/sampletype/goSampleFieldList/'+sampleTypeId})
    },checkFormElements(){
      let msg ="";
      const keyValue =this.$refs.keyValue.value;
      if(keyValue===null || keyValue===""){
        msg +="Key值不能为空!\r\n";
      }
      const fieldName =this.$refs.fieldName.value;
      if(fieldName ==="" || fieldName===null){
        msg +="字段名称不能为空!\r\n";
      }
      return msg;
    }
  },
  created(){
    this.getData()
  }
}

</script>

