# Setup Cloud Transport Management Service

As soon as you have a release candidate of your app version in form of a fully qualified archive, you want to propagate it towards your production subaccount.
You can do it either fully automated as part of a pipeline – ideally based on the Continuous Integration best practices or pipeline templates or with a standardized, enterprise-ready change management process, if you desire more control especially of your production environment – using our cloud-based SAP Cloud Transport Management service. 

In this extension usecase we will show how to combine Continuous Integration & Transport Management
It will show the best of both worlds (with a combination of CI and transport management).

We can differeciate 
  * A *development* landscape, based on **Continuous Integration** principles and used to verify single developer changes by an automated pipeline and
  * A *delivery* landscape, based on strict **transport management rules** (such as policies, schedules and roles) and used to verify release candidate versions, where propagation towards production is typically done with manual confirmation)

![Development and Delivery landscape](images/tms1.png)

> Note, this is not possible to run on **BTP trial** landscape due to limited quote for having multiple subaccounts. 

> Prerequisites: make sure that you have 3 subaccounts (Dev, QA/Pre-Prod, Prod) to successfully execute the transport and release. Additionally to *Dev* Subaccount, create QA and Prod Subaccounts with sufficient Quota to deploy the application.

For more details, see appendix:
  - [Share HANA Cloud instance with other Subaccounts](#share-hana-cloud-instance-with-other-subaccounts)
  - [Required Quotas for QA and PRDO Subaccounts](#required-quotas-for-qa-and-prdo-subaccounts)

Before we can combine both services, we need to setup Cloud Transport Management. The required steps are described below:

> Note, in case you used at the beginning of the mission the **booster** to setup the account, you can skip first 2 Steps, it's done by booster automatically.

1. Enable/Subscribe to SAP Cloud Transport Management (Optional - in case you used Booster)
  

   - In the subaccount, choose Services > Service Marketplace.
   - The entitled subscriptions are shown.
   - Search for Cloud Transport Management
   - On the Cloud Transport Management tile, choose (Actions)and Create.
   - In the subsequent dialog, the Cloud Transport Management service is preselected. Select the saas-application plan and create.

   ![Create TMS](images/tms2.png)

2. Assign User Roles and Permissions in Cloud Transport Management (Optional - in case you used Booster)

    After successful subscription, you need to configure user access to the application. You need different role collections for the different Cloud Transport Management roles, and assign roles to the role collections based on the application templates. Afterwards, you assign the role collections to users or user groups.

   - Create 2 role collections for the Cloud Transport Management
      * TMS Import Operator
      * TMS Admin

   - To create a new role collection, in your subaccount, choose Security  Role Collections.
   - Choose ... (Create New Role Collection).
     
     ![TMS Role Collection](images/tms3.png)

   - Enter a name (*TMS Import Operator*) for the new role collection, and choose Create. 
     
     ![TMS Role Collection](images/tms4.png)

   - Repeat the previous steps to create the *TMS Admin* role collection.
   - The new role collections are added to the list.
     
     ![TMS Role Collection](images/tms5.png)

   - In your subaccount, choose Services  > Instances and Subscriptions.
  
     ![TMS Role Collection](images/tms6.png)
    
   - On the Subscriptions tab, in the Cloud Transport Management row, choose ... (Actions) and Manage Roles.
  
     ![TMS Role Collection](images/tms7.png)

   - The default role templates are displayed
  
     ![TMS Role Collection](images/tms8.png)
  
   - Assign the  Cloud Transport Management roles to the role collections
     * ImportOperator > TMS Import Operator
     * Administrator > TMS Admin
  
     ![TMS Role Collection](images/tms9.png)
   
   - Assign Role Collections (TMS Import Operator & TMS Admin) to your user
     
     ![TMS Role Collection](images/tms11.png)


3. Configuring the Landscape
   Before you can use SAP Cloud Transport Management to transport cloud applications or application content between different subaccounts, you must configure your landscape for transports.
   Following steps are required to setup the landscape
   * Create Transport Destinations
   * Use the Transport Landscape Wizard
   
   Follow the next steps to configure the transport landscape

4. Create Transport Destinations
   
   In SAP Cloud Transport Management, transport destinations are used to address the target end point of a deployment process.

   - Go to Subaccount where you activated the Cloud Transport management
   - Create 2 Destinations pointing to QA/Pre-Prod and Prod Subaccuonts
  
    | Destination  | URL                                                                                         | Authentication       | User/Password                             |
    | ------------ | ------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------- |
    | **TMS-QA**   | https://deploy-service.cfapps.< default-domain >/slprot/< myorg-qa >/< myspace-qa >/slp     | Basic Authentication | username & password of the technical user |
    | **TMS-PROD** | https://deploy-service.cfapps.< default-domain >/slprot/< myorg-prod >/< myspace-prod >/slp | Basic Authentication | username & password of the technical user |

    ![TMS Destinations](images/tms12.png)

    > Instead of Basic Authentication, it is also possible to use OAuth2Password Authentication. More details can be found [here](https://help.sap.com/viewer/7f7160ec0d8546c6b3eab72fb5ad6fd8/Cloud/en-US/c9905c142cf14aea86fe2451434faed9.html)

5. Use the Transport Landscape Wizard
   
   You can use the Transport Landscape Wizard to configure the transport nodes and transport routes of simple transport landscapes.

   - Open SAP Cloud Transport Management 
   - 'Go to Application' link is available that allows you to start the user interface of SAP Cloud Transport Management, as shown in the image below:
  
    ![TMS Start](images/tms10.png)

   - Start the Landscape Wizard.
   - Choose Two-Node Landscape (QA/Pre-Prod and Prod) and go to next step.
   > Reminder: 2 Nodes, since **Dev** Node/Subaccount is part of Development Landscape and is delivered by CI.

    ![TMS Wizard](images/tms13.png)

   - Provide the details of Nodes:
  
    | Node   | Name | Allow Upload | Forward Mode | Content Type     | Destination |
    | ------ | ---- | ------------ | ------------ | ---------------- | ----------- |
    | Node 1 | QA   | true         | Auto         | Multi-Target App | TMS-QA      |
    | Node 2 | PROD | false        | Auto         | Multi-Target App | TMS-PROD    |
  
   - Give a name for the transport route: **route_qa_prod**
    
    ![TMS Wizard](images/tms14.png)
  
   - After successfully finishing the step, you will find the newly defind Nodes in **Landscape Visualization**

   ![TMS Landscape Visualization](images/tms15.png)

6. Connecting Cloud Transport Management to our CI/CD Pipeline
   
   Follow the next steps to connect the CI/CD Pipeline to Cloud Transport Management

   ![Development and Delivery landscape](images/tms1.png)

7. Create Service Instance of Cloud Transport Management
   
   - Go to "Instances and Subscriptions" and create new service instance of **Cloud Transport Management** Service Plan: **standard**

   ![TMS Instance](images/tms16.png)

   - Create **Service Key** (name: tms-service-key)

   ![TMS Service Key](images/tms17.png)

   - View the Credentials of the service key and copy the JSON

   ![TMS Service Key](images/tms18.png)

8. Create TMS Credentials in SAP Continuous Integration and Delivery Service
    
  - Open CI/CD Service and go to "Credentials" Tab
  - Create new credential by clicking on "+"
  
    ![CI/CD TMS Credential](images/tms19.png)

  - Give a name for credential: **"tms"**
  - Choose as a Type: **"Cloud Foundry Service Key"**
  - Past the copied JSON from previous step and create the credential

    ![CI/CD TMS Credential](images/tms20.png)

8. Activate the "Upload to TMS" in our pipeline step
   
   - Go to Business Application Studio and open the project source code
   - Open Pipeline configuration: *.pipeline > config.yml* 
   - To upload the artifact to SAP Cloud Transport Management, set this parameter to true in release stage
      ```bash
        tmsUpload: true  
        ```
   - Comment out following code snippet 
        ```bash
        tmsUpload:           
        nodeName: 'QA'
        credentialsId: 'tms'
        customDescription: 'TMS Upload'
        ```
   - Where *nodeName* is the QA Node defined in Cloud Transport Management, *credentialsId* is the credential name defined in CI/CD Service

9. Push the pipeline changes into Github
      ```bash
      git add .
      git commit -m "Pipeline upload to TMS"
      git push
      ```

10. Changes in Github will trigger a Run of the CI/CD service
    
    ![CI/CD build](images/tms21.png)

11. Import queue of Cloud Transport Management
    
    After Pipeline finishes the steps (Build > Test > Deploy to Dev >Upload TMS), we will find the build results (MTAR) in Cloud Transport Management **queue of QA Node**
    
    - Open Cloud Transport Management and go to **QA** Node
    - You will find one entry in a queue with name TMS Upload which is the MTAR archive created by CI/CD Service

      ![QA queue](images/tms22.png)

12. Import the changes to QA Subaccount
    
    - Check the the content details dor this transport request
    ![QA content](images/tms24.png)
    - Select the entry and press in **"Import Selected"**
    - After Approval, it will run a deployment to QA Subaccount and forward the MTAR to PROD Node
  
      ![QA content](images/tms23.png)

    - Meanwhile the deployment is running, you can check the **Logs** of this transport entry. In case of issues during the deployment, you can find the details of failure in this log.

      ![QA import log](images/tms25.png)

    - After finishing the import you will find the Application deployed in your **QA Subaccount**


  >Additionally to manual import, you can schedule automatic deployment based on defined schedule. E.g. Every week on certain day and time.

  ![Schedule import ](images/tms26.png)


13. Similarly you can import to PROD subaccount from **queue of PROD Node**.
    
    - Repeat the step 12 for PROD Node


## Appendix
### Required Quotas for QA and PRDO Subaccounts

For each Subaccount following entitlements are required

| Service                           | Plan        | Number of instances |
| --------------------------------- | ----------- | ------------------- |
| Connectivity                      | lite        | 1                   |
| Destination                       | lite        | 1                   |
| HTML5 Application Repository      | app-host    | 1                   |
| Event Mesh                        | default     | 1                   |
| Application Logging               | lite        | 1                   |
| Authorization & Trust Management  | application | 1                   |
| SAP HANA Schemas & HDI Containers | hdi-shared  | 1                   |
| Cloud Foundry runtime             |             | 1GB                 |



### Share HANA Cloud instance with other Subaccounts

Here you can find the required steps to share you HANA Cloud instance with other subaccounts

1. Open **SAP HANA Cloud Central**
   
   ![ HANA ](images/hana01.png)

2. Open the running HANA Instance
   
   ![ HANA ](images/hana02.png)

3. Share the instance with your QA and PROD subaccounts
   
   ![ HANA ](images/hana03.png)
