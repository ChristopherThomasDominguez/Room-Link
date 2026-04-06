import React,  {useState} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';


type Props = {
  data: string[];
  onSelect: (item: string) => void;
};

const InLineDropdown = ({ data, onSelect }: Props) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string | null>(null)
    const toggleDropdown = () => setDropdownVisible(!isDropdownVisible)
    const handleSelect = (item: string) => {
        setSelectedValue(item);
        onSelect(item);
        setDropdownVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
                <Text style={styles.defaultText}>
                    {selectedValue || "Select an option"}{" "}
                </Text>
            </TouchableOpacity>
            
            {isDropdownVisible && (
                <View style={StyleSheet.absoluteFill}>

                <View style ={styles.dropdown}>
                    <FlatList 
                    data = {data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity
                        style ={[styles.option, selectedValue === item && styles.selectedOption]}
                        onPress={() => handleSelect(item)}>

                            <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                    )}
                    />
                    </View>
                    </View>
            )}
    
                    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // margin:2,
        position: "relative",
        borderWidth:2,
        borderRadius: 8,
        
        // width:'50%', 
    },
    
    button: {
        padding:15,
        backgroundColor: '#fff',
        borderRadius: 5,
        width:'100%',
    },
    defaultText:{
        textAlign: "center",
    },
    dropdown: {
        position: "absolute",
        top: 55,
        left:0,
        right: 0,
        backgroundColor: 'white',
        borderRadius:5,
        shadowColor: '#000',
        maxHeight:200,
        borderWidth:2,

    },

    option: {
        padding: 15,
    },

    optionText: {
        padding: 5,
        fontSize:13,
    },

    selectedOption: {
        backgroundColor: '#006E78'
    },
    

});

export default InLineDropdown;
