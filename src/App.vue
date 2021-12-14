<template>
<crop-tool v-model:visible="bbb"></crop-tool>
<el-button type="primary" @click="aaa">点击上传</el-button>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue';
import CropTool from './components/CropTool.vue'

export default defineComponent({
  name: 'App',
  components: {
    CropTool
  },
  setup(){
    const data = reactive({
      bbb:false
    })
    const methods = {
      aaa(){
        data.bbb = true
      }
    }

    return{
      ...methods,
      ...toRefs(data)
    }
  }
});
</script>

<style>

</style>
