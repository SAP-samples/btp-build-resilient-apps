# Safeguard key business processes with resilient applications on SAP BTP

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/btp-build-resilient-apps)](https://api.reuse.software/info/github.com/SAP-samples/btp-build-resilient-apps)

## Description

Extension applications built on SAP Business Technology Platform fulfill critical business processes. Ensuring their availability and stability, even in the face of service disruptions at the application, service, or platform level, is the responsibility of application developers and administrators.
This scenario demonstrates patterns for building resilient applications on SAP BTP, such as use of DevOps, observability, integration with business process workflows, and multi-region failover.

### Challenge
Extension applications provide customers with unlimited flexibility but bring added considerations about topics such as high availability, fault tolerance, and the software development lifecycle. Solving for these problems is the responsibility of the application developer.

### Solution
Apply DevOps to your custom development through use of unit tests and automation of builds and deployments. Enhance microservices with auto-scaling and monitoring for observability and implement multi-region failover of services such as the SAP Fiori Launchpad to create truly resilient applications.

### Outcome
Infuse qualities of resilience into your extension applications from the first step. Doing so will maximize a consistent and performant user experience, while empowering developers to continuously improve and enhance the value delivered to business users.

### Implementations

#### [Safeguard key business processes with resilient applications on SAP BTP](https://github.com/SAP-samples/btp-build-resilient-apps/tree/extension)

This scenario showcases how to build an extension application for an SAP S/4HANA on-premise system. The extension application receives realtime changes communicated via SAP Event Mesh and is using DevOps services from SAP like SAP Continuous Integration and Delivery, SAP Cloud Transport Management, Alert Notification and alike.

#### [Safeguard key business processes with resilient applications on SAP BTP - SAP Private Link Service](https://github.com/SAP-samples/btp-build-resilient-apps/tree/extension-privatelink)

This scenario uses mostly the same services as the above scenario and also depicts the same process. However, instead of the SAP Cloud Connector, the SAP Private Link service is used to establish a connection between SAP Business Technology Platform and the SAP S/4HANA system.  In this way, applications running on SAP BTP, Cloud Foundry Runtime with Microsoft Azure as IaaS provider can communicate with Azure Private Link services via a private connection. This ensures that traffic is not routed through the public internet but stays within the Azure infrastructure.

#### [Safeguard key business processes with resilient applications on SAP BTP - Integrate SAP business process workflows](https://github.com/SAP-samples/btp-build-resilient-apps/tree/extension-workflow)

This scenario demonstrates how to integrate the above shown architectures with SAP business process workflows.
