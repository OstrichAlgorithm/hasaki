import axios from 'axios'
import $ from 'jquery'
// import { list } from 'postcss';
import nickname from "../utils/nickname"
import heroes from "../utils/heroes"
import list from "../utils/list"
import summoner_skill_list from "../utils/summoner_skill_list"


export class Lcu {
  game_flow = '';
  last_game_flow = '';
  champion_id = 0;
  job = 0;
  ext_accept = false;
  // list = {};
  constructor(token, port) {
    this.token = token;
    this.port = port;
    this.url_with_auth = `https://riot:${token}@127.0.0.1:${port}`;
    return this;
  }
  getAuth() {
    return {
      "port": this.port,
      "token": this.token,
      "url_with_auth": this.url_with_auth
    }
  }

  async request(url, type = "GET", data = '') {
    var res = ''
    await axios.request({
      url: url,
      baseURL: this.url_with_auth,
      method: type,
      data: data ? JSON.stringify(data) : '',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    }).then(function (response) {
      // console.log(response.data);
      res = response.data
    });
    return res;
  }

  // //当前角色 
  async summoner() {
    return await this.request('/lol-summoner/v1/current-summoner', 'get')
  }


  // 
  async summonerList(summonerIDs) {
    return await this.request(`/lol-summoner/v2/summoners?ids=[${summonerIDs}]`)
  }


  getChampionName(championIds) {
    championIds = championIds + '';
    console.log(list[championIds],championIds) 
    return typeof (list[championIds]) == "undefined" ? '未知' : list[championIds];
    // return list[championIds]
  }

  getChampionInfo(championIds) {
    for(var hero of heroes){
      if(hero.id == championIds){
        // console.log(heroes[i])
        // hero.banVoPath = this.url_with_auth+  hero.banVoPath
        // hero.baseLoadScreenPath = this.url_with_auth+  hero.baseLoadScreenPath
        // hero.baseSplashPath = this.url_with_auth+  hero.baseSplashPath
        // hero.chooseVoPath = this.url_with_auth+  hero.chooseVoPath
        // console.log(hero)

        return hero;
      }
    }
    return [];
  }

  async getChampionDetail(championIds) {
     var  data = ''; 
     await axios.request({
      url:   `https://lol.qq.com/act/lbp/common/guides/champDetail/champDetail_${championIds}.js`,
      // method: type,
      // data: data ? JSON.stringify(data) : '',
      // headers: { 'Content-Type': 'application/json' },
      // responseType: 'json',
    }).then(function (response) {
      // console.log(response.data);
      var str  = response.data
      const result = str.match(/{"(.*)"}/);
      data = JSON.parse(result[0]);
    });
    return data 
  }
  
  getChampionDetail1(championIds) {

    if (championIds == 0 ) return [];
    var  data = ''; 
    $.ajax({
      url: `https://lol.qq.com/act/lbp/common/guides/champDetail/champDetail_${championIds}.js`,
      type: "get",
      cache: true,
      async:false,  //同步方式发起请求
      success: function (res) {
        const result = res.match(/{"(.*)"}/);
        data = JSON.parse(result[0]);
      }
    })
   return data 
 }

  
  

   // 所有英雄列表
  allChampions() {
    // var res = await this.request('/lol-champ-select/v1/all-grid-champions', 'get')
    //  console.log(res)
    //整理数据
    var data = [];
    // var list = {};
    for (var a of heroes) {
      var  nickname_str =  nickname[a.alias]?nickname[a.alias].join('-'):'';
      data.push({
        "alias": a.alias,
        "baseSplashPath": a.baseSplashPath,
        // "baseLoadScreenPath": a.baseLoadScreenPath,
        "id": a.id,
        "name": a.name,
        "title": a.title,
        "label": a.name + '-' + a.title + '-' + a.alias + '-' +nickname_str,
      });
    }
    return data;
  }
  // //拥有英雄列表
  async ownedChampions() {
    var res = await this.request('/lol-champions/v1/owned-champions-minimal', 'get')
    //  console.log(res)
    //整理数据
    var data = [];
    // var list = {};
    for (var a of res) {



      var nickname_str  =  nickname[a.alias]?nickname[a.alias].join('-'):'';


      data.push({
        "alias": a.alias,
        "baseSplashPath": a.baseSplashPath,
        // "baseLoadScreenPath": a.baseLoadScreenPath,
        "id": a.id,
        "name": a.name,
        "title": a.title,
        "label": a.name + '-' + a.title + '-' + a.alias + '-' + nickname_str,
      });
      // list[a.id] =  a.title;
    }
    // this.list = list
    // console.log(data)
    return data;
  }

