import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { firestore } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function Alterar({ route, navigation }) {
    const id = route.params.id;
    const [Animal, setAnimal] = useState(route.params.Animal);
    const [Habitat, setHabitat] = useState(route.params.Habitat);

    async function alterar() {
        try {
            await updateDoc(doc(firestore, 'bdanimal', id), {
                Animal: Animal,
                Habitat: Habitat
            });
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
                    onChangeText={setHabitat} // Corrigido aqui
                    value={Habitat} // Corrigido aqui
                />
                <TouchableOpacity style={styles.button} onPress={alterar}>
                    <Text style={styles.textButton}>Alterar</Text>
                </TouchableOpacity>
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
});
