import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        tasks: [],
        id: 1,
    }),
    actions: {
        addTask(text) {
            if (text.trim().length == 0) return
            const now = new Date()
            const timestamp = Date.parse(new Date())

            this.tasks.push({
                id: this.id,
                text,
                completed: false,
                createdAt: now,
                timestamp
            })

            this.id++
        },
        toggleTask(id) {
            const task = this.tasks.find(t => t.id === id)
            if (task) task.completed = !task.completed
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(t => t.id !== id)
        },
        resetTask() {
            this.task = []
            this.id = 0
        }
    }
})