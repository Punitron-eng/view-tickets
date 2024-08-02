<template>
    <div class="card">
      <draggable
        group="test"
        @start="dragStart"
        @end="dragEnd"
        item-key="order"
        v-model="list"
        @change="log"
        v-bind="dragOptions"
      >
        <template #item="{ element }">
          <div class="hover:cursor-pointer h-52 bg-[#313131] text-5xl  text-white text-center shadow-xl shadow-black m-4" :key="key">
           name: {{ element.name }}<br /> id:{{ element.id }}
          </div>
        </template>
      </draggable>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import draggable from 'vuedraggable';
  import data from './data.js'; // Import the data from data.js
  
  const list = ref(data); // Initialize your list with the imported data
  const dragOptions= ()=> {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }

    const log = (e)=>{
        list.value.map((res,index)=>res.id=index+1)
    }
//   const dragStart = (e) => {
//     const item = list.value[e.oldIndex];
//     // Add any necessary logic here for drag start
//   };
  
//   const dragEnd = async (e) => {
//     // Add any necessary logic here for drag end
//   };
  </script>
  
  <style scoped>
  .button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
  </style>
  