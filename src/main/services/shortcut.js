import { globalShortcut } from 'electron'
// import lcu from './ipcLcu'
// import Lcu from './lcu.class'

function initShortcut() {
  // 注册一个'CommandOrControl+X' 快捷键监听器
  // const ret = globalShortcut.register('home', () => {
  //   console.log('home is pressed')
  //   const lcu = new Lcu();
  //   var info = "";
  //   // 游戏状态检查
  //   if("InProgress"!=lcu.gameFlow()){
  //     return;
  //   }
  //   //当前对话框检查
  //   const { AutoType, KeyCode, Modifier } = require('keyboard-auto-type');
  //   const typer = new AutoType();
  //   const active_window = typer.activeWindow({ getWindowTitle: true, getBrowserUrl: true });
  //   // print something
  //   console.log('Going to type in this window', typer.activeWindow({ getWindowTitle: true, getBrowserUrl: true }));
  //   if('League of Legends (TM) Client' !=active_window.title){
  //     return
  //   }
  //   // //查询 局内对手
  //   lcu.getPlayerList().then(res => {
  //     console.log(JSON.stringify(res))
  //     for (var i in res) {
  //       // summonerName
  //       //计算对手战斗力
  //       //发送的的
  //       if (!res[i].isBot) {
  //         lcu.querySummonersByName(res[i].summonerName).then(res => {
  //           console.log(res)
  //           //查询历史比赛数据的
  //           lcu.matchlist(res.accountId, 0, 5).then(res => {
  //             console.log(res)
  //             var str = '';
  //             var summonerName = res.games.games[0].participantIdentities[0].player.summonerName;
  //             str += summonerName + '    ';
  //             // console.log(res)
  //             //胜率
  //             var win = lcu.win(res.games.games);
  //             str += '胜率:' + win + '    ';
  //             //kda
  //             var kda = lcu.kda(res.games.games);
  //             // console.log('kda---',kda)
  //             str += 'KDA:' + kda + '    ';
  //             //评价
  //             str = "(" + lcu.evaluate(kda) + ")" + str + "    ";
  //             //常用英雄 
  //             var commonChampions = lcu.commonChampions(res.games.games);
  //             // console.log('commonChampions---',commonChampions)
  //             if (commonChampions.length)
  //               str += '绝活:';
  //             var commonChampionsStr = '';
  //             for (var i in commonChampions) {
  //               if (i > 2) break;
  //               str += commonChampions[i] + ' '
  //               commonChampionsStr += commonChampions[i] + ' '
  //             }
  //             str = str + '\n';
  //             typer.keyPress(KeyCode.Enter)
  //             setTimeout(() => {
  //               typer.text(str);
  //               setTimeout(() => {
  //                 typer.keyPress(KeyCode.Enter)
  //               }, 100);
  //             }, 500);
  //             //列表数据
  //             // that.form.tableData.push({
  //             //   'summoner': summonerName,
  //             //   'black': 1,
  //             //   'kda': kda,
  //             //   'win': win,
  //             //   'commonChampions': commonChampionsStr
  //             // })

  //             //开黑列表
  //             // var gameId = '';
  //             // for (var i in res.games.games) {
  //             //   // console.log( res.games.games[i])
  //             //   gameId = res.games.games[i].gameId;
  //             //   if (that.black_list[gameId] == undefined) {
  //             //     that.black_list[gameId] = [summonerName];

  //             //   } else if (that.black_list[gameId].indexOf(summonerName) == -1) {
  //             //     that.black_list[gameId].push(summonerName);
  //             //   }
  //             //   //  console.log(that.black_list)
  //             // }
  //           })
  //         })
  //       }
  //     }
  //   });
  // })

  // if (!ret) {
  //   console.log('registration failed')
  // }

  // 检查快捷键是否注册成功
  // console.log(globalShortcut.isRegistered('home'))
}
export default initShortcut