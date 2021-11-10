长下影线:=(MIN(C,O)-L)>ABS(C-O)*1.95;
长上影线:=(H-MAX(C,O))>ABS(C-O)*1.95;
涨停:=C/REF(C,1)>=1.075 AND REF(C,1)/REF(C,2)<1.03;
底部追涨:LLV(L,(长上影线 OR 长下影线))>REF(HHV(H,涨停),1) AND H/LLV(L,10)<1.35;
