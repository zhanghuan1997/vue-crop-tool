<template>
<crop-tool></crop-tool>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CropTool from './components/CropTool.vue'
import {toRefs,reactive} from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    CropTool
  },
  setup(){

  }
});
</script>

<style>

</style>
