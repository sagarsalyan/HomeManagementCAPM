using { nshomemgt } from '../db/homemgtschema';

service SchoolService {

    @restrict: [
      { grant: ['READ','CREATE','UPDATE','DELETE'], to: 'Student_Admin' }
    ]
    entity Students as projection on nshomemgt.Students;

    // @restrict: [
    //   { grant: ['READ'], to: 'Teacher_Reader' }
    // ]
    entity Teachers as projection on nshomemgt.Teachers;
}

