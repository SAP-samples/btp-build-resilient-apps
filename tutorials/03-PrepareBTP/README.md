# Prepare and configure your SAP Business Technology Platform Enterprise environment with the help of boosters

## Introduction

You will now prepare your SAP Business Technology Platform (Enterprise) account, configure the needed entitlements and configure your account for the subsequent steps of this extension scenario.

> Note : In case you are using the SAP Business Technology Platform Trial, please follow these manual steps to [prepare and configure the account](../03-PrepareBTPTrial/README.md)

### Prepare your SAP Business Technology Platform Enterprise Account

1. Go to [SAP Business Technology Platform Cockpit](https://cockpit.eu10.hana.ondemand.com). 
2. Navigate to **Boosters**.
3. Search for 'Prepare an Account for Developing Extension Applications' (This booster is not available for the SAP BTP Trial account, please follow the manual steps to [setup the trial account](../03-PrepareBTPTrial/README.md))
   ![Search Booster](./images/booster1.png)

4. Click on the tile and chosse the **Start** button to start the creation of your account.
   ![Start Booster](./images/booster2.png)

5. Check if you fulfill all prerequisites and select **Next**.
   ![Check Booster](./images/booster3.png)

   - In case you see **WARNING**, it means _some optional services_ are not entitled in your global account. You can create the account, but without missing services
   - In case you see **ERROR**, it means _some mandatory services_ are missing and you need to check your global account entitlements 
   - In case you see **DONE**, it means _all necessary services_ are entitled and you can continue with next step
   
6. On the next screen you can set up your Subaccount: 
    - Configure the Entitlements
    - Remove: XFS Runtime and Extension Center
    - Add 1 Quota to Application Autoscaler
   ![Setup Services](./images/booster5.png)

    - Enter Subaccount name - eg: "Development"
    - You can edit the smaller org name, space name (optional)
    
7. Select **Next**.

   ![Enter name](./images/booster4.png)

8. On the next screen you can add your needed Users:
 - Enter email addresses of the SAP BTP account you want to assign the **Administrator** Role Collection.
 - Enter email addresses of the SAP BTP account you want to assign the **Developer** Role Collection.
 
9. Select **Next**.

 ![Add Users](./images/booster10.png)

10. After you reviewed your account click on *Finish* 
   ![Review Account](./images/booster6.png)

11. To navigate to the subaccount, click on the subaccounts name. 

12. Navigate to *Entitlements* and select on *Configure Entitlements*.
   ![Configure Entitlements](./images/booster7.png)

13. Choose *Add Service Plans*.
   ![Add Service Plans](./images/booster8.png)

14. Search for **HANA** and select **SAP HANA Cloud**.

15. Click on the checkbox below *Available Plans* for HANA.
   ![Add Service Plan](./images/booster9.png)

16. Search for **Alert Notification** in the pop-up window and select **Alert Notification**.

17. Click on the checkbox below *Available Plans* for standard.

18. Click on *Add 2 Service Plan* and **save** the changes.
   ![Add Service Plan](./images/booster11.png)

--- 

Congrats! You can now continue with setting up your SAP HANA Cloud instance - Step 4.
