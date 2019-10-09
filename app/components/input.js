import React from "react";
import {TextInput, StyleSheet} from 'react-native';

const Input = ({value, changeText, addTodo}) => (
    <TextInput
        value={value}
        onChangeText = {changeText}
        onEndEditing={addTodo}
        style={styles.input}
        placeholder={"오늘 어떤 일을 하실건가요?"}
        maxLength={30}
        returnKeyType= "done"/>
);

const styles = StyleSheet.create({
    input: {
        fontSize: 25,
        paddingTop: 15,
        borderWidth: 1
    }
})

export default Input;