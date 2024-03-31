<template>
  <v-container class="pt-5">
    <h1 class="mb-3">To-Do List</h1>
    <v-form @submit.prevent="addTask">
      <v-row>
        <v-col cols="8">
          <v-text-field v-model="newTask.label" label="Новая задача"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn type="submit" color="primary" class="mt-5">Добавить</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-divider class="my-5"></v-divider>
    <v-list>
      <v-list-item v-for="task in tasks" :key="task.id">
        <div class="d-flex">
          <v-list-item-content>
            <v-list-item-title>{{ task.label }}</v-list-item-title>
            <v-list-item-subtitle>Статус: {{ task.status }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="ml-auto">
            <v-btn @click="editTask(task)" class="mr-2">Редактировать</v-btn>
            <v-btn @click="deleteTask(task)">Удалить</v-btn>
          </v-list-item-action>
        </div>
      </v-list-item>
    </v-list>
    <v-dialog v-model="isEditing" max-width="500">
      <v-card>
        <v-card-title>Редактировать задачу</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedTask.label" label="Редактировать задачу"></v-text-field>
          <v-select
              v-model="editedTask.status"
              :items="statusOptions"
              label="Статус"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="saveEdit">Сохранить</v-btn>
          <v-btn @click="cancelEdit">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { uniqueId } from "lodash";
import {
  VContainer,
  VForm,
  VTextField,
  VBtn,
  VDivider,
  VList,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VListItemSubtitle,
  VListItemAction,
  VSelect,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions
} from 'vuetify/lib/components'

export default {
  name: "ToDoList",
  components: {
    VContainer,
    VForm,
    VTextField,
    VBtn,
    VDivider,
    VList,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VListItemSubtitle,
    VListItemAction,
    VSelect,
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions
  },
  setup() {
    const newTask = ref({
      label: "",
      status: "Новая",
      id: null,
      created_at: new Date().toISOString(),
    });

    const editedTask = ref({
      label: "",
      status: "",
      id: null,
      created_at: null,
    });

    const isEditing = ref(false);

    const tasks = ref([]);

    const statusOptions = [
       "Новая",
       "Выполнена",
       "Отменена",
    ];

    const addTask = () => {
      if (newTask.value.label.trim() !== "") {
        newTask.value.id = uniqueId();
        tasks.value.push(newTask.value);
        newTask.value = {
          label: "",
          status: "Новая",
          id: null,
          created_at: new Date().toISOString(),
        };
      }
    };

    const deleteTask = (task) => {
      const index = tasks.value.indexOf(task);
      if (index !== -1) {
        tasks.value.splice(index, 1);
      }
    };

    const editTask = (task) => {
      editedTask.value = { ...task };
      isEditing.value = true;
    };

    const saveEdit = () => {
      const index = tasks.value.findIndex(t => t.id === editedTask.value.id);
      if (index !== -1) {
        tasks.value.splice(index, 1, editedTask.value);
      }
      isEditing.value = false;
    };

    const cancelEdit = () => {
      isEditing.value = false;
    };

    const changeStatus = (task) => {
      return (value) => {
        task.status = value;
      };
    };

    return {
      newTask,
      editedTask,
      isEditing,
      tasks,
      statusOptions,
      addTask,
      deleteTask,
      editTask,
      saveEdit,
      cancelEdit,
      changeStatus
    };
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
