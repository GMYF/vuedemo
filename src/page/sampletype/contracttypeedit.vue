
<template>
  <div>
    <table>
      <tr>
        <td>Key值<em>*</em></td>
        <td><input ref="keyValue" type="text"></td>
      </tr>
      <tr>
        <td>合同类型<em>*</em></td>
        <td>
            <input ref="contractType" type="text"/>
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
        contractTypeList:[],
        keyValue:null,
        contractId:this.$route.params.id,
        isRouterAlive: true
      }
    },
    methods:{
      getData(){
        this.contractId = this.contractId===undefined?0:this.contractId;
        this.$http.get('/api/contract/'+this.contractId+'/view.action',null)
          .then((response)=> {
            //箭头函数"=>"使this指向vue
            if(response.data.result===1){
               this.$refs.keyValue.value=response.data.data.keyvalue;
               this.$refs.contractType.value=response.data.data.contracttype;
            }
          });
      } ,
      closeSelf(){
        this.$router.push({path:'/contract/contractTypeList'})
      },
      submitData(){
        const msg =this.$options.methods.checkFormElements.bind(this)();
        if(msg!==""){
          alert(msg);
          return;
        }
        let params={};
        params["keyValue"]=this.$refs.keyValue.value;
        params["contractType"]=this.$refs.contractType.value;
        params["contractId"]=this.contractId;
        params = qs.stringify(params);
        this.$http.post('/api/contract/save.action',params)
          .then((response)=> {
            //箭头函数"=>"使this指向vue
            if(response.data.result===1){
               window.alert(response.data.message);
               this.$router.push({path:'/contract/contractTypeList'})
            }
          })
      },checkFormElements(){
         let msg="";
         const keyValue =this.$refs.keyValue.value;
         if(keyValue==="" || keyValue ===null){
           msg +="Key值不能为空!\r\n";
         }
         const contractType =this.$refs.contractType.value;
         if(contractType ==="" || contractType === null){
           msg +="合同类型不能为空!\r\n";
         }
         return msg;
      }

    },
    created(){
      this.getData();
    },
}
</script>
