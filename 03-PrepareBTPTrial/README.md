# Prepare and configure your SAP Business Technology Platform (Trial) environment

## Introduction

You will now prepare your SAP Business Technology Platform (Trial) account for the subsequent steps of this extension scenario.

#### Create Role Collection to assign the required roles for this mission 

1. Log in to SAP BTP Account on https://hanatrial.ondemand.com

2. Go to **Security > Role Collections** in the side menu

   ![Prepare-Configure](./images/trail/prepAndConfig6.png)

3.  Click on **"+"** button to create a new Role Collection. 

   ![Prepare-Configure](./images/trail/prepAndConfig7.png)

4. Provide _Extension Developer_ as the name for the new Role Collection and click **Create**.

   ![Prepare-Configure](./images/trail/prepAndConfig8.png)

#### Event Mesh Setup

1. Navigate to the **Service Marketplace**. 

   ![Prepare-Configure](./images/trail/prepAndConfig1.png)

2. Click on _Actions_ button and Choose **Create**. 

   ![Prepare-Configure](./images/trail/prepAndConfig2.png)

3. Choose the **Standard** plan. 

   ![Prepare-Configure](./images/trail/prepAndConfig3.png)

4. Click on **Create**. 

5. Wait until the subscription has been created.

   ![Prepare-Configure](./images/trail/prepAndConfig4.png)

6. You can use **View Subscription** to get a more detailed view about the created subscription.

   ![Prepare-Configure](./images/trail/prepAndConfig5.png)

7. Go to **Security > Role Collections** in the side menu and select the _Extension Developer_ Role Collection. 

   ![Prepare-Configure](./images/trail/prepAndConfig15.png)

8. **Edit** the Role Collection. 

   ![Prepare-Configure](./images/trail/prepAndConfig10.png)

9. Search for available Roles via clicking on the icon next to the role input field. 

![Prepare-Configure](./images/trail/prepAndConfig11.png)

10. Search for _"Manage Role"_ and select it. 

![Prepare-Configure](./images/trail/prepAndConfig12.png)

11. Search for _"Test Role"_, select it and click **Add**. .

#### Cloud Transport Management Setup

1. Go to **Services > Service Marketplace** in the side menu and search for **Cloud Transport Management**. 
   
2. Click on _Actions_ button and choose **Create**.

​  ![Prepare-Configure](./images/trail/prepAndConfig13.png)

3. Select **Standard** Plan and click **Create**.

   ![Prepare-Configure](./images/trail/prepAndConfig14.png)

4. Go to **Security > Role Collections** in the side menu and select the _Extension Developer_ Role Collection. 

   ![Prepare-Configure](./images/trail/prepAndConfig15.png)

5.  **Edit** the Role Collection and search for available Roles via clicking on the icon next to the role input field. 

   ![Prepare-Configure](./images/trail/prepAndConfig16.png)

6. Search for _Administrator ( alm-ts!t1603 ), ImportOperator and  ExportOperator_ Roles and click **Add** to save the changes. 

   > Note: Search for Application Identifier which starts with _"alm-ts"_ to only get roles for the Cloud Transport Management service displayed. 

   ![Prepare-Configure](./images/trail/prepAndConfig18.png)

7. The Role Collection should now have the following roles: 

   ![Prepare-Configure](./images/trail/prepAndConfig19.png)

#### Continuous Integration & Delivery Setup

1. Go to **Services > Service Marketplace** in the side menu and search for **Continous Integration & Delivery**. Click on _Actions_ button and choose **Create**.

   ![Prepare-Configure](./images/trail/prepAndConfig20.png)

2. Select **trial** as plan and click on **Create**.

   ![Prepare-Configure](./images/trail/prepAndConfig21.png)

3. The **Continous Integration & Delivery** subscription should now appear in the **Instances & Subscriptions** view. 

4. Go to **Security > Role Collections** in the side menu and select the _Extension Developer_ Role Collection.  **Edit** the Role Collection and search for the **Administrator** role via clicking on the icon next to the role input field. 

   > Note: For Continuous Integration and Delivery the Application Identifier starts with **"cicdservice"**

   ![Prepare-Configure](./images/trail/prepAndConfig22.png)

5. Repeat the same for _Developer_ Role as well and then click on **add**. Don't forget to **Save** the Role Collection.

​  ![Prepare-Configure](./images/trail/prepAndConfig23.png)  

#### Launchpad Service Setup

1. Go to **Services > Service Marketplace** in the side menu and search for **Launchpad & Service**. 

   ![Prepare-Configure](./images/trail/prepAndConfig24.png)

2. Select **Standard** as plan and click on **Create**.

   ![Prepare-Configure](./images/trail/prepAndConfig25.png)

3. The **Launchpad Service** subscription should now appear in the **Instances & Subscriptions** view. 

4. Go to **Security > Role Collections** in the side menu and select the _Extension Developer_ Role Collection. **Edit** the Role Collection and search for the **Mobile Admin** role via clicking on the icon next to the role input field.  

   ![Prepare-Configure](./images/trail/prepAndConfig26.png)

5. Click on **Add** and don't forget to **Save** the Role Collection.

#### SAP Business Application Studio Setup

1. Go to **Services > Service Marketplace** in the side menu and search for **SAP Business Application Studio**. 

   ![Prepare-Configure](./images/trail/prepAndConfig27.png)

2. Select **trial** as plan and click on **Create**.

   ![Prepare-Configure](./images/trail/prepAndConfig28.png)

3. The **SAP Business Application Studio** subscription should now appear in the **Instances & Subscriptions** view. 

4. Go to **Security > Role Collections** in the side menu and select the _Extension Developer_ Role Collection. **Edit** the Role Collection and search for the **Administrator** (application identifier contains _app-studio_) role via clicking on the icon next to the role input field.
   
   ![Prepare-Configure](./images/trail/prepAndConfig29.png)

5. Search For _Developer_ (application identifier contains _app-studio_), select it and Click on **Add**. 

   ![Prepare-Configure](./images/trail/prepAndConfig30.png)

6. Don't forget to **Save** the Role Collection.

#### Adding Role Collections to Users

1. Go to **Security > Role Collections** in the side menu. 

   ![Prepare-Configure](./images/trail/prepAndConfig31.png)

2. Search for the _Extension Developer_ Role Collection and **Edit** it. Switch to **User** tab.

   ![Prepare-Configure](./images/trail/prepAndConfig32.png)

3. Enter your SAP BTP Email Address in **ID** and Click on **"+"** to add Email.

   ![Prepare-Configure](./images/trail/prepAndConfig33.png)

4. Click on **Save** to save it.

   ![Prepare-Configure](./images/trail/prepAndConfig34.png)

--- 

Congrats! You can now continue with setting up your SAP HANA Cloud instance - Step 4.