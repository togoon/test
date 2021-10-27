{- 
 - -}
C5:=MA(C,5);
V5:=MA(VOL,5);

REF(C,1)<REF(C5,1) 
AND C>C5 
AND EVERY(REF(VOL,1)<REF(V5,1),4) {- 前4天的成交量一直在均线下 -}
AND VOL>3*REF(VOL,1) {- 今天的成交量大于前一天的3倍 -}
AND EVERY(REF(C,1)<REF(O,1),3); {- 连续3前阴线 -}
