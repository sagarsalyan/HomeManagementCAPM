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

Prerequisites - 
Subscribe to SAP Hana Cloud from Service Market Plane
Go to SAP Hana Cloud Application
Create DB instance
Create HDI Container instance from Service Market Place

#CAP + No DB
1. Create Schema, create service, add data (cds add data) -- here db is local sqlite
2. Add xsuaa 
    cds add xsuaa --for production
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
            "auth": "xsuaa",
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
      - name: hana-hdi-container
        type: com.sap.xs.hdi-container
        parameters:
            service: hana
            service-plan: hdi-shared
5. Check srv/homemgtservice.cds file to know access is granted for the entity.
6. Check xs-security.json to know how role-template is created
7. Run below command to create app-router to access service through xsuaa authentication
    cds add approuter --production
    Check changes in app/router,mta.yaml
8. Check in the Role in BTP, new role mentioned in xs-security.json will be created. Create Role Template using this role and assign to particular user whom need to give access
5. Build MTA
    mbt build
6. Deploy app
    cf deploy mta_archives/homemgtcap_1.0.0.mtar

Note: To run locally through SQLite database, you need to run below command to deploy to SQLite
cds deploy --to sqlite
    
