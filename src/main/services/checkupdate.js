import { autoUpdater } from 'electron-updater'

// import downloadFile from './downloadFile'
// import { BrowserWindow } from 'electron'
/**
 * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成
 **/

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  // 调整两个版本号位数相同
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  // 循环判断每位数的大小
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}



class Update {
  mainWindow
  constructor() {
    // autoUpdater.setFeedURL('http://127.0.0.1:8080/')
    autoUpdater.setFeedURL('https://ostrichalgorithm.github.io/hasaki/')
    // autoUpdater.setFeedURL('https://yoopo.gitee.io/hasaki/')

    // 当更新发生错误的时候触发。
    autoUpdater.on('error', (err) => {
      console.log('更新出现错误', err.message)
      if (err.message.includes('sha512 checksum mismatch')) {
        this.Message(this.mainWindow, -1, 'sha512校验失败')
      } else {
        this.Message(this.mainWindow, -1, '错误信息请看主进程控制台')

      }
    })

    // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', (event, arg) => {
      // console.log('开始检查更新')
      // console.log('开始检查更新', event, arg)
      this.Message(this.mainWindow, 0)
    })

    // 发现可更新数据时
    autoUpdater.on('update-available', (event, arg) => {
      // console.log('有更新')
      // console.log('有更新', event, arg)
      const version = require('../../../package.json').version
      if(compareVersion(event.version, version) > 0){
        // this.Message(this.mainWindow, 1, "https://gitee.com/yoopo/hasaki/"+event.path )
        this.Message(this.mainWindow, 1, "https://ostrichalgorithm.github.io/hasaki/"+event.path )
      }
      // this.Message(this.mainWindow, 1)
    })

    // 没有可更新数据时
    autoUpdater.on('update-not-available', (event, arg) => {
      // const log = require('electron-log')
      // log.warn('---------')
      // log.warn(event)
      // log.warn("https://gitee.com/yoopo/hasaki/"+event.path)
      // console.log('没有更新', event, arg)
      // // console.log(event.version)
      // const version = require('../../../package.json').version
      // if(compareVersion(event.version, version) > 0){
      //   // this.Message(this.mainWindow, 1, "https://ostrichalgorithm.github.io/hasaki/"+event.path )
      //   // downloadFile.download(BrowserWindow.fromWebContents(event.sender),"https://gitee.com/yoopo/hasaki/"+event.path)
      //   this.Message(this.mainWindow, 1, "https://gitee.com/yoopo/hasaki/"+event.path )
      // }else{
      //   this.Message(this.mainWindow, 2)
      // }
      this.Message(this.mainWindow, 2)
    })

    // 下载监听
    autoUpdater.on('download-progress', (progressObj) => {
      this.Message(this.mainWindow, 3, progressObj)
    })

    // 下载完成
    autoUpdater.on('update-downloaded', () => {
      // console.log('done')
      this.Message(this.mainWindow, 4)
    })
  }
  // 负责向渲染进程发送信息
  Message(mainWindow, type, data) {
    // console.log('发送消息')
    const senddata = {
      state: type,
      msg: data || ''
    }
    mainWindow.webContents.send('update-msg', senddata)
  }



  // 执行自动更新检查
  checkUpdate(mainWindow) {

    // console.log('xxxxxxxx')
    this.mainWindow = mainWindow
    autoUpdater.checkForUpdates().catch(err => {
      console.log('网络连接问题', err)
    })
  }

  // 退出并安装
  quitInstall() {
    autoUpdater.quitAndInstall()
  }
}

export default Update
