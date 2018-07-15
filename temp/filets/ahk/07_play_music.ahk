#SingleInstance,force
!1::
BeepLoop("1231",300,100)
Delay(80)
BeepLoop("1231",300,100)
Delay(80)
BeepLoop("345",300,100)
Delay(80)
BeepLoop("345",300,100)
Delay(100)
BeepLoop("565431",300,100)
Delay(80)
BeepLoop("565431",300,100)
Delay(80)
BeepLoop("1e1",300,100)
Delay(80)
BeepLoop("1e1",300,100)
Return
!2::
BeepLoop("CBCBC7BA6",300)
Delay(400)
BeepLoop("1367",300)
Delay(300)
BeepLoop("357A",300)
Delay(500)
BeepLoop("3CBCBC7BA6",300)
Delay(400)
BeepLoop("1367",300)
Delay(300)
BeepLoop("3A76",300)
Delay(500)
BeepLoop("7ABC",300)
Delay(300)
BeepLoop("5DCB",300)
Delay(300)
BeepLoop("4CBA",300)
Delay(300)
BeepLoop("3BA7",300)
Delay(400)
BeepLoop("73CCCCBCBC7BA6",300)
Delay(400)
BeepLoop("1367",300)
Delay(300)
BeepLoop("357A",300)
Delay(500)
BeepLoop("3CBCBC7BA6",300)
Delay(400)
BeepLoop("1367",300)
Delay(300)
BeepLoop("3A76",300)
Delay(500)
Return
BeepLoop(str,i,j=30)
{
   Loop,Parse,str
   {
  freq := GetFreq(A_LoopField)
  BeepF(freq,i)
  Delay(j)
   }
}
BeepF(freq,i)
{
If freq = 0
{
Delay(i)
Return
}
SoundBeep , %freq%, %i%
}
GetFreq(c)
{
if (c = "1")
    Return,256
if (c = "2")
    Return,288
if (c = "3")
    Return,320
if (c = "4")
    Return,341
if (c = "5")
    Return,384
if (c = "6")
    Return,427
if (c = "7")
    Return,480
if (c = "A")
    Return,512
if (c = "B")
    Return,576
if (c = "C")
    Return,640
if (c = "D")
    Return,683
if (c = "E")
    Return,768
if (c = "F")
    Return,853
if (c = "G")
    Return,909
if (c = "a")
    Return,128
if (c = "b")
    Return,144
if (c = "c")
    Return,160
if (c = "d")
    Return,171
if (c = "e")
    Return,192
if (c = "f")
    Return,213
if (c = "g")
    Return,228
Return,0
}
Delay(i)
{
StartTime := A_TickCount
while A_TickCount - StartTime < i
{}
}
/*
C 1 do 256
D 2 re 288
E 3 mi 320
F 4 fa 341又1/3
G 5 so 384
A 6 la 426又2/3
B 7 si 480
C 1 (上面一个点)do 512
C:D=8:9
D:E=9:10
E:F=15:16
F:G=8;9
G:A=9:10
A:B=15:16
两只老虎的曲谱:
1231 1231 345 345 565431 565431 151 151*/
