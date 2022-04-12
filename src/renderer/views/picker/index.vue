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
  components: {
    },
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
        spell1Id:0,
        spell2Id:0,
        champion_id_disabled:false,
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
      job:0,
      game_flow:'',
      last_game_flow:'',
      ext_accept:false,
      ext_say:false,
    
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

            that.summoner_skill_list =  that.lcu.getSummonerSkillList();

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
          
          var that = this;
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

