<script setup>

</script>

<template>

  <div class="app-container">
    <router-view></router-view>
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
