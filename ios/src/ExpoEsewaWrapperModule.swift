import ExpoModulesCore
import UIKit
import EsewaSDK

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
  var clientId: String = ""

  @Field
  var secretKey: String = ""

  @Field
  var environment: String = "test"
}

public class ExpoEsewaWrapperModule: Module, EsewaSDKPaymentDelegate {

  var previousPromise: Promise?
  var sdk: EsewaSDK?

  // MARK: - View Controller Helper

  func topViewController(
    controller: UIViewController? =
      UIApplication.shared.connectedScenes
        .compactMap { $0 as? UIWindowScene }
        .flatMap { $0.windows }
        .first { $0.isKeyWindow }?
        .rootViewController
  ) -> UIViewController? {

    if let navigationController = controller as? UINavigationController {
      return topViewController(controller: navigationController.visibleViewController)
    }

    if let tabController = controller as? UITabBarController {
      return topViewController(controller: tabController.selectedViewController)
    }

    if let presented = controller?.presentedViewController {
      return topViewController(controller: presented)
    }

    return controller
  }

  // MARK: - Module Definition

  public func definition() -> ModuleDefinition {

    Name("ExpoEsewaWrapper")

    AsyncFunction("startEsewaPayment") {
      (cred: Credentials, options: PaymentOptions, promise: Promise) in

      UIFont.loadFonts()

      self.previousPromise = promise

      DispatchQueue.main.async {

        guard let currentVC = self.topViewController() else {
          promise.reject(
            "NO_VIEW_CONTROLLER",
            "Unable to get current view controller"
          )
          return
        }

        self.sdk = EsewaSDK(
          inViewController: currentVC,
          environment: cred.environment == "test"
            ? .development
            : .production,
          delegate: self
        )

        self.sdk?.initiatePayment(
          merchantId: cred.clientId,
          merchantSecret: cred.secretKey,
          productName: options.productName,
          productAmount: options.amount,
          productId: options.reference,
          callbackUrl: options.callbackUrl,
          paymentProperties: [:]
        )
      }
    }
  }

  // MARK: - Esewa Delegate

  public func onEsewaSDKPaymentSuccess(info: [String: Any]) {
    previousPromise?.resolve([
      "success": true,
      "data": info
    ])
  }

  public func onEsewaSDKPaymentError(errorDescription: String) {
    previousPromise?.resolve([
      "success": false,
      "message": errorDescription
    ])
  }
}
