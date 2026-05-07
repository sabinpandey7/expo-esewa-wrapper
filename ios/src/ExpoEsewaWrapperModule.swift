import ExpoModulesCore

import UIKit
import EsewaSDK
// Define the PaymentOptions record
struct PaymentOptions: Record {
  @Field
  var amount: String = "0"

  @Field
  var productName: String = "test product"

  @Field
  var reference: String = ""

  @Field
  var callbackUrl: String = "https://localhost:8069"
}
	
struct Credentials: Record {
  @Field
  var clientId: String = "JB0BBQ4aD0UqIThFJwAKBgAXEUkEGQUBBAwdOgABHD4DChwUAB0R"

  @Field
  var secretKey: String = "BhwIWQQADhIYSxILExMcAgFXFhcOBwAKBgAXEQ=="

  @Field
  var environment: String = "test"
}


public class ExpoEsewaWrapperModule: Module , EsewaSDKPaymentDelegate {
  var previousPromise:Promise? = nil
  var sdk: EsewaSDK!
  public func definition() -> ModuleDefinition {
    Name("ExpoEsewaWrapper")

    AsyncFunction("startEsewaPayment") { (cred:Credentials,options:PaymentOptions, promise:Promise) in
     UIFont.loadFonts()
      previousPromise = promise
      guard let currentVC = UIApplication.shared.keyWindow?.rootViewController else {
          print("❌ Unable to get current view controller")
          return
      }
      DispatchQueue.main.async {
         
          self.sdk = EsewaSDK(inViewController: currentVC, environment: .development, delegate: self)
          self.sdk.initiatePayment(merchantId: cred.clientId, merchantSecret: cred.secretKey, productName: options.productName, productAmount: options.amount, productId: options.reference, callbackUrl: options.callbackUrl, paymentProperties: [:])        }
    }
  }
  
  public func onEsewaSDKPaymentSuccess(info:[String:Any]) {
      previousPromise?.resolve([
        "success":true,
        "data":info
      ])
        // Called when the payment is success. Info contains the detail of transaction.
    }

  public func onEsewaSDKPaymentError(errorDescription: String) {
      previousPromise?.resolve([
          "success":false,
          "message":errorDescription
      ])
      
        // Called when there is error with the description of the error.
    }
}

			
