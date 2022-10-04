# Enhance core ERP business processes with resilient applications on SAP BTP - Integrate SAP business process workflows

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/btp-build-resilient-apps)](https://api.reuse.software/info/github.com/SAP-samples/btp-build-resilient-apps)

## Business Scenario

A business scenario is used to showcase how to build an extension application for a process on an SAP S/4HANA on-premise system using SAP Business Technology Platform. The scenario in a nutshell:

John who is an employee of Business Partner Validation Firm iCredible, which is a third-party vendor of ACME Corporation would like to get notifications whenever  Business Partners are created/updated in the SAP S/4HANA backend system of ACME Corporation. John would then be able to review the Business Partner details in his extension app on the SAP Business Technology Platform. He would proceed to visit the Business Partner’s registered office and do some background verification. John would then proceed to update/validate the verification details into the extension app. Once the details are verified, the Business Partner gets activated in the SAP S/4HANA system of ACME Corporation. 

This means:

- You will deploy a custom extension application on SAP Business Technology Platform that works independently from the SAP S/4HANA system

- Changes in the SAP S/4HANA system are communicated via events in real time to the extension application

- The Vendor personnel only needs access to the extension application and not to SAP S/4HANA


### Solution Diagram

![solution diagram](./tutorials/documentation/s4ext-workflow.png)

The Business Partner Validation application is developed using the SAP Cloud Application programming Model (CAP) and runs on the SAP BTP, Cloud Foundry runtime. It leverages platform services like SAP Event Mesh, SAP HANA Cloud and the SAP Private Link service. Whenever a change in the SAP S/4HANA on-premise system occurs, an event on SAP Event Mesh is triggered. The CAP application on SAP BTP will asynchronously consume the event and process the payload. This means, some additional data is read using OData APIs from the SAP S/4HANA on-premise backend and stored in SAP HANA Cloud on SAP BTP to be independent from the actual SAP S/4HANA system. In case of changes, the SAP Cloud Application Programming Model is again used to write data back into the SAP S/4HANA system. In case a the block status of a Business Partner should get changed, the corresponding regional manager needs to approve first. SAP Workflow Management is the tool to orchestrate the approvals.

## Requirements
The required systems and components are:

- SAP S/4HANA on-premise system.
- SAP BTP account

Entitlements/Quota required in your SAP Business Technology Platform Account:

| Service                            | Plan        | Number of instances |
| ---------------------------------- | ----------- | ------------------- |
| Connectivity                       | lite        | 1                   |
| Destination                        | lite        | 1                   |
| HTML5 Application Repository       | app-host    | 1                   |
| Event Mesh                         | default     | 1                   |
| Application Logging                | lite        | 1                   |
| Authorization & Trust Management   | application | 1                   |
| SAP HANA Schemas & HDI Containers  | hdi-shared  | 1                   |
| SAP HANA Cloud                     |             |                     |
| Cloud Foundry runtime              |             |                     |
| Application Autoscaler             | standard    | 1                  |
| Workflow             | lite / standard    | 1                   
| Business Rules             |lite / internal   | 1                   |


Subscriptions required in your SAP Business Technology Platform Account:

| Subscription                      | Plan             |
| --------------------------------- | ---------------- |
| SAP Business Application Studio   | standard         |
| Event Mesh                        | standard         |
| Launchpad Service                 | standard         |
| Continuous Integration & Delivery | default          |
| Cloud Transport Management        | saas-application |
| Workflow Management        | saas-application |


## Setup & Configuration

- Step 1: [Identify APIs in API Business Hub](./tutorials/01-IdentifyAPIFromAPIBusinessHub.md)
- Step 2: [S/4HANA Enable OData Service for business partner](./tutorials/02-configure-oData-Service)
- Step 3: [Setup SAP BTP Enterprise Environment](./tutorials/03-PrepareBTP)
- Step 4: [Create SAP HANA Cloud instance](./tutorials/04-SetupHANACloud)
- Step 5: [Setup connectivity between S/4HANA system, SAP BTP - SAP Cloud Connector](./tutorials/05-CloudConnector)
- Step 6: [Setup SAP Workflow for approving or rejecting a Business Partner](./tutorials/06-configureWorkflow)
- Step 7: [Configure Business Application Studio and Build/Deploy the CAP application ](./tutorials/07-ConfigureCAPApp)
- Step 8: [Configure Event Based Communication between S/4HANA and Event Mesh](./tutorials/08-SetupEventMesh)
- Step 9: [Test scenario End to End](./tutorials/09-TestApplication)

## How to obtain support

[Create an issue](https://github.com/SAP-samples/<repository-name>/issues) in this repository if you find a bug or have questions about the content.
 
For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).

## Contributing

If you wish to contribute code, offer fixes or improvements, please send a pull request. Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses the standard DCO text of the Linux Foundation.

## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
