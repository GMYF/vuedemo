
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
        <input type="button" value="新增样本字段" @click="addSampleField()"/>
      </div>
      <table >
         <thead>
         <tr>
           <td>Key值</td>
           <td>字段名称</td>
           <td>操作</td>
         </tr>
         </thead>
         <tbody>
            <tr v-for="v in list">
                <td v-text="v.keyvalue"></td>
                <td v-text="v.fieldname"></td>
                <td>
                  <router-link :to="'/sampleField/editSampleField/'+v.samplefieldid">
                    修改
                  </router-link>
                  |
                  <a  @click="sampleFieldDelete(v.samplefieldid)" >删除</a>
                  |
                  <router-link :to="'/sampleField/viewSampleField/'+v.samplefieldid">
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


export default {
//  components:{Header,Footer},
//  components:{ 'dialog-bar': dialogBar, },
//  components:{ 'sample-grid': sampleGrid, },
  data(){
    return{
      list:[],
      sampleTypeId:this.$route.params.sampleTypeId,
      sampleFieldeList:[]
    }
  },
  methods:{
    getData(){
      this.$http.get('/api/sampleField/'+this.sampleTypeId+'/result.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
            this.list=response.data.data
          }
        }).catch(function(err){
          console.error(err)
        })
    },sampleFieldDelete(samplefieldid){
      this.$http.get('/api/sampleField/'+samplefieldid+'/delete.action',null)
        .then((response)=> {
          //箭头函数"=>"使this指向vue
          if(response.data.result===1){
              window.alert(response.data.message);
              window.location.reload();
          }
        })
    },
    addSampleField(){
     this.$router.push({path:'/sampleField/addSampleField/'+this.sampleTypeId})
    }
  },
  created(){
    this.getData()
  }
}

</script>

