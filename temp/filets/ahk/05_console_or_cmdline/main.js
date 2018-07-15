import {exec} from './utils/node/child_process.js'

;(async ()=>{
  const {stdout} = await exec(`"C:\\Program Files\\AutoHotkey\\autohotkey.exe" "C:\\Users\\guanghui\\Desktop\\docs\\temp\\filets\\ahk\\05_console_or_cmdline\\console.ahk"`)
  console.log(stdout)
})()
