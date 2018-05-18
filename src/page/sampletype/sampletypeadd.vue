
<template>
  <div>
    <table>
      <tr>
        <td>样本类别<em>*</em></td>
        <td>
          <select ref="sampleTypeId" style="width: 200px" @change="changeKeyValue()">
            <option value="0"  selected="selected" >--请选择--</option>
            <option v-for="sampleType in sampleTypeList " v-text="sampleType.sampletype" :value="sampleType.id" ></option>
          </select>
        </td>
      </tr>
      <tr>
        <td>Key值</td>
        <td><label ref="keyValue" >{{keyValue}}</label></td>
      </tr>
      <tr>
        <td>样本内容<em>*</em></td>
        <td>
          <textarea title="sss" rows="12" cols="25" ref="samplecontent"></textarea>
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
    <input type="hidden" ref="contractId">
  </div>
</template>
<script>
  import qs from 'qs';
  export default {
    data(){
      return{
        sampleTypeList:[],
        keyValue:null,
        sampleId:this.$route.params.sampleId,
        contractId:this.$route.params.contractId,
      }
    },
    methods:{
      getData(){
        this.$http.get('/api/sampletype/'+0+'/result.action',null)
          .then((response)=> {
            //箭头函数"=>"使this指向vue
            if(response.data.result===1){
              this.sampleTypeList=response.data.data
            }
            this.getSampleById();
          });
      } ,
      changeKeyValue(){
         const sampleTypeId= this.$refs.sampleTypeId.value
//         console.log("this is key changed==>"+sampleTypeId)
        this.$http.get('/api/sampletype/'+sampleTypeId+'/result.action',null)
          .then((response)=> {
            //箭头函数"=>"使this指向vue
            if(response.data.result===1){
              this.keyValue = response.data.data[0].keyvalue
            }
          })
      },
      closeSelf(){
        let contractId = this.contractId===undefined?this.$refs.contractId.value:this.contractId;
        this.$router.push({path:'/contract/sampleManageList/'+contractId});
      },checkFormElements(){
        let msg ="";
        const sampleType =parseInt(this.$refs.sampleTypeId.value);
        if(sampleType<=0){
          msg +="样本类别不能为空!\r\n";
        }
        const samplecontent =this.$refs.samplecontent.value;
        if(samplecontent ==="" || samplecontent===null){
          msg +="样本内容不能为空!\r\n";
        }
        return msg;
      },
      submitData(){
        //methods中方法的相互调用
        let msg = this.$options.methods.checkFormElements.bind(this)();
        if(msg!==""){
           alert(msg);
           return;
        }
        let params={};
        params["sampleTypeId"]=this.$refs.sampleTypeId.value;
        params["samplecontent"]=this.$refs.samplecontent.value;
        params["sampleId"]=this.sampleId;
        params["contractId"]=this.contractId;
        params = qs.stringify(params);
        this.$http.post('/api/sample/save.action',params)
          .then((response)=> {
            //箭头函数"=>"使this指向vue
            if(response.data.result===1){
                window.alert(response.data.message);
                let contractId = this.contractId===undefined?this.$refs.contractId.value:this.contractId;
                this.$router.push({path:'/contract/sampleManageList/'+contractId});
            }
          })
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
                this.$refs.contractId.value=response.data.data.contractid
            }
          })
      },
    },
    created(){
      this.getData();
    },
}
</script>
