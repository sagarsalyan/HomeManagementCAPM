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

1. Create Schema, create service, add data (cds add data) -- here db is Postgres
2. Add xsuaa cds add xsuaa
3. Add postgres feature 
    cds add postgres 
    npm i
4. Add below code to add postgres database into app 
    "cds": { 
        "requires": { 
            "[hybrid]": { 
                "db": { 
                    "kind": "sqlite" 
                    } 
                }, 
                "[production]": { 
                    "db": { 
                        "kind": "postgres" 
                    }, 
                    "auth": "dummy" 
                } 
            } 
        } 
    Here auth is dummy to avoid authentication, in realtime it should be 'xsuaa'. For mocking user, use 'mocked'
5. Add mta 
    cds add mta 
    This will add all modules and resource related to Postgres Check and the detail in postgres-db resource, and maintain 
    correct value as per the Postgres instance in btp. E.g. service-plan: trial
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
6. Build and deploy 
    mbt build 
    cf deploy mta_archilve/homemgtcap.mtar
