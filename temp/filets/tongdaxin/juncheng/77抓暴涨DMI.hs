{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
M1:MA(CLOSE,13),COLORYELLOW,LINETHICK2;
M2:MA(CLOSE,34),LINETHICK2,COLORWHITE;
M3:MA(CLOSE,55),COLORGREEN,LINETHICK2;
A:MA(C,5)COLORBLUE,LINETHICK3;
B:=A<REF(A,1);
IF(B-1,A,DRAWNULL)COLORRED,LINETHICK3;
DRAWTEXT(LAST(C<O,3,0) AND LAST(VOL<REF(VOL,1),3,0),L*0.975,'三阴\N缩量\N一阳');
DRAWTEXT(CROSS("DMI.PDI","DMI.MDI") AND CROSS("DMI.PDI","DMI.ADX") AND CROSS("DMI.PDI","DMI.ADXR") AND C>REF(C,1)*1.05 AND VOL>REF(VOL,1),L*0.975,'DMI\N捉暴涨');
DRAWTEXT(LAST(MA(C,5)<MA(C,10),5,0) AND "CCI.CCI">REF("CCI.CCI",1) AND CROSS("CCI.CCI",-100),L*0.975,'CCI\N背离底');
DRAWTEXT(LAST((H-L)/REF(C,1)<0.1,5,0) AND VOL>REF(VOL,1)*2 AND C>REF(C,1)*1.05,L*0.975,'一二一\N平台起');
DRAWTEXT(LAST(MA(C,5)<MA(C,10),5,0) AND C>REF(C,1)*1.098,L*0.975,'山谷\N停板');
DRAWTEXT((LAST(C<O,6,3) AND LAST(C>O,2,0)) OR (LAST(C<O,6,3) AND C>O AND REF(C,1)<REF(O,1) AND REF(C,2)>REF(O,2)),L*0.975,'拨云\N见日');
DRAWTEXT(CROSS((CLOSE-MA(CLOSE,5))/MA(CLOSE,5)*100,(CLOSE-MA(CLOSE,11))/MA(CLOSE,11)*100) AND MA(C,40)>REF(MA(C,40),1),L*0.98,'BIAS\N绝密买点');
DRAWTEXT(C<O AND VOL>REF(VOL,1)*1.5 AND LAST(VOL<REF(VOL,1),5,1),L*0.975,'南天\N一柱');
DRAWTEXT((C>O AND V>REF(V,1)*2.5 AND CROSS(C,MA(C,5))) OR (C>O AND V>REF(V,1)*10),L*0.975,'顶天\N立地');