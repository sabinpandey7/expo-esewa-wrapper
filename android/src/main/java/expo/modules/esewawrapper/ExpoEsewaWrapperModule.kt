package expo.modules.esewawrapper


import android.content.Context
import android.content.Intent
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.exception.toCodedException
import android.os.Bundle
import expo.modules.kotlin.Promise
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record




import com.f1soft.esewapaymentsdk.EsewaConfiguration
import com.f1soft.esewapaymentsdk.EsewaPayment
import com.f1soft.esewapaymentsdk.ui.screens.EsewaPaymentActivity


class paymentOptions : Record {
  @Field
  val amount: String = "0"
  @Field
  val productName: String = "test product"

  @Field
  val reference: String = ""

  @Field
  val callbackUrl: String = "https://localhost:8069"

}

class credentials : Record {
  @Field
  val clientId: String = "JB0BBQ4aD0UqIThFJwAKBgAXEUkEGQUBBAwdOgABHD4DChwUAB0R"

  @Field
  val secretKey: String = "BhwIWQQADhIYSxILExMcAgFXFhcOBwAKBgAXEQ=="

  @Field
  val environment: String = "test"

}


class ExpoEsewaWrapperModule : Module() {

  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  private var pendingPromise: Promise? = null


  override fun definition() = ModuleDefinition {
 
    Name("ExpoEsewaWrapper")

    AsyncFunction("startEsewaPayment") {cred:credentials,options:paymentOptions, promise:Promise ->
        
        val eSewaConfiguration: EsewaConfiguration = EsewaConfiguration(clientId =cred.clientId, secretKey =cred.secretKey, environment = EsewaConfiguration.ENVIRONMENT_TEST)
        val eSewaPayment: EsewaPayment = EsewaPayment(options.amount,options.productName,options.reference,options.callbackUrl);
        val intent: Intent= Intent(context,
            EsewaPaymentActivity::class.java)
        intent.putExtra(EsewaConfiguration.ESEWA_CONFIGURATION, eSewaConfiguration)
        intent.putExtra(EsewaPayment.ESEWA_PAYMENT, eSewaPayment)
        try {
        appContext.throwingActivity.startActivityForResult(intent, 12223)
        pendingPromise = promise
      } catch (e: Throwable) {
        promise.reject(e.toCodedException())
      }
    }

    OnActivityResult { _, payload ->
       if (payload.requestCode != 12223) {
        return@OnActivityResult
      }

       val response = Bundle().apply {
        putInt("resultCode", payload.resultCode)
        
        if (payload.data != null) {
            payload.data?.let { putString("data", it.getStringExtra(EsewaPayment.EXTRA_RESULT_MESSAGE)) }
          }
       }

      pendingPromise?.resolve(response)      
      pendingPromise = null

    }
  
  }
}
