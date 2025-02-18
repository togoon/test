{- 大而全的图 -}
A1:=EMA(HHV(HIGH,500),21);
A2:=EMA(HHV(HIGH,250),21);
A3:=EMA(HHV(HIGH,90),21);
A4:=EMA(LLV(LOW,500),21);
A5:=EMA(LLV(LOW,250),21);
A6:=EMA(LLV(LOW,90),21);
A7:=EMA((A4*0.96+A5*0.96+A6*0.96+A1*0.558+A2*0.558+A3*0.558)/6,21);
A8:=EMA((A4*1.25+A5*1.23+A6*1.2+A1*0.55+A2*0.55+A3*0.65)/6,21);
A9:=EMA((A4*1.3+A5*1.3+A6*1.3+A1*0.68+A2*0.68+A3*0.68)/6,21);
A10:=EMA((A7*3+A8*2+A9)/6*1.738,21);
A11:=REF(LOW,1);
A12:=SMA(ABS(LOW-A11),3,1)/SMA(MAX(LOW-A11,0),3,1)*100;
A13:=EMA(IF(CLOSE*1.35<=A10,A12*10,A12/10),3);
A14:=LLV(LOW,30);
A15:=HHV(A13,30);
A16:=IF(MA(CLOSE,58),1,0);
A17:=EMA(IF(LOW<=A14,(A13+A15*2)/2,0),3)/618*A16;
A18:=(REF(A17,2)<REF(A17,1) AND A17>REF(A17,1))*A17;
A20:=CLOSE/REF(CLOSE,1)>1.048 AND CLOSE=HIGH AND BETWEEN(FORCAST(VOL,4),0.2*FORCAST(VOL,12),2.1*FORCAST(VOL,12));

A21:=FILTER(A20,28);

A22:=REF(A18,1)>0 AND A18=0 AND A21;

STICKLINE(A22,0,(-1.5),1,0),COLORMAGENTA;
DRAWTEXT(A22,(-1.3),2),COLORMAGENTA;

A23:=CLOSE>4 AND CLOSE<35 AND HHV(HIGH,60)/LLV(LOW,60)<3;
A24:=NAMELIKE(3) OR NAMELIKE(4);

