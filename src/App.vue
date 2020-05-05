<template>
  <v-app>
    <v-app-bar app>
      <router-link to="/">Home</router-link> |
      <router-link to="/create">Stwórz turniej!</router-link>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
