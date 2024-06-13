import express from "express";
import bodyParser from "body-parser";
import {IncomingMessage} from "node:http";
import WebhookController from "../controller/webhook-controller.js";

const webhookRouter = express.Router();

webhookRouter.use(
	bodyParser.json({
		verify: (req: any, res, buf) => {
			req.rawBody = buf;
		},
	})
);
webhookRouter.use(WebhookController.getInstance().webhookSignatureMiddleware);

webhookRouter.post('/', (req, res) => {
	const response = WebhookController.getInstance().handleWebhook(req.body);
	console.log('POST /webhook/ [1]');
	console.log(JSON.stringify(response, null, 2));
	return res.json(response);
});

export default webhookRouter;