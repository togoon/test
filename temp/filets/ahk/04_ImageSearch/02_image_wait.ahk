; 会一直等待直到图像被找到为止
F8::
  while(true) {
    imagesearch, x, y, 0, 0, A_ScreenWidth, A_ScreenHeight, C:\Users\guanghui\Desktop\docs\temp\filets\ahk\04_ImageSearch\baidu.png
    if( x != "") {
      break
    }
    sleep 100
  }
  msgbox found at %x%-%y%.
Return
