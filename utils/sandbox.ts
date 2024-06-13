import BlueBird from "bluebird";
// import {uploadFile} from "./upload.js";

// import ServiceController from "../controller/service-controller.js";

new BlueBird(async (resolve, reject) => {
	// const filePath = "./utils/sample.csv";
	// const res = await uploadFile(filePath, "http://localhost:3005/upload");
	// console.log(res);
	// const response = await ServiceController.getInstance().getProductsPricing([]);
	// const res = await ServiceController.getInstance().createPricing(3341857, 22084604, 28895000);
	// const res = await ServiceController.getInstance().getPricingDetails([22084604]);
	// console.log(JSON.stringify(res));
	// resolve(res);
}).then((result) => {
	if (result) {
		console.log(result);
	}
	process.exit(0);
});