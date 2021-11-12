# Configure event based communication between S/4 and SAP Event Mesh
## Introduction

In this how to guide, you will establish a connection between your S/4HANA on premise System (2020) and SAP Event Mesh. This connection is needed to transport events from the SAP S/4HANA system to to the SAP Cloud Application Programming Model application. 

If you are using an S/4HANA 1909 (or older version), please follow the following instruction to setup a connection to the SAP Event Mesh service: https://help.sap.com/viewer/810dfd34f2cc4f39aa8d946b5204fd9c/1909.latest/en-US/fbb2a5980cb54110a96d381e136e0dd8.html

**Persona:** S/4HANA Developer

### Configure Endpoint

1. Open your browser and navigate to your subaccount in the SAP BTP Cockpit. 
2. Click on *Instances & Subscriptions* in the menu on the left.
   

 ![Click on Instances and Subscriptions](./images/instances.png)

3. Scroll to the Instances tab, and look for Event Mesh in the table. Now click on the 3 dots to open the dropdown and choose 'Create Serive Key'

 ![Open Event Mesh Instance](./images/service-key-creation.png)

5. Provide a service key name e.g. EMServiceKey. Click on create.

 ![create key](./images/EventBased2.png)

6.  Click on your created Service Key to open the detail view

 ![open key](./images/open-servicekey.png)

7. Make sure you have the right service key opened. Click **Copy JSON** to copy the entire service key content. 

 ![Token Endpoint](./images/copy-key-json.png)
  ### Configure Channel

 1. Open your S/4 HANA system and navigate to the transaction */IWXBE/CONFIG*
 2. Click on *via Service Key*

 ![Configure Channel](./images/EventBased4.png)

 3. In the popup choose a *channel name* e.g. 'S4EM', provide a description and paste the *Service Key* you have created in the ealier steps. 

 ![Configure Channel](./images/eventmesh-trial.png)
> **IMPORTANT:** 
>
> - If you are using SAP Event Mesh in the SAP BTP Trial environment: please provide the highlighted namespace ("tfe/bpem/em", including the semicolon at the end of the line) manually after pasting the service key content. It needs to be exactly the mentioned namespace, as this defines the exact topic/queue names the SAP Cloud Application Programming Model application is expecting.
> - If you are using SAP Event Mesh from a productive SAP BTP account, just paste the copied service key content without adding the namespace manually. (this should already be part)
 4. Then click on *save configuration*

 5. After your configuration is saved, click on the *Activate - Deactivate* button.

    > Note: In case of errors, Please [import Certificate](#importing-the-certificate)

 6. Click on *Check connection* to check that everything is fine with the configuration.
> Troubleshooting: In case of errors, please have a look at the following blog post: https://blogs.sap.com/2020/08/27/enterprise-event-enablement-troubleshooting/

 7. Then click on *Outbound Bindings* to start the configuration

  ![Go to Outbound bindings](./images/outbound-bindings.png) 


 8. In the next screen, first click on *Create*.

  ![Create outbound binding](./images/create-outbound-binding.png) 

 9.  Use the F4 help to look for the **BusinessPartner** topics. Select **BusinessPartner/*** to get all events related to BusinessPartners. (the wildcard enables all BusinessPartner related events such as "Created" or "Changed" )

 ![Create outbound binding](./images/topic-filter.png) 

10. Finish the setup and **Save**. 

  ![Create outbound binding](./images/finish-outbound-binding.png) 

> the topic name in SAP Event Mesh is effectively a combination of the namespace you have provided within the service key ("tfe/bpem/em") concatenated with the actual topic name you have selected in this step. Hence, the resulting topic name is: *tfe/bpem/em/sap/s4/beh/businesspartner/v1/BusinessPartner/*. 

## Appendix

### Importing The Certificate 

1. Open **SAP BTP cockpit**  and go to Subaccount Overview and Click on **API Endpoint**

   ![import-certificate](./images/importCertificate1.png)

2. Click on **Connection is Secure**

   ![import-certificate](./images/importCertificate2.png)

3. Click on **Certification is Valid**

​    ![import-certificate](./images/importCertificate3.png)

4. Go to **Certificate Path** and click on Certificate and Click **View Certificate**

   ![import-certificate](./images/importCertificate4.png)

5. Then Click on **Details** and **Copy to File** and Click **Next**

   ![import-certificate](./images/importCertificate5.png)

6. Select **Base 64 Encoded X.509(.cer)**  and Click **Next** Specify Filename and save.

   ![import-certificate](./images/importCertificate6.png)

7. Open S/4 Hana System and Login

8. Open **STRUST** Transaction 

   ![import-certificate](./images/importCertificate7.png)

9. Import Certificate under **SSL Client SSL Client(standard)** 

   ![import-certificate](./images/importCertificate8.png)

   > Note: In case of Errors, Please add the certificate to **SSL client SSL Client(Anonymous)** also

10. Click on **Import Certificate** button

    ![import-certificate](./images/importCertificate9.png)

11. After importing Certificate Click on **Add to Certificate List** and Save It.

    ![import-certificate](./images/importCertificate10.png)