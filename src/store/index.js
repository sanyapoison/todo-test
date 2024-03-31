import { createStore } from 'vuex'

const store = createStore({
    state: {
        tasks: [],
    },
    mutations: {
        addTaskMutation(state, task) {
            console.log(state);
            console.log(task);
            state.tasks.push(task);
        },
        deleteTaskMutation(state, task) {
            state.tasks = state.tasks.filter((t) => t.id !== task.id);
        },
        editTaskMutation(state, editedTask) {
            const index = state.tasks.findIndex((task) => task.id === editedTask.id);
            if (index !== -1) {
                state.tasks.splice(index, 1, editedTask);
            }
        },
        changeTaskStatusMutation(state, task) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const index = state.tasks.findIndex((t) => t.id === task.id);
                    if (index !== -1) {
                        state.tasks.splice(index, 1, task);
                        resolve();
                    }
                }, 500); // Emulating async behavior with a timeout
            });
        },
    },
});

export default store;