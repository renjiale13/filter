

<template>
  <div class="form-container">
  <el-form :model="form" label-width="auto"  >
    <el-form-item label="年龄:">
      <span v-for="(item,index) in form.age" :key="index"> {{data.ageARR[item].intervalStart+'-'+data.ageARR[item].intervalEnd}}</span>
      <el-button v-show="form.age.length>0" size="small" @click="onDelForm('age')">清空</el-button>
    </el-form-item>
    <el-form-item>
      <el-checkbox-group v-model="form.age"
      >
        <el-checkbox v-for="(item,index) in data.ageARR"
                     :key="index"
                     :label="item.intervalStart+'-'+item.intervalEnd"
                     :value="index"
                     border />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="城市:">
       <span v-for="(item,index) in form.address" :key="index"> {{data.addReSS[item]}}</span>
      <el-button v-show="form.address.length>0" size="small" @click="onDelForm('address')">清空</el-button>
    </el-form-item>
    <el-form-item>
      <el-checkbox-group v-model="form.address">
        <el-checkbox v-for="(item,index) in data.addReSS"
                     :key="index"
                     :label="item"
                     :value="index"
                     border />
      </el-checkbox-group>
    </el-form-item>
  </el-form>
    <div class="footer">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>

    </div>
  </div>
</template>
<script setup>
import {ref, reactive, defineProps, defineEmits, onMounted,nextTick} from 'vue'
import {deepClone, findMaxInIntervals} from "../../utils/index.js";
import { useRouter,useRoute  } from 'vue-router';

const form = reactive({
  age: [],
  address: [],
})

const emit = defineEmits(['submitFilter']);
const router = useRouter();
const route = useRoute();
const props = defineProps({
  tableData:{
    type: Array,
    default: () => [],
  }
})
const tableDataDeep =deepClone(props.tableData)||[];
const data=reactive({
  ageARR:[],
  addReSS:[],
})
const created=()=>{
  hoverArr();
  if(route?.query?.ageFilter&&route?.query?.cityFilter){
    form.age=route.query.ageFilter.split(',').map(item=>{return Number(item)});
    form.address=route.query.cityFilter.split(',').map(item=>{return Number(item)});
    nextTick().then(() => {
      submit();
    });

  }
}

const hoverArr=()=>{
  let arr=props.tableData;
  data.addReSS=[];
  let age=[]
  arr.forEach(item=>{
        if(data.addReSS.indexOf(item.address)===-1){
          data.addReSS.push(item.address)
        }
    age.push(item.age);
  })
  data.ageARR =findMaxInIntervals(age,10)||[]
}

const onDelForm =(type)=>{
     form[type]=[];
  onSubmit();
}
const onCancel=()=>{
  form.age=[];
  form.address=[];
  emit('submitFilter',tableDataDeep);
}
const onSubmit=()=>{
  submit();
 router.push({
   path:route.path,
   query:{
     ageFilter:form.age.length===0 ? undefined:form.age.join(','),
     cityFilter:form.address.length===0 ? undefined:form.address.join(',')
   }
 })
}
const submit=()=>{
  const addressFilter= form.address.map((item,index)=>{
    return data.addReSS[item]
  })
  const ageFilter= form.age.map((item,index)=>{
    return data.ageARR[item]
  })
  const filterData=tableDataDeep.filter(item=>{
    const isAddress=form.address.length===0 ? true:addressFilter.includes(item.address);
    const isAge=form.age.length===0 ? true:ageFilter.some(age=>{
      return age.intervalStart<=item.age&&age.intervalEnd>=item.age;
    });
    return isAddress&&isAge;
  })
    // DOM 已更新
    emit('submitFilter',filterData);
}
// onMounted(()=>{
  created();
// })

</script>
<style scoped lang="scss">
.form-container{
    .el-form-item {
       span{
         margin: 0 5px;
       }
    }
  .footer{
    display: flex;
    justify-content: flex-end;

  }
  margin-bottom: 10px;
}
</style>
