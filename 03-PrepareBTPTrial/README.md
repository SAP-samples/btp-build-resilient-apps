# Prepare and configure your SAP Business Technology Platform environment

## Introduction

You will now prepare your SAP Business Technology Platform (Trial) account, configure the needed entitlements and configure your account for the subsequent steps of this extension scenario.

#### Event Mesh Setup

1. Log in to SAP BTP Account on https://hanatrial.ondemand.com

2. Navigate to the subaccount you want to use and go to **Service Marketplace**. 

   ![Prepare-Configure](./images/trail/prepAndConfig1.png)

3. Click on _Actions_ button and Choose **Create**. 

   ![Prepare-Configure](./images/trail/prepAndConfig2.png)

4. Choose the **Standard** plan. 

   ![Prepare-Configure](./images/trail/prepAndConfig3.png)

5. Click on **Create**. 

6. Wait until the subscription has been created.

   ![Prepare-Configure](./images/trail/prepAndConfig4.png)

7. You can use **View Subscription** to get a more detailed view about the created subscription.

   ![Prepare-Configure](./images/trail/prepAndConfig5.png)

8. Go to **Security > Role Collections** in the side menu. 

   ![Prepare-Configure](./images/trail/prepAndConfig6.png)

9.  Click on **"+"** button to create a new Role Collection. 

    ![Prepare-Configure](./images/trail/prepAndConfig7.png)

10. Provide _Extension Developer_ as the name for the new Role Collection and click **Create**.

    ![Prepare-Configure](./images/trail/prepAndConfig8.png)

11. Search for _Extension Developer_ and click on it to open the Details View. 

    ![Prepare-Configure](./images/trail/prepAndConfig9.png)

12. **Edit** the Role Collection. 

    ![Prepare-Configure](./images/trail/prepAndConfig10.png)

13. Search for available Roles via clicking on the icon next to the role input field. 

![Prepare-Configure](./images/trail/prepAndConfig11.png)

15. Search for _"Manage Role"_ and select it. 

![Prepare-Configure](./images/trail/prepAndConfig12.png)

16. Search for _"Test Role"_, select it and click **Add**. .

#### Cloud Transport Management Setup

1. In the **Instances and Marketplace** search for **Cloud Transport Management **
2. Click on Actions button and choose Create

​     ![Prepare-Configure](./images/trail/prepAndConfig13.png)

3. Select **Standard** Plan and click Create

   ![Prepare-Configure](./images/trail/prepAndConfig14.png)

4. In **Security** Tab Select **Role Collections** and search for _Extension Developer_

   ![Prepare-Configure](./images/trail/prepAndConfig15.png)

5. Go to **Edit** Mode and Click on **Select** Tab

 ![Prepare-Configure](./images/trail/prepAndConfig16.png)

6. Search For _Administrator ( alm-ts!t1603 ), ImportOperator and  ExportOperator_ Roles and Assign it. 

   > Note: Search for Application Identifier which starts with _"alm-ts"_

   ![Prepare-Configure](./images/trail/prepAndConfig18.png)

7.After saving it roles are update. Below Image Depicts it.

![Prepare-Configure](./images/trail/prepAndConfig19.png)

#### Continuous Integration & Delivery Setup

1. Go to **Service Marketplace** and search for  **Continuous Integration & Delivery** and click on **Create** from Actions Tab.

   ![Prepare-Configure](./images/trail/prepAndConfig20.png)

2. Select **Trail** as Plan and click on _Create_

   ![Prepare-Configure](./images/trail/prepAndConfig21.png)

3. It should be visible in **Subscriptions** Tab.

4. Go to **Role Collections** from **Security** Tab in the Menu, Search for _Extension Developer_ And open it in _Edit_ Mode. Click on **Select** Tab and Search For _Administrator_ Role and select it. 

   > Note: For Continuous Integration and Delivery the Application Identifier starts with **"cicdservice"**

   ![Prepare-Configure](./images/trail/prepAndConfig22.png)

4. Repeat the same for _Developer_ Role as well and then click on **add**. **Save** it.

​     ![Prepare-Configure](./images/trail/prepAndConfig23.png)  

#### Launchpad Service Setup

1. Click on **Service Marketplace**, Search for Launchpad Service and Click on **Create** from Actions

   ![Prepare-Configure](./images/trail/prepAndConfig24.png)

2. Select the **Plan** as **Standard**

   ![Prepare-Configure](./images/trail/prepAndConfig25.png)

3. Subscription should be visible in **Instances and Subscriptions**

4. Go to **Role Collections** from **Security** Tab in the Menu, Search for _Extension Developer_ And open it in _Edit_ Mode. Click on **Select** Tab and Search For _Mobile Admin_ Role and select it. 

   ![Prepare-Configure](./images/trail/prepAndConfig26.png)

5. Click on **Add** and **Save** it.

#### SAP Business Application Studio Setup

1. Click on **Service Marketplace**, Search for SAP Business Application Studio and Click on **Create** from Actions

   ![Prepare-Configure](./images/trail/prepAndConfig27.png)

2. Select the **Plan** as **trail**

   ![Prepare-Configure](./images/trail/prepAndConfig28.png)

3. Subscription should be visible in **Instances and Subscriptions**
4. Go to **Role Collections** from **Security** Tab in the Menu, Search for _Extension Developer_ And open it in _Edit_ Mode. Click on **Select** Tab and Search For _Administrator_ Role and select it. 

![Prepare-Configure](./images/trail/prepAndConfig29.png)

5. Search For _Developer_ and Select it and Click on **Add** button

![Prepare-Configure](./images/trail/prepAndConfig30.png)

6. Then **Save** it.

#### Adding Role Collections to Users

1. Go to **Role Collections** From **Security** Tab.

   ![Prepare-Configure](./images/trail/prepAndConfig31.png)

2. Search for _Extension Developer_ Role collections and open in **Edit** Mode. Switch to **User** tab.

   ![Prepare-Configure](./images/trail/prepAndConfig32.png)

3. Enter The Email Address in **ID** and Click on **"+"** to add Email.

![Prepare-Configure](./images/trail/prepAndConfig33.png)

4. Click on **Save** to save it.

   ![Prepare-Configure](./images/trail/prepAndConfig34.png)

SAP BTP environment has been successfully configured.