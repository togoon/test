VAR1:=REF(CLOSE,1);
VAR2:=SMA(MAX(CLOSE-VAR1,0),7,1)/SMA(ABS(CLOSE-VAR1),7,1)*100;
VAR3:=SMA(MAX(CLOSE-VAR1,0),13,1)/SMA(ABS(CLOSE-VAR1),13,1)*100;
VAR4:=SMA(MAX(VAR1-CLOSE,0),7,1)/SMA(ABS(CLOSE-VAR1),7,1)*100;
VAR5:=SMA(MAX(VAR1-CLOSE,0),13,1)/SMA(ABS(CLOSE-VAR1),13,1)*100;
VAR6:=BARSCOUNT(CLOSE);
提示顶底: VAR2<25 AND VAR3<30 AND VAR6>35, COLORSTICK;
输出:0-ABS(VAR4<25 AND VAR5<30 AND VAR6>35), COLORSTICK;
