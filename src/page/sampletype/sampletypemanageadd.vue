
<template>
  <div>
    <table>
      <tr>
        <td>Key值<em>*</em></td>
        <td><input type="text" ref="keyValue"></td>
      </tr>
      <tr>
        <td>样本类别<em>*</em></td>
        <td>
          <input ref="sampleType" type="text">
        </td>
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
  </div>
</template>
<script>
  import qs from 'qs';
  export default {
    data(){
      return{
         sampleTypeId:this.$route.params.id,
         sampleTypeList:[]
      }
    },
    methods:{
      getData(){
        let sampleTypeId = this.sampleTypeId;
        sampleTypeId = sampleTypeId===undefined?0:sampleTypeId;
        this.$http.get('/api/sampletype/'+sampleTypeId+'/view.action',null)
          .then((response)=> {
            //箭头函数"=>"使this指向vue
            if(response.data.result===1){
//              this.sampleTypeList=response.data.data
                this.$refs.keyValue.value= response.data.data.keyvalue;
                this.$refs.sampleType.value= response.data.data.sampletype
            }
          });
      } ,
      closeSelf(){
          this.$router.push({path:'/sampleType/manageList'})
      },
      submitData(){
        const msg =this.$options.methods.checkFormElements.bind(this)();
        if(msg !==""){
          alert(msg);
          return ;
        }
        let params={};
        params["sampleType"]=this.$refs.sampleType.value;
        params["keyValue"]=this.$refs.keyValue.value;
        params["sampleTypeId"]=this.$route.params.id;
        params = qs.stringify(params);
        this.$http.post('/api/sampletype/save.action',params)
          .then((response)=> {
            //箭头函数"=>"使this指向vue
            if(response.data.result===1){
                window.alert(response.data.message);
                this.$router.push({path:'/sampleType/manageList'})
            }
          })
      },checkFormElements(){
      let msg ="";
      const keyValue =this.$refs.keyValue.value;
      if(keyValue==="" || keyValue===null){
        msg +="Key值不能为空!\r\n";
      }
      const sampleType =this.$refs.sampleType.value;
      if(sampleType ==="" || sampleType===null){
        msg +="样本类别不能为空!\r\n";
      }
      return msg;
     },
      getSampleById(){
        let sampleId = this.sampleId;
        sampleId = (sampleId === undefined)?0:sampleId;
        this.$http.get('/api/sample/'+sampleId+'/view.action',null)
          .then((response)=> {
            //箭头函数"=>"使this指向vue
            if(response.data.result===1){
                this.$refs.sampleTypeId.value=response.data.data.sampletypeid;
                this.keyValue=response.data.data.keyvalue;
                this.$refs.samplecontent.value=response.data.data.samplecontent;
            }
          })
      },
    },
    created(){
      this.getData();
    },
}
</script>