  // // 查询游戏流程
  // //  # None
  // //  # Lobby
  // //  # Matchmaking
  // //  # ReadyCheck
  // //  # ChampSelect
  // //  # InProgress
  // //  # PreEndOfGame
  // //  # EndOfGame
  async gameFlow() {
    return await this.request('/lol-gameflow/v1/gameflow-phase', 'get')
  }

  // //选择英雄 
  async selectChampion(champion_id, action_id ,completed = true) {
    var data = {
      "championId": champion_id,
      "completed": completed,
      "type":"pick" 
    }
    return await this.request('/lol-champ-select/v1/session/actions/' + action_id, 'patch', data)
  }

  // 禁用英雄 
  async banChampion(champion_id, action_id) {
    var data = {
      "championId": champion_id,
      "completed": true,
      "type":"ban" 
    }
    return await this.request('/lol-champ-select/v1/session/actions/' + action_id, 'patch', data)
  }


  //选择召唤师 技能  --皮肤 
  async selectSummonerSkill(spell1Id, spell2Id) {
    var data = {
      // "selectedSkinId": 0,
      "spell1Id": spell1Id,
      "spell2Id": spell2Id,
      // "wardSkinId": 0
    }
    return await this.request('/lol-champ-select/v1/session/my-selection', 'patch', data)
  }


  // //接受对局
  async accept() {
    // console.log('accept')
    await this.request('/lol-matchmaking/v1/ready-check/accept', 'post');
    // console.log(res)

  }

  // 得到位置id 
  async getActionId() {
    var res = await this.session();
    return res.localPlayerCellId
  }
  // 得到组队情况
  async session() {
    var res = await this.request('/lol-champ-select/v1/session');
    return res;
  }

  //选英雄
  async champion(champion_id) {
    var id = this.getActionId();
    if (id > -1) {
      res = await league.select_champion(champion_id, id)
    }
  }



  // 获取会话组消息记录
  async listConversationMsg(conversationID) {
    var list = await this.request(`/lol-chat/v1/conversations/${conversationID}/messages`)
    // console.log(list)
    return list
  }

  // 获取当前对局聊天组
  async getCurrConversationID() {
    var res = await this.request("/lol-chat/v1/conversations")
    // console.log(res) 
    return res
  }


  // 发送消息到聊天组
  async sendConversationMsg(msg, conversationID) {
    var data = {
      "body": msg,
      "type": "chat",
    }
    await this.request(`/lol-chat/v1/conversations/${conversationID}/messages`, "POST", data)
  }


  // 游戏对局列表
  async matchlist(summonerID, begIndex, endIndex) {

    return await this.request(`/lol-match-history/v3/matchlist/account/${summonerID}?begIndex=${begIndex}&endIndex=${endIndex}`)
  }



  // 召唤师技能列表 
  getSummonerSkillList() {
    return summoner_skill_list;
  }




  async do(url, type = "GET", data = {}) {
    return await this.request(url, type, data)
  }







  // //秒选任务
  // pickTask(champion_id,ext) {
  //   var that = this;
  //   this.champion_id = champion_id;
  //   this.ext_accept = ext.indexOf('accept') >-1?true:false;
  //   if (this.job==0) {
  //     this.job = setInterval(async function (that) {
  //       that.game_flow = await that.gameFlow()
  //       if (that.game_flow != that.last_game_flow)
  //       if (that.ext_accept&&that.last_game_flow != 'ReadyCheck' && that.game_flow == 'ReadyCheck' ) {
  //         await that.accept()
  //       } else if (that.last_game_flow != 'ChampSelect' && that.game_flow == 'ChampSelect') {
  //         const id = await that.getActionId()
  //         if (id > -1) {
  //           await that.selectChampion(that.champion_id, id)
  //         }
  //       }
  //       that.last_game_flow = that.game_flow
  //     }, 1500, that);

  //   } else {
  //     clearInterval(this.job);
  //     this.job = 0;
  //   }
  // }




}

