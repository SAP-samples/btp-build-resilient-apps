# Test Basic Scenario End to End
## Introduction

Now it is time to test your basic scenario. As a result of the following steps you will be able start up your application, create an event in your S/4HANA On Premise system and see the Business Partner you have created appear in your application.

# Run Application and test entire Business Scenario

1. To access the application, it require to assign **BPAdmin** role collection to respective user. 
   
   - Go to BTP cockpit, open Security -> User
   - Assign **BPAdmin** role collection to respective user
  
    ![app](./images/endtoend0.png)

2. Start your Business Partner Validation Application

    - In BTP Cockpit go to the *HTML5 Applications*

    - Find the BusinessPartnerValidation app and launch the URL

        ![app](./images/endtoend1.png)

    - Click on Business Partner Validation tile
    
        ![app](./images/endtoend1-1.png)

    - The list of BusinessPartners along with their verification status gets displayed.

        ![app](./images/endtoend2.png)

3. Now we can switch to S/4HANA System to create new business partners or modify existing ones.


4. Login to your SAP S/4HANA On Prem System

    ![backend](./images/endtoend3.png)

5. Enter transaction code *bp*

    ![backend](./images/endtoend4.png)

6. Create a new Business Partner

- Click on Person

    ![backend](./images/endtoend5.png)
 
- Provide first name, last name for the business partner
 
    ![backend](./images/endtoend6.png)
  
- Provide the address  
  
    ![backend](./images/endtoend7.png)
 
 - Move to the status tab and check mark the 'Central Block' lock. Save the BP. This will create a new Business Partner
   
    ![backend](./images/endtoend8.png)

5. Now go back to the BusinessPartnerValidation application on BTP to see if the new BusinessPartners has come on the UI

    ![backend](./images/endtoend9.png)

6. You can select the business partner to *block* or *unblock* it or you can navigate to details to edit the address and status information
   ![backend](./images/endtoend14.png)

7. Go to the details page for the new BusinessPartner.
8. Click on Edit and update the address or set status e.g. *verified*

    ![backend](./images/endtoend15.png)
    ![backend](./images/endtoend16.png)

9.  Go to your S/4HANA On Prem System 
10. Go to transaction *bp*

    ![backend](./images/endtoend4.png)

11. Open the details of the Business Partner you have just updated and check the changes

    ![backend](./images/endtoend17.png)

12. Go to the Status tab. You can see that the central Block lock has been removed.

    ![backend](./images/endtoend18.png)


[< Back to Usecase](../usecase.md)