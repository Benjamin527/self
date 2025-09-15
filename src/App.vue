<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import { customDefineActions, customDebugLogs,customDefineTags } from '@/sdk/index';

  function addAction() {
    const custom_object = {
        name: 'xxx',
        mobile: '123'
    }
    customDefineActions('custom',custom_object)
    customDefineTags('customtags',custom_object)
  }

  function addLogs() {
    const custom_object = {
        name: 'xxx',
        mobile: '123'
    }
    customDebugLogs('testlogs',custom_object,'debug')
  }
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <button @click="addAction">clickRum</button>
  <button @click="addLogs">clickLogs</button>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
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
