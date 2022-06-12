<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
     
      <el-form-item label="英雄列表">
        <el-col :span="10">
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
        </el-col>
        <el-col :span="10">
          <el-select v-model="form.ban_champion_id"  placeholder="禁用英雄" filterable  :disabled="form.ban_champion_id_disabled">
            <el-option
              v-for="item in ban_options"
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
        </el-col>
        <el-col :span="4"  style="display:none;">
          <el-select v-model="form.spell1Id" placeholder="D"  :disabled="form.champion_id_disabled">
            <el-option
              v-for="item in summoner_skill_list"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
              <span style="float: left">
                <el-image
                  style="width: 24px; height: 24px"
                  :src="item.icon"
                  :fit="contain"
                ></el-image>
              </span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
                >{{ item.name }}</span>
             
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4"  style="display:none;">
          <el-select v-model="form.spell2Id" placeholder="F"  :disabled="form.champion_id_disabled">
            <el-option
              v-for="item in summoner_skill_list"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
              <span style="float: left">
                <el-image
                  style="width: 24px; height: 24px"
                  :src="item.icon"
                  :fit="contain"
                ></el-image>
              </span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
                >{{ item.name }}</span>
             
            </el-option>
          </el-select>
        </el-col>
         
      </el-form-item>
      

      <el-form-item label="秒选喊话" label-width="120px">
        <el-col :span="18">
          <el-input
            class="inline-input"
            v-model="form.msg"
            placeholder="请输入内容"
          >
            <el-select   placeholder="位置"  v-model="form.position"  @change="changePosition" slot="prepend">
              <el-option label="上单" value="上单"></el-option>
              <el-option label="中单" value="中单"></el-option>
              <el-option label="打野" value="打野"></el-option>
              <el-option label="下路" value="下路"></el-option>
              <el-option label="辅助" value="辅助"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-chat-line-round" type="primary" @click="sendMsg" ></el-button>
          </el-input>
        </el-col>
        
      </el-form-item>

       <el-form-item label="喊话位置" label-width="120px" style="display:none;">
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

      <el-form-item label="战绩先知" style="display:none" label-width="120px">
        <el-col :span="18">
          <el-input
            type="textarea"
            class="inline-input"
            v-model="form.info"
           :rows="5"
          >
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="战绩先知" label-width="120px">
        <el-col :span="22">
          <el-table
            :data="form.tableData"
            stripe
            style="width: 100%;">
            <el-table-column
              prop="summoner"
              label="召唤师">
              <template slot-scope="scope">
                {{ scope.row.summoner }}
                 <el-tag
                  v-if="scope.row.black>1"
                  key="scope.row.black"
                  type="dander"
                  effect="dark">
                  {{ scope.row.black }}黑
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="win"
              label="胜率">
            </el-table-column>
            <el-table-column
              prop="kda"
              label="KDA">
            </el-table-column>
             <el-table-column
              prop="commonChampions"
              label="绝活">
            </el-table-column>


            
          </el-table>
        </el-col>
      </el-form-item>



      <el-form-item label="阵容分析" label-width="">
      <el-col :span="10">
        <div class="block">
         <el-table
            :data="my_team"
            stripe
            style="width: 100%;">
             <el-table-column
              prop="champion"
              width="90%"
              label="我方英雄">
              <template slot-scope="scope">
                <span>
                  {{scope.row.position}}-
                  {{scope.row.champion}}<br>
                  <el-image
                style="width: 28px; height: 28px"
                :src="'https://127.0.0.1:'+auth.port+scope.row.champion_avatar"
                :fit="contain" lazy
              ></el-image>
                </span>
                 
              </template>
            </el-table-column>

             <el-table-column>
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand" style="height:200px">
                   <el-form-item label="" v-for="item in  props.row.ext "  :key="item.championid2">
                    <span>
                    对位
                     <el-button type="primary" size="medium"  circle   style="background-size: contain;width:28px;height:28px;" :style="'background-image: url('+'https://127.0.0.1:'+auth.port+item.champion2_avatar+');'">
                               </el-button>
                    胜率<el-tag :type='item.winrate>5000?"danger":"success"'>{{ item.winrate/100.00 }}% </el-tag>
                    单杀率<el-tag :type='item.ikillrate>5000?"danger":"success"'>{{ item.ikillrate/100.00 }}% </el-tag>
                    </span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            
            
          </el-table>
      </div>
      </el-col>
      <el-col :span="12">
      
        <div class="block">
        <span class="demonstration"></span>
         <el-table
            :data="their_team"
            stripe
            style="width: 100%;">
           
             <el-table-column
              prop="champion"
              width="90%"
              label="敌方英雄">
               <template slot-scope="scope">
                <span>{{scope.row.champion}}</span><br>
                 <el-image
                style="width: 28px; height: 28px"
                :src="'https://127.0.0.1:'+auth.port+scope.row.champion_avatar"
                :fit="contain"
              ></el-image>
              </template>
              
            </el-table-column>

            <el-table-column >
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                      <el-tabs tab-position="left" style="height: 200px;">
                        <el-tab-pane :label="value.position" v-for="(value ,key) in  props.row.ext"   :key="key" >
                          <div style="height:200px;overflow:auto;">
                            <el-form-item label="" v-for="item in value.list "  :key="item.champion2_avatar">
                              <span>对线
                               <el-button type="primary" size="medium"  circle @click="chooseChampion(item.championid2)"    style="background-size: contain;width:28px;height:28px;" :style="'background-image: url('+'https://127.0.0.1:'+auth.port+item.champion2_avatar+');'">
                               </el-button>
                             
                                胜率<el-tag :type='item.winrate>5000?"danger":"success"'>{{ item.winrate/100.00 }}% </el-tag>
                                单杀率<el-tag :type='item.ikillrate>5000?"danger":"success"'>{{ item.ikillrate/100.00 }}% </el-tag>
                              </span>
                            </el-form-item>
                          </div>
                        </el-tab-pane>
                      </el-tabs>
                </el-form>
              </template>
            </el-table-column>
            
          </el-table>
      </div>
      </el-col>


      
      </el-form-item>

       <el-form-item label="url" label-width="120px"  style="display:none;">
        <el-col :span="18">
          <el-input
            class="inline-input"
            v-model="form.url"
            placeholder="请输入内容"
          >
          <el-select   placeholder="方法"  v-model="form.methods"  slot="prepend">
              <el-option label="get" value="get"></el-option>
              <el-option label="post" value="post"></el-option>
              <el-option label="put" value="put"></el-option>
              <el-option label="delete" value="delete"></el-option>
              <el-option label="dispatch" value="dispatch"></el-option>
            </el-select>
          
            <el-button slot="append" icon="el-icon-chat-line-round" type="primary" @click="doRequest" ></el-button>
          </el-input>
        </el-col>
        
      </el-form-item>

       

      
      <el-form-item label="额外选项">
        <el-checkbox-group v-model="form.ext" :disabled="form.ext_disabled" border="true">
          <el-checkbox label="accept">自动接受对局</el-checkbox>
          <el-checkbox label="pick">秒选英雄</el-checkbox>
          <el-checkbox label="spell" style="display:none;">设置召唤师技能</el-checkbox>
          <el-checkbox label="say">秒选后喊话</el-checkbox>
          <el-checkbox label="send">自动发送队友战绩</el-checkbox>
          <el-checkbox label="black">自动发送开黑信息</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button :type="form.submit_running?'danger':'primary'" @click="onSubmit" >  {{form.submit_running?"停止":"运行"}}</el-button>


        <el-button   @click="query" > 查询战绩</el-button>
        <el-button   @click="sendInfo" > 战绩发送</el-button>
        <el-button   @click="sendBlack" > 开黑发送</el-button>

        <el-button   @click="onTest"   style="display:none;"> onTest</el-button>
        <el-button   @click="openWin"   style="display:none;"> 窗口</el-button>
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

