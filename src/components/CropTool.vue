/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
  >
    <div class="crop-tool">
  <vueCropper
  ref="cropper"
  :img="option.img"
  :outputSize="option.size"
  :outputType="option.outputType"
  :info="option.info"
  :canScale="option.canScale"
  :autoCrop="true"
  :autoCropWidth="option.autoCropWidth"
  :autoCropHeight="option.autoCropHeight"
></vueCropper>
</div>
<div class="button-options">
  <el-row>
    <!-- 上传图片按钮 -->
    <el-col :span="8">
      <el-upload
        class="upload-demo"
        action=""
        accept=".jpeg,.png,.jpg,.bmp"
        :on-change='handleChangeUpload'>
        <el-button  type="primary">上传图片</el-button>
      </el-upload>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" @click="clearPhoto">清除图片</el-button>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" @click="downLoadPhoto">下载图片</el-button>
    </el-col>
  </el-row>
</div>
  </el-dialog>

</template>
<script lang="ts">
import { reactive ,Ref,ref,toRefs} from 'vue'
import { ElMessage } from 'element-plus'
interface File<T>{
  raw: T,
  name:string,
  size:number,

}
export default {
  name: 'CropTool',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() { 
    const cropper:Ref = ref(null)
    // reactive 数据双向绑定
    const data = reactive({
      dialogVisible:true,
      option:{
        img: 'https://img2.baidu.com/it/u=2673052903,3733944713&fm=26&fmt=auto', // 裁剪图片的地址
        outputSize:1,	//裁剪生成图片的质量
        outputType:'jpg', //裁剪生成图片类型
        info:true,
        canScale:true,
        autoCrop:true,
        autoCropWidth:150,
        autoCropHeight:100
      }
    })
    const methods = {
      //上传文件大于5M进行校验
      handleChangeUpload(file:File<unknown>){
        
        // console.log(URL.createObjectURL(file.raw))
        let isLt5M = file.size / 1024 / 1024 < 5
        if(!isLt5M){
            ElMessage({
            message: '不能上传大于5M的图片',
            type: 'warning',
          })
        }
        //将本地上传的文件地址赋值给裁剪显示的图片
        data.option.img = URL.createObjectURL(file.raw)
      },
      clearPhoto(){
        data.option.img = ''
      },
      downLoadPhoto(){
        let aLink = document.createElement('a')
        aLink.download = '图片'
        cropper.value.getCropBlob((data:unknown)=>{
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      }
    }

    return {
      // toRefs转换为响应式数据
      ...toRefs(data),
      ...methods,
      cropper
    }
  }
}
</script>
<style scoped>
.crop-tool{
  width:auto;
  height:500px;
}
.button-options{ 
  text-align: center;
  margin-top: 10px;

}
</style>
