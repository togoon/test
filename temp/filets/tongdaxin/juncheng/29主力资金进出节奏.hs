{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
量＿价:=1;
CTKG:=1;
W:=量＿价;
EPSL:=0.0001;
ZZ:=(C+H+L)/3;
TJA:=ZZ>=MAX(C,O) AND CTKG=1;
TJB:=ZZ<=MIN(C,O) AND CTKG=1;
ZF:=IF(TJA,1,IF(TJB,-1,0));
TJ0:=TJA OR TJB;
TJ1:=H=L AND C>REF(C,1);
TJ2:=H=L AND C<REF(C,1);
TJ3:=H=L AND C=REF(C,1);
量_价:=IF(W=1,VOL,AMOUNT),STICK,COLOREEFFEE;
EE:=IF(TJ1,EPSL,IF(TJ2,-EPSL,0));
ZL:=2*(H-L)+ABS(C-O)+3*IF(TJ3,EPSL,ABS(EE));
JGL_DX:=(IF(TJ0,2/3*(2*C-H-L)+ZF*ABS(C-O),(C-O))+EE)/ZL;
买卖差:=JGL_DX*量_价,COLOR13AADD,NODRAW;
DX%:JGL_DX*100,NODRAW,COLORGREEN,LINETHICK0;
DX连红:BARSLASTCOUNT(DX%>0),COLORRED,NODRAW,LINETHICK0;
买盘:=量_价*(1+JGL_DX)/2,COLOR1133AA,NODRAW;
卖盘:=量_价*(1-JGL_DX)/2,COLORFFFF00,NODRAW;
VAR11:=VOL/((HIGH-LOW)*2-ABS(CLOSE-OPEN));
DDX:=买盘-卖盘;
MADDX:=MA(DDX,5)*15;
DDX1:SMA(MADDX,3,1),COLORRED,LINETHICK1;
DDX2:SMA(DDX1,3,1),COLORGREEN,LINETHICK1;
DDX3:SMA(DDX2,3,1),COLORYELLOW,LINETHICK1;
DRAWRECTREL(0,250,175,999.4,IF(120,RGB(10,0,0),0));
超B:=L2_AMO(0,2)/10000.0;
大B:=L2_AMO(1,2)/10000.0;
中B:=L2_AMO(2,2)/10000.0;
小B:=L2_AMO(3,2)/10000.0;
超S:=L2_AMO(0,3)/10000.0;
大S:=L2_AMO(1,3)/10000.0;
中S:=L2_AMO(2,3)/10000.0;
小S:=L2_AMO(3,3)/10000.0;
净流入:=(超B+大B+中B+小B)-(超S+大S+中S+小S),NODRAW;
超大单:=(超B)-(超S),NODRAW;
大单:=(大B)-(大S),NODRAW;
中单:=(中B)-(中S),NODRAW;
小单:=(小B)-(小S),NODRAW;
DAZHI:=CONST(MAX(ABS(净流入),MAX(ABS(超大单),MAX(ABS(大单),MAX(ABS(中单),ABS(小单)))))),NODRAW;
DRAWRECTREL(0,CONST(830-(ABS(超大单)*500/DAZHI)),30,935,IF(CONST(超大单)>0,RGB(255,0,0),RGB(23,125,255)));
DRAWRECTREL(35,CONST(830-(ABS(大单)*500/DAZHI)),65,935,IF(CONST(大单)>0,RGB(255,0,0),RGB(23,125,255)));
DRAWRECTREL(70,CONST(830-(ABS(中单)*500/DAZHI)),100,935,IF(CONST(中单)>0,RGB(255,0,0),RGB(23,125,255)));
DRAWRECTREL(105,CONST(830-(ABS(小单)*500/DAZHI)),135,935,IF(CONST(小单)>0,RGB(255,0,0),RGB(23,125,255)));
DRAWRECTREL(140,CONST(830-(ABS(净流入)*500/DAZHI)),170,935,IF(CONST(净流入)>0,RGB(255,0,0),RGB(23,125,255)));
DRAWTEXT_FIX(CURRBARSCOUNT=1,0.002,0.25,0,'资金搏弈 (万元)'),COLORYELLOW;
DRAWNUMBER_FIX(CURRBARSCOUNT=1,0.002,0.55,0,INTPART(超大单)),COLORYELLOW;
DRAWNUMBER_FIX(CURRBARSCOUNT=1,0.035,0.555,0,INTPART(大单)),COLORYELLOW;
DRAWNUMBER_FIX(CURRBARSCOUNT=1,0.070,0.550,0,INTPART(中单)),COLORYELLOW;
DRAWNUMBER_FIX(CURRBARSCOUNT=1,0.106,0.55,0,INTPART(小单)),COLORYELLOW;
DRAWNUMBER_FIX(CURRBARSCOUNT=1,0.145,0.55,0,INTPART(净流入)),COLORYELLOW;
DRAWTEXT_FIX(CURRBARSCOUNT=1,0.002,1,0,'超大'),COLORYELLOW;
DRAWTEXT_FIX(CURRBARSCOUNT=1,0.040,1,0,'大单'),COLORYELLOW;
DRAWTEXT_FIX(CURRBARSCOUNT=1,0.075,1,0,'中单'),COLORYELLOW;
DRAWTEXT_FIX(CURRBARSCOUNT=1,0.112,1,0,'小单'),COLORYELLOW;
DRAWTEXT_FIX(CURRBARSCOUNT=1,0.145,1,0,'净流'),COLORYELLOW;
{T6:=IF(FINDSTR(EXTERNSTR(0,1),'，'),STRCAT('千股千评：',EXTERNSTR(0,1)),'');
DRAWTEXT_FIX(1,0.00,0.00,0,T6),COLOR00FFFF;};