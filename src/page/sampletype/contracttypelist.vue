
<template>
  <div id="samplelist">
  <!--<Header></Header>-->
  <div class="query_list">
     <div style="margin-left: 10px;width:500px">
       <label>查询结果: 共 {{list.length}}条记录</label>
     </div>
  </div>
    <div>
      <div style="margin-left: 0px">
        <input type="button" value="新增合同类型" @click="addContractType()"/>
      </div>
      <table >
         <thead>
         <tr>
           <td>Key值</td>
           <td>合同类型</td>
           <td>操作</td>
         </tr>
         </thead>
         <tbody>
            <tr v-for="v in list">
                <td v-text="v.keyvalue"></td>
                <td v-text="v.contracttype"></td>
                <td>
                  <router-link :to="'/contract/editContractType/'+v.id">
                    修改
                  </router-link>
                  |
                  <a @click="contractTypeDelete(v.id)" >删除</a>
                  |
                  <router-link :to="'/contract/sampleManageList/'+v.id">
                  样本管理
                  </router-link>
                </td>
            </tr>
         </tbody>
       </table>
    </div>
  </div>
</template>

<script>

export default {

  data(){
    return{
      list:[],
      contractTypeList:[]
    }
  },
  methods:{
    getData(){
      this.$http.get('/api/contract/result.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
            this.list=response.data.data
          }
        }).catch(function(err){
          console.error(err)
        })
    },contractTypeDelete(contractTypeId){
      this.$http.get('/api/contract/'+contractTypeId+'/delete.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
              window.alert(response.data.message);
              window.location.reload();
          }
        })
    },
    addContractType(){
     this.$router.push({path:'/contract/addContractType'})
    }
  },
  created(){
    this.getData()
  }
}

</script>

