ZF:=REF((H-L)/REF(C,10)*100>10,1);
DF:=REF((C/REF(C,10)-1)*100<-10,1);
HR:=REF(O>C,1) AND C>REF(C,1)*1.001;
短线抄底:ZF AND DF AND HR;
