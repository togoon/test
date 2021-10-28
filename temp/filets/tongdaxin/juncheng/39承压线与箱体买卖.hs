{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
AMV:=SMA(V,10,1)/300000;
【最高】:=AMV*H/10,LINETHICK0;
【最低】:=AMV*L/10,LINETHICK0;
【收盘】:=AMV*C/10,LINETHICK0;
【开盘】:=REF(【收盘】,1),LINETHICK0;
【3日】:MA(【收盘】,3),COLORGRAY;
【5日】:MA(【收盘】,5),COLORYELLOW;
【8日】:MA(【收盘】,8),COLORWHITE;
STICKLINE(【收盘】>【开盘】,【最高】,【最低】,1,0),COLORRED;
STICKLINE(【收盘】>【开盘】,【收盘】,【开盘】,3,1),COLORRED;
STICKLINE(【收盘】<【开盘】,【收盘】,【开盘】,3,0),COLORGREEN;
STICKLINE(【收盘】<【开盘】,【最高】,【最低】,1,0),COLORGREEN;
分水岭:MA(【收盘】,25);
撑压线:分水岭*1.12,POINTDOT;
下趋势线:分水岭*0.88,POINTDOT;
高位压力线:分水岭*1.48;
地板缩量:分水岭*0.62;
破五日线卖: CROSS((MA(【收盘】,5)/MA(【收盘】,10))*【收盘】*0.98,【收盘】), COLORGREEN;
减仓: CROSS(MA(【收盘】,5),【收盘】),COLORYELLOW;
买:CROSS(【收盘】*1.045,地板缩量) OR CROSS(【收盘】*1.045,MA(【收盘】,24)),COLORRED;