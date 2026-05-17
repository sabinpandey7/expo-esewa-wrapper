# Expo eSewa Wrapper

React Native Expo module for integrating the eSewa Payment SDK in Android/IOS applications.

---

# Features

- Expo native module support
- eSewa SDK integration
- Supports test & production environments
- Promise-based API
- Simple payment initialization

---

# Installation

Install the package:

```bash
npm install expo-esewa-wrapper
yarn add expo-esewa-wrapper
```

# USAGE

```tsx

import * as ExpoEsewaWrapper from "expo-esewa-wrapper";
import { Button, View } from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Pay with eSewa"
        onPress={async () => {
          try {
            const result = await ExpoEsewaWrapper.startEsewaPayment(
              {
                clientId: "YOUR_CLIENT_ID",
                secretKey: "YOUR_SECRET_KEY",
                environment: "test",
              },
              {
                amount: "100",
                productName: "Test Product",
                reference: "order-123",
                callbackUrl: "https://yourdomain.com/callback",
              }
            );

            console.log(result);
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </View>
  );
}
```