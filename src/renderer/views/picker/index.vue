<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
     
      <el-form-item label="英雄列表">
        <el-select v-model="form.champion_id" @change="changeChampion" placeholder="请选择英雄" filterable  :disabled="form.champion_id_disabled">
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

      <el-form-item label="秒选喊话" label-width="120px">
        <el-col :span="12">
          <el-input
            class="inline-input"
            v-model="form.msg"
            placeholder="请输入内容"
          >
            <el-button slot="append" icon="el-icon-chat-line-round" type="primary" @click="sendMsg" ></el-button>
          </el-input>
          <div class="sub-title">良好的沟通可以降低冲突概率</div>
        </el-col>
      </el-form-item>

       <el-form-item label="喊话位置" label-width="120px">
         <el-radio-group v-model="form.position"  @change="changePosition">
         <!--<el-radio-button label="top">上单</el-radio-button>
          // <el-radio-button label="mid">中单</el-radio-button>
          // <el-radio-button label="jungle">打野</el-radio-button>
          // <el-radio-button label="bot">下路</el-radio-button>
          // <el-radio-button label="support">辅助</el-radio-button>
          -->
           <el-radio-button label="上单">上单</el-radio-button>
          <el-radio-button label="中单">中单</el-radio-button>
          <el-radio-button label="打野">打野</el-radio-button>
          <el-radio-button label="下路">下路</el-radio-button>
          <el-radio-button label="辅助">辅助</el-radio-button>
        </el-radio-group>
      </el-form-item>

      
      <el-form-item label="额外选项">
        <el-checkbox-group v-model="form.ext" :disabled="form.ext_disabled" border="true">
          <el-checkbox label="accept">自动接受对局</el-checkbox>
          <el-checkbox label="say">秒选后喊话</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button :type="form.submit_running?'danger':'primary'" @click="onSubmit" >  {{form.submit_running?"停止":"运行"}}</el-button>
      </el-form-item>

       <el-form-item>
        <el-button   @click="onTest" > test</el-button>
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
    this.init()



  },
  created() {
 
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
          shell.openPath(this.filePath);
        },
      });
    });
    ipcRenderer.on("update-msg", (event, age) => {
      console.log("update-msg", event,age);

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
          this.$message({
             showClose: true,
             message:"正在检查更新",
          });
          break;
        case 1:
          this.$message({
            type: "success",
            message: "已检查到新版本，开始下载",
             showClose: true,
          });
          // this.dialogVisible = true;
          this.CheckUpdate('two',age.msg)
          break;
        case 2:
          this.$message({ type: "success", message: "无新版本",showClose: true, });
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
        champion_title:'',
        champion_id: "",
        champion_id_disabled:false,
        ext: [],
        ext_disabled:false,
        submit_running: false,
        submit_text:'', 
        position :'',
        msg:'',
      },
      options :  [],
      job:0,
      game_flow:'',
      last_game_flow:'',
      ext_accept:false,
      ext_say:false,
    
    }

  },
  methods: {
    onSubmit() {
      if( this.form.champion_id=="") {
        this.$message({
          message: "请先选择英雄！",
          type: "warning",
          showClose: true,
        });
        return false
      }

      this.form.submit_running = !this.form.submit_running
      this.form.champion_id_disabled = this.form.submit_running
      this.form.ext_disabled = this.form.submit_running
      this.$message({
           message: this.form.submit_running?'运行中':'已停止',
           type:  this.form.submit_running?'success':'danger',
            showClose: true,
        });

          var  that  =  this; 
          this.pickTask() 
          // this.lcu.pickTask(this.form.champion_id,this.form.ext) 
      //  ipcRenderer.invoke("lcu-pick-task",this.form.champion_id).then((res) => {
      //     that.auth = res
      //   });
    },


    CheckUpdate(data,url='') {
      switch (data) {
        case "one":
          ipcRenderer.invoke("check-update").then((res) => {
            console.log("启动检查");
          });

          break;
        case "two":
        // console.log(url)
          ipcRenderer.invoke("start-download",url).then(() => {
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
     


    init(){
      var that =this;
      that.getAuth()
      that.CheckUpdate('one')
      setInterval(function(){
        return  that.updateAuth()
      },20000)
    },
   
      getAuth(){
        var  that  =  this; 
       ipcRenderer.invoke("lcu-auth").then((res) => {
          that.auth = res
          that.lcu = new Lcu(that.auth.token,that.auth.port)
          that.lcu.url_with_auth = res.url_with_auth;
            that.lcu.ownedChampions().then((res)=>{
              that.options =  res
            })
          //  that.options = that.lcu.ownedChampions()
        });
      },

       updateAuth(){
        var  that  =  this; 
       ipcRenderer.invoke("lcu-auth").then((res) => {
            that.auth = res
            that.lcu.token = res.token;
            that.lcu.port  = res.port;
            that.lcu.url_with_auth = res.url_with_auth;
            that.lcu.ownedChampions().then((res)=>{
              that.options =  res
            })
          //  that.options = that.lcu.ownedChampions()
        });
      },

       onTest(){

          var that = this;
          this.lcu.summoner().then((res) =>{
            console.log(res)

              var summonerId = res.summonerId

              that.lcu.matchlist(summonerId,0,10).then((res)=>{
                console.log(res)
              })

          })
    },

      changePosition(e){
        var champion_name  = this.form.champion_id?this.findTitle(this.form.champion_id):'';
        this.form.msg = '我想玩'+e+champion_name+",谢谢各位大哥！！！！！";
      },
      changeChampion(e){
        var champion_name  = this.findTitle(e);
        this.form.msg = '我想玩'+this.form.position+champion_name+",谢谢各位大哥！！！！！";
      },

      sendMsg(){
        var that = this; 
        this.lcu.getCurrConversationID().then((res)=>{
          
          console.log(res) 
          console.log(res.length) 
          // var str = '我想玩'+that.form.position+that.findTitle(that.form.champion_id)+",谢谢各位大哥！！！！！"
          that.lcu.sendConversationMsg(that.form.msg+'------来自英雄秒选器~dou~音KF李~干啥程序员' , res[res.length-1].id )
        })
      },

      findTitle(champion_id){
        for (var a of this.options) {
          if(a.id==champion_id) 
            return a.title;
        }
        return '';
      },


      
      //秒选任务
      pickTask() {
        var that = this;
        //  自动接受对局
        this.ext_accept = this.form.ext.indexOf('accept') >-1?true:false;
        // 秒选喊话
        this.ext_say = this.form.ext.indexOf('say') >-1?true:false;

        if (this.job==0) {
          this.job = setInterval(async function (that) {
            that.game_flow = await that.lcu.gameFlow()
            if (that.game_flow != that.last_game_flow){
              //打印游戏状态变化
              console.log(that.game_flow)
            }



            if (that.ext_accept&&that.last_game_flow != 'ReadyCheck' && that.game_flow == 'ReadyCheck' ) {
              // 找到对局时自动接受对局
              await that.lcu.accept()
            } else if (that.last_game_flow != 'ChampSelect' && that.game_flow == 'ChampSelect') {
              //选人阶段 秒选
              // 得到位置号
              const id = await that.lcu.getActionId()
              if (id > -1) {
                // console.log(ext)
                if(that.ext_say){
                  //高情商自动喊话
                  that.sendMsg()
                }
                //秒选英雄
                await that.lcu.selectChampion(that.form.champion_id, id)
                
              }
            }
            that.last_game_flow = that.game_flow
          }, 1500, that);
          
        } else {
          clearInterval(this.job);
          this.job = 0;
        }
      }
   
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

