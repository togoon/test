{- 感觉启动点还蛮准，好好分析一下 -}
N:=16;

{- 乘以这个57.05是什么意思, 感觉是因为比率太少，放大一定的倍数，而且随着
 倍数的增加，角度增加的幅度越小，故可作为一个数学模型来使用
 -}
A1:=ATAN((C/REF(C,N)-1)*57.05);

A2:SUM(A1,0);

A4:EMA(A2,60);

A3:EMA(A2,10);

DRAWBAND(A2,120,A3,RGB(35,135,35));

DRAWTEXT(CROSS(A2,A3),A3,'启动'),COLORYELLOW;
DRAWTEXT(CROSS(A2,A4),A3,'加速'),COLORMAGENTA;
