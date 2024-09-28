import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground } from "react-native";
import { firestore } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Home({ navigation }) {
    const [animal, setAnimal] = useState([]);

    async function deleteAnimal(id) {
        try {
            await deleteDoc(doc(firestore, 'bdanimal', id));
            Alert.alert("Sucesso", "Animal excluído com sucesso!");
        } catch (error) {
            console.log("Erro ao excluir o animal: ", error);
            Alert.alert("Erro", "Erro ao excluir o animal!");
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'bdanimal'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setAnimal(lista);
        });

        return () => unsubscribe();
    }, []);

    return (
        <ImageBackground source={{ uri: 'https://static.vecteezy.com/ti/fotos-gratis/p2/29138728-bonito-natureza-lago-e-floresta-natureza-panorama-fundo-ai-generativo-gratis-foto.jpg' }} style={estilo.fundo}>
            <View style={estilo.container}>
                <View>
                    <Text style={estilo.title}>Lista de Animais</Text>
                </View>
                <FlatList
                    data={animal}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={estilo.itemContainer}>
                            <TouchableOpacity
                                style={estilo.item}
                                onPress={() => navigation.navigate("Alterar", {
                                    id: item.id,
                                    Animal: item.Animal,
                                    habitat: item.Habitat,
                                })}
                            >
                                <Text>Animal: {item.Animal}</Text>
                                <Text>Habitat: {item.Habitat}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteAnimal(item.id)} style={estilo.deleteButton}>
                                <Text style={estilo.deleteButtonText}>Deletar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={estilo.addButton}
                    onPress={() => navigation.navigate("Cadastrar")}
                >
                    <Text style={estilo.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    fundo: {
        flex: 1,
    },
    title: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 18,
        borderRadius: 22,
        color: 'white',
        fontSize: 25,
        marginVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        elevation: 2,
    },
    item: {
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});