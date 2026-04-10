namespace nshomemgt;
entity Students {
    key ID      : UUID;
    name        : String;
    age         : Integer;
    course      : String;
}

entity Teachers {
    key ID      : UUID;
    name        : String;
    subject     : String;
}
