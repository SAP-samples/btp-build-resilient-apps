# Setup Application Autoscaler

Our extension application is consuming resources on our environment which can be measured as CPU usage, memory utilized, response times, network traffic etc.

The workload of application might change overtime. In this case, workload can grow or shrink at specific time based on usage. For example if our extension application is used parallel from 1000 users this will require more resources then just for few users.

To handle this kind of situations, we can assign a lot of resources to the application, but it is not optimal, since most of the time the unused resources will be idle.

A better approach is the Application Autoscaler service provided by SAP BTP on Cloud Foundry runtime to automatically scale our applications to meet the dynamic resource needs.

1. Activating the service
   
2. Defining a Scaling Policy

   To initiate the scaling of an application, you need to define a policy. A policy is a JSON file containing an array of rules or a single rule for scaling. 

   There are two types of scaling policies:
    - **Dynamic Scaling Policy:** Scale your application instances based on memory/CPU usage, reponse time, throughput, or custom metrics.
    - **Schedule-Based Scaling Policy** - Scale your application instances based on schedules.

    For this example we will define Dynamic Policy


To test the autoscaling we can use an open source load testing tool LOCUST to hit the application endpoint multiple times in parallel and cause it to auto scale.
