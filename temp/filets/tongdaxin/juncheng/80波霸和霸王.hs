{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
N:=16;
A1:=ATAN((C/REF(C,N)-1)*57.05);
A2:SUM(A1,0);
A4:EMA(A2,60);
A3:EMA(A2,10);
DRAWBAND(A2,120,A3,RGB(35,135,35));
DRAWTEXT(CROSS(A2,A3),A3,'启动'),COLORYELLOW;
DRAWTEXT(CROSS(A2,A4),A3,'加速'),COLORMAGENTA;