; 用来查找百度的输入框
; TODO 但不能模糊识别，原因不明
F8::
  imagesearch, x, y, 0, 0, A_ScreenWidth, A_ScreenHeight, C:\Users\guanghui\Desktop\docs\temp\filets\ahk\04_ImageSearch\baidu.png
  msgbox found at %x%x%y%.
Return
