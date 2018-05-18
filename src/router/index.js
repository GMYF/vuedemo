import Vue from 'vue'
import Router from 'vue-router'
import begin from '@/page/begin'
import contractList from  '@/page/sampletype/contracttypelist'
import contractEdit from  '@/page/sampletype/contracttypeedit'
import sampleTypeList from '@/page/sampletype/sampletypelist'
import sampleTypeView from '@/page/sampletype/sampletypeview'
import sampleTypeAdd from '@/page/sampletype/sampletypeadd'
import sampleTypeManage from  '@/page/sampletype/sampletypemanage'
import sampleTypeManageAdd from  '@/page/sampletype/sampletypemanageadd'
import sampleTypeManageView from  '@/page/sampletype/sampletypemanageview'
import sampleTypeFieldList from  '@/page/sampletype/sampletypefieldlist'
import sampleTypeFieldAdd from  '@/page/sampletype/sampletypefieldadd'
import sampleTypeFieldView from  '@/page/sampletype/sampletypefieldview'
import sampleTypeScriptList from  '@/page/sampletype/sampletypescriptlist'
import sampleTypeScriptAdd from  '@/page/sampletype/sampletypescriptadd'
import sampleTypeScriptView from  '@/page/sampletype/sampletypescriptview'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'begin',
      component: begin,
      meta: {
        title: '首页入口'
      }
    } , {
      path:'/sample/',
      name:'sampleList',
      component:sampleTypeList,
      meta: {
        title: '样本管理'
      }
    } , {
      path:"/sample/view/:sampleId",
      name:'sampleView',
      component:sampleTypeView,
      meta: {
        title: '样本查看'
      }
    } ,{
      path:"/sample/addSample/:contractId",
      component:sampleTypeAdd,
      meta: {
        title: '样本新增'
      }
    }, {
      path:"/sample/editSample/:sampleId",
      component:sampleTypeAdd,
      meta: {
        title: '编辑样本信息'
      }
    }, {
      path:"/sampleType/manageList",
      component:sampleTypeManage,
      meta: {
        title: '样本类别管理'
      }
    }, {
      path:"/sampleType/sampleTypeAdd",
      component:sampleTypeManageAdd,
      meta: {
        title: '新增样本类别'
      }
    }, {
      path:"/sampleType/view/:id",
      component:sampleTypeManageView,
      meta: {
        title: '查看样本类别'
      }
    }, {
      path:"/sampleType/editSampleType/:id",
      component:sampleTypeManageAdd,
      meta: {
        title: '编辑样本类别'
      }
    },{
      path:'/sampletype/goSampleFieldList/:sampleTypeId',
      component:sampleTypeFieldList,
      meta: {
        title: '配置字段管理'
      }
    },{
      path:'/sampleField/editSampleField/:sampleFieldId',
      component:sampleTypeFieldAdd,
      meta: {
        title: '配置字段编辑'
      }
    },{
      path:'/sampleField/addSampleField/:sampleTypeId',
      component:sampleTypeFieldAdd,
      meta: {
        title: '配置字段新增'
      }
    },{
      path:'/sampleField/viewSampleField/:sampleFieldId',
      component:sampleTypeFieldView,
      meta: {
        title: '查看字段信息'
      }
    },{
      path:'/sampletype/goSampleScriptList/:sampleTypeId',
      component:sampleTypeScriptList,
      meta: {
        title: '样本脚本管理'
      }
    },{
      path:'/sampleScript/addSampleScript/:sampleTypeId',
      component:sampleTypeScriptAdd,
      meta: {
        title: '样本脚本新增'
      }
    },{
      path:'/sampleScript/viewSampleScript/:sampleScriptId',
      component:sampleTypeScriptView,
      meta: {
        title: '样本脚本查看'
      }
    },{
      path:'/sampleScript/editSampleScript/:sampleScriptId',
      component:sampleTypeScriptAdd,
      meta: {
        title: '样本脚本编辑'
      }
    },{
      path:'/contract/contractTypeList',
      component:contractList,
      meta: {
        title: '合同类型管理'
      }
    },{
      path:'/contract/editContractType/:id',
      component:contractEdit,
      meta: {
        title: '合同类型编辑'
      }
    },{
      path:'/contract/sampleManageList/:id',
      component:sampleTypeList,
      meta: {
        title: '样本管理'
      }
    },{
      path:'/contract/addContractType',
      component:contractEdit,
      meta: {
        title: '样本编辑(新增)'
      }
    }
  ]
})
