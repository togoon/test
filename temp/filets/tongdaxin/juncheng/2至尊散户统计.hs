{-
 - 如果日期小于2015年5月30日，则为1
 -}
BGTYU:=IF(DATE<=1150530,1,0);

D收盘:DCLOSE;
DD:DCLOSE*BGTYU;

GHYJKU:=BETWEEN(DD/(SUM(AMOUNT,BARSCOUNT((DCLOSE*BGTYU)))/SUM(VOL*100,BARSCOUNT((DCLOSE*BGTYU)))),1.05,0.95);

VBNH:=IF(GHYJKU=0,MA((DCLOSE*BGTYU),BARSCOUNT((DCLOSE*BGTYU))),(SUM(AMOUNT,BARSCOUNT((DCLOSE*BGTYU)))/SUM(VOL*100,BARSCOUNT((DCLOSE*BGTYU)))));
绿色散户:EXPMA((DCLOSE/VBNH),120),COLORGREEN,LINETHICK2;
