<template>
    <el-row class="demo-avatar demo-basic">
      <el-col :lg="12" :md="12">
        <div class="sub-title">circle</div>
        <div class="demo-basic--circle">
          <div v-for="avatar in circleAvatarList" :key="avatar.key" class="block">
            <el-avatar 
            :size="avatar.key" 
            :src="avatar.circleUrl" 
            @click="changeCustomUser(avatar.userid)" 
            style="cursor: pointer;"
            />
            <div>{{ avatar.userid }}</div>
          </div>
        </div>
      </el-col>
      <el-col :lg="12" :md="12">
        <div class="sub-title">square</div>
        <div class="demo-basic--circle">
          <div v-for="avatar in squareAvatarList" :key="avatar.key" class="block">
            <el-avatar 
            shape="square" 
            :size="avatar.key" 
            :src="avatar.squareUrl" 
            @click="changeCustomUser(avatar.userid)" 
            style="cursor: pointer;"
            />
            <div>{{ avatar.userid }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { customDefineUserInfo } from '@/sdk/index'
  import { ElMessage } from 'element-plus'

  
  const circleAvatarList = ref([
    {key: 'large', circleUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', userid: 'testDeer'},
    {key: 'large', circleUrl: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg', userid: 'testHorse'},
    {key: 'large', circleUrl: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg', userid: 'testTiger'},
  ])

  const squareAvatarList = ref([
    {key: 'large', squareUrl: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg', userid: 'testReinDeer'},
    {key: 'large', squareUrl: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg', userid: 'testFox'},
    {key: 'large', squareUrl: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg', userid: 'testDog'},
  ])


  const changeCustomUser = (value: string) => {
  //随机id
  const randomUserid = Math.floor(Math.random() * 10000)

  const userInfo = {
    id: value,
    email: `test_${randomUserid}@example.com`,
    name: `测试用户_${randomUserid}`,
  }
  customDefineUserInfo(userInfo)
  ElMessage.info('用户信息已设置')
}
  </script>
  
  <style scoped>
  .demo-basic {
    text-align: center;
  }
  .demo-basic .sub-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
  .demo-basic .demo-basic--circle,
  .demo-basic .demo-basic--square {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .demo-basic .block:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
  }
  .demo-basic .block {
    flex: 1;
  }
  .demo-basic .el-col:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
  }
  @media screen and (max-width: 992px) {
    .demo-basic .el-col:not(:last-child) {
      border-right: none;
    }
  }
  </style>
  