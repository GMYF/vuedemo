
<template>
  <div id="samplelist">
  <!--<Header></Header>-->
  <div class="query_list">
     <div style="margin-left: 10px;width:500px">
       <label>查询结果: 共 {{list.length}}条记录</label>
       <div class="search">
           <label>样本类别: </label>
           <select ref="sampletypeid" style="width: 200px" >
             <option value="0"  selected="selected" >--请选择--</option>
             <option v-for="samepletype in sampletypeList" v-text="samepletype.sampletype" :value="samepletype.id"></option>
           </select>

       </div>
       <div>
         <input type="button" value="查询"  @click="goquery()"/>
         <input type="button" value="重置"  @click="goreset()"/>
       </div>
     </div>
  </div>
    <div>
      <div style="margin-left: 0px">
        <input type="button" value="新增样本" @click="addSample()"/>
        <input type="button" value="样本类别管理" @click="sampleTypeManage()"/>
      </div>
      <table >
         <thead>
         <tr>
           <td>Key值</td>
           <td>样本类别</td>
           <td>样本内容</td>
           <td>操作</td>
         </tr>
         </thead>
         <tbody>
            <tr v-for="v in list">
                <td v-text="v.keyvalue"></td>
                <td v-text="v.sampletype"></td>
                <td v-text="v.samplecontent"></td>
                <td>
                  <router-link :to="'/sample/editSample/'+v.sampleid">
                    修改
                  </router-link>
                  <!--<dialog-bar></dialog-bar>-->
                  |
                  <a  @click="gosampledelete(v.sampleid)" >删除</a>
                  <!--<router-link :to="" @click="gosampledelete(v.sampleid)">-->
                    <!--删除-->
                  <!--</router-link>-->
                  |
                  <router-link :to="'/sample/view/'+v.sampleid">
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

//import Header from '../../components/Header.vue'
//import Footer from '../../components/Footer.vue'
import qs from "qs";

export default {
//  components:{Header,Footer},
//  components:{ 'dialog-bar': dialogBar, },
//  components:{ 'sample-grid': sampleGrid, },
  data(){
    return{
      list:[],
      sampletypeList:[],
      contractId:this.$route.params.id
    }
  },
  methods:{
    getData(){
      let params={
        contractId:this.contractId,
      };
      let param = qs.stringify(params);
      this.$http.post('/api/sample/result.action',param)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
            this.list=response.data.data
          }
        }).catch(function(err){
          console.error(err)
        })
    },goquery(){
      let params={
        sampletypeId:this.$refs.sampletypeid.value,
        contractId:this.contractId
      };
      let param = qs.stringify(params);
      this.$http.post('/api/sample/result.action',param)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
            this.list=[];
            this.list=response.data.data
          }
        }).catch(function(err){
        console.error(err)
      })
    },gosampledelete(sampleId){
      this.$http.get('/api/sample/'+sampleId+'/delete.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
              window.alert(response.data.message);
              window.location.reload();
          }
        })
    },getSampleTypeList(){
      this.$http.get('/api/sampletype/'+0+'/result.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
             this.sampletypeList=response.data.data
          }
        })
    },
    goreset(){
      this.$refs.sampletypeid.value=0
    },
    addSample(){
     this.$router.push({path:'/sample/addSample/'+this.contractId})
    },
    sampleTypeManage(){
      // 跳转到样本类别管理页面
      this.$router.push({path:'/sampleType/manageList'})
    }
  },
  created(){
    this.getSampleTypeList();
    this.getData()
  }
}

</script>

