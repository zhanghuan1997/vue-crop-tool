/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <el-dialog
    :model-value="visible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
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
  props:{
    //控制弹窗的展示喝隐藏
    visible:{
      type:Boolean,
      default:false
    },
    //需裁剪图片的地址
    imgUrl:{
      type:String,
      default:'https://img2.baidu.com/it/u=2673052903,3733944713&fm=26&fmt=auto'
    },
    //裁剪生成图片的质量
    outputSize:{
      type:Number,
      default:1
    },
    //裁剪生成图片的格式
    outputType:{
      type:String,
      default:'jpg'
    },
    //裁剪框的大小信息
    info:{
      type:Boolean,
      default:true
    },
    //图片是否允许滚轮缩放
    canScale:{
      type:Boolean,
      default:true
    },
    //是否默认生成截图框
    autoCrop:{
      type:Boolean,
      default:true
    },
    //默认生成截图框宽度
    autoCropWidth:{
      type:Number,
      default:150
    },
    //默认生成截图框高度
    autoCropHeight:{
      type:Number,
      default:100
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props:any,context:any) { 
    const cropper:Ref = ref(null)
    // reactive 数据双向绑定
    const data = reactive({
      visible:false,
      option:{
        img:props.imgUrl, 
        outputSize:props.outputSize,	
        outputType:props.outputType, 
        info:props.info,
        canScale:props.canScale,
        autoCrop:props.autoCrop,
        autoCropWidth:props.autoCropWidth,
        autoCropHeight:props.autoCropHeight
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
      },
      handleClose(){
         context.emit('update:visible', false)
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

  function dialogVisible(dialogVisible: any, arg1: () => void) {
    throw new Error('Function not implemented.')
  }
