# Setup CI/CD Pipeline

This section describes how to configure and run a predefined continuous integration and delivery (CI/CD) pipeline that automatically tests, builds, and deploys your code changes to speed up your development and delivery cycles.

The steps below will guide your through settting up your pipeline.

1. Enable SAP Continuous Integration and Delivery 
   - Go to your subaccount in SAP BTP
   - Navigate to the Service Marketplace
   - Find the Continuous Integration & Delivery Service and create/subscribe to the Service.

    ![choose create](./images/cicd1-1.png)

   - Assign the Role Collection **"CICD Administrator"** to your user
   - Find your user and choose Assign Role Collection

    ![assign role_collection](./images/cicd1-2.png)


2.  Configure the pipeline

    - Click on *Service Marketplace* or *Instances and Subscriptions*
    - Find *Continuous Integration & Delivery* (you might use the search functionality)
    - Click on “Go to application”

    ![configure pipeline](./images/cicd2.png)

3. Add BTP credentials

    - Click on credentials tab
    - Click on ‘+’

    ![add btp_credentials](./images/cicd3.png)
 
    - Enter a freely chosen name for your credential, which is unique in your SAP BTP subaccount. In this example, the name of the credential is *cf-credential*.
    - As type select *Basic Authentication* 
    - For Username, enter your BTP Account username/email.
    - For Password, use the BTP Account password
    - Click on create

    >Note, if you choose other credential name then our example, you need to make the changes in pipline config.yml as well.

    ![add btp_credentials_2](./images/cicd4.png)

4.  Add GitHub credentials

    - Click on ‘+’
    - Enter a name for your credential, which is unique in your SAP BTP subaccount. In this example, the name of the credential is *githubtools*.
    - As type select *Basic Authentication* 
    - For Username, enter your GitHub username.
    - For Password, use the personal access token for GitHub
    - (Hint: access tokens can be created in GitHub by going to *Settings* -> *Developer Settings*)
    - Click on create
  

    ![add github_credentials](./images/cicd5.png)
 

5. Add your Repository
   - Navigate to **"Repository"** Tab in CI/CD Service and click on ‘+’ to add your repository
   - Give a name for repository. e.g. **s4hana-ext-cap** 
   - Enter the *Repository URL*, which you **forked** to your Github account.
   - Select the github credentials (githubtools) created in previous step. 

   ![add credentials](./images/cicd6.png)

6. Create a GitHub Webhook
   
   In this step we will configure the Github Hook by entering the CI/CD endpoint URL and credentials. This will allow Github to notify CI/CD service that there are code changes in repository.

   To create a webhook in GitHub, you need some data that has been automatically created during the previous step. You can find this data (Payload URL and Secret) when you open the detail view of an existing repository in the Repositories tab

   - Click on Repositories
   - Open on the Detail View of your repository by clicking on the arrow at the end of the row
   - The detail view opens up on the right hand side
   - Click on Webhook Data
    
    ![webhook data](./images/cicd6-1.png)
    
   - You will see a pop-up like the one below
    
    ![pop up](./images/cicd6-2.png)

7.  Add Webhook in GitHub

    - In your project in GitHub go to the Settings tab.
    - From the navigation pane, choose Webhooks.
    - Choose Add webhook.

     ![add_webhook](./images/cicd6-3.png)

    The data required below can be found in the CI/CD popup.

    - Enter payload url
    - Select content type as application/json
    - Enter the secret

    The details to be entered as available in the pop up in CI/CD.

    - Click on ‘Add webhook’

    ![add credentials](./images/cicd6-4.png)


8.  Configure a CI/CD Job
 
    - In the Jobs tab in SAP Continuous Integration and Delivery, choose *+* to create a new job.
    - For Job Name, enter a freely chosen name for your job, which is unique in your SAP BTP subaccount, for example ‘s4hana-btp-extension’.
    - Under Repository, choose Add Repository.
    - Add the repository name and the repository URL.
    - Select the repository credential from the dropdown. Pick *githubtools*
    - Choose *Add*
    - For Branch, enter the GitHub branch from which you want to receive push events. In this example, **main**.
    - As Pipeline, choose SAP Cloud Application Programming Model.
    - Keep the default values in the BUILD RETENTION tab.
    - In the Stages tab, choose **'Source Repository'** from the Configuration Mode dropdown list. Alternative for this is the Job Editor, where you can configure the pipline steps in UI. In our example we defined the pipline configuration in "source code" and the configuration file can be found in *.pipline/config.yml*
    - Choose *Create*.
    
     ![Create Job](./images/cicd6-6.png)

   [*.pipline/config.yml*](https://github.com/SAP-samples/s4hana-btp-extension-devops/blob/main/.pipeline/config.yml)

```bash
  # Project configuration
  general:
    pipeline: "sap-cloud-sdk" # this line is mandatory
    buildTool: "mta" # or 'npm'

  # Stages configuration
  stages:
    Build:
      npmExecuteLint: true # true, if you want to run a lint check that verifies the syntax of your JavaScript code

    Release:
      cloudFoundryDeploy: true # true, if you want to deploy to Cloud Foundry. If you set this parameter to true, the CloudFoundryDeploy step is mandatory
      tmsUpload: false # true if you want to upload your artifact to SAP Cloud Transport Management. If you set this parameter to true, the tmsUpload step is mandatory

  # Steps configuration
  steps:
    npmExecuteLint:
      failOnError: false # true, if you want your pipeline to fail, if the lint check reveals any errors

    mtaBuild:
      buildTarget: "CF"
      extensions: "live.mtaext" # for Live BTP Account choose live.mtaext for BTP Trial  trial.mtaext
      mtaBuildTool: "cloudMbt"

    cloudFoundryDeploy: # only relevant, if you set the cloudFoundryDeploy parameter in the Release stage to true
      cloudFoundry:
        credentialsId: "cf-credential" # name is defined in CI/CD Service
        apiEndpoint: "<cf API>" # for example, https://api.cf.eu10.hana.ondemand.com
        org: "<cf org>" 
        space: "<cf space>"
      mtaDeployParameters: "-f --version-rule ALL"
    # tmsUpload:            # only relevant, if you set the tmsUpload parameter in the Release stage to true
    #   nodeName: 'QA'
    #   credentialsId: 'tms'
    #   customDescription: 'TMS Upload'
  ```
 
9.  Test the pipeline
 
     - Go to the terminal in Business Application Studio and sync the changes in GitHub 
 
    ```bash
    git pull
    ```
 
     - Go to Business Application Studio
     - Make a minor change to for example the Readme.MD like e.g. adding a comment
     - Go to the terminal and execute the commands below
     
      ```bash
      git add .
      git commit -m "minor change"
      git push
      ```
     - Goto the CI/CD app 
     - Check on the right hand side that the build has been triggered
 
    ![test_pipeline](./images/cicd11.png)
 

 
