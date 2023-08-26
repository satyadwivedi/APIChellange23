namespace com.satya; 
using {cuid, Country, sap.common.CodeList } from '@sap/cds/common';

entity Books : cuid {
    name: String(100);
    price :Decimal(10,2);    
}

//@cds.autoexpose
entity Authors: cuid {
    name: String(100);
    address: String(255);
    age: Int16;
}

entity Bar @cds.autoexpose { key id: Integer; }
entity Car : CodeList { key code: Integer; }
