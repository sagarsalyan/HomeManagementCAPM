using { nshomemgt } from '../db/homemgtschema';
@path: 'HOME_MGT'
service Homemgt{
    entity Members as projection on nshomemgt.Members;
}
