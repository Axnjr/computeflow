// endpoint to deploy a reserved ec2 instance for 1,2 or 3 years.
// this will be used by clients who have a long term commitment
// we will keep an option to reserve a machine for atleast 1 year for cost reduction

// will either use Reserved instances or Saving plans

// import { EC2Client, PurchaseReservedInstancesOfferingCommand } from "@aws-sdk/client-ec2"; 
// const client = new EC2Client(config);
// // PurchaseReservedInstancesOfferingRequest
// const input = { 
//     InstanceCount: Number("int"), // required
//     ReservedInstancesOfferingId: "STRING_VALUE", // required
//     DryRun: true || false,
//     LimitPrice: { // ReservedInstanceLimitPrice
//         Amount: Number("double"),
//         CurrencyCode: "USD",
//     },
//     PurchaseTime: new Date("TIMESTAMP"),
// };
// const command = new PurchaseReservedInstancesOfferingCommand(input);
// const response = await client.send(command);
// { // PurchaseReservedInstancesOfferingResult
//   ReservedInstancesId: "STRING_VALUE",
// };