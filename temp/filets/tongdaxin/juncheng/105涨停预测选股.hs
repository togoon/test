V1:=V/MA(REF(V,1),5);

V2:=INDEXV/MA(REF(INDEXV,1),5);

{- 这是个小盘？，只取流通股小于 10亿的 -}
LT:=(CAPITAL/100)/10000<=10;

{- 成交量跑赢大盘 3.5倍 -}
V0:=V1/V2;

{- 涨幅？ -}
ZF:=O/REF(C,1);

角05:=ATAN((EMA(C,7)/REF(EMA(C,7),1)-1)*100)*57.3;

角13:=ATAN((EMA(C,13)/REF(EMA(C,13),1)-1)*100)*57.3;

角34:=ATAN((EMA(C,34)/REF(EMA(C,34),1)-1)*100)*57.3;

XG:LT AND 角05>50 AND 角13>35 AND 角34>17 AND V0>3.5 AND ZF>1 AND ZF<1.05 AND C>O;
