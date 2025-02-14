<template>

<el-table :data="props.tableData" border   stripe  max-height="950" scrollbar-always-on>
  <el-table-column prop="id" label="id" align="center"  width="180" />
  <el-table-column prop="name" align="center"  label="Name"  />
  <el-table-column prop="age" align="center"  label="Age"  />
  <el-table-column prop="address" align="center"  label="Address"  />
</el-table>

</template>
<script setup>
import {defineProps} from 'vue'
const props = defineProps({
  tableData:{
    type: Array,
    default: () => [],
  }
})
// console.log(props.tableData)
</script>
<style scoped>

</style>
