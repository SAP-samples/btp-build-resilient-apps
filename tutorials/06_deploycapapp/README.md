# Deploy SAP Cloud Application Programming Model (CAP) Application

## Introduction

Deploy a ready-to-use Node.js application utilizing the SAP Cloud Application Programming Model (CAP) to SAP BTP, Cloud Foundry Runtime using SAP Business Application Studio.

*Please note that this tutorial is based on using SAP Business Application Studio. While the steps are similar if you prefer to use Visual Studio Code, we recommend using SAP Business Application Studio for this type of application due to its use of the SAP Cloud Connector, which cannot be accessed outside of SAP BTP. Keep in mind that without SAP Business Application Studio, running the application locally in your IDE will not be possible as the SAP S/4HANA APIs accessed through the SAP Cloud Connector are not reachable.*

### Clone the existing application in SAP Business Application Studio

1. Open the SAP BTP Cockpit: <https://cockpit.eu10.hana.ondemand.com/cockpit/>
2. Navigate to the subaccount you want to deploy the application to.
   ![Open SAP Business Application Studio](./images/open_subaccount.png)

3. Go to _Services_ and select _Instances and Subscriptions_.

4. Select **SAP Business Application Studio** located in the _Subscriptions_ tab and click on the icon to open the application.
   ![Open SAP Business Application Studio](./images/open_bas.png)

5. Create a **Dev Space** once the SAP Business Application Studio home appears.
   ![Create Dev Space](./images/dev-cap-app-3.png)

6. Enter a **Dev Space name** e.g 'BusinessProcessDev', select the type _Full Stack Cloud Application_. Hit **Create Dev Space** to create the Dev Space.
   ![Configure Dev Space](./images/dev-cap-app-4.png)

7. Your Dev Space is now being created. As soon as the Dev Space is running you can click on your Dev Space name to access it.
   ![Configure Dev Space](./images/open_devspace.png)

8. Go to <https://github.com/SAP-samples/btp-build-resilient-apps> and **fork** the repository. So that you have your own fork on github.com. (In one of the subsequent steps you will then connect your fork with the SAP Continuous Integration and Delivery service to run certain pipelines.)
   ![Fork Repo](./images/fork-repo.png)

9. Fork the repository by selecting **your user** as the destination, ensuring that the option to **copy the main branch only** is NOT selected (all branches should be included!), and selecting **Create fork**.
   ![Choose user for fork](./images/fork-repo-user.png)

   You should now have the following repository: github.com/**YourUser**/btp-build-resilient-apps

10. Go back to the **SAP Business Application Studio**. Type in **> New Terminal** in the menu on the top of your screen and select the first entry using the cursor.
    ![Open Terminal](./images/new_terminal.png)

11. Navigate to the **projects** directory and clone your forked sample GitHub repository by using the following command in the terminal:
   ```
   cd projects && git clone https://github.com/YourUser/btp-build-resilient-apps
   ```
   > **IMPORTANT:** ❗️Replace **YourUser** with your actual username.

   ![Open Terminal](./images/cd_and_clone.png)

12. Select the **file** icon in the side menu, click on **Open Folder** and provide the path to the cloned repo. (*/home/user/projects/btp*)
    ![Open Workspace](./images/open_folder.png)

13. Install the needed npm dependencies (like TypeScript globally and all the other packages defined in the package.json file):

    ```
    npm i -g typescript ts-node && npm install
    ```

    The installation of dependencies will take a few momements.

14. In order to verify, if the setup in your SAP Business Application Studio is fine, run the test for the application: 
    ```
    npm run test
    ```

    The tests take a few seconds and will produce the following output: 
    ![Open Workspace](./images/run_test_output.png)

15. You are now good to go to deploy the entire application to the SAP BTP, Cloud Foundry Runtime following these steps:

    - Search for **Login to Cloud Foundry** and press **Enter** to confirm.
      ![Open CF Command Palette](./images/login_cf.png)

    - Copy & Paste the API Endpoint of your subaccount from the SAP BTP Cockpit and paste it into the field **Cloud Foundry Endpoint**.
      ![Login to Cloud Foundry](./images/api_endpoint.png)

    - Enter your SAP BTP password and username and continue with **Sign in**. 

