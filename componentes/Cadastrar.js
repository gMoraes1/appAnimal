import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Cadastrar({ navigation }) {
    const [Animal, setAnimal] = useState(null);
    const [Habitat, setHabitat] = useState(null);

    async function Cadastrar() {
        try {
            const docRef = await addDoc(collection(firestore, 'bdanimal'), {
                Animal: Animal,
                Habitat: Habitat
            });
            console.log("Cadastro relizado com sucesso: ", docRef.id);
            Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao cadastrar o animal: ", error);
            Alert.alert("Erro", "Erro ao cadastrar o animal!");
        }
    }

        return (
            <ImageBackground source={{ uri: 'https://static.vecteezy.com/ti/fotos-gratis/p2/29138728-bonito-natureza-lago-e-floresta-natureza-panorama-fundo-ai-generativo-gratis-foto.jpg' }} style={styles.fundo}>
                <View style={styles.container}> 
                <View>
                    <Text style={styles.titulo}>Cadastrar Animal</Text>
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
                        placeholder="Habitat do Animal"
                        onChangeText={setHabitat}
                        value={Habitat}
                    />
                    <TouchableOpacity
                        style={styles.btenviar}
                        onPress={Cadastrar}
                        >
                            <Text style={styles.btntxtenviar}>Cadastrar</Text>
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
        fundo: {
            flex: 1,
        },
        titulo: {
            fontSize: 20,
            color: '#fff',
            marginBottom: 20,
        },
        input: {
            backgroundColor: '#fff',
            width: '90%',
            marginBottom: 15,
            borderRadius: 8,
            padding: 10,
        },
    });