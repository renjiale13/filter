<template>
  <Form :table-data="data.tableData" @submitFilter="setFilterTableData"></Form>
  <!--    <div v-show="isFilter">筛选出的数量{{data.filterTableData.length}} </div>-->
  <Table :table-data="isFilter ? data.filterTableData:data.tableData"></Table>
  <!-- <div v-for="(item, index) in data" :key="index">-->
  <!--      {{ item }}-->
  <!--    </div>-->
</template>
<script setup>
import tableData from '../data.js'
import Table from '../components/table/index.vue'
import Form from '../components/form/index.vue'
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

<style scoped lang="scss">

</style>
