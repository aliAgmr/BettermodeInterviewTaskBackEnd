import {verifySignature} from "../utils/utils.js";

class WebhookController {
	static instance: WebhookController;

	webhookSignatureMiddleware(req: any, res: any, next: any) {
		const rawBody = req['rawBody'];
		const timestamp = parseInt(req.header('X-Bettermode-Request-Timestamp'), 10);
		const signature = req.header('X-Bettermode-Signature');
		try {
			if (rawBody && verifySignature({
				body: rawBody,
				timestamp,
				signature,
				secret: process.env.WEBHOOK_SIGNING_SECRET ?? ''
			})) {
				return next();
			}
		} catch (err) {
			console.error(err);
		}
		return res.status(403).json({error: 'The X-Bettermode-Signature is not valid.'});
	}

	handleWebhook(body: any) {
		console.log('handleWebhook [1]');
		console.log(body);
		if (body.type === 'TEST') {
			return {
				"type": "TEST",
				"status": "SUCCEEDED",
				"data": {
					"challenge": body.data.challenge
				}
			}
		}
		if (body.type === 'INTERACTION') {
			switch (body.data.dynamicBlockKey) {
				case 'test-block':
					return {
						"type": "INTERACTION",
						"status": "SUCCEEDED",
						"data": {
							appId: body.data.appId,
							interactionId: body.data.interactionId,
							"interactions": [
								{
									"type": "OPEN_TOAST",
									"id": "toast-id",
									"props": {
										"title": "Welcome!",
										"status": "Success",
										"description": "Welcome! You have been logged in using JWT SSO."
									}
								},
								// {
								// 	"type": "SHOW",
								// 	"id": "dynamic-block",
								// 	"slate": {
								// 		"rootBlock": "root",
								// 		"blocks": [
								// 			{
								// 				"id": "root",
								// 				"name": "Container",
								// 				"children": ["root-input"],
								// 			},
								// 			{
								// 				"id": "root-input",
								// 				"name": "Input",
								// 				"props": {
								// 					"hidden": true
								// 				},
								// 				"children": [],
								// 			}
								// 		],
								// 	}
								// }
							]
						}
					};
				default:
					return {};
			}
		}
		switch (body.data.name) {
			case 'member_session.added':
				return {
					"type": "INTERACTION",
					"status": "SUCCEEDED",
					"data": {
						appId: body.data.appId,
						interactionId: body.data.interactionId,
						"interactions": [
							{
								"type": "OPEN_TOAST",
								"id": "toast-id",
								"props": {
									"title": "Welcome!",
									"status": "Success",
									"description": "Welcome! You have been logged in using JWT SSO."
								}
							}
						]
					}
				};
			default:
				return {};
		}
	}

	static getInstance() {
		if (!WebhookController.instance) {
			WebhookController.instance = new WebhookController();
		}
		return WebhookController.instance;
	}
}

export default WebhookController;