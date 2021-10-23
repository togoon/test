{-
 - 如果日期小于2015年5月30日，则为1
 - 这个公式需要k线总数加载到一定的量，才能计算出值来
 -}
BGTYU:=IF(DATE<=1150530,1,0);

收盘点与否:DCLOSE*BGTYU;
K线数:BARSCOUNT(1);
成交均价:SUM(AMOUNT,K线数)/SUM(VOL*100,K线数);
价格相近:=BETWEEN(收盘点与否/成交均价,1.05,0.95);

修正均价:IF(价格相近=0,MA(收盘点与否,K线数),成交均价);
绿色散户:EXPMA((DCLOSE/修正均价),120),COLORGREEN,LINETHICK2;

