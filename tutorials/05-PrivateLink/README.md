# Safeguard key business processes with resilient applications on SAP BTP - SAP Private Link Service

In this section, you can find all the required steps for your Extension Application to use SAP Private Link Service to consume OData resources from the S/4HANA system located on **Azure** subscription. 
More details about [SAP Private Link Service ](https://blogs.sap.com/2022/06/22/sap-private-link-service-on-azure-is-now-generally-available-ga/).

In our use case, we are going to use the SAP Private Link service to communicate with an SAP S/4HANA system (or other SAP or non-SAP system running on a VM in your Azure account) privately from within SAP BTP Cloud Foundry without SAP Cloud Connector.

Having SAP Private Link will not require any more to expose the systems and communication through the internet and the whole traffic is secured by an internal hyperscaler network without any exposure. 

The current use case is describing an SAP S/4HANA extension, of course having a S/4HANA solution deployed on Azure.

![S/4HANA Extension using Private Link](images/s4-ext-privatelink-2.png)

## Architecture Description
With SAP Private Link service, Cloud Foundry applications running on SAP BTP with Microsoft Azure as an IaaS provider can communicate with Azure Private Link services via a private connection. 
This ensures that traffic is not routed through the public internet but stays within the Azure infrastructure.

This connection can be established by creating an Azure Private Link service that exposes a load balancer that routes traffic to the SAP S/4HANA system. This Azure Private Link service must then be used as the resource to which the SAP Private Link service connects. As soon as the connection is established successfully, the SAP Private Link service provides private DNS hostnames pointing to the Azure Private Link service.

![Private Link](images/private-link-2.png)

## Set Up SAP Private Link Service on SAP BTP

The Enhanced version of the Private link service is available on SAP BTP accounts running on Azure and should be enabled under your SAP BTP subaccount.

To be able to use the functionalities of the SAP Private Link service, you first need to set the entitlements in your subaccount.
On <code>SAP BTP Cockpit -> Entitlements</code>, the <code>Private Link Service</code> should be configured.

![BTP Sub Account](images/private-link-entitlements.png)

## Azure Private Link Service

Azure Private Link Service can be created only by using an Azure Load Balancer. 

**Very Important**:  [Azure Private Link Service is only supported on Standard Load Balancer.](https://docs.microsoft.com/en-gb/azure/private-link/private-link-service-overview#properties)

### Creation of Azure Load Balancer

As reference see below, where all properties should be yours, the only two properties have to remain unchanged:
- Type: Internal
- SKU: Standard

![Azure](images/azure-2.png)

Once created, navigate to it, under the <code>Settings -> Health probes</code>, health probes records should be added 
by clicking the <code>+ Add</code> button.

![Azure](images/azure-3.png)

For S/4HANA VM as health probe will serve port 22.

![Azure](images/azure-4.png)

Now is time to add Virtual Machines which will serve the load coming to the current load balancer.

Under the created load balancer, navigate to <code>Settings -> Backend pools</code>, a pools of virtual machines should be added
by clicking the <code>+ Add</code> button. 

![Azure](images/azure-5.png)

**Very Important**:  If Virtual Machine which is supposed to be added to the pool does have an associated Public IP,
then the Public IP should have the Standard SKU. Usually, VMs created using CAL do have Public IP on Basic SKU, 
so manually should be changed to Standard. 

Make sure that a pool has been created and Virtual Machine has been added.

![Azure](images/azure-6.png)

Under the <code>Settings -> Load balancing rules</code>, records should be added
by clicking the <code>+ Add</code> button. Two rules should be created having port and backend port 50000 & 44300 
using early create pool and health probe, as reference:

![Azure](images/azure-7.png)

After the status can be checked navigating <code>Monitoring ->Insights</code>, green status required.

![Azure](images/azure-8.png)

### Creation of Azure Private Link Service

A private link service is required to have a private link as an endpoint. 

Navigate to <code>Private Link Center -> Private link services</code> and add new one by clicking the <code>+ Add</code> button. 

![Azure](images/azure-9.png)

Specifying Basics information:

![Azure](images/azure-10.png)

Specifying Outbound information, by selecting an early created load balancer:

![Azure](images/azure-11.png)

**Very Important**:  Enable TCP V2 option should be on "No". 

At the end of wizard click on <code>Create</code> button.

![Azure](images/azure-12.png)

Once create the private link service click on it and look for <code>JSON View</code> link and click on it.

![Azure](images/azure-13.png)

Collect the resource id.

## Create the SAP Private Link Instance

Having the Private Link Service created on Azure and collected the Resource ID, 
ready to start the creation of a private link instance on SAP BTP.

Navigate to SAP BTP Cockpit, select the sub account, under the <code>Instances and Subscriptions</code>, 
click <code>Create</code> button.

![Azure](images/btp-2.png)

Select from a list of services the <code>Private Link Service</code> and give a name to the instance.

![Azure](images/btp-3.png)

Click the <code>Next ></code> button.

You will find a form where the "resourceId" field should have a value collected from Azure created Private Link Service Resource ID. 
Moreover, you can enter "Request Message" which is displayed to the approver on the Azure side.

![Azure](images/btp-4.png)

Click the <code>Create</code> button.

New instance of private link creation with status <code>Creation in Progress</code> will come up on SAP BTP instances list.

![Azure](images/btp-5.png)

To change the status to <code>Created</code>, an operation on the Azure portal is required.

Navigate to Azure Portal on <code>Private Link Center -> Pending connections</code>,
and awaiting connection to be approved, if no records wait by clicking the refresh button. 

![Azure](images/azure-14.png)

Once pending connection displayed, select it and click the <code>Approve</code> and <code>Yes</code> buttons. 
After some time the record will go away as approved.

Go back to SAP BTP Cockpit, and the private link instance should have green <code>Created</code> status.

![Azure](images/btp-6.png)

After successful creation, you can select the created instance and view created credentials. You can find there the generated set of private DNS hostnames which will be used in upcoming steps for the private communication. 

![PrivateLink hostname](images/btp-7.png)

 >   Although Private Link Service is a private tunnel, it is common to use Transport Layer Security (TLS) for security between applications. Private DNS hostname will allow issuing certificates based on an actual hostname for the connected resource and enables TLS connections with verified hostnames.

## Prepare Extension Application based on CAP (SAP Cloud Application Programming Model) for PrivateLink communication

There are a couple of steps required to enable the Private Link connection in the CAP Application. 

### Adapt Destination for PrivateLink Service - Configure the "BusinessPartner" destination

 * Open your SAP BTP Account and navigate to your Subaccount
 * Choose Connectivity in the menu on the left then choose Destinations
 * Modify the existing "BusinessPartner" or create a new destination and enter the following information into the Destination Configuration:

 Instead of using Proxy Type On-Premise for Cloud Connector connectivity, SAP introduced a new Proxy Type  **PrivateLink**. Choose that proxy type and enter the Private Link hostname from the previous step. 

 Finally, add **TrustAll=true** in Additional Properties **(We will change this property in later steps)**.

 > Note: If TrustAll is set to TRUE in the destination, the server certificate will not be checked for SSL connections. It is intended for test scenarios only, and should not be used in production (the server certificate will not be checked and you will not notice MITM attacks). 

An Example of Destination Configuration you can find below. 

![Destination with PrivateLink](images/btp-8.png)

### Destination config
Property | Value |
--- | --- |
Name | BusinessPartner |
Tyoe | HTTP |
URL | https://40a42b84-39bb-xxx-9729-287xxxxe72c.d0c0e029c004f9xxxx8eda0225a83xxxxxxaae23ff65b.p6.pls.sap.internal (replace with your PrivateLink hostname) |
Proxy Type | PrivateLink |
Authentication | BasicAuthentication |
User | <<  username >> |
Password | <<  password >> |

### Additional Properties
Property | Value |
--- | --- |
sap-client | 400 (or the client you want to connect to) |
TrustAll | true  (should not be used in production) |
HTML5.DynamicDestination | true |
WebIDEEnabled | true |
WebIDEUsage | odata_abap |

### Bind application to Private Link service

Upon the creation of a binding between a CF application and a private link service instance, the Private Link service creates a space-scoped Cloud Foundry application security group that enables network access to the IP address associated with the Private Endpoint. 

Open the MTA deployment descriptor and add the following PrivateLink resource to your MTA and assign it to *BusinessPartnerVerification-srv*

```json

modules:
  - name: BusinessPartnerVerification-srv
    type: nodejs
    path: gen/srv
    requires:
      - name: BusinessPartnerVerification-pl
      - ...

...

resources:
  # PrivateLink Service
  - name: BusinessPartnerVerification-pl
    type: org.cloudfoundry.existing-service
    parameters:
      service: privatelink 
      service-name: private-link-s4hana # change to your instance name
      service-plan: standard

```

### Redeploy the Application and Test it

Build the Multi-Target Application Archive (MTA Archive) by executing the following command in the root directory of your project in the terminal:

  ```
  mbt build
  ```

This will produce a .mtar file in the mta_archives directory. Some of the values for the service instance creation depend on the environment you are deploying to, that's why the *-e* for *extension* is used here. 

Deploy the application to SAP BTP, Cloud Foundry Runtime by executing the following command in the root directory of your project in the terminal:

  ```
  cf deploy mta_archives/BusinessPartnerVerification_1.2.0.mtar
  ```

This will trigger the deployment to SAP BTP, Cloud Foundry Runtime including the creation of the necessary service instances and service bindings to the corresponding services like PrivateLink. 

Try the application by creating new or modifying Business Partners as described [here](https://github.com/SAP-samples/s4hana-btp-extension-devops/tree/mission/08-TestApplication#test-basic-scenario-end-to-end).

## Setup end-to-end SSL

Instead of ignoring the server certificates by property TrustALL, for **Productive** scenarios we can upload the server certificate of the HTTPS server (in this case S/4HANA) in the Trust Store of Destination Service.

For the Scenarios where you have SAP WebDispatcher in front of your SAP S/4HANA System, you can configure SSL in SAP WebDispatcher. Please refer to the following [blog post](https://blogs.sap.com/2021/12/01/btp-private-linky-swear-with-azure-how-to-setup-ssl-end-to-end-with-private-link-service/)  

As you can remember, SAP Private Link service creates private DNS entries for Azure Private Link services. These entries can be used to issue TLS certificates so that connected systems can identify themselves.

 * **hostname** - the subdomain consists of service instance id and resource hash and is more stable for creating wildcard certificates. This will allow using the same certificate for multiple private link connections to the same Azure Private Link Service. 
 * **additionalHostname**  - is shorter due to the domain name length limitation of some certificate providers and can be used for those cases, but keep in mind that for every new instance that you create it may change.

### Configuring SSL for PrivateLink in S/4HANA System

1. Connect to your S/4HANA system using SSH 
    
    In this example, I'm connecting using keypair authentication by providing the **IdentityFile (-i)** (In case you are using CAL System, you can download it from CAL cockpit)

    ```
    ssh <user>@<hostname/IP> -i <IdentityFile>.pem 
    ```

2. Switch User to Admin

    ```
    su – <sid>adm  // e.g. s4hadm
    ```

3. Creating an additional PSE (Personal Security Environment) dedicated to the PrivateLink connections. (Optionally you can create a CA request as well in case you want to sign the certificate using the local certificate authority)
    
    >NOTE: The current approach is limited to self-signed certificates and public CAs cannot be used since the Private Link service has internal DNS names and CAs will not provide certificates for internal name

    In SAP NetWeaver PSE is a secure location where the public-key information of a user or component is stored. The SSL server PSE contains the security information of the application server that it needs to communicate using SSL as the server component. 

    With the command below you can create a new PSE called *SAPSSLS_PLINK.pse* by providing **Distinguished Name** which is the hostname of the PrivateLink service instance from SAP BTP. 

    > You can use following pattern: **"CN=< PrivateLink-Hostname >"**

    ```
    sapgenpse get_pse -p /usr/sap/S4H/D00/sec/SAPSSLS_PLINK.pse "CN=40a42b84-39bb-4f42-9729-28703961e72c.d0c0e029c004f9708f238eda0225a8309caac87824aa1aae23ff658b.p6.pls.sap.internal"
    ```
      
    >The above command will create the PSE file containing a self-signed certificate. Please refer to APPENDIX in case you want to sign the certificate with the local Certificate Authority (CA)

4. You can confirm with the following command that the PSE was successfully created
  
   ```
   sapgenpse get_my_name -p /usr/sap/S4H/D00/sec/SAPSSLS_PLINK.pse
   ```

5. Now after having the PSE file we can export the self-signed certificate to add it to the client application

   ```
   sapgenpse export_own_cert -p /usr/sap/S4H/D00/sec/SAPSSLS_PLINK.pse
   ```

6. Copy the certificate to a file and save it as **"plink_self_signed_cert.pem"**

   ![Copy Certificate](images/pemcert.png)

7. Set ICM Parameters and restart the application server

   We need to set a couple of parameters in ICM (Internet Communication Manager) to ensure that communication between the SAP NetWeaver Application Server and the outside world via HTTPS protocol works properly.
   
   * Sign-in into you S/4HANA System and open Transaction: **SMICM**
   * Open menu GoTo > Parameters > Change

    ```
    icm/server_port2 = PROT=HTTPS,PORT=44300,TIMEOUT=300,PROCTIMEOUT=7200,**SSLCONFIG=ssl_config_9**
    icm/ssl_config_9 = ID=ssl_config_9, CRED=SAPSSLS.pse,**SNI_CREDS=SAPSSLS_PLINK.pse**
    ```

   * *icm/server_port2* specifies for HTTPS port the SSL Configuration (in this example we named it **ssl_config_9**) 
   * *icm/ssl_config_9* controls the general SSL configuration, where we add the PrivateLink PSE (in this example **SNI_CREDS=SAPSSLS_PLINK.pse**)

  Restart the ICM to pull the changes (Navigate to Administration > ICM > Exit Hard > Global. The ICM restart message will appear. Select Yes.)

  >In case the changes in ICM cannot be set permanently you can use Transaction: RZ10, select the profile e.g. S4H_D00_VHCALS4HCI, and change these two parameters there.

### Configuring SSL for PrivateLink in SAP BTP Destination Service

* Go to SAP BTP Cockpit and open the "BusinessPartner" Destination which we previously configured.
* Remove the Additional Property **TrustAll=true** 
* Upload the certificate of S/4HANA System (**plink_self_signed_cert.pem**). See the Step 6 above.

  ![Upload Certificate](images/btp-10.png)

* Select the uploaded (**plink_self_signed_cert.pem**) in Trust Store Location and Save the destination.

  ![Destination with PrivateLink SSL](images/btp-11.png)

### Testing the scenario end-to-end

After successfully finishing the above-mentioned steps, the application will run like before but using Private Link connectivity.


## Appendix

### Instead of using a self-signed certificate, it is also possible to sign the certificate with the local Certificat Authority (CA)

>NOTE: In the current approach public CAs cannot be used since the Private Link service has internal DNS names and CAs will not provide certificates for internal name

1. Creating an additional PSE with certificate signing request

     ```
    sapgenpse get_pse -p /usr/sap/S4H/D00/sec/SAPSSLS_PLINK.pse -r /usr/sap/S4H/D00/sec/CA_REQUEST.csr "CN=40a42b84-39bb-4f42-9729-28703961e72c.d0c0e029c004f9708f238eda0225a8309caac87824aa1aae23ff658b.p6.pls.sap.internal"
    ```

2. Open the generated CA Signing Request **CA_REQUEST.csr** in an editor and copy (or copy directly) to your local file system. We will use the CA Signing Request in the next step to sign it.

    ```
    vim CA_REQUEST.csr 
    ```

3. Sign the certificate using the Certificate Signing Request from the previous step 

    With *OpenSSL* we can sign using CA and CAkey

    ```
    openssl x509 -req -in csr/plink/CA_REQUEST.csr -days 365 -CA trustedca.crt -CAkey trustedca.key -CAcreateserial -out plink_signed_cert.pem
    ```
  
    The CA response with a signed public-key certificate will be available with a filename **plink_signed_cert.pem** 

4. Importing the Certificate Request Response into our PrivateLink PSE

   The CA will send you a certificate request response that contains the signed public-key certificate. Once you have received this response (in this example **plink_signed_cert.pem** ), import it into the SAP NetWeaver's corresponding PSE (in this example **SAPSSLS_PLINK.pse**). 

   >Before importing, copy the Certificate Request Response (plink_signed_cert.pem) and RootCA Cert file (trustedca. pem) into your SAP NetWeaver System

   ```
    sapgenpse import_own_cert -c plink_signed_cert.pem -r trustedca.pem  -p SAPSSLS_PLINK.pse
   ```

   **-r** parameter is necessary if the CA root and any intermediate CA certificates are not included in the certificate request response

5. Add the root certificate (trustedca.pem) into the chain of the created certificate. (You can use any editor to add it).

    ```
    -----BEGIN CERTIFICATE-----
              ...
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
              ...
    -----END CERTIFICATE-----
    ```
    
6. Updload the certificate into Destination Service as described [here](#configuring-ssl-for-privatelink-in-btp-destination-service)

### Start Stop Application server
```
/usr/sap/hostctrl/exe/sapcontrol -nr 00 -function Stop
/usr/sap/hostctrl/exe/sapcontrol -nr 00 -function Start
```
