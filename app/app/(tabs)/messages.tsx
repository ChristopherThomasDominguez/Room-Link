import { View, Image, StyleSheet, FlatList } from 'react-native' 
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';


// define a type for the message review
type MessagePreview = {
    id: number;
    name: string;
    message: string;
    avatar: any;
}


// create a list of message previews
let messagePreviews: MessagePreview[] = [
    {
        id: 1,
        name: "John Doe",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra mi eget libero placerat cursus.",
        avatar: require('../../assets/images/avatars/avatar_1.png')
    },
    {
        id: 2,
        name: "Jane Doe",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra mi eget libero placerat cursus.",
        avatar: require('../../assets/images/avatars/avatar_2.png')
    },
    {
        id: 3,
        name: "Jane Smith",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra mi eget libero placerat cursus.",
        avatar: require('../../assets/images/avatars/avatar_3.png')
    },
    {
        id: 4,
        name: "John Smith",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra mi eget libero placerat cursus.",
        avatar: require('../../assets/images/avatars/avatar_4.png')
    },
    {
        id: 5,
        name: "Jane Brown",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra mi eget libero placerat cursus.",
        avatar: require('../../assets/images/avatars/avatar_5.png')
    },
    {
        id: 6,
        name: "John Brown",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra mi eget libero placerat cursus.",
        avatar: require('../../assets/images/avatars/avatar_6.png')
    }
]


function MessageRow({ item }: { item: MessagePreview }) {
    return (
        <View style={styles.rowWrapper}>
            <View style={styles.row}>
                <Image source={item.avatar} style={styles.avatar} />
                <ThemedView style={styles.textCol}>
                    <ThemedText style={styles.name} type="defaultSemiBold">
                        {item.name}
                    </ThemedText>
                    <ThemedText style={styles.preview} numberOfLines={1}>
                        {item.message}
                    </ThemedText>
                </ThemedView>
            </View>


            <View style={styles.shortDivider} />
        </View>
    );
}


// create a component that displays the list of message previews
export default function Messages() { 
    return (
        // use FlatList so that we can scroll through the list of message previews
        <FlatList style={{ backgroundColor: '#fff' }}
            data = {messagePreviews}
            keyExtractor = {item => item.id.toString()}
            renderItem={({ item }) => <MessageRow item={item} />}
            contentContainerStyle={styles.listContent}
        />

    )
}


// define styles for the message previews
const styles = StyleSheet.create({
    listContent: {
        paddingTop: 12,
        paddingBottom: 24,
    },
    rowWrapper: {
        paddingHorizontal: 22,
        paddingVertical: 10, // space between rows
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 14,
    },
    textCol: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    name: {
        fontSize: 14,
    },
    preview: {
        marginTop: 4,
        fontSize: 12,
        opacity: 0.7,
    },
    shortDivider: {
        alignSelf: 'center',
        width: 90,          // short line like Figma
        height: 1,
        backgroundColor: '#d9d9d9',
        marginTop: 15,
        borderRadius: 1,
        opacity: 0.9,
    },
});
