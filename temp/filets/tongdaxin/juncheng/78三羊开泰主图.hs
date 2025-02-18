{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
A:=MA(C,14);
A1:=A*1.1;
A4:=A*0.9;
A2:=A1-(A1-A4)*0.191;
A3:=A1-(A1-A4)*0.618;
A5:=A1-(A1-A4)*0.809;
Z1:IF(H*1.01>A2 OR REF(H,1)>REF(A2,1),A1,A4),LINETHICK1, COLORGRAY;
Z2:IF(H*1.01>A2 OR REF(H,1)>REF(A2,1),A2,A4),LINETHICK1, COLORGRAY;

Z3:IF(C>A3 AND C<A2 OR REF(C,1)>REF(A3,1) AND REF(C,1)<REF(A2,1),A3,A4),LINETHICK1, COLORGRAY;
Z4:IF(C<A3 OR REF(C,1)<REF(A3,1),A4,A4),LINETHICK1, COLORGRAY;

STICKLINE(CLOSE>Z1,Z1,Z2,0,1),COLORGRAY,LINETHICK1;
STICKLINE(CLOSE<Z1,Z1,Z2,0,1),COLORGRAY,LINETHICK1;

BU:=CROSS(HIGH,SAR(3,1,13));
SEL:=CROSS(SAR(3,1,13),LOW);

DRAWICON(BU,LOW,34);
DRAWICON(SEL,1.01*HIGH,35);

三羊开泰:MA(CLOSE,10),COLORYELLOW,LINETHICK1;
STICKLINE(C>=三羊开泰 AND C>=O,C,O,3.5,0),COLOR0000AA;
STICKLINE(C>=三羊开泰 AND C>=O,C,O,3.0,0),COLOR0000BB;
STICKLINE(C>=三羊开泰 AND C>=O,C,O,2.5,0),COLOR0000CC;
STICKLINE(C>=三羊开泰 AND C>=O,C,O,2.0,0),COLOR0000DD;
STICKLINE(C>=三羊开泰 AND C>=O,C,O,1.5,0),COLOR0000EE;
STICKLINE(C>=三羊开泰 AND C>=O,C,O,1.0,0),COLOR0000FF;
STICKLINE(C>=三羊开泰 AND C>=O,H,L,0,0),COLOR0000FF;
STICKLINE(C>=三羊开泰 AND C<O,C,O,3.4,1),COLORRED;
STICKLINE(C>=三羊开泰 AND C<O,O,H,0,0),COLORRED;
STICKLINE(C>=三羊开泰 AND C<O,C,L,0,0),COLORRED;
STICKLINE(C<三羊开泰 AND C<=O,C,O,3.4,1),COLORAAAA00;
STICKLINE(C<三羊开泰 AND C>O,C,O,3.5,0),COLORAAAA00;
STICKLINE(C<三羊开泰 AND C>=O,C,O,3.0,0),COLORBBBB00;
STICKLINE(C<三羊开泰 AND C>=O,C,O,2.5,0),COLORCCCC00;
STICKLINE(C<三羊开泰 AND C>=O,C,O,2.0,0),COLORDDDD00;
STICKLINE(C<三羊开泰 AND C>=O,C,O,1.5,0),COLOREEEE00;
STICKLINE(C<三羊开泰 AND C>=O,C,O,1.0,0),COLORFFFF00;
STICKLINE(C<三羊开泰 AND C>=O,H,L,0,0),COLORFFFF00;
STICKLINE(C<三羊开泰 AND C>O,C,H,0,0),COLORGREEN;
STICKLINE(C<三羊开泰 AND C>O,O,L,0,0),COLORWHITE;
Z5:=STRCAT(HYBLOCK,' ');
Z6:=STRCAT(Z5,FGBLOCK);
Z7:=STRCAT(Z6,DYBLOCK);
Z8:=STRCAT(Z7,' ');
DRAWTEXT_FIX(ISLASTBAR,0,0,0,STRCAT(Z8,GNBLOCK)),COLORCYAN;
AE1:=EMA(CLOSE,13)-EMA(CLOSE,55);
AE2:=EMA((0.618*REF(AE1,1)+0.382*AE1),3);
STICKLINE(AE1>=AE2,H,L,0,0),COLOR00FFFF;
STICKLINE(AE1>=AE2,O,C,-1,0),COLOR0099DD;
STICKLINE(AE1>=AE2,O,C,2,0),COLOR00ABEE;
STICKLINE(AE1>=AE2,O,C,1,0),COLOR00DDFF;
STICKLINE(AE1>=AE2,O,C,0.1,0),COLOR00FFFF;
STICKLINE(AE1<AE2,H,L,0,0),COLOR00FF00;
STICKLINE(AE1<AE2,O,C,-1,0),COLOR009900;
STICKLINE(AE1<AE2,O,C,2,0),COLOR00AB00;
STICKLINE(AE1<AE2,O,C,1,0),COLOR00DD00;
STICKLINE(AE1<AE2,O,C,0.1,0),COLOR00FF00;
N1:=10;
T6:=CONST(HHVBARS(V,10)),COLOR0000FF,LINETHICK1;
书以弘道:IF(CURRBARSCOUNT<=N1+15,CONST(IF(T6=0,C,REF(C,T6))),DRAWNULL),COLORFFFFFF,LINETHICK1;
新量能点:IF(CURRBARSCOUNT=T6+1,书以弘道,DRAWNULL),CIRCLEDOT,COLORFFFFFF,LINETHICK9;
DRAWTEXT(ISLASTBAR,书以弘道,' 书以弘道'),COLOR00F0F0;
HV:=HHV(V,5)=V OR V/REF(V,1)>=5;
FT:=BARSLAST(HV);
书以弘道1:=IF(HV,C,REF(C,FT));
DRAWTEXT(书以弘道1>REF(书以弘道1,1)AND C<REF(C,1),L,'*带量跌'),COLORGREEN;
DRAWTEXT(书以弘道1<REF(书以弘道1,1) AND C>REF(C,1),L,'*缩量涨'),COLORYELLOW;
DRAWTEXT(书以弘道1>REF(书以弘道1,1) AND C>REF(C,1) AND C>MA(C,13) AND C=HHV(C,20) AND C/REF(C,1)>1.05,L,'*突破量'),COLORRED;
