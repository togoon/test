{- 70天内最高价 -}
VAR1:=HHV(HIGH,70);

{- *0.83 -}
DD:=VAR1*0.83;

{- 10天内有跌到一定幅度 -}
DDC:=EXIST(DD/L>1.08,10);

{- 前85价 -}
A1:=COST(85);

{- 前15价 -}
A2:=COST(15);

{- 价差 -}
A3:=A1-A2;

{- 中位价 -}
A4:=(A1+A2)/2;

{- 价差比不能太大 -}
DM:=A3/A4*100<15;

{- 15日内一直持续 -}
DMCX:=LAST(DM,15,1);

{- 当日均线下跌 -}
B1:=MA(C,13)<REF(MA(C,13),1);

{- 这个还是没变啊 -}
SSRP:=MA(SSRP,1);

{- 筹码峰要高一点 -}
ZLBT:= DMCX AND SSRP/L>1.18 ;

TJ:=EXIST(ZLBT,2);

SJT:=C/REF(C,10);

DS:=SJT<=0.85;

找深套买:TJ AND DDC AND B1 AND DS,COLORWHITE;

STICKLINE(找深套买, 1.5,8,1,0),COLORWHITE;
