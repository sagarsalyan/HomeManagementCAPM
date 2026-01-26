# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

#CAP + No DB
1. Create Schema, create service, add data (cds add data) -- here db is local sqlite
2. Add xsuaa 
    cds add xsuaa
3. To integrate odata v2, do followings:
    Add "@cap-js-community/odata-v2-adapter": "^1.15.7" in package.json->dependencies --- dependenciy required for odava v2 integration
    Add below code in package.json->cds
         "cds": {
            "cov2ap": {
                "plugin": true
            }
         }
    
4. Here 'path' for v4 and v2 will be like below:
    v4 - /odata/v4/homemgt/$metadata
    v2 - /odata/v2/homemgt/$metadata
5.  If need to maintain custom path for v4 then do below mentioned steps
    i. Add @path for the service (homemgtschema.cds) as below given example
        using { nshomemgt } from '../db/homemgtschema';
        @path: '/sap/opu/data/sap/HOME_MGT'
        service Homemgt{
            entity Members as projection on nshomemgt.Members;
        }
        Like this v4 and v2 url will look like below;
            v4 - /sap/opu/data/sap/HOME_MGT/$metadata
            v2 - /odata/v2/sap/opu/data/sap/HOME_MGT/$metadata
6. In the above example if you see for v2 '/odata/v2' is prefixed To avoid this and  maintain custom path for v2 then do below mentioned steps
    i. In the package.json->cds->cov2ap maintain 'path property, e.g.
        "cov2ap": {
            "plugin": true,
            "path": "/sap/opu/data/sap"
        }
    ii. Add @path for the service (homemgtschema.cds) as below given example
        using { nshomemgt } from '../db/homemgtschema';
        @path: 'HOME_MGT'
        service Homemgt{
            entity Members as projection on nshomemgt.Members;
        }
        Like this v2 url will look like below;
            v2 - /sap/opu/data/sap/HOME_MGT/$metadata
    Note: @path can aslo be maintained as below;
        For v4-
        using { nshomemgt } from '../db/homemgtschema';
        service Homemgt @(path: '/sap/opu/data/sap/HOME_MGT'){
            entity Members as projection on nshomemgt.Members;
        }
        For v2-

        "cov2ap": {
            "plugin": true,
            "path": "/sap/opu/data/sap"
        }

        using { nshomemgt } from '../db/homemgtschema';
        service Homemgt @(path: 'HOME_MGT'){
            entity Members as projection on nshomemgt.Members;
        }


