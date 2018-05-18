
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
        <input type="button" value="新增样本脚本" @click="addSampleScript()"/>
      </div>
      <table >
         <thead>
         <tr>
           <td>名称</td>
           <td>脚本语言</td>
           <td>操作</td>
         </tr>
         </thead>
         <tbody>
            <tr v-for="v in list">
                <td v-text="v.scriptname"></td>
                <td v-text="v.scriptlanguage"></td>
                <td>
                  <router-link :to="'/sampleScript/editSampleScript/'+v.samplescriptid">
                    修改
                  </router-link>
                  |
                  <a  @click="sampleScriptDelete(v.samplescriptid)" >删除</a>
                  |
                  <router-link :to="'/sampleScript/viewSampleScript/'+v.samplescriptid">
                  查看
                </router-link>
                </td>
            </tr>
         </tbody>
       </table>
    </div>
  <!--<Footer></Footer>-->
  </div>
</template>

<script>

export default {

  data(){
    return{
      list:[],
      sampleTypeId:this.$route.params.sampleTypeId,
      sampleFieldeList:[]
    }
  },
  methods:{
    getData(){
      this.$http.get('/api/sampleScript/'+this.sampleTypeId+'/result.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
            this.list=response.data.data
          }
        }).catch(function(err){
          console.error(err)
        })
    },sampleScriptDelete(sampleScriptId){
      this.$http.get('/api/sampleScript/'+sampleScriptId+'/delete.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
              window.alert(response.data.message,function () {
                 //todo 这里重新加载页面有问题
                  window.reload();
              })
          }
        })
    },
    addSampleScript(){
     this.$router.push({path:'/sampleScript/addSampleScript/'+this.sampleTypeId})
    }
  },
  created(){
    this.getData()
  }
}

</script>