A25:=TOTALBARSCOUNT>10;
A26:=A23 AND A25 AND NOT(A24);
A27:=BETWEEN(HHVBARS(HIGH,29),4,9);
A28:=A26 AND A27;
A29:=BARSLAST(A28=1);
A30:=CROSS(MA(CLOSE,5),REF(HIGH,A29)) AND A29<4 AND CLOSE>REF(OPEN,1) AND LOW>REF(LOW,1) AND CLOSE>OPEN AND MA(CLOSE,10)>REF(MA(CLOSE,10),1) AND OPEN<REF(OPEN,4);
A31:=(OPEN+HIGH+LOW)/3;
A32:=EMA(A31,55);
A33:=EMA(A31,7);
A34:=OPEN<A32 AND A33>A32 AND CLOSE>=A33 AND A28;
STICKLINE(A34,0,1.5,0.9,0),COLORLICYAN;
DRAWTEXT(A34,1.3,6),COLORLICYAN;
A35:=(CLOSE+HIGH+LOW)/3;
A36:=EMA(A35,10);
A37:=REF(A36,1);
A38:=HHV(REF(HIGH,1),5);
A39:=LLV(REF(LOW,1),5);
A40:=HHV(REF(CLOSE,1),5);
A41:=LLV(REF(CLOSE,1),5);
A42:=HHV(REF(OPEN,1),5);
A43:=LLV(REF(OPEN,1),5);
A44:=(A38/A39-1)*100<=5;
A45:=ABS(100*(OPEN-CLOSE)/OPEN)<1.6;
A46:=COUNT(A45,5)=5;
A47:=REF(A46,1)=1 AND A46=0;
A48:=(A40/A41-1)*100<=1.6;
A49:=(A42/A43-1)*100<=1.6;
A50:=A44 AND A47 AND A48 AND A49 AND COUNT(CLOSE>MAX(A36,A37) AND OPEN>MAX(A36,A37),5)=5 AND CLOSE>A38;
STICKLINE(A50,0,1.5,3,1),COLORRED;
DRAWTEXT(A50,1,7),COLORRED;
A51:=(CLOSE-LLV(LOW,9))/(HHV(HIGH,9)-LLV(LOW,9))*100;
A52:=SMA(A51,3,1);
A53:=SMA(A52,3,1);
A54:=3*A52-2*A53;
A55:=(CLOSE-MA(CLOSE,6))/MA(CLOSE,6)*100;
A56:=(CLOSE-MA(CLOSE,12))/MA(CLOSE,12)*100;
A57:=(CLOSE-MA(CLOSE,24))/MA(CLOSE,24)*100;
A58:=(A55+2*A56+3*A57)/6;
A59:=MA(A58,3);
A60:=IF(A59,20,0);
A61:=EMA(100*(CLOSE-LLV(LOW,34))/(HHV(HIGH,34)-LLV(LOW,34)),3);
A62:=A61<=10;
A63:=CROSS(A54,A52) AND A60>=20 AND A62;
STICKLINE(A63,0,1,3,1),COLORYELLOW;
DRAWTEXT(A63,0.9,8),COLORYELLOW;
A64:=EMA(CLOSE,5);
A65:=EMA(CLOSE,29);
A66:=EXIST(CROSS(A64,A65),4) AND A64>REF(A64,1) AND A65>REF(A65,1);
A67:=MA(VOL,8);
A68:=MA(VOL,89);
A69:=EXIST(CROSS(A67,A68),3);
A70:=REF(HIGH+LOW,1)/2;
A71:=SUM(MAX(0,HIGH-A70),26)/SUM(MAX(0,A70-LOW),26)*100;
A72:=REF(MA(CR,11),11/2.5+1);
A73:=REF(MA(CR,21),21/2.5+1);
A74:=REF(MA(CR,35),35/2.5+1);
A75:=REF(MA(CR,53),53/2.5+1);
A76:=A71>A72 AND A71>A73 AND A71>A74 AND A71>A75;
A77:=A66 AND A69 AND A76;
STICKLINE(A77,0,1.5,0.5,0),COLORYELLOW;
DRAWTEXT(A77,1.2,9),COLORYELLOW;
A78:=EMA(CLOSE,5);
A79:=EMA(CLOSE,13);
A80:=LLV(LOW,BARSLAST(CROSS(A79,A78))+1);
A81:=HHV(HIGH,BARSLAST(CROSS(A78,A79))+1);
A82:=LLV(LOW,BARSLAST(CROSS(A79,A78))+1);
A83:=EVERY(RANGE(MA(A81,5)/MA(A80,5),0.93,1.2),5);
A84:=EVERY(RANGE(MA(A81,13)/MA(A80,13),0.93,1.2),13);
A85:=EVERY(RANGE(MA(A82,5)/MA(A81,5),0.93,1.2),5);
A86:=EVERY(RANGE(MA(A82,13)/MA(A81,13),0.93,1.2),13);
A87:=CLOSE-REF(CLOSE,1);
A88:=100*EMA(EMA(A87,6),6)/EMA(EMA(ABS(A87),6),6);
A89:=LLV(A88,2)=LLV(A88,7) AND COUNT(A88<0,2) AND CROSS(A88,MA(A88,2)) AND A83 AND A84 AND A85 AND A86;
STICKLINE(A89,0,1.5,1,0),COLOR0080FF;
DRAWTEXT(A89,1.2,10),COLOR0080FF;
A90:=(HY_INDEXC/REF(HY_INDEXC,1)-1)*100;
A91:=(INDEXC/REF(INDEXC,1)-1)*100;
A92:=(CLOSE/REF(CLOSE,1)-1)*100;
A93:=EMA(A92-A91,12*5)-EMA(A92-A91,26*5);
A94:=EMA(A93,9*5);
A95:=2*(A93-A94);
A96:=EMA(A90-A91,12*5)-EMA(A90-A91,26*5);
A97:=EMA(A96,9*5);
A98:=2*(A96-A97);
A99:=EMA(A91,12*5)-EMA(A91,26*5);
STICKLINE(A98>0,0,A98,2,1),COLORLIGRAY;
STICKLINE(A98<0,0,A98,2,1),COLORBLUE;
STICKLINE(A95>0,0,A95,0,1),COLORYELLOW;
STICKLINE(A95<0,0,A95,0,0),COLORMAGENTA;
★个股指数:EMA(A93,5)*5,COLORGREEN;
★个股指数Z:IF(REF(★个股指数,0)-REF(★个股指数,1)>0.25,2,0);
★大盘指数:EMA(A99,5)*5,COLORMAGENTA,LINETHICK2;
A100:=STRCAT(11,CON2STR(INDEXADV,0));
A101:=STRCAT(12,CON2STR(INDEXDEC,0));
DRAWTEXT_FIX(1,0,0.5,0,STRCAT(A100,A101)),COLORWHITE;
STICKLINE(MA(INDEXC,5)>MA(INDEXC,10),0,0,5,0),COLORRED;
STICKLINE(MA(INDEXC,5)<MA(INDEXC,10),0,MINDIFF,5,0),COLORGREEN;
A102:=INSUM(HYBLOCK,13,1,0);
A103:=STRCAT(14,HYBLOCK);
A104:=STRCAT(A103,15);
A105:=STRCAT(A104,CON2STR(A102,0));
A106:=STRCAT(A105,16);
A107:=STRCAT(14,HYBLOCK);
A108:=STRCAT(A107,17);
A109:=STRCAT(A108,18);
DRAWTEXT_FIX(A102=0 AND ISLASTBAR,0,0.07,0,19),COLORGREEN;
DRAWTEXT_FIX(A102=0 AND ISLASTBAR,0,0.07,0,A109),COLORBLACK;
DRAWTEXT_FIX(A102>0 AND ISLASTBAR,0,0.07,0,20),COLORRED;
DRAWTEXT_FIX(A102>0 AND ISLASTBAR,0,0.07,0,A106),COLORYELLOW;
