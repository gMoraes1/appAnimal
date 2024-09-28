import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground, FlatList } from 'react-native';
import { firestore } from '../firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';

export default function Alterar({ route, navigation }) {

    const id = route.params.id;

    const [Animal, setAnimal] = useState(route.params.Animal);
    const [Habitat, setHabitat] = useState(route.params.Habitat);

    async function alterar(id, Animal, Habitat) {
        try {
            await updateDoc(doc(collection(firestore, "bdanimal"),id),   {
                Animal: Animal,
                Habitat: Habitat
            })
            Alert.alert("Sucesso", "Animal alterado com sucesso!");
            navigation.navigate('Home');
        } catch (error) {
            console.log("Erro ao alterar o animal: ", error);
            Alert.alert("Erro", "Erro ao alterar o animal!");
        }
    }

    return (
        <ImageBackground source={{ uri: 'https://static.vecteezy.com/ti/fotos-gratis/p2/29138728-bonito-natureza-lago-e-floresta-natureza-panorama-fundo-ai-generativo-gratis-foto.jpg' }} style={styles.image}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.titulo}>Alterar Animal</Text>
                </View>
                <TextInput
                    autoCapitalize='words'
                    style={styles.input}
                    placeholder="Nome do Animal"
                    onChangeText={setAnimal}
                    value={Animal}
                />
                <TextInput
                    autoCapitalize='words'
                    style={styles.input}
                    placeholder="Digite o Habitat do animal"
                    onChangeText={setHabitat}
                    value={Habitat}
                />
                <TouchableOpacity style={styles.button} onPress={() => alterar(id, Animal, Habitat)}>
                    <Text style={styles.textButton}>Alterar</Text>
                </TouchableOpacity>
                <FlatList
                    data={[]} // Ensure this is an array
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text>{item.name}</Text>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 10,
        padding: 10,
        width: 300,
        backgroundColor: '#FFF',
        fontSize: 15,
        borderRadius: 10,
    },
    button: {
        marginTop: 10,
        padding: 10,
        width: 300,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});