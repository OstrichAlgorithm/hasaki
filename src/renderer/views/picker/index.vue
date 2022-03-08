<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
     
      <el-form-item label="英雄列表">
        <el-select v-model="form.champion_id" placeholder="请选择英雄" filterable  :disabled="form.champion_id_disabled">
          <el-option
            v-for="item in options"
            :key="item.id"
            :value="item.id"
            :label="item.label"
            style="height:72px"
          >

            <span style="float: left">


            <el-image
              style="width: 128px; height: 72px"
              :src="'https://127.0.0.1:'+auth.port+item.baseSplashPath"
              :fit="contain"
            ></el-image>
            
            
            </span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >{{ item.name+'-'+ item.title+'-'+item.alias }}</span
            >
         
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="额外选项">
        <el-checkbox-group v-model="form.ext" :disabled="form.ext_disabled" border="true">
          <el-checkbox label="accept">自动接受对局</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button :type="form.submit_running?'danger':'primary'" @click="onSubmit" >  {{form.submit_running?"停止":"运行"}}</el-button>
      </el-form-item>
      
    </el-form>

    <el-dialog
      title="进度"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      center
      width="30%"
      top="45vh"
    >
      <div style="text-align: center;">
        <el-progress
          type="dashboard"
          :percentage="percentage"
          :color="colors"
          :status="progressStaus"
        ></el-progress>
      </div>
    </el-dialog>
  </div>


</template>

<script>
// import Tinymce from "@/components/Tinymce";
import { ipcRenderer , shell } from "electron";
import { Lcu } from "@/api/lcu"
export default {
  mounted() {


    this.CheckUpdate('one')

    var that =this;
    that.getAuth()
    setInterval(function(){
      return  that.getAuth()
    },10000)
  },
  created() {
    console.log("环境打印示例");
    console.log(__lib);
    console.log(process.env.TERGET_ENV);
    console.log(process.env);
    ipcRenderer.on("download-progress", (event, arg) => {
      this.percentage = Number(arg);
    });
    ipcRenderer.on("download-error", (event, arg) => {
      if (arg) {
        this.progressStaus = "exception";
        this.percentage = 40;
        this.colors = "#d81e06";
      }
    });
    ipcRenderer.on("download-paused", (event, arg) => {
      if (arg) {
        this.progressStaus = "warning";
        this.$alert("下载由于未知原因被中断！", "提示", {
          confirmButtonText: "重试",
          callback: (action) => {
            ipcRenderer.invoke("satrt-download");
          },
        });
      }
    });
    ipcRenderer.on("download-done", (event, age) => {
      this.filePath = age.filePath;
      this.progressStaus = "success";
      console.log("下载完成啦");
      this.$alert("更新下载完成！", "提示", {
        confirmButtonText: "确定",
        callback: (action) => {
          console.log(action)
          // console.log(this.filePath)
          // console.log(shell.openPath(this.filePath))
          shell.openPath(this.filePath);
        },
      });
    });
    ipcRenderer.on("update-msg", (event, age) => {
      console.log("update-msg", age);
      switch (age.state) {
        case -1:
          const msgdata = {
            title: "发生错误",
            message: age.msg,
          };
          this.dialogVisible = false;
          ipcRenderer.invoke("open-errorbox", msgdata);
          break;
        case 0:
          this.$message("正在检查更新");
          break;
        case 1:
          this.$message({
            type: "success",
            message: "已检查到新版本，开始下载",
          });
          // this.dialogVisible = true;
          this.CheckUpdate('two')
          break;
        case 2:
          this.$message({ type: "success", message: "无新版本" });
          break;
        case 3:
          this.percentage = age.msg.percent.toFixed(1);
          break;
        case 4:
          this.progressStaus = "success";
          this.$alert("更新下载完成！", "提示", {
            confirmButtonText: "确定",
            callback: (action) => {
              ipcRenderer.invoke("confirm-update");
            },
          });
          break;

        default:
          break;
      }
    });
  },
  // components: { Tinymce },
  data() {
    return {
      // lcu：'',
      dialogVisible: false,
      progressStaus: null,
      filePath: "",
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#6f7ad3", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#5cb87a", percentage: 100 },
      ],
      percentage:0,

      auth:{
        token:'',
        port:'',
        url_with_auth:'',
      },
      form: {
        champion_id: "",
        champion_id_disabled:false,
        ext: [],
        ext_disabled:false,
        submit_running: false,
        submit_text:''
      },
      options :  []
    
    }

  },
  methods: {
    onSubmit() {
      if( this.form.champion_id=="") {
        this.$message({
          message: "请先选择英雄！",
          type: "warning"
        });
        return false
      }

      this.form.submit_running = !this.form.submit_running
      this.form.champion_id_disabled = this.form.submit_running
      this.form.ext_disabled = this.form.submit_running
      this.$message({
           message: this.form.submit_running?'运行中':'已停止',
           type:  this.form.submit_running?'success':'danger',
        });

          var  that  =  this; 
          this.lcu.pickTask(this.form.champion_id,this.form.ext) 
      //  ipcRenderer.invoke("lcu-pick-task",this.form.champion_id).then((res) => {
      //     that.auth = res
      //   });
    },


    CheckUpdate(data) {
      switch (data) {
        case "one":
          ipcRenderer.invoke("check-update").then((res) => {
            console.log("启动检查");
          });

          break;
        case "two":
          ipcRenderer.invoke("start-download").then(() => {
            this.dialogVisible = true;
          });

          break;

        default:
          break;
      }
    },

     handleClose() {
      this.dialogVisible = false;
    },

   
   
      getAuth(){
        var  that  =  this; 
       ipcRenderer.invoke("lcu-auth").then((res) => {
          that.auth = res
          that.lcu = new Lcu(that.auth.token,that.auth.port)
          that.lcu.ownedChampions().then((res)=>{
            // console.log(res)
            that.options =  res
          })
        });
      },
      
     

   
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

