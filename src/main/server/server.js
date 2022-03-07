import express from 'express'
var cmd = require('node-cmd')

const app = express()

app.get('/message', (req, res) => {
  res.send('这是来自node服务端的信息')
})

app.post('/message', (req, res) => {
  if (req) {
    res.send(req + '--来自node')
  }
})




app.get('/auth', (req, res) => {
  const  {data,err,stderr} = cmd.runSync("wmic process  where  name='LeagueClientUx.exe' get CommandLine")

  const port = data.split('--app-port=')[1]?.split('"')[0] ?? ``;
  const token = data.split('--remoting-auth-token=')[1]?.split('"')[0] ?? ``;
  const urlWithAuth = `https://riot:${token}@127.0.0.1:${port}`;
  res.send({
    port,
    token,
    urlWithAuth,
  })
})



export default app
