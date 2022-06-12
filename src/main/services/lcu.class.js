const request = require('request');
const cmd = require('node-cmd');
// const schedule = require('node-schedule');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
class Lcu {
  game_flow = '';
  last_game_flow = '';
  champion_id = 0;
  job = '';
  constructor() {
    const { data, err, stderr } = cmd.runSync("wmic process  where  name='LeagueClientUx.exe' get CommandLine")
    this.port = data.split('--app-port=')[1]?.split('"')[0] ?? ``;
    this.token = data.split('--remoting-auth-token=')[1]?.split('"')[0] ?? ``;
    this.url_with_auth = `https://riot:${this.token}@127.0.0.1:${this.port}`;
    return this;
  }
  getAuth() {
    return {
      "port": this.port,
      "token": this.token,
      "url_with_auth": this.url_with_auth
    }
  }

  req(url, type = "get", data = '') {
    url = this.url_with_auth + url;
    var authority = "127.0.0.1:" + this.port;
    console.log(url)
    return new Promise(function (resolve, reject) {
      request({
        url: url,
        method: type,
        json: true,
        body: data ? JSON.stringify(data) : '',
      }, function (error, response, body) {
        if (error) {
          reject(error)
        } else {
          console.log(body)
          resolve(body)
        }
      })
    })
  }


  get(url, type = "get", data = '') {
    console.log(url)
    return new Promise(function (resolve, reject) {
      request({
        url: url,
        method: type,
        json: true,
        body: data ? JSON.stringify(data) : '',
      }, function (error, response, body) {
        if (error) {
          reject(error)
        } else {
          // console.log(body)
          resolve(body)
        }
      })
    })
  }

  //当前角色 
  async summoner() {
    return await this.req('/lol-summoner/v1/current-summoner', 'get')
  }


  // 通过名字查信息id 
  async querySummonersByName(name) {
    return await this.req(`/lol-summoner/v1/summoners?name=${name}`);

  }

  // 游戏对局列表
  async matchlist(summonerID, begIndex, endIndex) {

    return await this.req(`/lol-match-history/v3/matchlist/account/${summonerID}?begIndex=${begIndex}&endIndex=${endIndex}`)
  }


  //拥有英雄列表
  async ownedChampions() {
    var res = await this.req('/lol-champions/v1/owned-champions-minimal', 'get')
    //  console.log(JSON.parse(res))
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
        // "label": a.name + '-' + a.title + '-' + a.alias,
      });
    }
    return data;
  }

  // 查询游戏流程
  //  # None
  //  # Lobby
  //  # Matchmaking
  //  # ReadyCheck
  //  # ChampSelect
  //  # InProgress
  //  # PreEndOfGame
  //  # EndOfGame
  async gameFlow() {
    return await this.req('/lol-gameflow/v1/gameflow-phase', 'get')
  }

  //选择英雄 
  async selectChampion(champion_id, action_id) {
    var data = {
      "championId": champion_id,
      "completed": true,
    }
    return await this.req('/lol-champ-select/v1/session/actions/' + action_id, 'patch', data)
  }

  //接受对局
  async accept() {
    console.log('accept')
    await this.req('/lol-matchmaking/v1/ready-check/accept', 'post');
    // console.log(res)

  }

  // 得到位置id 
  async getActionId() {
    var res = this.req('/lol-champ-select/v1/session');
    const localPlayerCellId = res.localPlayerCellId
    return localPlayerCellId >= 5 ? (localPlayerCellId - 5) : localPlayerCellId
  }

  //选英雄
  async champion(champion_id) {
    var id = this.getActionId();
    if (id > -1) {
      res = await league.select_champion(champion_id, id)
      console.log(res)
    }
  }


  //秒选任务
  pickTask(champion_id) {
    //每分钟的1秒定时执行一次:

    var that = this;
    this.champion_id = champion_id;
    console.log("champion_id", champion_id)
    if (!this.job) {
      this.job = setInterval(async function (that) {
        that.game_flow = await that.gameFlow()
        // console.log(that.game_flow)
        if (that.game_flow != that.last_game_flow)
          console.log(that.game_flow)

        if (that.last_game_flow != 'ReadyCheck' && that.game_flow == 'ReadyCheck') {
          await that.accept()
        } else if (that.last_game_flow != 'ChampSelect' && that.game_flow == 'ChampSelect') {
          const id = await that.getActionId()
          if (id > -1) {
            await that.selectChampion(that.champion_id, id)
          }
        }
        that.last_game_flow = that.game_flow

      }, 1000, that);
    } else {
      clearInterval(this.job);
      this.job = '';
    }


  }





  //局内游戏
  // 
  async getPlayerList() {
    return await this.get('https://127.0.0.1:2999/liveclientdata/playerlist')
  }



  //计算胜率
  win(games) {
    var win = 0;
    var len = games.length;
    for (var i in games) {
      if (games[i].participants[0].stats.win) {
        win += 1;
      }
      // console.log((kills+assists)/deaths*3)
    }
    return (win / len * 100.00).toFixed(2) + "%";
  }


  //计算场均kda
  kda(games) {
    var kda = 0.00;
    var len = games.length;
    for (var i in games) {
      var kills = games[i].participants[0].stats.kills;
      var deaths = games[i].participants[0].stats.deaths;
      var assists = games[i].participants[0].stats.assists;
      deaths = deaths == 0 ? 1 : deaths;
      kda += (kills + assists) / deaths * 3;
      // console.log((kills+assists)/deaths*3)
    }
    // return  (kda/len).toFixed(2); 
    return Math.floor(kda / len * 100) / 100;
  }

  //评估
  evaluate(kda) {
    var str = '';
    if (kda >= 10) {
      str = '上等马';
    } else if (6 <= kda && kda < 10) {
      str = '中等马';
    } else if (kda < 6) {
      str = '下等马';
    }
    return str;
  }


  //计算常用英雄
  commonChampions(games) {
    var championIds = [];
    for (var i in games) {
      championIds.push(games[i].participants[0].championId)
    }
    var map = championIds.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map());
    var arr_obj = Array.from(map);
    arr_obj.sort((x, y) => { return y[1] - x[1]; })
    // map = new Map(arr_obj.map(i=>[i[0],i[1]]) )
    // console.log(map)
    var champions = [];
    for (var i in arr_obj) {
      // champions.push(this.getChampionName(arr_obj[i][0] + ''));
      champions.push(arr_obj[i][0] + '');
    }
    return champions;
  }


}



module.exports = Lcu;