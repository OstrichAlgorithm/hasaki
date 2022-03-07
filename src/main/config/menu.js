// 这里是定义菜单的地方，详情请查看 https://electronjs.org/docs/api/menu
const { dialog } = require('electron')
const os = require('os')
const version = require('../../../package.json').version
const menu = [
  {
    label: '设置',
    submenu: [{
      label: '快速重启',
      accelerator: 'F5',
      role: 'reload'
    }, {
      label: '退出',
      accelerator: 'CmdOrCtrl+F4',
      role: 'close'
    }]
  }, {
    label: '帮助',
    submenu: [{
      label: '关于',
      // role: 'about',
      click: function () {
        info()
      }
    }]
  }]
function info () {
  dialog.showMessageBox({
    title: '关于',
    type: 'info',
    message: 'lol英雄秒选器',
    // detail: `版本信息：${version}\n引擎版本：${process.versions.v8}\n当前系统：${os.type()} ${os.arch()} ${os.release()}`,
    detail: `本软件开源免费不定时更新\n要啥功能可以到下面找我\n微信公众号~KF李\n抖音 KF李~干啥程序员`,
    noLink: true,
    // buttons: ['查看github', '确定']
  })
}
export default menu