16. Pick the Cloud Foundry organization and Cloud Foundry space you want to deploy the application to from the dropdown lists and continue with **Apply**.
    ![Provide CF space and Org from the dropdown](./images/cf_space_org.png)
    ![Success message](./images/org_was_set.png)

17. Build the Multi-Target Application Archive (MTA Archive) by executing the following command in the root directory of your project in the terminal:
    ```
    npm run build:cf
    ```

    This will create a **gen** directory in the root of your project, containing the generated artifacts that will be used for deployment.

    ![Build result](./images/build_result.png)

    > If you're curious about what the npm script is doing, take a look at the package.json file in the root of your project. Specifically, check line 74 of the [package.json](../../package.json#L74) file.

18. Deploy the application to SAP BTP, Cloud Foundry Runtime by executing the following command in the root directory of your project in the terminal:

    If you want to deploy it to the SAP BTP, Cloud Foundry Runtime in the trial environment:
    ```
    npm run deploy:trial
    ```

    If you want to deploy the application to the SAP BTP, Cloud Foundry Runtime in your non-trial environment:
    ```
    npm run deploy:live
    ```

    This will trigger the deployment to SAP BTP, Cloud Foundry Runtime including the creation of the necessary service instances and service bindings to the corresponding apps.

    ![Deployment completed message](./images/deployment_completed.png)

19. Verify the result of the recent deployment using the [SAP BTP Cockpit](https://cockpit.eu10.hana.ondemand.com/cockpit/). Navigate to the subaccount and open the **HTML Applications** menu and check if the Frontend (as in the SAP Fiori Elements application) was deployed to the HTML5 Application repository. This was succesful, once the following entry in the list appears:
![HTML5 Application repository completed message](./images/html5_app.png)

20. To ensure that the backend was also deployed successfully, go to **Cloud Foundry > Spaces** and select the Cloud Foundry space that you have chosen as the deployment target in the SAP Business Application Studio. 
![Space Navigation](./images/open_space.png)

21. The list of apps should contain 2 entries: 
    - **BPVerification-db-deployer:** This app is on purpose in state **Stopped** as this is a Cloud Foundry task that only runs once to deploy the database artefacts to SAP HANA Cloud.
    - **BPVerification-srv:** This is the app built with the SAP Cloud Application Programming Model (CAP) that serves as the backend for the SAP Fiori Elements frontend. The state has to be **Started**. 
   ![List of applications](./images/app_state.png)

---

Congrats! You have succesfully deployed the CAP application that connects all the involved pieces of this solution. You will configure the needed roles in one of the following steps to be ready to use the application! 

## Optional: Find and download API metadata 

(*This step is entirely optional since all of the results are already included in the deployed application.*)
In case you are interested how to figure out the available out-of-the-box APIs using the SAP API Business Hub and how to further use them in applications like SAP Cloud Application Programming Model.

### 

1. Open http://api.sap.com, enter "business partner" in the search field, and click the Search Button.
![Enter search term](./images/enter_searchterm.png)

2. Switch to the **API** tab and toggle the **Show Filters** option.
![Enable filter for APIs](./images/show_apifilter.png)
 
3. To narrow your search results, expand the **Products** filter and select **SAP S/4HANA** from the available entries. Don't forget to hit the **Apply Filter** button to update the search results.
![Filter for APIs](./images/apply_filter.png)

4. Select **Business Partner(A2X)** from the results list. 
![Pick Bussiness Partner (A2X) from the results list](./images/a2x_result.png)

5. Select **API Specification** from the list of **API Resources** and hit the Download icon for the **EDMX** file. (You'll need to login or already be logged in)
 ![Download EDMX](./images/download_edmx.png)

 6. With that, you could use `cds import` in your existing SAP Cloud Application Programming Model project: The details are described here: <https://cap.cloud.sap/docs/guides/using-services#import-api>







