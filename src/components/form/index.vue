

<template>
  <div class="form-container">
  <el-form :model="form" label-width="auto" >
    <el-form-item label="年龄">
      <span v-for="(item,index) in form.age" :key="index"> {{item.intervalStart+'-'+item.intervalEnd}}</span>
      <el-button v-show="form.age.length>0" size="small" @click="onDelForm('age')">清空</el-button>
    </el-form-item>
    <el-form-item>
      <el-checkbox-group v-model="form.age">
        <el-checkbox v-for="(item,index) in data.ageARR"
                     :key="index"  :label="item.intervalStart+'-'+item.intervalEnd" :value="item" border />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="城市">
       <span v-for="(item,index) in form.address" :key="index"> {{item}}</span>
      <el-button v-show="form.address.length>0" size="small" @click="onDelForm('address')">清空</el-button>
    </el-form-item>
    <el-form-item>
      <el-checkbox-group v-model="form.address">
        <el-checkbox v-for="(item,index) in data.addReSS"
                     :key="index"  :label="item" :value="item" border />
      </el-checkbox-group>
    </el-form-item>
  </el-form>
    <div class="footer">
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onCancel">清空</el-button>
    </div>
  </div>
</template>
<script setup>
import {ref, reactive, defineProps,defineEmits} from 'vue'
import {deepClone, findMaxInIntervals} from "../../utils/index.js";
import {Logger} from "sass";
const form = reactive({
  age: [],
  address: [],
})

const emit = defineEmits(['Submit']);
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
  // console.log(arr);
}
hoverArr();
const onDelForm =(type)=>{
     form[type]=[];
  onSubmit();
}
const onCancel=()=>{
  form.age=[];
  form.address=[];
  emit('Submit',tableDataDeep);
}
const onSubmit=()=>{
  const filterData=tableDataDeep.filter(item=>{
   const isAddress=form.address.length===0 ? true:form.address.includes(item.address);
   const isAge=form.age.length===0 ? true:form.age.some(age=>{
     return age.intervalStart<=item.age&&age.intervalEnd>=item.age;
   });
   return isAddress&&isAge;
  })
  console.log(filterData);
  emit('Submit',filterData);
}
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
