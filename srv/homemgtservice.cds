using { nshomemgt } from '../db/homemgtschema';
service Homemgt {
    entity Members as projection on nshomemgt.Members;
}

@path:'/sap/opu/odata/sap/ZMY'
service MyService {
entity Team as projection on nshomemgt.Members;    
}
