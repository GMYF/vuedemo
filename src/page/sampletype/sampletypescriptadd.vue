
<template>
  <div>
    <table>
      <tr>
        <td>名称<em>*</em></td>
        <td><input type="text" ref="scriptName"/></td>
      </tr>
      <tr>
        <td>脚本语言<em>*</em></td>
        <td>
          <select ref="scriptLanguage" style="width: 200px">
              <option value="0" selected="selected">--请选择--</option>
              <option v-for="(key,value) in scriptTypeMap" v-text="key" :value="value"></option>
          </select>
        </td>
      </tr>
      <tr>
        <td>脚本内容<em>*</em></td>
        <td><textarea title="脚本内容" rows="30" cols="100" ref="scriptContent"></textarea></td>
      </tr>
      <tr>
        <td>
          <div style="align-content: center">
            <input type="button" value="保存" style="width: 70px" @click="submitData()"/>
            <input type="button"  value="关闭" style="width: 70px" @click="closeSelf()"/>
          </div>
        </td>
      </tr>
    </table>
    <input type="hidden" ref="sampleTypeId"/>
  </div>
</template>
<script>
  import qs from 'qs';
export default {

  data(){
    return{
      sampleScriptId:this.$route.params.sampleScriptId,
      sampleTypeId:this.$route.params.sampleTypeId,
      scriptTypeMap:{}
    }
  },
  methods:{
    getData(){
      this.sampleScriptId = this.sampleScriptId === undefined?0:this.sampleScriptId;
      this.$http.get('/api/sampleScript/'+this.sampleScriptId+'/view.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
//            this.list=response.data.data
              this.$refs.scriptName.value=response.data.data.scriptname;
              this.$refs.scriptLanguage.value=response.data.data.scriptlanguage;
              this.$refs.scriptContent.value=response.data.data.scriptcontent;
              this.$refs.sampleTypeId.value=response.data.data.sampleTypeId;
          }
        }).catch(function(err){
          console.error(err)
        })
    },submitData(){
      const msg = this.$options.methods.checkFormElements.bind(this)();
      if(msg!==""){
        alert(msg);
        return;
      }
      let params={};
      let param;
      params["scriptName"]=this.$refs.scriptName.value;
      params["scriptLanguage"]=this.$refs.scriptLanguage.value;
      //编码html格式的数据·
      params["scriptContent"]=encodeURIComponent(this.$refs.scriptContent.value);
      params["sampleTypeId"]=this.sampleTypeId;
      params["sampleScriptId"]=this.sampleScriptId;
//      param = JSON.stringify(params);
      //序列化数据，以便于数据传输
      param = qs.stringify(params);
      this.$http.post('/api/sampleScript/save.action',param)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
            window.alert(response.data.message);
            let sampleTypeId = this.sampleTypeId===undefined?this.$refs.sampleTypeId.value:this.sampleTypeId;
            this.$router.push({path:'/sampletype/goSampleScriptList/'+sampleTypeId})
          }
        })
    },getScriptType(){
      this.$http.get('/api/sampleScript/getScript.action',null)
        .then((response)=>{
            if(response.statusText==='OK') {
              this.scriptTypeMap = response.data;
            }
        })
    },closeSelf(){
      let sampleTypeId = this.sampleTypeId===undefined?this.$refs.sampleTypeId.value:this.sampleTypeId;
      this.$router.push({path:'/sampletype/goSampleScriptList/'+sampleTypeId})
    },checkFormElements(){
      let msg ="";
      const scriptName =this.$refs.scriptName.value;
      if(scriptName<=0){
        msg +="脚本名称不能为空!\r\n";
      }
      const scriptLanguage =parseInt(this.$refs.scriptLanguage.value);
      if(scriptLanguage <=0){
        msg +="脚本语言不能为空!\r\n";
      }
      const scriptContent =this.$refs.scriptContent.value;
      if(scriptContent ==="" || scriptContent===null){
        msg +="脚本内容不能为空!\r\n";
      }
      return msg;
    },
  },
  created(){
    this.getScriptType();
    this.getData()
  }
}

</script>

