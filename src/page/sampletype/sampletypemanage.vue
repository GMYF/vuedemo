
<template>
  <div id="samplelist">
  <div class="query_list">
     <div style="margin-left: 10px;width:500px">
       <label>查询结果: 共 {{list.length}}条记录</label>
     </div>
  </div>
    <div>
      <div style="margin-left: 0px">
        <input type="button" value="新增样本" @click="addSampleType()"/>
      </div>
      <table >
         <thead>
         <tr>
           <td>Key值</td>
           <td>样本类别</td>
           <td>操作</td>
         </tr>
         </thead>
         <tbody>
            <tr v-for="v in list">
                <td v-text="v.keyvalue"></td>
                <td v-text="v.sampletype"></td>
                <td>
                  <router-link :to="'/sampletype/editSampleType/'+v.id">
                    修改
                  </router-link>
                  <!--<dialog-bar></dialog-bar>-->
                  |
                  <a  @click="goSampleTypeDelete(v.id)" >删除</a>
                  |
                  <router-link :to="'/sampletype/view/'+v.id">
                  查看详情
                </router-link>
                  |
                  <router-link :to="'/sampletype/goSampleFieldList/'+v.id">
                    配置字段
                  </router-link>
                  |
                  <router-link :to="'/sampletype/goSampleScriptList/'+v.id">
                    配置脚本
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
      sampletypeList:[]
    }
  },
  methods:{
    getData(){
      this.$http.get('/api/sampletype/0/result.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
            this.list=response.data.data
          }
        }).catch(function(err){
          console.error(err)
        })
    },goSampleTypeDelete(sampleTypeId){
      this.$http.get('/api/sampletype/'+sampleTypeId+'/delete.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
              window.alert(response.data.message);
              window.location.reload();
          }
        })
    },
    addSampleType(){
      this.$router.push({path:'/sampletype/sampleTypeAdd'})
    }
  },
  created(){
    this.getData()
  }
}

</script>

