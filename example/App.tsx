import * as ExpoEsewaWrapper from "expo-esewa-wrapper";
import { Button, View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Hello"
        onPress={async () =>
          console.log(
            await ExpoEsewaWrapper.startEsewaPayment(
              {
                clientId:
                  "JB0BBQ4aD0UqIThFJwAKBgAXEUkEGQUBBAwdOgABHD4DChwUAB0R",
                secretKey: "BhwIWQQADhIYSxILExMcAgFXFhcOBwAKBgAXEQ==",
                environment: "test",
              },
              {
                amount: "100",
                productName: "test",
                reference: "opr-123132",
                callbackUrl: "http://localhost:8999",
              }
            )
          )
        }
      />
    </View>
  );
}

