using { nshomemgt } from '../db/homemgtschema';
service Homemgt {
    entity Members as projection on nshomemgt.Members;
}
