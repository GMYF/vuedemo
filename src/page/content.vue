
<template>
  <div>
    <myHeader></myHeader>
    <h2 v-text="dat.title"></h2>
    <p> 作者:{{dat.author.loginname}}   发表于:{{$utils.goodTime(dat.create_at)}}</p>
    <hr/>
    <article v-html="dat.content"></article>
    <h3> 网友回复:</h3>
    <div class="article_list">
      <ul>
        <li v-for="i in dat.replies">
          <p> 评论者:{{i.author.loginname}}   评论于：{{$utils.goodTime(i.create_at)}}</p>
          <article v-html="i.content"></article>
        </li>
      </ul>
    </div>
    <myFooter></myFooter>
  </div>
</template>
<script>
  import myHeader from '../components/Header.vue'
  import myFooter from '../components/Footer.vue'
  export default {
    components:{myHeader,myFooter},
    data(){
      return{
        id:this.$route.params.id,
        dat:{}
      }
    },
    created(){
      this.getData()
      console.log(this.$route)
    },
    methods:{
      getData () {
        this.$api.get('topic/' + this.id, null, r => {
          this.dat = r.data
        })
      }
    }

  }
</script>
<style>
  .article_list{
    margin: auto;
  }
</style>
