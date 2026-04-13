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
3. Add hana
    cds add hana --for production
    
    Below code will be added in the package.json

     "dependencies": {
        "@cap-js/hana": "^2",
        "@sap/cds": "^9",
        "@sap/xssec": "^4",
        "express": "^4"
    },

    "cds": {
        "requires": {
        "[production]": {
            "auth": "mocked",
            "db": "hana"
        },
        "[hybrid]": {
            "db": "sqlite"
        }
    }
  }

4. Add mta
    cds add mta
    Make sure here name is hdi container's name
      - name: homemgtcap-db
        type: com.sap.xs.hdi-container
        parameters:
            service: hana
            service-plan: hdi-shared
6. Add AppRouter 
    right click on mta.yaml -> Create MTA Module From Template -> Select AppRouter Configuration -> select Managed Approuter -> Plan to Add UI-Yes -> select Overwite this and all others
7. Add UI5 app 
    right click on mta.yaml -> Create MTA Module From Template -> Select Fiori Generator 
    while create select "Add deployment config in MTA" checkbox always check approuter in mta.yaml and manifest.json
    Add Local CAP for adding service

8. Add below code in xs-app.json inside 'routes' array of ui5 app if missing, this is router for odata service.
    { 
        "source": "^/odata/(.*)$", 
        "target": "/odata/$1", 
        "destination": "srv-api", 
        "authenticationType": "xsuaa", 
        "csrfProtection": false 
    },

9. To add UI5 app into SAP Buil Workzone, intent informationi is important, otherwise app will not be visile int eh HTML 5 App Contnt Explorer. 
    To add intent information ad below code
    "sap.app": {
        "crossNavigation": {
            "inbounds": {
                "HomeApp-display": {
                "semanticObject": "HomeApp",
                "action": "display",
                "title": "Home App",
                "subTitle": "Home App",
                "signature": {
                    "parameters": {},
                    "additionalParameters": "allowed"
                }
                }
            }
        }
    }
6. Build and deploy 
    mbt build 
    cf deploy mta_archilve/homemgtcap.mtar
