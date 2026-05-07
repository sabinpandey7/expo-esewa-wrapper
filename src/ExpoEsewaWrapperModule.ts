import { requireNativeModule } from "expo";
import { credentialsType, paymentOptions, resultCode } from "./Esewa.types";
import { Platform } from "react-native";

const ExpoEsewaWrapperModule = requireNativeModule("ExpoEsewaWrapper");

export async function startEsewaPayment(
  cred: credentialsType,
  options: paymentOptions
) {
  const resp = await ExpoEsewaWrapperModule.startEsewaPayment(cred, options);
  
  if (Platform.OS =='android') {
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

  if(resp.success){
    return {
      code: -1,
      success: true,
      data: resp.data,
    }
  }
  return {
    code:resultCode.failed,
    success:false,
    message:resp.message
  }
  
}

