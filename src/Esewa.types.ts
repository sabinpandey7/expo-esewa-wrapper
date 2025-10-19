export type paymentOptions = {
  amount: string;
  productName: string;
  reference: string;
  callbackUrl: string;
};

export type credentialsType = {
  clientId: string;
  secretKey: string;
  environment: "test" | "production";
};

export enum resultCode {
  "ok" = -1,
  "cancelled" = 0,
  "failed" = 2,
}

