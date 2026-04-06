import React, {useCallback, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert} from 'react-native'

import * as ImagePicker from 'expo-image-picker';



const DEFAULT_PROFILE = require("../assets/images/profile_placeholder.png")
const DEFAULT_RECT = require("../assets/rect_placeholder.jpg")
const MAX_IMAGES = 3; //can change later, max images a user can upload

type Props = {
    label?: string;
    onChange?: (uri: string) => void;
    initialImage?: string | null;
    variant?: 'rect' | 'circle';
    size?: number;
    width?: number;
    height?: number;
};

const ImageSelect = ({
    label = "Choose Image",
    onChange,
    initialImage = null,
    variant = 'rect',
    size = 120,
    width = 200,
    height = 200,
}: Props) => {
    const [file, setFile] = useState<string | null>(initialImage);
    const [error, setError] = useState(null);


const pickImage = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera roll permission required to upload images.");
        return;}
       
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                const uri = result.assets[0].uri;
                setFile(uri);
                setError(null);
                onChange && onChange(uri);
            }

    

    };

    const imageStyle =
    variant === "circle"
    ? {
        width:size,
        height: size,
        borderRadius: size/2
    }
    :{
        width,
        height,
        borderRadius: 10,



    };

    const getImageSource =() => {
        if (file) {
            return {uri: file};

        }
        if (variant === "circle") {
            return DEFAULT_PROFILE
        }
        return DEFAULT_RECT
    };
    return (
        <View style={styles.container}>
            <Image source={getImageSource()} style={imageStyle} />
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>

            {/* {file ? ( */}
                {/* <Image source={getImageSource()} style={imageStyle} /> */}
            {/* // ) : (
            //     error && <Text style={styles.errorText}>{error}</Text>
            // )} */}
        </View>
    );


};
export default ImageSelect;
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        // width: "100%",
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#D3D3D3",
        padding: 5,
        borderRadius: 8,
        
    },
    buttonText: {color: '#000'},
    errorText: {color: 'red'},

});