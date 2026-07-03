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
5. Build MTA
    mbt build
6. Deploy app
    cf deploy mta_archives/homemgtcap_1.0.0.mtar

This will deploy app, create service with no authentication, because for production auth is mentioned as mocked.
To enable xsuaa do followings

1. cds add xsuaa --production
    this will add xsuaa in the production profile. check package.json for the changes.
2. Now deploy 
    mbt build
    cf deploy mta_archives/homemgtcap_1.0.0.mtar
    Now xsuaa is enabled.
3. Test is POSTMAN
    GET https://4d8e6ee1trial-dev-homemgtcap-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/homemgt/Members -- url is my case, check service in space to get the url
    Authorization - Type - OAuth 2.0
                    Token Name - Give any name
                    Grant Type - Client Credentials
                    Access Token URL - XSUAA service key - url
                    Client ID - XSUAA service key - clientid
                    Client Secret - XSUAA service key - clientsecret
    Click button - 'Get New Access Token'
    Click button - 'Use token'

4.  Run PostMan

We can also create a destination in BTP which will do the authentication to the service through xsuaa. Follow below steps:

1. Create a destination with below configuration
    Name - any name (homemgt-dest)
    Authentication - OAuth2UserTokenExcahange
    Type - HTTP
    Cliend ID - XSUAA service key - clientid
    Client Secret - XSUAA service key - clientsecret
    Token Service URL - XSUAA service key - url + "/oauth/token"
    Proxy Type - Internet
    Token Service URL Type - Dedicated
    URL - Service URL from service application in dev space, in my case https://4d8e6ee1trial-dev-homemgtcap-srv.cfapps.us10-001.hana.ondemand.com

    Additional Properties:
    HTML5.DynamicDestination = true
    WebIDEEnabled = true
    WebIDEUsage = odata_gen

2.  Test the service through CURL CLI
    curl <destination_name>.dest
    cust <destination_name>.dest + "/odata/v4/Members"


Multiple table in Multiple HDI Container.

To achieve this mta.yaml and package.json to be changed.

MTA Changes
1. Add HDI Containers in RESOURCE  (Refer mta.yaml for code)
2. Create DB deployer for each HDI Containers in MODULES. (Refer mta.yaml for code)
3. Maintain all HDI containers in REQUIRE section of SERVICE module(homemgtcap-srv) -- refer mta.yaml for code

Package.json changes
In cds.require maintain different DB for each HDI containers. Here 'vcap' property used to bind this db to hdi container. Check package.json cds.require section for code.

That's it !!

Now you can access different HDI container tables accordingly. Check homemgtservice.js, i have maintained a 'flag' User Defined Variable for this service. If it is X then connect to hdicontainer-emp, if Y then connect to hdicontainer-sup.

Note: I am setting db in 'before' method, this will trigger everytime whichever service's whatever method is called. You can use according to your usage.

    
