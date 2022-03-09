// 仅示例
import axios from 'axios'
// import $ from 'jquery'
import nickname from "../utils/nickname"

// console.log(nickname)

// import { Message } from 'element-ui'



// export class Lcu {
//   game_flow = '';
//   last_game_flow = '';
//   champion_id = 0;
//   job = 0;
//   ext_accept= false;
//   constructor(token,port) {
//     this.token = token;
//     this.port  = port;
//     this.url_with_auth = `https://riot:${token}@127.0.0.1:${port}`;
//     return this;
//   }
//   getAuth() {
//     return {
//       "port": this.port,
//       "token": this.token,
//       "url_with_auth": this.url_with_auth
//     }
//   }

//   request(url, type = "GET", data = '') {
//     var ret = '';
//     $.ajax({
//       type: type,
//       async: false,
//       data: data ? JSON.stringify(data) : '',
//       dataType: "json",
//       headers: { 'Content-Type': 'application/json' },
//       url: this.url_with_auth + url,
//       success: (req) => {
//         ret = req
//       }
//     })
//     return ret;
//   }

//   // //当前角色 
//   summoner() {
//     return  this.request('/lol-summoner/v1/current-summoner', 'get')
//   }


//   // //拥有英雄列表
//    ownedChampions() {
//     var res =   this.request('/lol-champions/v1/owned-champions-minimal', 'get')
//     //  console.log(res)
//     //整理数据
//     var data = [];
//     for (var a of res) {
//       // console.log(a)
//       data.push({
//         "alias": a.alias,
//         "baseSplashPath": a.baseSplashPath,
//         // "baseLoadScreenPath": a.baseLoadScreenPath,
//         "id": a.id,
//         "name": a.name,
//         "title": a.title,
//         // "value": a.id,
//         "label": a.name + '-' + a.title + '-' + a.alias+ '-'+nickname[a.alias].join('-'),
//       });
//     }

//     // console.log(data)
//     return data;
//   }

//   // // 查询游戏流程
//   // //  # None
//   // //  # Lobby
//   // //  # Matchmaking
//   // //  # ReadyCheck
//   // //  # ChampSelect
//   // //  # InProgress
//   // //  # PreEndOfGame
//   // //  # EndOfGame
//    gameFlow() {
//     return  this.request('/lol-gameflow/v1/gameflow-phase', 'get')
//   }

//   // //选择英雄 
//    selectChampion(champion_id, action_id) {
//     var data = {
//       "championId": champion_id,
//       "completed": true,
//     }
//     return  this.request('/lol-champ-select/v1/session/actions/' + action_id, 'patch', data)
//   }

//   // //接受对局
//    accept() {
//     // console.log('accept')
//      this.request('/lol-matchmaking/v1/ready-check/accept', 'post');
//     // console.log(res)

//   }

//   // 得到位置id 
//    getActionId() {
//     var  res=   this.request('/lol-champ-select/v1/session');
//     // console.log('session',res )
//     const localPlayerCellId = res.localPlayerCellId
//     //  console.log('getActionId',localPlayerCellId )
//     return localPlayerCellId >= 5 ? (localPlayerCellId - 5) : localPlayerCellId
//   }

//   //选英雄
//    champion(champion_id) {
//     var id = this.getActionId();
//     if (id > -1) {
//       res =  league.select_champion(champion_id, id)
//       // console.log(res)
//     }
//   }


//   //秒选任务
//   pickTask(champion_id,ext) {
//     //每分钟的1秒定时执行一次:
//     var that = this;
//     this.champion_id = champion_id;

//     // console.log(ext) 
//     this.ext_accept = ext.indexOf('accept') >-1?true:false;
//     // console.log(ext.indexOf('accept') >-1?true:false) 
//     if (this.job==0) {

//       this.job = setInterval( function (that) {
//         that.game_flow =  that.gameFlow()
//         // console.log(that.game_flow)
//         if (that.game_flow != that.last_game_flow)
//           // console.log(that.game_flow)
//         if (that.ext_accept&&that.last_game_flow != 'ReadyCheck' && that.game_flow == 'ReadyCheck' ) {
//            that.accept()
//         } else if (that.last_game_flow != 'ChampSelect' && that.game_flow == 'ChampSelect') {
//           const id =  that.getActionId()
//           // console.log('id',id) 
//           if (id > -1) {
//              that.selectChampion(that.champion_id, id)
//           }
//         }
//         that.last_game_flow = that.game_flow
//       }, 1500, that);
//     // console.log(this.job)

      
//     } else {
//       clearInterval(this.job);
//       this.job = 0;
//     }

//   }





// }



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
      // console.log(response.status);
      // console.log(response.statusText);
      // console.log(response.headers);
      // console.log(response.config);
    });
    return res;
  }

  // //当前角色 
  async summoner() {
    return await this.request('/lol-summoner/v1/current-summoner', 'get')
  }


  // //拥有英雄列表
  async ownedChampions() {
    var res =  await this.request('/lol-champions/v1/owned-champions-minimal', 'get')
    //  console.log(res)
    //整理数据
    var data = [];
    for (var a of res) {
      // console.log(a)
      data.push({
        "alias": a.alias,
        "baseSplashPath": a.baseSplashPath,
        // "baseLoadScreenPath": a.baseLoadScreenPath,
        "id": a.id,
        "name": a.name,
        "title": a.title,
        // "value": a.id,
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
    // // console.log('session',res )
    // const localPlayerCellId = res.localPlayerCellId
    // //  console.log('getActionId',localPlayerCellId )
    // return localPlayerCellId >= 5 ? (localPlayerCellId - 5) : localPlayerCellId
  }

  //选英雄
  async champion(champion_id) {
    var id = this.getActionId();
    if (id > -1) {
      res = await league.select_champion(champion_id, id)
      // console.log(res)
    }
  }


  //秒选任务
  pickTask(champion_id,ext) {
    //每分钟的1秒定时执行一次:
    var that = this;
    this.champion_id = champion_id;

    // console.log(ext) 
    this.ext_accept = ext.indexOf('accept') >-1?true:false;
    // console.log(ext.indexOf('accept') >-1?true:false) 
    if (this.job==0) {

      this.job = setInterval(async function (that) {
        that.game_flow = await that.gameFlow()
        // console.log(that.game_flow)
        if (that.game_flow != that.last_game_flow)
          // console.log(that.game_flow)
        if (that.ext_accept&&that.last_game_flow != 'ReadyCheck' && that.game_flow == 'ReadyCheck' ) {
          await that.accept()
        } else if (that.last_game_flow != 'ChampSelect' && that.game_flow == 'ChampSelect') {
          const id = await that.getActionId()
          // console.log('id',id) 
          if (id > -1) {
            await that.selectChampion(that.champion_id, id)
          }
        }
        that.last_game_flow = that.game_flow
      }, 1500, that);
    console.log(this.job)

      
    } else {
      clearInterval(this.job);
      this.job = 0;
    }

  }


}

