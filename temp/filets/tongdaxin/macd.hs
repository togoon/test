{-
 - short: 12
 - long: 26
 - mid: 9
 -}

{- 短线平均 - 长线平均，只不过是指数移动平均 -}
DIF:EMA(CLOSE,SHORT)-EMA(CLOSE,LONG);

{- dea对dif再求一个中线平均 -}
DEA:EMA(DIF,MID);

{- 得到dif与dea的差，并且以柱状线显示 -}
MACD:(DIF-DEA)*2,COLORSTICK;
