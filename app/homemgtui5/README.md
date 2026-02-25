## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Fri Jan 23 2026 05:02:40 GMT+0000 (Coordinated Universal Time)|
|**App Generator**<br>SAP Fiori Application Generator|
|**App Generator Version**<br>1.20.1|
|**Generation Platform**<br>SAP Business Application Studio|
|**Template Used**<br>Basic V4|
|**Service Type**<br>Local CAP|
|**Service URL**<br>http://localhost:4004/odata/v4/homemgt/|
|**Module Name**<br>homemgtui5|
|**Application Title**<br>App Title|
|**Namespace**<br>app|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.144.0|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>False|

## homemgtui5

An SAP Fiori application.

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  To launch the generated app, start your CAP project:  and navigate to the following location in your browser:

http://localhost:4004/app.homemgtui5/index.html

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)





1. Do below changes in xs-app.json
{
      "source": "^/resources/(.*)$",
      "target": "/resources/$1",
      "authenticationType": "none",
      "destination": "ui5",
      "cacheControl": "no-store"
    },

    {
      "source": "^(.*)$",
      "target": "$1",
      "service": "html5-apps-repo-rt",
      "authenticationType": "xsuaa",
      "cacheControl": "no-cache, no-store, must-revalidate"
    }
2. Do version upgrade
3. Add builder in ui5.yaml
# yaml-language-server: $schema=https://sap.github.io/ui5-tooling/schema/ui5.yaml.json

specVersion: "4.0"
metadata:
  name: app.homemgtui5
type: application
server:
  customMiddleware:
    - name: fiori-tools-proxy
      afterMiddleware: compression
      configuration:
        ignoreCertErrors: false # If set to true, certificate errors will be ignored. E.g. self-signed certificates will be accepted
        ui5:
          path:
            - /resources
            - /test-resources
          url: https://sapui5.hana.ondemand.com
    - name: fiori-tools-appreload
      afterMiddleware: compression
      configuration:
        port: 35729
        path: webapp
        delay: 300
    - name: fiori-tools-preview
      afterMiddleware: fiori-tools-appreload
      configuration:
        flp:
          theme: sap_horizon
builder:
  cachebuster:
    # 'time' is default; 'hash' is more robust across CI/CD
    signatureType: hash


