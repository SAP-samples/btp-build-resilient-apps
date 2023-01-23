# Create SAP HANA Cloud Instance 

This step is required for newly created SAP BTP subaccounts, e.g. created with Boosters where you don't have any SAP HANA Cloud instance yet. In case of existing subaccounts with an SAP HANA Cloud instance, you can skip this section. Just make sure that your SAP HANA Cloud instance is started. 

---

1. Open your **Subaccount** and go to the **Space**. 
   ![Navigate to the dev Cloud Foundry space within the subaccount](./images/navigate_space.png)

2. Navigate to the **SAP HANA Cloud** section in the side menu and create a new **SAP HANA database** instance.
   ![hana-cloud](./images/hanacloud1.png)

3. It will route you to **SAP HANA Cloud Central**. Select **SAP HANA Cloud, SAP HANA Database** and continue with **Next Step**.
   ![hana-cloud](./images/hanaCloudCentral.png)

4. Provide an **Instance Name**. Additionally set the password for the DBADMIN user and continue with **Next Step**.
    > The DBADMIN password is very important and you will most likely needed it again, so make sure that you don't forget it. 
   ![hana-cloud](./images/hanaCloudGeneral.png)

5. Keep the default **Database Memory size** and continue with **Next Step**. Also, skip the _SAP HANA Database Availability Zone and Replicas_ settings and continue with **Next Step**.

6. **Allow all IP addresses** to you SAP HANA database instance (allowed connections) and continue with **Review and Create**. 
   > this setting might be different in productive scenarios depending on your security requirement. 
   ![hana-cloud](./images/hanaDatabaseAdvanced.png)
    
7.  Review the selections and finish the configuration with **Create Instance**.
   ![hana-cloud](./images/hanaCloudCreateInstance.png)
    
8.  The creation of your SAP HANA Cloud instance might take a few moments and will then appear in the list of instances. 
   ![hana-cloud](./images/hanaCloudRunning.png)

---

Congratulations! You have successfully setup up the SAP HANA Cloud database instance so that you can use it for the example application using the SAP Cloud Application Programming Model but also for other purposes. 
