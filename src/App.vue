<template>
<crop-tool></crop-tool>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CropTool from './components/CropTool.vue'

export default defineComponent({
  name: 'App',
  components: {
    CropTool
  },
});
</script>

<style>

</style>
