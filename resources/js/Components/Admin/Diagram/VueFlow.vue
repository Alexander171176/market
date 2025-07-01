<script setup>
import {ref} from 'vue'
import {VueFlow, useVueFlow} from '@vue-flow/core'
import {Background} from '@vue-flow/background'
import {ControlButton, Controls} from '@vue-flow/controls'
import {MiniMap} from '@vue-flow/minimap'
import {initialEdges, initialNodes} from '@/utils/initial-elements.js' // массив элементов и линий
import Icon from '@/Components/Admin/Diagram/Icon.vue' // панель значков управления слева

const {onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject} = useVueFlow()

const nodes = ref(initialNodes)
const edges = ref(initialEdges)
const dark = ref(false)

onInit((vueFlowInstance) => {
    vueFlowInstance.fitView()
})

onNodeDragStop(({event, nodes, node}) => {
    // console.log('Node Drag Stop', {event, nodes, node})
})

onConnect((connection) => {
    addEdges(connection)
})

function updatePos() {
    nodes.value = nodes.value.map((node) => {
        return {
            ...node,
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400,
            },
        }
    })
}

function logToObject() {
    console.log(toObject())
}

function resetTransform() {
    setViewport({x: 0, y: 0, zoom: 1})
}

function toggleDarkMode() {
    dark.value = !dark.value
}
</script>

<template>
    <div class="flow-container">
        <VueFlow
            :nodes="nodes"
            :edges="edges"
            :class="{ dark }"
            class="basic-flow"
            :default-viewport="{ zoom: 1.5 }"
            :min-zoom="0.2"
            :max-zoom="4"
        >
            <Background pattern-color="#aaa" :gap="16"/>
            <MiniMap/>
            <Controls position="top-left">
                <ControlButton title="Reset Transform" @click="resetTransform">
                    <Icon name="reset"/>
                </ControlButton>
                <ControlButton title="Shuffle Node Positions" @click="updatePos">
                    <Icon name="update"/>
                </ControlButton>
                <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
                    <Icon v-if="dark" name="sun"/>
                    <Icon v-else name="moon"/>
                </ControlButton>
                <ControlButton title="Log `toObject`" @click="logToObject">
                    <Icon name="log"/>
                </ControlButton>
            </Controls>
        </VueFlow>
    </div>
</template>

<style scoped>
.flow-container {
    width: 100%;
    height: 100vh; /* или укажите конкретные значения */
}

.basic-flow.dark {
    background-color: #333;
}

.vue-flow__minimap {
    transform: scale(75%);
    transform-origin: bottom right;
}

.basic-flow.dark {
    background: #2d3748;
    color: #fffffb;
}

.basic-flow.dark .vue-flow__node {
    background: #4a5568;
    color: #fffffb;
}

.basic-flow.dark .vue-flow__node.selected {
    background: #333;
    box-shadow: 0 0 0 2px #2563eb;
}

.basic-flow .vue-flow__controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.basic-flow.dark .vue-flow__controls {
    border: 1px solid #FFFFFB;
}

.basic-flow .vue-flow__controls .vue-flow__controls-button {
    border: none;
    border-right: 1px solid #eee;
}

.basic-flow .vue-flow__controls .vue-flow__controls-button svg {
    height: 100%;
    width: 100%;
}

.basic-flow.dark .vue-flow__controls .vue-flow__controls-button {
    background: #333;
    fill: #fffffb;
    border: none;
}

.basic-flow.dark .vue-flow__controls .vue-flow__controls-button:hover {
    background: #4d4d4d;
}

.basic-flow.dark .vue-flow__edge-textbg {
    fill: #292524;
}

.basic-flow.dark .vue-flow__edge-text {
    fill: #fffffb;
}
</style>
