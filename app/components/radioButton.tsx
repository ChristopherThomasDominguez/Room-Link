import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';

type Props = {
  isSelected: boolean;
  onPress: () => void;
  label: string;
};

const RadioButton = ({ isSelected, onPress, label }: Props) => {
    return(
        // <View style={styles.wrap}>
        <TouchableOpacity 
        style={styles.optionRow}
        // style={[styles.circleButton, isSelected && styles.selectedButton]}
        onPress={onPress}>
            <View style={styles.outerCircle}>
                {isSelected && <View style={styles.innerCircle}/>}
            </View>
            <Text style={styles.labelText}>{label}</Text>
        </TouchableOpacity>
        /* </View> */


    );
};
const styles = StyleSheet.create({
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 20,
  },

  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#006E78',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#006E78',
  },

  labelText: {
    fontSize: 14,
  },
});

// const styles = StyleSheet.create({
//     wrap: {
//         // flex:1,
//         // height: '50%',
//         width: '100%',

//     },

//     circleButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 24,
//         width: 24,
//         borderRadius: 12,
//         borderColor: "#006E78",
//         backgroundColor: '#FFF',
//         borderWidth:2,
//         gap: 20,
//         justifyContent: 'space-between',
//         marginBottom: 10,
//         marginLeft: 20,
//         padding:10,

        
//     },
//     selectedButton: {
//         backgroundColor: '#006E78'
//     },

//     label: {
//         fontSize: 16,
//         // height,
//     },

//     outerCircle: {
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         // backgroundColor: "#006E78",
//         // alignItems: "center",
//         // justifyContent: "center",
//         // backgroundColor: '#fff',
//         // height: 22,
//         // width: 22,
//         // borderRadius: 12,
//         // backgroundColor: '#006E78',
//         borderWidth:2,
//         marginRight: 10,
//         // alignItems: 'center',

//         // justifyContent: 'center',
//         // height: 12,
//         // width: 12,
//         // borderRadius: 6,
//         // backgroundColor: '#84C5BE',
//         // borderWidth:2,
//         // alignItems: 'center',

//         // justifyContent: 'center',
//         // marginRight: 10,
//     },

//     innerCircle: {
//         height: 12,
//         width: 12,
//         borderRadius: 6,
//         backgroundColor: '#006E78',
//         // borderColor: "#006E78",
//         // borderWidth:2,
//         // alignItems: 'center',

//         // justifyContent: 'center',
//         // height: 14,
//         // width: 12,
//         // borderRadius: 6,
//         // backgroundColor: '#006E78'
//     },
//     labelText: {
//         padding: 20,
        
//     },
// })


export default RadioButton;