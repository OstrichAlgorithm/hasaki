import { ipcMain } from 'electron';
const  cmd  = require('node-cmd');
import Lcu from './lcu.class';
const fetch = require('electron-fetch').default



export default {
  Mainfunc() {
    const lcu = new Lcu();
    ipcMain.handle('lcu-auth', async () => {
      return lcu.getAuth()
    })

    //当前用户
    ipcMain.handle('lcu-summoner', async () => {
      return  await lcu.summoner()
    })
    // ipcMain.handle('windows-mini', (event, args) => {
    //   BrowserWindow.fromWebContents(event.sender)?.minimize()
    // })


    //获取英雄列表
    ipcMain.handle('lcu-owned-champions', async () => {
      return  await lcu.ownedChampions()
    })



    //秒抢英雄
    ipcMain.handle('lcu-pick-task', async (event,...args) => {
      console.log('lcu-pick-task')

      lcu.pickTask(args[0])
       
      // return  await lcu.ownedChampions()
    })


    //接受对局
    ipcMain.handle('lcu-accept', async (event) => {
      console.log('lcu-accept')
      await lcu.accept()
    })



    

        
  }
}