// import { init } from '@sentry/electron';
import * as Sentry from "@sentry/electron/renderer";




export default {
  components: {
    },
  mounted() {
    this.init()
  },
  created() {
    // Sentry.init({});
    Sentry.init({ dsn: "https://d86b80bd197444bca37b0351a77d94e3@o376260.ingest.sentry.io/6395566" });

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
          this.dialogVisible = true;
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
      summoner_skill_list:[
        // {
        //   "id":1,
        //   "name":'d'
        // }
      ],
      form: {
        champion_title:'',
        champion_id: "",
        ban_champion_id: "",
        spell1Id:0,
        spell2Id:0,
        champion_id_disabled:false,
        ban_champion_id_disabled:false,
        ext: [],
        ext_disabled:false,
        submit_running: false,
        submit_text:'', 
        position :'',
        msg:'',
        url:'',
        info:'',
        tableData: [
          // {
          // 'summoner': '11',
          //           'black': 1,
          //           'kda': 1,
          //           'win': 1,
          //           'commonChampions': '1'}
        ],
        black_list:[],
      },
      black_list:{},
      options :  [],
      ban_options :  [],
      job:0,
      game_flow:'',
      last_game_flow:'',
      ext_accept:false,
      ext_say:false,

      their_team:[
        // {
        //   win: "80%", 
        //   champion:"加里奥"
        // } 
      ],
      my_team :[
        // {
        //   position: '1L辅助',
        //   win: "80%", 
        //   kda:'11.0', 
        //   champion:"加里奥"
        // } 
      ],
    }
   },
  methods: {
    onSubmit() {
      // if( this.form.champion_id=="") {
      //   this.$message({
      //     message: "请先选择英雄！",
      //     type: "warning",
      //     showClose: true,
      //   });
      //   return false
      // }

      this.form.submit_running = !this.form.submit_running
      this.form.champion_id_disabled = this.form.submit_running
      this.form.ban_champion_id_disabled = this.form.submit_running
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
        console.log(url)
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
      // setInterval(function(){
      //   return  that.updateAuth()
      // },20000)
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
            that.ban_options = that.lcu.allChampions();
            that.summoner_skill_list =  that.lcu.getSummonerSkillList();
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
    //对局页面
    updateGame(data){
      var that = this;
      var position_map ={
        "middle":"中单",
        "top":"上单",
        "jungle":"打野",
        "bottom":"下路",
        "utility":"辅助",
      };

      // var position_map_1 ={
      //   "middle":"mid",
      //   "top":"top",
      //   "jungle":"jungle",
      //   "bottom":"bottom",
      //   "utility":"support",
      // };
      var position_map_1 ={
        "中单":"mid",
        "上单":"top",
        "打野":"jungle",
        "下路":"bottom",
        "辅助":"support",
      };
       var position_map_2 ={
        "mid":"中单",
        "top":"上单",
        "jungle":"打野",
        "bottom":"下路",
        "support":"辅助",
      };

      // var data ={"actions":[[{"actorCellId":0,"championId":60,"completed":true,"id":0,"isAllyAction":false,"isInProgress":false,"type":"ban"},{"actorCellId":1,"championId":875,"completed":true,"id":1,"isAllyAction":false,"isInProgress":false,"type":"ban"},{"actorCellId":2,"championId":29,"completed":true,"id":2,"isAllyAction":false,"isInProgress":false,"type":"ban"},{"actorCellId":3,"championId":517,"completed":true,"id":3,"isAllyAction":false,"isInProgress":false,"type":"ban"},{"actorCellId":4,"championId":101,"completed":true,"id":4,"isAllyAction":false,"isInProgress":false,"type":"ban"},{"actorCellId":5,"championId":81,"completed":true,"id":5,"isAllyAction":true,"isInProgress":false,"type":"ban"},{"actorCellId":6,"championId":101,"completed":true,"id":6,"isAllyAction":true,"isInProgress":false,"type":"ban"},{"actorCellId":7,"championId":104,"completed":true,"id":7,"isAllyAction":true,"isInProgress":false,"type":"ban"},{"actorCellId":8,"championId":62,"completed":true,"id":8,"isAllyAction":true,"isInProgress":false,"type":"ban"},{"actorCellId":9,"championId":234,"completed":true,"id":9,"isAllyAction":true,"isInProgress":false,"type":"ban"}],[{"actorCellId":-1,"championId":0,"completed":true,"id":100,"isAllyAction":false,"isInProgress":false,"type":"ten_bans_reveal"}],[{"actorCellId":0,"championId":121,"completed":true,"id":10,"isAllyAction":false,"isInProgress":false,"type":"pick"}],[{"actorCellId":5,"championId":50,"completed":true,"id":11,"isAllyAction":true,"isInProgress":false,"type":"pick"},{"actorCellId":6,"championId":236,"completed":true,"id":12,"isAllyAction":true,"isInProgress":false,"type":"pick"}],[{"actorCellId":1,"championId":266,"completed":true,"id":13,"isAllyAction":false,"isInProgress":false,"type":"pick"},{"actorCellId":2,"championId":145,"completed":true,"id":14,"isAllyAction":false,"isInProgress":false,"type":"pick"}],[{"actorCellId":7,"championId":3,"completed":true,"id":15,"isAllyAction":true,"isInProgress":false,"type":"pick"},{"actorCellId":8,"championId":79,"completed":true,"id":16,"isAllyAction":true,"isInProgress":false,"type":"pick"}],[{"actorCellId":3,"championId":115,"completed":false,"id":17,"isAllyAction":false,"isInProgress":true,"type":"pick"},{"actorCellId":4,"championId":0,"completed":false,"id":18,"isAllyAction":false,"isInProgress":true,"type":"pick"}],[{"actorCellId":9,"championId":0,"completed":false,"id":19,"isAllyAction":true,"isInProgress":false,"type":"pick"}]],"allowBattleBoost":false,"allowDuplicatePicks":false,"allowLockedEvents":false,"allowRerolling":false,"allowSkinSelection":true,"bans":{"myTeamBans":[],"numBans":0,"theirTeamBans":[]},"benchChampionIds":[],"benchEnabled":false,"boostableSkinCount":0,"chatDetails":{"chatRoomName":"503a2dbe-038f-4628-87ac-f171d8cc279c@champ-select.pvp.net","chatRoomPassword":null},"counter":42,"entitledFeatureState":{"additionalRerolls":0,"unlockedSkinIds":[]},"gameId":6949162512,"hasSimultaneousBans":true,"hasSimultaneousPicks":false,"isCustomGame":false,"isSpectating":false,"localPlayerCellId":7,"lockedEventIndex":-1,"myTeam":[{"assignedPosition":"utility","cellId":5,"championId":50,"championPickIntent":0,"entitledFeatureType":"NONE","selectedSkinId":50001,"spell1Id":4,"spell2Id":3,"summonerId":0,"team":2,"wardSkinId":-1},{"assignedPosition":"bottom","cellId":6,"championId":236,"championPickIntent":0,"entitledFeatureType":"NONE","selectedSkinId":236008,"spell1Id":7,"spell2Id":4,"summonerId":0,"team":2,"wardSkinId":-1},{"assignedPosition":"middle","cellId":7,"championId":3,"championPickIntent":0,"entitledFeatureType":"NONE","selectedSkinId":3001,"spell1Id":14,"spell2Id":4,"summonerId":2937231739,"team":2,"wardSkinId":19},{"assignedPosition":"top","cellId":8,"championId":79,"championPickIntent":0,"entitledFeatureType":"NONE","selectedSkinId":79007,"spell1Id":4,"spell2Id":12,"summonerId":0,"team":2,"wardSkinId":-1},{"assignedPosition":"jungle","cellId":9,"championId":0,"championPickIntent":0,"entitledFeatureType":"NONE","selectedSkinId":0,"spell1Id":4,"spell2Id":11,"summonerId":0,"team":2,"wardSkinId":-1}],"recoveryCounter":0,"rerollsRemaining":0,"skipChampionSelect":false,"theirTeam":[{"assignedPosition":"","cellId":0,"championId":121,"championPickIntent":0,"entitledFeatureType":"","selectedSkinId":121000,"spell1Id":0,"spell2Id":0,"summonerId":0,"team":1,"wardSkinId":-1},{"assignedPosition":"","cellId":1,"championId":266,"championPickIntent":0,"entitledFeatureType":"","selectedSkinId":266000,"spell1Id":0,"spell2Id":0,"summonerId":0,"team":1,"wardSkinId":-1},{"assignedPosition":"","cellId":2,"championId":145,"championPickIntent":0,"entitledFeatureType":"","selectedSkinId":145000,"spell1Id":0,"spell2Id":0,"summonerId":0,"team":1,"wardSkinId":-1},{"assignedPosition":"","cellId":3,"championId":0,"championPickIntent":0,"entitledFeatureType":"","selectedSkinId":0,"spell1Id":0,"spell2Id":0,"summonerId":0,"team":1,"wardSkinId":-1},{"assignedPosition":"","cellId":4,"championId":0,"championPickIntent":0,"entitledFeatureType":"","selectedSkinId":0,"spell1Id":0,"spell2Id":0,"summonerId":0,"team":1,"wardSkinId":-1}],"timer":{"adjustedTimeLeftInPhase":27086,"internalNowInEpochMs":1652700481139,"isInfinite":false,"phase":"BAN_PICK","totalTimeInPhase":30000},"trades":[]};
      var actions  = data.actions;
      var my_team  = []
      var their_team  = [] 
      //由action 得出英雄列表
      var localPlayerCellId = data.localPlayerCellId;
      //ban选是否结束
      if(actions[1][0].completed ==  false)
        return;


      for(var index = 2; index<actions.length ; index++){
        for(var act of actions[index]){
          console.log(act)
          if(act.isAllyAction){
            //找位置
            var position ='';
            for(var t of  data.myTeam){
               if(t.cellId == act.actorCellId){
                  position = t.assignedPosition
              }
            }
            //队友
            my_team[act.actorCellId >4? (act.actorCellId-5):act.actorCellId]= {
              position:  position,
              // champion:  ''
              // champion_avatar: '',
              champion_id:  act.championId,
              // ext:[]
            }
            // my_team.push( {
            //   position:  position,
            //   // champion:  ''
            //   // champion_avatar: '',
            //   champion_id:  act.championId,
            //   // ext:[]
            // });
          }else{
            //敌方
             their_team[act.actorCellId >4? (act.actorCellId-5):act.actorCellId]= {
              // champion:  ''
              // champion_avatar: '',
              champion_id:  act.championId,
              // ext:[]
            }
            // their_team.push( {
            //   position:  '',
            //   // champion:  ''
            //   // champion_avatar: '',
            //   champion_id:  act.championId,
            //   // ext:[]
            // });
          }
        }
      }


      console.log(my_team)
      console.log(their_team)
      // return;
      

      


       // // 敌方英雄ids
        var  their_champion_ids= []; 
        their_team.forEach(item => {
            their_champion_ids.push(
              item.champion_id+""
            )
          })
          console.log(their_champion_ids)
      // 我方信息
      for(var i in  my_team){
        var championInfo = that.lcu.getChampionInfo(my_team[i].champion_id)

        if(my_team[i].champion_id == 0){
           my_team[i] = {
            position:  position_map[my_team[i].position],
            champion:  '待选择',
            champion_avatar: '',
            champion_id:  0,
            ext:[]
          }
          continue;
        }
        my_team[i] = {
          position:  position_map[my_team[i].position],
          champion:  championInfo['title'],
          champion_avatar:  championInfo['squarePortraitPath'],
          champion_id:  my_team[i].champion_id,
          ext:[]
        }
      }

      



      for(var i in  my_team){

        if(my_team[i].champion_id == 0){

          continue;
        }
        var detail = this.lcu.getChampionDetail1(my_team[i].champion_id);
        console.log(detail)
        // var fight  = detail.list.championFight[position_map_1[data.myTeam[i].assignedPosition]]
        var fight  = detail.list.championFight[position_map_1[my_team[i].position]]
        console.log(fight)
        // // //对位数据搜寻
        var  fight_data = [];
        for(var x  in fight){
          if(-1!= their_champion_ids.indexOf(fight[x].championid2) ){
            fight_data.push(fight[x])
          }
        }
        console.log(fight_data)
        // //可能对位数据 
        for(var temp  of fight_data){
          var champion2Info = that.lcu.getChampionInfo(temp.championid2)
          
          if( parseInt(temp.championid1)  == my_team[i].champion_id ){
             my_team[i].ext.push({
              ikillrate :temp.ikillrate,
              winrate:temp.winrate,
              championid2: temp.championid2,
              champion2_avatar:  champion2Info['squarePortraitPath'],
              championid2_name: champion2Info['title']
            } )
          }
        }
    
      }
      console.log(my_team)
      this.my_team  = my_team

      
      // //敌方信息
      for(var i in  their_team){
        var championInfo = that.lcu.getChampionInfo(their_team[i].champion_id)
        their_team[i] = {
          champion:  championInfo['title'],
          champion_avatar:  championInfo['squarePortraitPath'],
          champion_id:  their_team[i].champion_id,
          ext:[]
        }
      }
      



      for(var i in their_team){

          if(their_team[i].champion_id == 0){
            continue;
          }
          // 对位数据
          var detail = that.lcu.getChampionDetail1(their_team[i].champion_id);
          console.log(detail)
          var ext = [] ;
          if(detail.list.championFight){
              var  fight= detail.list.championFight
              for(var key in fight){
              var a =  fight[key].map(i=>{
              // ext[position_map_2[key]] = fight[key].map(i=>{
                 var champion2Info = that.lcu.getChampionInfo(i.championid2)
                  return { 
                    ikillrate :i.ikillrate,
                    winrate:i.winrate,
                    championid2: i.championid2,
                    champion2_avatar:  champion2Info['squarePortraitPath'],
                    championid2_name: champion2Info['title'] 
                  }
                }) 
                ext.push({
                  "position": position_map_2[key],
                  "list" : a
                })
              }
          }
          their_team[i].ext = ext
      }

      this.their_team  = their_team
    },
    


      paiwei(){
          var that = this;
          this.lcu.session().then(res=>{
             console.log(res)
             console.log(res.timer.phase)
            if(res.actions[0][0].type!='ban' )
              return;
            //解析页面
            this.updateGame(res)
            
            if(res.timer.phase == 'PLANNING'){ 
                //  that.lcu.banChampion(104,res.localPlayerCellId ).then(res=>{
                //    console.log(res)
                //  })
                //预选英雄
             }
            if(res.timer.phase == 'BAN_PICK'){ 
              //禁用英雄阶段
              // if(res.actions[0][res.localPlayerCellId].isInProgress &&!res.actions[0][res.localPlayerCellId].completed){
              //   that.lcu.banChampion(104,res.localPlayerCellId ).then(res=>{
              //     console.log(res)
              //   })
              // }
              // //禁用英雄完毕，展示阶段
              // if(res.actions[1][0].isInProgress &&!res.actions[1][0].completed){
               
              // }
              // 选英雄阶段 
              for(var i in res.actions ){
                for(var j in res.actions[i] ){
                  if(that.ext_pick && res.actions[i][j].isInProgress && res.actions[i][j].actorCellId==res.localPlayerCellId  && !res.actions[i][j].completed ){
                    //禁用英雄阶段
                    if(res.actions[i][j].type == 'ban' ){
                       console.log("banban")
                       if(that.form.ban_champion_id!=0){
                          that.lcu.banChampion(that.form.ban_champion_id,res.localPlayerCellId ).then(res=>{
                            console.log(res)
                          })
                       }
                        
                        
                     
                    }else if(res.actions[i][j].type == 'pick' && res.actions[i][j].actorCellId==res.localPlayerCellId  && !res.actions[i][j].completed){
                      console.log("pickpick")
                      // 选择英雄策略
                       if(that.form.champion_id!=0){
                          that.lcu.selectChampion(that.form.champion_id,res.localPlayerCellId ).then(res=>{
                            console.log(res)
                           })
                       }
                      
                      // that.lcu.selectChampion(that.form.champion_id,res.localPlayerCellId ).then(res=>{
                      //   console.log(res)
                      // })
                    }else if(res.actions[i][j].type == 'ten_bans_reveal' ){
                       console.log("ten_bans_revealten_bans_reveal")
                    }

                    return;
                  }
                }
              }
            }
           })
    },
    openWin(){
      // this.their_team = this.their_team
      console.log( this.their_team)
      

      var detail = this.lcu.getChampionDetail1(1);
          // var   fight= detail.list.championFight
          console.log(detail)


      //  ipcRenderer.invoke("open-win",{url:"table"}).then((res) => {
      //       console.log("启动");
      //     });

    },

    onTest(){

      this.paiwei();
      
      // this.updateGame();

// this.lcu.getChampionDetail(1)
      // var a = setInterval(()=>{
      //   this.paiwei()
      // },1000)
  // console.log(that.lcu.getSummonerSkillList())
          // this.lcu.do("/lol-champ-select/v1/session/my-selection","PATCH",{
          //   "spell1Id": 1,
          //   "spell2Id": 14,
          // })
          // this.lcu.summoner().then((res) =>{
          //   console.log(res)

          //     var summonerId = res.summonerId

          //     that.lcu.matchlist(summonerId,0,10).then((res)=>{
          //       console.log(res)
          //     })

          // })
    },
   

       onTest1(){
          var that = this;
          this.lcu.getActionId().then((res) =>{
            console.log(res)


          })


       
    },

     query(){
          var that = this;
          that.form.info ="";
          that.form.tableData =[];
          var black_list  = {}; 

          that.black_list= {}
        
          that.lcu.getCurrConversationID().then((res) =>{
            console.log(res)
            that.lcu.listConversationMsg(res[res.length-1].id).then((res) =>{
              var ids = [];
              for(var i in res){
                if(res[i].type!== 'system'){
                  continue;
                }
                if( ids.indexOf(res[i].fromSummonerId) != -1){
                  continue;
                }else{
                  ids.push(res[i].fromSummonerId)
                }
                that.lcu.matchlist(res[i].fromSummonerId,0,20).then((res)=>{
                  var str = '';
                  var summonerName = res.games.games[0].participantIdentities[0].player.summonerName;
                  str +=summonerName+'    '; 
                  // console.log(res)
                  //胜率
                  var win = that.win(res.games.games);
                  // console.log('win---',win)
                  str += '胜率:'+win+'    '; 
                  //kda
                  var kda = that.kda(res.games.games);
                  // console.log('kda---',kda)
                  str += 'KDA:'+kda+'    '; 
                  //评价
                  str = "("+that.evaluate(kda)+")"+str+"    ";
                  //常用英雄 
                  var commonChampions = that.commonChampions(res.games.games);
                  // console.log('commonChampions---',commonChampions)
                  // if(commonChampions.length)
                 str += '绝活:'; 
                  var commonChampionsStr = '';
                  for(var i in commonChampions){
                    if(i> 2) break;
                    str+=commonChampions[i]+' '
                    commonChampionsStr+=commonChampions[i]+' '
                  }
                  that.form.info += str+'\n'; 
                  //列表数据
                  that.form.tableData.push({
                    'summoner': summonerName,
                    'black': 1,
                    'kda': kda,
                    'win': win,
                    'commonChampions': commonChampionsStr
                  })

                  //开黑列表
                  var gameId = ''; 
                  for(var i in res.games.games){
                    // console.log( res.games.games[i])
                    gameId = res.games.games[i].gameId;
                     if( that.black_list[gameId]==undefined){
                         that.black_list[gameId]=[summonerName];  
                      
                    }else if( that.black_list[gameId].indexOf(summonerName)==-1){
                         that.black_list[gameId].push(summonerName);  
                    }
                    //  console.log(that.black_list)
                  }
                })
              }
              // console.log( that.black_list)
              //开黑列表
              // black_list = that.black(black_list);
              // that.form.black_list = black_list
              // for(var i in black_list){
              //   var len = black_list[i].length;
              //   // var tag = len+"黑";
              //   for(var x in black_list[i]){
              //     for(var y in that.form.tableData){
              //       if( black_list[i][x]== that.form.tableData[y]['summoner']){
              //         that.form.tableData[y]['black'] = len; 
              //         break;
              //       }

              //     }
              //   }
              // }

              

            })
          })
          setTimeout(function(){
             // 开黑列表
              var black_list = that.black(that.black_list);
              console.log(black_list)
              that.form.black_list = black_list
              for(var i in black_list){
                var len = black_list[i].length;
                // var tag = len+"黑";
                for(var x in black_list[i]){
                  for(var y in that.form.tableData){
                    if( black_list[i][x]== that.form.tableData[y]['summoner']){
                      that.form.tableData[y]['black'] = len; 
                      // break;
                    }

                  }
                }
              }
          },3000)

    },

    sendInfo(){
        var that = this; 
        var info = that.form.info.split('\n')
        // console.log(info)
        this.lcu.getCurrConversationID().then((res)=>{
          for(var i in info){
            that.lcu.sendConversationMsg(info[i], res[res.length-1].id )
          }
          that.lcu.sendConversationMsg('------来自英雄秒选器~公众号~KF李~回复lol' , res[res.length-1].id )
        })
    },

    sendBlack(){
          // console.log(that.black_list)
          // console.log(JSON.stringify(that.black_list)  )
          // that.black_list = {"6833237721":["让喔来教你做人"],"6833376306":["让喔来教你做人"],"6833582864":["让喔来教你做人"],"6833780881":["让喔来教你做人"],"6833837518":["让喔来教你做人"],"6834808720":["让喔来教你做人"],"6834815441":["让喔来教你做人"],"6834924001":["让喔来教你做人"],"6835083241":["让喔来教你做人"],"6835992889":["让喔来教你做人"],"6836182679":["让喔来教你做人"],"6841395690":["让喔来教你做人"],"6841554205":["让喔来教你做人"],"6841684855":["让喔来教你做人"],"6843880942":["让喔来教你做人"],"6844049307":["让喔来教你做人"],"6846090511":["让喔来教你做人"],"6846185062":["让喔来教你做人"],"6846375513":["让喔来教你做人"],"6846476639":["让喔来教你做人","我曾路过你的内心"],"6829788047":["我曾路过你的内心"],"6829826389":["我曾路过你的内心"],"6829989073":["我曾路过你的内心"],"6834005531":["我曾路过你的内心"],"6834132472":["我曾路过你的内心"],"6834141816":["我曾路过你的内心"],"6836338859":["我曾路过你的内心"],"6836447639":["我曾路过你的内心"],"6836701164":["我曾路过你的内心"],"6836856444":["我曾路过你的内心"],"6836942158":["我曾路过你的内心"],"6839490696":["我曾路过你的内心"],"6843279067":["我曾路过你的内心"],"6843344454":["我曾路过你的内心"],"6843480700":["我曾路过你的内心"],"6843572256":["我曾路过你的内心"],"6843655566":["我曾路过你的内心"],"6846206185":["我曾路过你的内心"],"6846377800":["我曾路过你的内心"],"6837000069":["BankerAlgorithm"],"6837068771":["BankerAlgorithm"],"6837044194":["BankerAlgorithm"],"6837528248":["BankerAlgorithm"],"6837594193":["BankerAlgorithm"],"6837661973":["BankerAlgorithm"],"6838015393":["BankerAlgorithm"],"6838199137":["BankerAlgorithm"],"6838330677":["BankerAlgorithm"],"6838446105":["BankerAlgorithm"],"6839196679":["BankerAlgorithm"],"6839311154":["BankerAlgorithm"],"6839535451":["BankerAlgorithm"],"6840800983":["BankerAlgorithm"],"6840901935":["BankerAlgorithm"],"6841008466":["BankerAlgorithm"],"6841563709":["BankerAlgorithm"],"6841732626":["BankerAlgorithm"],"6845292574":["BankerAlgorithm"],"6845320946":["BankerAlgorithm"],"6836273133":["翁翁翁z"],"6836368928":["翁翁翁z"],"6836493758":["翁翁翁z"],"6837577070":["翁翁翁z"],"6837665812":["翁翁翁z"],"6837687670":["翁翁翁z"],"6837823026":["翁翁翁z"],"6844313326":["翁翁翁z"],"6844386178":["翁翁翁z","不苦不苦"],"6844494605":["翁翁翁z","不苦不苦"],"6844555994":["翁翁翁z","不苦不苦"],"6844663002":["翁翁翁z","不苦不苦"],"6844742693":["翁翁翁z","不苦不苦"],"6844821992":["翁翁翁z","不苦不苦"],"6844899915":["翁翁翁z","不苦不苦"],"6845000805":["翁翁翁z","不苦不苦"],"6846191203":["翁翁翁z","不苦不苦"],"6846267567":["翁翁翁z","不苦不苦"],"6846397466":["翁翁翁z","不苦不苦"],"6846506931":["翁翁翁z","不苦不苦"],"6832574028":["不苦不苦"],"6832723204":["不苦不苦"],"6833250150":["不苦不苦"],"6833331231":["不苦不苦"],"6833366765":["不苦不苦"],"6833618080":["不苦不苦"],"6843388765":["不苦不苦"],"6843510422":["不苦不苦"]}; 
          // 开黑列表
              // var black_list = that.black(that.black_list);
              // console.log(black_list)
              // that.form.black_list = black_list
              // for(var i in black_list){
              //   var len = black_list[i].length;
              //   // var tag = len+"黑";
              //   for(var x in black_list[i]){
              //     for(var y in that.form.tableData){
              //       if( black_list[i][x]== that.form.tableData[y]['summoner']){
              //         that.form.tableData[y]['black'] = len; 
              //         // break;
              //       }

              //     }
              //   }
              // }


        var that = this; 
        var list = that.form.black_list
        console.log(list)
        this.lcu.getCurrConversationID().then((res)=>{
          for(var i in list){
            var str =  list[i].join("~和~")+'在开黑'
            that.lcu.sendConversationMsg(str, res[res.length-1].id )
          }
          that.lcu.sendConversationMsg('------来自英雄秒选器~公众号~KF李~回复lol' , res[res.length-1].id )
        })
    },


    //开黑
    black(list){
      // var list = [
      //   "1":['a','b'],
      //   "2":['a','b'],
      //   "3":['a','b'],
      //   "4":['a'],
      //   "5":['v'],
      // ];
      var black = [] ;
      for(var i in list){
        if(list[i].length>1){
          //开黑
          black.push(list[i].join('#'));
        }
      }
      black = Array.from(new Set(black));
      if(black.length>1){
         for(var i in black){
           black[i] =  black[i].split('#')
         }
      }
      return black;
    },

    //计算胜率
    win(games){
      var win =0;
      var len = games.length;
      for(var i in games){
        if(games[i].participants[0].stats.win){
          win+=1;
        }
        // console.log((kills+assists)/deaths*3)
      }
      return  (win/len*100.00).toFixed(2)+"%"; 
    },
    

    //计算场均kda
    kda(games){
      var kda =0.00;
      var len = games.length;
      for(var i in games){
        var kills   = games[i].participants[0].stats.kills;
        var deaths  = games[i].participants[0].stats.deaths;
        var assists = games[i].participants[0].stats.assists;
        deaths = deaths==0?1:deaths;
        kda += (kills+assists)/deaths*3;
        // console.log((kills+assists)/deaths*3)
      }
      // return  (kda/len).toFixed(2); 

      return Math.floor(kda/len * 100) / 100;
    },
    //评估
    evaluate(kda){
      var str ='';
      if(kda >=10 ){
        str ='上等马';
      }else if(  6<=kda && kda<10 ){
        str ='中等马';
      }else if(kda<6 ){
        str ='下等马';
      }
      return str;
    },
    

    //计算常用英雄
    commonChampions(games){
      var championIds =[];
      for(var i in games){
        championIds.push(games[i].participants[0].championId)
      }
      var map = championIds.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map()); 
      var arr_obj = Array.from(map);
      arr_obj.sort((x,y)=>{return y[1]-x[1];})
      // map = new Map(arr_obj.map(i=>[i[0],i[1]]) )
      // console.log(map)
      var champions =[];
      for(var i in arr_obj){
        champions.push(this.lcu.getChampionName(arr_obj[i][0]+''));
      }
      return champions;
    },

     

    doRequest(){
          this.lcu.do(this.form.url, this.form.methods).then((res) =>{
           console.log(res)
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
          // console.log(res) 
          // console.log(res.length) 
          // var str = '我想玩'+that.form.position+that.findTitle(that.form.champion_id)+",谢谢各位大哥！！！！！"
          that.lcu.sendConversationMsg(that.form.msg+'------来自英雄秒选器~公众号~KF李~回复lol' , res[res.length-1].id )
        })
      },

      findTitle(champion_id){
        for (var a of this.options) {
          if(a.id==champion_id) 
            return a.title;
        }
        return '';
      },


    chooseChampion(id){

      var that = this;
      console.log(id)
      that.lcu.getActionId().then(actorCellId=>{
         if (actorCellId > -1) {
           that.lcu.selectChampion(id, actorCellId ,  false)
        }
      })
      
    },

      
      //秒选任务
      pickTask() {
        var that = this;
        //  自动接受对局
        this.ext_accept = this.form.ext.indexOf('accept') >-1?true:false;
        // 秒选喊话
        this.ext_say = this.form.ext.indexOf('say') >-1?true:false;
         // 秒选
        this.ext_pick = this.form.ext.indexOf('pick') >-1?true:false;
          // 自动设置召唤师技能
        this.ext_spell = this.form.ext.indexOf('spell') >-1?true:false;
         //  自动发送队友战绩
        this.ext_send = this.form.ext.indexOf('send') >-1?true:false;
         //  自动发送开黑队友
        this.ext_black = this.form.ext.indexOf('black') >-1?true:false;


        

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



              if(that.ext_pick){
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
               //召唤师技能设置
              if(that.ext_spell&&that.form.spell1Id!=0&&that.form.spell2Id!=0&&that.form.spell1Id!=that.form.spell1Id){
                  that.lcu.selectSummonerSkill(that.form.spell1Id,that.form.spell2Id)
               }
              
              //查询队友战绩
               setTimeout(function(){
                    that.query();
                    if(that.ext_send){
                       setTimeout(function(){
                         that.sendInfo();
                      },1500) 
                    }

                    if(that.ext_black){
                       setTimeout(function(){
                         that.sendBlack();
                      },4000) 
                    }
                },3000) 
             
            }else if (that.game_flow == 'ChampSelect') { 
               that.paiwei()
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

