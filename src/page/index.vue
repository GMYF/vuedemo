
<template>
  <div>
  <Header></Header>
  <div class="article_list">
    <ul>
     <li v-for="i in list">
       <time v-text="i.create_at"></time>
       <router-link :to="'./content/'+i.id">
          {{i.title}}
       </router-link>
     </li>
    </ul>
  </div>
  <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  components:{Header,Footer},
  data(){
    return{
      list:[]
    }
  },
  methods:{
    getData(){
      this.$api.get('topics',null,r=>{
          this.list=r.data;
      })
    }
  },
 created(){
    this.getData()
 }
}
</script>
