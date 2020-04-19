import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {

  const [repos, setRepo] = useState([]);

  useEffect(() => {

    loadRepo();

  }, []);

  async function loadRepo(){

    const response = await api.get('repositories');

    setRepo(response.data);

  }

  async function handleLikeRepository(id) {

    await api.post(`repositories/${id}/like`);

    loadRepo();    
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList
          data={repos}
          keyExtractor={repo => repo.id}
          renderItem={({ item: repo }) => (

            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repo.title}</Text>


              <FlatList
                data={repo.techs}
                keyExtractor={tech => tech}
                renderItem={({ item: tech }) => (

                  <View style={styles.techsContainer}>
                    <Text style={styles.tech} key={tech}>
                      {tech}
                    </Text>
                  </View>

                )} />


              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}                  
                  testID={`repository-likes-${repo.id}`}
                >
                  { repo.likes > 1 ? `${repo.likes} curtidas` : `${repo.likes} curtida`} 
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repo.id)}                
                testID={`like-button-${repo.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>

          )} />

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
