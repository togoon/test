A1:=REF(C,2)>REF(C,3)*1.095 AND REF(C,2)=REF(H,2);
A2:=REF(C,1)<REF(O,1)*1.005 AND REF(C,1)*1.02<REF(C,2);
A3:=C>REF(C,2) AND C>REF(H,1) AND C>=REF(C,1)*1.095 AND C=H;
双响炮:A1 AND A2 AND A3;
