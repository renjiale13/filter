<script setup>
import tableData from './data.js'
import Table from './components/table/index.vue'
import Form from './components/form/index.vue'
import {ref,reactive } from  'vue'
const data=reactive({
  tableData,
  filterTableData:[],
})
const isFilter=ref(false);
const setFilterTableData=(value)=>{
  data.filterTableData=value
  isFilter.value=true
}
</script>

<template>
  <div class="app-container">
    <Form :table-data="data.tableData" @Submit="setFilterTableData"></Form>
<!--    <div v-show="isFilter">筛选出的数量{{data.filterTableData.length}} </div>-->
    <Table :table-data="isFilter ? data.filterTableData:data.tableData"></Table>
<!-- <div v-for="(item, index) in data" :key="index">-->
<!--      {{ item }}-->
<!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
.app-container{
  //width: 1080PX;
margin: 0 auto;
  div{
    margin-bottom: 10px;
  }
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
