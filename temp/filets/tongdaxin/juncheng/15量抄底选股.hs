{- 放量下跌？ -}
A:=C>O AND V>REF(V,1)*2.5 AND CROSS(C,MA(C,5));
B:=C>O AND V>REF(V,1)*10;
A OR B;
