<script setup>
import lang from '@/common/lang.json' with { type: 'json' }
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import ButtonAdd from '@/components/ui/button/ButtonAdd.vue'
import ButtonDelete from '../ui/button/ButtonDelete.vue'
import ButtonReset from '../ui/button/ButtonClear.vue'
import ButtonComplete from '../ui/button/ButtonComplete.vue'
import { onUnmounted } from 'vue'

const todoStore = useTodoStore()
const task = ref('')

function addTask() {
    todoStore.addTask(task.value)
    clearText()
}

function clearText() {
    task.value = '';
}

function deleteTask(id) {
    todoStore.deleteTask(id)
}

function markTaskComplete(id) {
    todoStore.toggleTask(id)
}

onUnmounted(() => {
    todoStore.resetTask()
})
</script>

<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">{{ lang.APP.NAME }}</h1>

    <div class="input-group mb-3">
        <input
            v-model="task"
            @keyup.enter="addTask"
            type="text"
            class="form-control"
            placeholder="Add something to be done here..."
        ></input>
        <ButtonAdd @click="addTask"></ButtonAdd>
        <ButtonReset @click="clearText"></ButtonReset>
    </div>

    <ul class="list-group">
        <li
            v-for="task in todoStore.tasks"
            :key="task.id"
            class="list-group-item d-flex justify-content-between align-items-center"
            :class="{ 'list-group-item-success': task.completed }"
        >
            <div>
                <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
                    {{ task.text }}
                </span>
                <br />
                <small class="text-muted">{{ lang.LABEL.CREATED }}: {{ task.createdAt }}</small>
            </div>
            <div class="btn-group">
                <ButtonComplete class="btn-sm" @click="markTaskComplete(task.id)">
                    {{ (!task.completed) ? 'Check' : 'Undo' }}
                </ButtonComplete>
                <ButtonDelete class="btn-sm" @click="deleteTask(task.id)"></ButtonDelete>
            </div>
        </li>
    </ul>
  </div>
</template>