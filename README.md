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
3. Add mta 
    cds add mta
4. Build and deploy 
    mbt build 
    cf deploy mta_archilve/homemgtcap.mtar
