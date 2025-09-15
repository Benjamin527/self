<template>
  <div id="app">
    <!-- 路由视图 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// App.vue 现在只作为路由容器
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
