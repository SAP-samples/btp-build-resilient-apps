{
	"contents": {
		"a9c2e3b8-2f13-4a34-b362-f6544200a8be": {
			"classDefinition": "com.sap.bpm.wfs.Model",
			"id": "tfe.bp.block_unblock_wf",
			"subject": "Block_Unblock_wf",
			"name": "Block_Unblock_wf",
			"documentation": "block/unblock status Approval",
			"lastIds": "62d7f4ed-4063-4c44-af8b-39050bd44926",
			"events": {
				"11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3": {
					"name": "Block/Unblock Event Start"
				},
				"2798f4e7-bc42-4fad-a248-159095a2f40a": {
					"name": "Terminate Workflow"
				},
				"b8d13a09-8d77-4418-b84f-b01419238020": {
					"name": "Terminate Event Due to Reject"
				}
			},
			"activities": {
				"06546cea-53da-47b5-b58d-ab3065e0b631": {
					"name": "Prepare Data"
				},
				"20d5a672-823a-4584-8c73-09a844620a46": {
					"name": "Get Approval Details"
				},
				"403ad7ae-e650-4670-ab63-01cab1ca6516": {
					"name": "Await Approval"
				},
				"cdd01200-c88a-4179-ac63-eca7031e3da6": {
					"name": "Handle Approval(Local Manager)"
				},
				"f68fbe13-b90f-4add-bd45-a56ad0979127": {
					"name": "Manager Approved?"
				},
				"007cf969-0f22-4b10-b31b-6ffd7319bfe4": {
					"name": "Handle Business Partner Updation"
				},
				"ce65f5a9-9b04-4f60-a780-245eff2fa34b": {
					"name": "Update Business Partner to S4 Hana System"
				}
			},
			"sequenceFlows": {
				"c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f": {
					"name": "SequenceFlow1"
				},
				"01df34cf-758e-42a6-b031-12171eb01f60": {
					"name": "SequenceFlow2"
				},
				"32caa0c9-4a38-4dfc-9355-c1a1185245ee": {
					"name": "SequenceFlow3"
				},
				"cc284ebd-ee7b-47db-a2a7-bfa96031d805": {
					"name": "SequenceFlow4"
				},
				"ddcd1ceb-70f9-4ec4-a1e4-13dd9c291aa0": {
					"name": "SequenceFlow5"
				},
				"2ff797ee-538c-464a-8d78-142ad46a5c5c": {
					"name": "Approve"
				},
				"16a2aa40-2301-47ac-9a01-0fe1c6ac5361": {
					"name": "Reject"
				},
				"e7e66022-20ae-4da8-b2e0-33ac3cb59af2": {
					"name": "SequenceFlow8"
				},
				"053293f1-83cf-4fb7-a050-f4042342e3b2": {
					"name": "SequenceFlow9"
				}
			},
			"diagrams": {
				"42fa7a2d-c526-4a02-b3ba-49b5168ba644": {}
			}
		},
		"11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3": {
			"classDefinition": "com.sap.bpm.wfs.StartEvent",
			"id": "startevent1",
			"name": "Block/Unblock Event Start",
			"sampleContextRefs": {
				"95046e20-ef93-41f7-8df2-0e8ced83730d": {}
			}
		},
		"2798f4e7-bc42-4fad-a248-159095a2f40a": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent1",
			"name": "Terminate Workflow",
			"eventDefinitions": {
				"e200dd35-fc52-44e4-ba10-4a31c28f78bf": {}
			}
		},
		"b8d13a09-8d77-4418-b84f-b01419238020": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent2",
			"name": "Terminate Event Due to Reject",
			"eventDefinitions": {
				"dcc60858-3542-425b-81e7-fd6ac786bb3e": {}
			}
		},
		"06546cea-53da-47b5-b58d-ab3065e0b631": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/Block_Unblock_wf/PrepareData.js",
			"id": "scripttask1",
			"name": "Prepare Data"
		},
		"20d5a672-823a-4584-8c73-09a844620a46": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "BUSINESS_RULES",
			"path": "/rest/v2/workingset-rule-services",
			"httpMethod": "POST",
			"requestVariable": "${context.rulesPayload}",
			"responseVariable": "${context.approvalStepsResult}",
			"id": "servicetask1",
			"name": "Get Approval Details"
		},
		"403ad7ae-e650-4670-ab63-01cab1ca6516": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "The following Business Partner should be ${context.blockUnblockStatus}. Please approve.",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"supportsForward": false,
			"userInterface": "sapui5://comsapbpmworkflow.comsapbpmwusformplayer/com.sap.bpm.wus.form.player",
			"recipientUsers": "${context.approvalStepsResult.Result[0].Approvers.lm_userid}",
			"formReference": "/forms/Block_Unblock_wf/Block_Unblock_Approval.form",
			"userInterfaceParams": [{
				"key": "formId",
				"value": "block_unblock_approval"
			}, {
				"key": "formRevision",
				"value": "1.0"
			}],
			"id": "usertask1",
			"name": "Await Approval"
		},
		"cdd01200-c88a-4179-ac63-eca7031e3da6": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/Block_Unblock_wf/HandleApprovalLocalManager.js",
			"id": "scripttask2",
			"name": "Handle Approval(Local Manager)"
		},
		"f68fbe13-b90f-4add-bd45-a56ad0979127": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway1",
			"name": "Manager Approved?",
			"default": "16a2aa40-2301-47ac-9a01-0fe1c6ac5361"
		},
		"007cf969-0f22-4b10-b31b-6ffd7319bfe4": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/Block_Unblock_wf/HandleBusinessPartnerUpdation.js",
			"id": "scripttask3",
			"name": "Handle Business Partner Updation"
		},
		"ce65f5a9-9b04-4f60-a780-245eff2fa34b": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "BusinessPartner",
			"path": "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('${context.BusinessPartnerDetails.businessPartnerId}')",
			"httpMethod": "PATCH",
			"xsrfPath": "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('${context.BusinessPartnerDetails.businessPartnerId}')",
			"requestVariable": "${context.internal.BPCreationPayload}",
			"responseVariable": "${context.UpdationResult}",
			"id": "servicetask2",
			"name": "Update Business Partner to S4 Hana System"
		},
		"c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow1",
			"name": "SequenceFlow1",
			"sourceRef": "11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3",
			"targetRef": "06546cea-53da-47b5-b58d-ab3065e0b631"
		},
		"01df34cf-758e-42a6-b031-12171eb01f60": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow2",
			"name": "SequenceFlow2",
			"sourceRef": "06546cea-53da-47b5-b58d-ab3065e0b631",
			"targetRef": "20d5a672-823a-4584-8c73-09a844620a46"
		},
		"32caa0c9-4a38-4dfc-9355-c1a1185245ee": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow3",
			"name": "SequenceFlow3",
			"sourceRef": "20d5a672-823a-4584-8c73-09a844620a46",
			"targetRef": "403ad7ae-e650-4670-ab63-01cab1ca6516"
		},
		"cc284ebd-ee7b-47db-a2a7-bfa96031d805": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow4",
			"name": "SequenceFlow4",
			"sourceRef": "403ad7ae-e650-4670-ab63-01cab1ca6516",
			"targetRef": "cdd01200-c88a-4179-ac63-eca7031e3da6"
		},
		"ddcd1ceb-70f9-4ec4-a1e4-13dd9c291aa0": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow5",
			"name": "SequenceFlow5",
			"sourceRef": "cdd01200-c88a-4179-ac63-eca7031e3da6",
			"targetRef": "f68fbe13-b90f-4add-bd45-a56ad0979127"
		},
		"2ff797ee-538c-464a-8d78-142ad46a5c5c": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.decision==\"Approve\"}",
			"id": "sequenceflow6",
			"name": "Approve",
			"sourceRef": "f68fbe13-b90f-4add-bd45-a56ad0979127",
			"targetRef": "007cf969-0f22-4b10-b31b-6ffd7319bfe4"
		},
		"16a2aa40-2301-47ac-9a01-0fe1c6ac5361": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow7",
			"name": "Reject",
			"sourceRef": "f68fbe13-b90f-4add-bd45-a56ad0979127",
			"targetRef": "b8d13a09-8d77-4418-b84f-b01419238020"
		},
		"e7e66022-20ae-4da8-b2e0-33ac3cb59af2": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow8",
			"name": "SequenceFlow8",
			"sourceRef": "007cf969-0f22-4b10-b31b-6ffd7319bfe4",
			"targetRef": "ce65f5a9-9b04-4f60-a780-245eff2fa34b"
		},
		"053293f1-83cf-4fb7-a050-f4042342e3b2": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow9",
			"name": "SequenceFlow9",
			"sourceRef": "ce65f5a9-9b04-4f60-a780-245eff2fa34b",
			"targetRef": "2798f4e7-bc42-4fad-a248-159095a2f40a"
		},
		"42fa7a2d-c526-4a02-b3ba-49b5168ba644": {
			"classDefinition": "com.sap.bpm.wfs.ui.Diagram",
			"symbols": {
				"df898b52-91e1-4778-baad-2ad9a261d30e": {},
				"53e54950-7757-4161-82c9-afa7e86cff2c": {},
				"6bb141da-d485-4317-93b8-e17711df4c32": {},
				"3a874cd9-2d7b-4ecc-bd77-9556603decc8": {},
				"f0f5f706-1182-4898-a596-53f7e68dec1c": {},
				"fc8aa0b4-f2c8-4df7-99be-9b2be5a6f16f": {},
				"97719ed6-86b5-42b0-84b2-9859c5d6292f": {},
				"d6667295-af8a-4f6f-a0f8-7f4693e8464d": {},
				"5f66305d-5c99-4b55-840c-211ef2cb2308": {},
				"e2431896-0106-4601-8c14-ad40fcaf87d4": {},
				"21bd3985-4bc9-42b9-8633-1dbaa0a1ffed": {},
				"50c27c91-1852-4623-95e3-f3db7f35f886": {},
				"e052ec81-85d3-4b57-8411-10d2b8aa6166": {},
				"7ce12fe5-718e-4b41-b65d-973ab6b99cc9": {},
				"77b15506-a211-4a23-b56d-3a8581930859": {},
				"f3d58967-4f0f-4bd2-b46a-44049619f64b": {},
				"a15d149a-d703-4943-9da6-35a1e4e260ae": {},
				"bd3e7649-4ae8-486d-9b73-cc8212ca61d6": {},
				"3de8c3ed-a20e-4f09-9589-185fba975d78": {}
			}
		},
		"95046e20-ef93-41f7-8df2-0e8ced83730d": {
			"classDefinition": "com.sap.bpm.wfs.SampleContext",
			"reference": "/sample-data/Block_Unblock_wf/PrepareSamplePayload.json",
			"id": "default-start-context"
		},
		"e200dd35-fc52-44e4-ba10-4a31c28f78bf": {
			"classDefinition": "com.sap.bpm.wfs.TerminateEventDefinition",
			"id": "terminateeventdefinition1"
		},
		"df898b52-91e1-4778-baad-2ad9a261d30e": {
			"classDefinition": "com.sap.bpm.wfs.ui.StartEventSymbol",
			"x": 12,
			"y": 68.5,
			"width": 32,
			"height": 32,
			"object": "11a9b5ee-17c0-4159-9bbf-454dcfdcd5c3"
		},
		"53e54950-7757-4161-82c9-afa7e86cff2c": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 1150.9999976158142,
			"y": 97,
			"width": 35,
			"height": 35,
			"object": "2798f4e7-bc42-4fad-a248-159095a2f40a"
		},
		"6bb141da-d485-4317-93b8-e17711df4c32": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "44,84.5 94,84.5",
			"sourceSymbol": "df898b52-91e1-4778-baad-2ad9a261d30e",
			"targetSymbol": "3a874cd9-2d7b-4ecc-bd77-9556603decc8",
			"object": "c6b99f32-5fe6-4ab6-b60a-80fba1b9ae0f"
		},
		"3a874cd9-2d7b-4ecc-bd77-9556603decc8": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 94,
			"y": 54.5,
			"width": 100,
			"height": 60,
			"object": "06546cea-53da-47b5-b58d-ab3065e0b631"
		},
		"f0f5f706-1182-4898-a596-53f7e68dec1c": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "194,84.5 244,84.5",
			"sourceSymbol": "3a874cd9-2d7b-4ecc-bd77-9556603decc8",
			"targetSymbol": "fc8aa0b4-f2c8-4df7-99be-9b2be5a6f16f",
			"object": "01df34cf-758e-42a6-b031-12171eb01f60"
		},
		"fc8aa0b4-f2c8-4df7-99be-9b2be5a6f16f": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": 244,
			"y": 54.5,
			"width": 100,
			"height": 60,
			"object": "20d5a672-823a-4584-8c73-09a844620a46"
		},
		"97719ed6-86b5-42b0-84b2-9859c5d6292f": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "344,84.5 394,84.5",
			"sourceSymbol": "fc8aa0b4-f2c8-4df7-99be-9b2be5a6f16f",
			"targetSymbol": "d6667295-af8a-4f6f-a0f8-7f4693e8464d",
			"object": "32caa0c9-4a38-4dfc-9355-c1a1185245ee"
		},
		"d6667295-af8a-4f6f-a0f8-7f4693e8464d": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 394,
			"y": 54.5,
			"width": 100,
			"height": 60,
			"object": "403ad7ae-e650-4670-ab63-01cab1ca6516"
		},
		"5f66305d-5c99-4b55-840c-211ef2cb2308": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "494,84.5 544,84.5",
			"sourceSymbol": "d6667295-af8a-4f6f-a0f8-7f4693e8464d",
			"targetSymbol": "e2431896-0106-4601-8c14-ad40fcaf87d4",
			"object": "cc284ebd-ee7b-47db-a2a7-bfa96031d805"
		},
		"e2431896-0106-4601-8c14-ad40fcaf87d4": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 544,
			"y": 54.5,
			"width": 100,
			"height": 60,
			"object": "cdd01200-c88a-4179-ac63-eca7031e3da6"
		},
		"21bd3985-4bc9-42b9-8633-1dbaa0a1ffed": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "644,84.5 694,84.5",
			"sourceSymbol": "e2431896-0106-4601-8c14-ad40fcaf87d4",
			"targetSymbol": "50c27c91-1852-4623-95e3-f3db7f35f886",
			"object": "ddcd1ceb-70f9-4ec4-a1e4-13dd9c291aa0"
		},
		"50c27c91-1852-4623-95e3-f3db7f35f886": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 694,
			"y": 63.5,
			"object": "f68fbe13-b90f-4add-bd45-a56ad0979127"
		},
		"e052ec81-85d3-4b57-8411-10d2b8aa6166": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "736,84.5 770.9999994039536,84.5 770.9999994039536,127 805.9999988079071,127",
			"sourceSymbol": "50c27c91-1852-4623-95e3-f3db7f35f886",
			"targetSymbol": "f3d58967-4f0f-4bd2-b46a-44049619f64b",
			"object": "2ff797ee-538c-464a-8d78-142ad46a5c5c"
		},
		"7ce12fe5-718e-4b41-b65d-973ab6b99cc9": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 805.9999988079071,
			"y": 12,
			"width": 35,
			"height": 35,
			"object": "b8d13a09-8d77-4418-b84f-b01419238020"
		},
		"77b15506-a211-4a23-b56d-3a8581930859": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "736,84.5 770.9999994039536,84.5 770.9999994039536,29.5 805.9999988079071,29.5",
			"sourceSymbol": "50c27c91-1852-4623-95e3-f3db7f35f886",
			"targetSymbol": "7ce12fe5-718e-4b41-b65d-973ab6b99cc9",
			"object": "16a2aa40-2301-47ac-9a01-0fe1c6ac5361"
		},
		"f3d58967-4f0f-4bd2-b46a-44049619f64b": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 805.9999988079071,
			"y": 97,
			"width": 100,
			"height": 60,
			"object": "007cf969-0f22-4b10-b31b-6ffd7319bfe4"
		},
		"a15d149a-d703-4943-9da6-35a1e4e260ae": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "905.9999988079071,124.25 971.9999976158142,124.25",
			"sourceSymbol": "f3d58967-4f0f-4bd2-b46a-44049619f64b",
			"targetSymbol": "bd3e7649-4ae8-486d-9b73-cc8212ca61d6",
			"object": "e7e66022-20ae-4da8-b2e0-33ac3cb59af2"
		},
		"bd3e7649-4ae8-486d-9b73-cc8212ca61d6": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": 971.9999976158142,
			"y": 91.5,
			"width": 100,
			"height": 60,
			"object": "ce65f5a9-9b04-4f60-a780-245eff2fa34b"
		},
		"3de8c3ed-a20e-4f09-9589-185fba975d78": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1071.9999976158142,118 1150.9999976158142,118",
			"sourceSymbol": "bd3e7649-4ae8-486d-9b73-cc8212ca61d6",
			"targetSymbol": "53e54950-7757-4161-82c9-afa7e86cff2c",
			"object": "053293f1-83cf-4fb7-a050-f4042342e3b2"
		},
		"62d7f4ed-4063-4c44-af8b-39050bd44926": {
			"classDefinition": "com.sap.bpm.wfs.LastIDs",
			"terminateeventdefinition": 2,
			"sequenceflow": 9,
			"startevent": 1,
			"endevent": 2,
			"usertask": 1,
			"servicetask": 2,
			"scripttask": 3,
			"exclusivegateway": 1
		},
		"dcc60858-3542-425b-81e7-fd6ac786bb3e": {
			"classDefinition": "com.sap.bpm.wfs.TerminateEventDefinition",
			"id": "terminateeventdefinition2"
		}
	}
}