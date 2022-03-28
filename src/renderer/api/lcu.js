// 仅示例
import axios from 'axios'
import { list } from 'postcss';
import nickname from "../utils/nickname"
export class Lcu {
  game_flow = '';
  last_game_flow = '';
  champion_id = 0;
  job = 0;
  ext_accept= false;
  constructor(token,port) {
    this.token = token;
    this.port  = port;
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
      data: data?JSON.stringify(data):'',
      headers:{'Content-Type':'application/json'},
      responseType: 'json',
    }).then(function(response) {
      // console.log(response.data);
      res= response.data
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



  // //拥有英雄列表
  async ownedChampions() {
    var res =  await this.request('/lol-champions/v1/owned-champions-minimal', 'get')
    //  console.log(res)
    //整理数据
    var data = [];
    for (var a of res) {
      data.push({
        "alias": a.alias,
        "baseSplashPath": a.baseSplashPath,
        // "baseLoadScreenPath": a.baseLoadScreenPath,
        "id": a.id,
        "name": a.name,
        "title": a.title,
        "label": a.name + '-' + a.title + '-' + a.alias+ '-'+nickname[a.alias].join('-'),
      });
    }

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
  async selectChampion(champion_id, action_id) {
    var data = {
      "championId": champion_id,
      "completed": true,
    }
    return await this.request('/lol-champ-select/v1/session/actions/' + action_id, 'patch', data)
  }

  // //接受对局
  async accept() {
    // console.log('accept')
    await this.request('/lol-matchmaking/v1/ready-check/accept', 'post');
    // console.log(res)

  }

  // 得到位置id 
  async getActionId() {
    var  res=  await this.request('/lol-champ-select/v1/session');
    return res.localPlayerCellId
  }

  //选英雄
  async champion(champion_id) {
    var id = this.getActionId();
    if (id > -1) {
      res = await league.select_champion(champion_id, id)
    }
  }



  // // 获取会话组消息记录
  // async listConversationMsg(conversationID) {
  //     list = await this.request(`/lol-chat/v1/conversations/${conversationID}/messages`)
  //     console.log(list)
  //   	return list
  //  }

  // 获取当前对局聊天组
  async getCurrConversationID() {
	  var res =  await this.request("/lol-chat/v1/conversations")
    // console.log(res) 
    return res 
  }


  // 发送消息到聊天组
  async sendConversationMsg(msg,conversationID ) {
    var data = {
      "body": msg,
      "type": "chat",
    }
    await this.request(`/lol-chat/v1/conversations/${conversationID}/messages`,"POST",data)
  }


   // 游戏对局列表
   async matchlist(summonerID,begIndex,endIndex) {

    return await this.request(`/lol-match-history/v3/matchlist/account/${summonerID}?begIndex=${begIndex}&endIndex=${endIndex}`)
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

