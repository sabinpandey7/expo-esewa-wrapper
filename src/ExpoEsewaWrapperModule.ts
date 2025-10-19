import { requireNativeModule } from "expo";
import { credentialsType, paymentOptions, resultCode } from "./Esewa.types";

const ExpoEsewaWrapperModule = requireNativeModule("ExpoEsewaWrapper");

export async function startEsewaPayment(
  cred: credentialsType,
  options: paymentOptions
) {
  const resp = await ExpoEsewaWrapperModule.startEsewaPayment(cred, options);

  console.log(resp);
  if (resp.resultCode === resultCode.ok) {
    let data = "";

    try {
      data = JSON.parse(resp.data);
    } catch (error) {
      data = resp.data;
    }

    return {
      code: resp.resultCode,
      success: true,
      data: data,
    };
  }
  if (resp.resultCode === resultCode.cancelled) {
    return {
      code: resp.resultCode,
      success: false,
      message: "Cancelled by user",
    };
  }
  return {
    code: resp.resultCode,
    success: false,
    message: resp.data,
  };
}

