sap.ui.define([
    "sap/ui/core/library",
    "sap/ui/core/mvc/Controller"
], function (coreLibrary, Controller) {
    "use strict";
    var successValue;
    var awaitValue;
    var errValue;
    var startStatus;
    var approvalStatus;
    var completeStatus;
    var cancelledStatus;
    var RejectedStatus;
    var successIcon = "sap-icon://accept";
    var warningIcon = "sap-icon://warning";
    var errorIcon = "sap-icon://error"
    getResourceText();

    return {

        FormatValueIcon: function (SStep, Sstatus) {
            if (Sstatus == startStatus) {
                if (SStep != null) {

                    if (SStep.split('-')[0] == successValue) {
                        return successIcon
                    }
                    else if (SStep.split('-')[0] == awaitValue) {
                        return warningIcon
                    }
                    else if (SStep.split('-')[0] == errValue || SStep.split('-')[0] == cancelledStatus || SStep.split('-')[0] == RejectedStatus) {
                        return errorIcon
                    }
                    else {
                        return 'None'
                    }
                }
                else {
                    return 'None'
                }
            }
            else if (Sstatus == approvalStatus) {
                if (SStep != null) {
                    if (SStep.split('-')[1] == successValue) {
                        return successIcon
                    }
                    else if (SStep.split('-')[1] == awaitValue) {
                        return warningIcon
                    }
                    else if (SStep.split('-')[1] == errValue || SStep.split('-')[1] == cancelledStatus || SStep.split('-')[1] == RejectedStatus) {
                        return errorIcon
                    }
                    else {
                        return 'None'
                    }
                }
                else {
                    return 'None'
                }
            }
            else if (Sstatus == completeStatus) {
                if (SStep != null) {
                    if (SStep.split('-')[2] == successValue) {
                        return successIcon
                    }
                    else if (SStep.split('-')[2] == awaitValue) {
                        return warningIcon
                    }
                    else if (SStep.split('-')[2] == errValue || SStep.split('-')[2] == cancelledStatus || SStep.split('-')[2] == RejectedStatus) {
                        return errorIcon
                    }
                    else {
                        return 'None'
                    }
                }
                else {
                    return 'None'
                }
            }
        },

        FormatValueSubtitle: function (SStep, Sstatus) {
            if (Sstatus == startStatus) {
                if (SStep != null) {

                    if (SStep.split('-')[0] == successValue) {
                        return 'Workflow Successfully Started'
                    }
                    else if (SStep.split('-')[0] == awaitValue) {
                        return 'Workflow Pending'
                    }
                    else if (SStep.split('-')[0] == errValue) {
                        return 'Workflow Error'
                    }
                   
                    else {
                        return 'no workflow triggered yet'
                    }
                }
                else {
                    return 'no workflow triggered yet'
                }
            }
            else if (Sstatus == approvalStatus) {
                if (SStep != null) {
                    if (SStep.split('-')[1] == successValue) {
                        return 'Workflow Approved'
                    }
                    else if (SStep.split('-')[1] == awaitValue) {
                        return 'Workflow Approval Pending'
                    }
                    else if (SStep.split('-')[1] == errValue) {
                        return 'Workflow Error'
                    }
                    else if (SStep.split('-')[1] == cancelledStatus) {
                        return 'Workflow Terminated By Approver'
                    }
                    else if (SStep.split('-')[1] == RejectedStatus) {
                        return 'Workflow Approval Rejected'
                    }
                    else {
                        return 'no workflow triggered yet'
                    }
                }
                else {
                    return 'no workflow triggered yet'
                }
            }
            else if (Sstatus == completeStatus) {
                if (SStep != null) {
                    if (SStep.split('-')[2] == successValue) {
                        return 'Workflow completed Successfully'
                    }
                    else if (SStep.split('-')[2] == awaitValue) {
                        return 'Workflow completion Pending'
                    }
                    else if (SStep.split('-')[2] == errValue) {
                        return 'Workflow completion Error'
                    }
                    else {
                        return 'no workflow triggered yet'
                    }
                }
                else {
                    return 'no workflow triggered yet'
                }
            }


        },
        FormatValueDescription: function (SStep, Sstatus) {
            if (Sstatus == startStatus) {
                if (SStep != null) {

                    if (SStep.split('-')[0] == successValue) {
                        return 'Workflow start- Please check Later for Approval Status'
                    }
                    else if (SStep.split('-')[0] == awaitValue) {
                        return 'Workflow start- Please check with workflow Team'
                    }
                    else if (SStep.split('-')[0] == errValue) {
                        return 'Workflow start- Please check with workflow Team'
                    }
                    else {
                        return 'no workflow triggered yet'
                    }
                }
                else {
                    return 'no workflow triggered yet'
                }
            }
            else if (Sstatus == approvalStatus) {
                if (SStep != null) {
                    if (SStep.split('-')[1] == successValue) {
                        return 'Workflow Approval- Approval Approved'
                    }
                    else if (SStep.split('-')[1] == awaitValue) {
                        return 'Workflow Approval- Approval Pending'
                    }
                    else if (SStep.split('-')[1] == errValue) {
                        return 'Workflow Approval- Approval Workflow Error'
                    }
                    else if (SStep.split('-')[1] == cancelledStatus) {
                        return 'Workflow Approval- Workflow Terminated By Approver'
                    }
                    else if (SStep.split('-')[1] == RejectedStatus) {
                        return 'Workflow Approval- Approval Rejected By Approver'
                    }
                    else {
                        return 'no workflow triggered yet'
                    }
                }
                else {
                    return 'no workflow triggered yet'
                }
            }
            else if (Sstatus == completeStatus) {
                if (SStep != null) {
                    if (SStep.split('-')[2] == successValue) {
                        return 'Workflow Completion- completed'
                    }
                    else if (SStep.split('-')[2] == awaitValue) {
                        return 'Workflow Completion- pending'
                    }
                    else if (SStep.split('-')[2] == errValue || SStep.split('-')[2] == cancelledStatus || SStep.split('-')[2] == RejectedStatus) {
                        return 'Workflow Completion- Not completed'
                    }
                    else {
                        return 'no workflow triggered yet'
                    }
                }
                else {
                    return 'no workflow triggered yet'
                }
            }


        },
        FormatValue: function (SStep, Sstatus) {
            if (Sstatus == startStatus) {
                if (SStep != null) {
                    
                    if (SStep.split('-')[0] == successValue) {
                        return 'Success'
                    }
                    else if (SStep.split('-')[0] == awaitValue) {
                        return 'Warning'
                    }
                    else if (SStep.split('-')[0] == errValue || SStep.split('-')[0] == cancelledStatus || SStep.split('-')[0] == RejectedStatus) {
                        return 'Error'
                    }
                    else {
                        return 'None'
                    }
                }
                else {
                    return 'None'
                }
            }
            else if (Sstatus == approvalStatus) {
                if (SStep != null) {
                    if (SStep.split('-')[1] == successValue) {
                        return 'Success'
                    }
                    else if (SStep.split('-')[1] == awaitValue) {
                        return 'Warning'
                    }
                    else if (SStep.split('-')[1] == errValue || SStep.split('-')[1] == cancelledStatus || SStep.split('-')[1] == RejectedStatus) {
                        return 'Error'
                    }
                    else {
                        return 'None'
                    }
                }
                else {
                    return 'None'
                }
            }
            else if (Sstatus == completeStatus) {
                if (SStep != null) {
                    if (SStep.split('-')[2] == successValue) {
                        return 'Success'
                    }
                    else if (SStep.split('-')[2] == awaitValue) {
                        return 'Warning'
                    }
                    else if (SStep.split('-')[2] == errValue || SStep.split('-')[2] == cancelledStatus || SStep.split('-')[2] == RejectedStatus) {
                        return 'Error'
                    }
                    else {
                        return 'None'
                    }
                }
                else {
                    return 'None'
                }
            }


        },

        //Function for Micro Process Flow in Custom Column
        itemPressColumn: function (oEvent) {

            const oPopover = itemPress(oEvent);
            oPopover.openBy(oEvent.getParameter("item"));
        },



    };

    function getResourceText() {
        jQuery.sap.require("jquery.sap.resources");
        var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
        var oBundle = jQuery.sap.resources({
            url: "i18n/i18n.properties",
            locale: sLocale
        });
        successValue = oBundle.getText("statusok");
        awaitValue = oBundle.getText("statusapproval");
        errValue = oBundle.getText("statuserr");
        cancelledStatus = oBundle.getText("statuscancelled");
        RejectedStatus = oBundle.getText("statusreject");
        startStatus = oBundle.getText("stepone");
        approvalStatus = oBundle.getText("steptwo");
        completeStatus = oBundle.getText("stepthree");

    }

    function itemPress(oEvent) {
        const oItem = oEvent.getSource(),
            aCustomData = oItem.getCustomData(),
            sTitle = aCustomData[0].getValue(),
            sIcon = aCustomData[1].getValue(),
            sSubTitle = aCustomData[2].getValue(),
            sDescription = aCustomData[3].getValue();

        let colorState;
        switch (oItem.getState()) {
            case "Error": colorState = coreLibrary.IconColor.Negative; break;
            case "Warning": colorState = coreLibrary.IconColor.Critical; break;
            case "Success": colorState = coreLibrary.IconColor.Positive; break;
        }
        const oPopover = new sap.m.Popover({
            contentWidth: "300px",
            title: "Workflow Status",
            content: [
                new sap.m.HBox({
                    items: [
                        new sap.ui.core.Icon({
                            src: sIcon,
                            color: colorState
                        }).addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd"),
                        new sap.m.FlexBox({
                            width: "100%",
                            renderType: "Bare",
                            direction: "Column",
                            items: [new sap.m.Title({
                                level: sap.ui.core.TitleLevel.H1,
                                text: sTitle
                            }), new sap.m.Text({
                                text: sSubTitle
                            }).addStyleClass("sapUiSmallMarginBottom sapUiSmallMarginTop"),
                            new sap.m.Text({
                                text: sDescription
                            })
                            ]
                        })
                    ]
                }).addStyleClass("sapUiTinyMargin")
            ],
            footer: [
                new sap.m.Toolbar({
                    content: [
                        new sap.m.ToolbarSpacer(),
                        new sap.m.Button({
                            text: "Close",
                            press: function () {
                                oPopover.close();
                            }
                        })]
                })
            ]
        });
        return oPopover;
    }


});