# Title

## Description

The main intent of this scenario is to complement an existing business process in an SAP solution – currently SAP S/4HANA with additional business process steps. This involves adding major logic and/or additional data and goes beyond simple UI changes. All of this is achieved by using DevOps tools and services provided by SAP BTP.

This application showcases:

- Building applications on SAP Business Technology Platform (BTP) using [SAP Cloud Application Programming Model(CAP)](https://cap.cloud.sap/docs/)
- Consuming events from SAP S/4HANA on premise using [SAP Event Mesh](https://help.sap.com/viewer/bf82e6b26456494cbdd197057c09979f/Cloud/en-US/df532e8735eb4322b00bfc7e42f84e8d.html)
- Consuming OData APIs from SAP S/4HANA on premise using SAP Business Technology Platform Connectivity Service
- Building a frontend for the CAP application using SAP Fiori Elements
- How to use the [Continous Integration and Delivery service](https://discovery-center.cloud.sap/serviceCatalog/continuous-integration-&-delivery?region=all)
- How to use [SAP Cloud Transport Management](https://discovery-center.cloud.sap/serviceCatalog/cloud-transport-management?service_plan=standard&region=all) in conjunction with the Continous Integration and Delivery service

## Business Scenario

A business scenario is used to showcase how to build a S/4 HANA on premise extension Application on SAP BTP.

John who is an employee of Business Partner Validation Firm iCredible, which is a third-party vendor of ACME Corporation would like to get notifications whenever new Business Partners are added in the S/4HANA backend system of ACME Corporation. John would then be able to review the Business Partner details in his extension app. He would proceed to visit the Business Partner’s registered office and do some background verification. John would then proceed to update/validate the verification details into the extension app. Once the details are verified, the Business Partner gets activated in the S/4HANA system of ACME Corporation.

- Custom extension application that works independently from S/4HANA.

- Changes in S/4 communicated via events in real time to extension application.

- Vendor personnel needs access to only custom app

### Solution Diagram

![solution diagram](./documentation/images/solutiondiagramm-1.png)

The Business Partner Validation application is developed using the SAP Cloud Application programming Model (CAP) and runs on the SAP BTP, Cloud Foundry runtime. It consumes platform services like SAP Event Mesh, SAP HANA Cloud and the Connectivity service. The events occuring in S/4 HANA on premise are inserted into the SAP Event Mesh queue. The application running in Cloud Foundry is notified on events, consumes them from the queue and inserts the event data into the HANA database. The Business Partner Validation Application uses S/4 HANA OData API's to read additional Business Partner Data from the S/4 HANA system. In case of updates performed by the third-party vendor the SAP Cloud SDK is used to update the corresponding data in the S/4HANA on premise system. 

## Requirements
The required systems and components are:

- SAP S/4HANA on premise system.
- SAP BTP account

Entitlements/Quota required in your SAP Business Technology Platform Account:

| Service                           | Plan        | Number of instances |
| --------------------------------- | ----------- | ------------------- |
| Connectivity                      | lite        | 1                   |
| Destination                       | lite        | 1                   |
| HTML5 Application Repository      | app-host    | 1                   |
| Event Mesh                        | default     | 1                   |
| Application Logging               | lite        | 1                   |
| Authorization & Trust Management  | application | 1                   |
| SAP HANA Schemas & HDI Containers | hdi-shared  | 1                   |
| SAP HANA Cloud                    |             |                     |
| Cloud Foundry runtime             |             |                     |
| Application Autoscaler (Optional) | standard    | 1                   |


Subscriptions required in your SAP Business Technology Platform Account:

| Subscription                                 | Plan             |
| -------------------------------------------- | ---------------- |
| SAP Business Application Studio              | standard         |
| Event Mesh                                   | standard         |
| Launchpad Service (Optional)                 | standard         |
| Continuous Integration & Delivery (Optional) | default          |
| Cloud Transport Management (Optional)        | saas-application |


## Setup & Configuration

### Step 1: [Identify APIs in API Business Hub](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/01-IdentifyAPIFromAPIBusinessHub.md)
### Step 2: [S/4HANA Enable OData Service for business partner](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/02-configure-oData-Service)
### Step 3: [Setup SAP BTP Environment](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/03-PrepareBTP)
### Step 4: [Configure Event Based Communication between S/4HANA and Event Mesh](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/04-SetupEventMesh)
### Step 5: [Create SAP HANA Cloud instance](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/05-SetupHANACloud)
### Step 6: [Setup connectivity between S/4HANA system, SAP BTP](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/06-CloudConnector)
### Step 7: [Configure Business Application Studio and Build/Deploy the CAP application ](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/07-ConfigureCAPApp)
### Step 8: [Test scenario End to End](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/08-TestApplication)
### Step 9: [Access and Discover Application Logs and Metrics](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/09-ApplicationLogging)
### Step 10: [Setup of Continuous Integration and Continuous Delivery (CI/CD) ](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/10-SetupCICD)
### Step 11: [Setup Cloud Transport Management ](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/11-SetupTMS)
### Step 12: [Setup Alert Notification ](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/12-SetupANS)
### Step 13 (optional): [Setup Application Autoscaler ](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/13-SetupAppAutoscaler)

## Download and Installation

## Known Issues
No known issues.
## How to obtain support

[Create an issue](https://github.com/SAP-samples/s4hana-btp-extension-devops/issues) in this repository if you find a bug or have questions about the content.
 
For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).

## Contributing

## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
