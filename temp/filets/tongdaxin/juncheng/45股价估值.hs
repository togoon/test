{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}

底:0,COLORBLUE;

{- 净资产收益率 -}
JZCSYL:=FINANCE(33)/ FINANCE(34)*100;

{- 资产bs? 8? -}
ZCBS:=IF(JZCSYL>50,8,IF(50>JZCSYL>=14,2.2+(JZCSYL-14)*0.16, 2.2+(JZCSYL-14)* 0.15));

LTP:=CAPITAL;

{- 如果大于100万手，这个值是0？ -}
LTPBS:=IF(LTP<1000000,(1000000-LTP)/1000000,0);

{- 每股净资产乘这两个值的和*4? -}
股价估值: FINANCE(34)*(ZCBS+LTPBS)*4,COLORRED;

中线:股价估值/2,COLORFF00FF,POINTDOT;

现价:C,COLORWHITE;

上涨空间:(股价估值-C)/C,COLORWHITE,LINETHICK0;

警示线:股价估值*0.9,COLORYELLOW;
