import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useProPresenterData } from '../../libs/ProPresenterDataProvider';

function Clear({ action, label, iconSource }) {
  const { sendRequest } = useProPresenterData();

  const handleClear = () => {
    // Send the command associated with the action
    const command = action;
    sendRequest(command);
    console.log('Command : ', command);
    console.log(`Command to send:\n${JSON.stringify(command)}`);
  }; 

  return (
    <TouchableOpacity style={styles.button} onPress={handleClear}>
      <Image source={iconSource} style={styles.icon} alt={label} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue', // Adjust the background color as needed
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: 'green', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize:11,
    textAlign:'center',
    color: 'white',
    marginTop: 5,
  },
  icon: {
    width: 35,
    height: 35,
  },
});

export default Clear;
