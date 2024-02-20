import React from 'react';
import { View } from 'react-native';

function Center({ children }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
      {children}
    </View>
  );
}

export default Center;
