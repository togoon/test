; 可以把ahk当作一个命令行程序来使用. 但是要从autohotkey.exe程序来执行
; 正常执行输出也不会显示到控制台，有一些work around方法（比如 | more）
; <url:https://autohotkey.com/docs/commands/FileAppend.htm>
fileappend, hello world, *
