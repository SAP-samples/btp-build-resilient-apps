# Setup Cloud Transport Management Service

As soon as you have a release candidate of your app version in form of a fully qualified archive, you want to propagate it towards your production subaccount.
You can do it either fully automated as part of a pipeline – ideally based on the Continuous Integration best practices or pipeline templates or with a standardized, enterprise-ready change management process, if you desire more control especially of your production environment – using our cloud-based SAP Cloud Transport Management service. 

In this extension usecase we will show how to combine Continuous Integration & Transport Management
It will show the best of both worlds (with a combination of CI and transport management).

We can differeciate 
  * A *development* landscape, based on **Continuous Integration** principles and used to verify single developer changes by an automated pipeline and
  * A *delivery* landscape, based on strict **transport management rules** (such as policies, schedules and roles) and used to verify release candidate versions, where propagation towards production is typically done with manual confirmation)

![Development and Delivery landscape](images/tms1.png)


Before we can combine both services, we need to setup Cloud Transport Management. The required steps are described below:

> Note, in case you used at the beginning of the mission the **booster** to setup the account, you can skip first 2 Steps, it's done by booster automatically.

1. Enable/Subscribe to SAP Cloud Transport Management

   - In the subaccount, choose Services > Service Marketplace.
   - The entitled subscriptions are shown.
   - Search for Cloud Transport Management
   - On the Cloud Transport Management tile, choose (Actions)and Create.
   - In the subsequent dialog, the Cloud Transport Management service is preselected. Select the saas-application plan and create.

   ![Create TMS](images/tms2.png)

2. Assign User Roles and Permissions in Cloud Transport Management

    After successful subscription, you need to configure user access to the application. You need different role collections for the different Cloud Transport Management roles, and assign roles to the role collections based on the application templates. Afterwards, you assign the role collections to users or user groups.