<template>
  <div class="calligraphy-page">
    <!-- Top Bar -->
    <div class="top-bar">
      <el-button @click="router.push('/')" link>
        <el-icon class="back-icon"><ArrowLeft /></el-icon> 返回
      </el-button>
      <div class="input-section">
        <span class="label">练习文字：</span>
        <el-input 
          v-model="inputText" 
          placeholder="请输入想要练习的字" 
          class="text-input"
          :maxlength="10"
          show-word-limit
        />
      </div>
    </div>

    <!-- Main Drawing Area -->
    <div class="drawing-area">
      <div 
        v-for="(char, index) in characters" 
        :key="char + '-' + index" 
        class="character-block"
      >
        <!-- Background Grid (Mi Zi Ge) -->
        <div class="grid-background">
          <div class="line horizontal"></div>
          <div class="line vertical"></div>
          <div class="line diagonal-1"></div>
          <div class="line diagonal-2"></div>
        </div>

        <!-- Guide Text -->
        <span class="guide-text">{{ char }}</span>

        <!-- Canvas for drawing -->
         <canvas 
          :ref="el => setCanvasRef(el, index)"
          class="drawing-canvas"
          @mousedown="startDrawing($event, index)"
          @mousemove="draw($event, index)"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
          @touchstart.prevent="startDrawing($event, index)"
          @touchmove.prevent="draw($event, index)"
          @touchend.prevent="stopDrawing"
        ></canvas>
      </div>
    </div>

    <!-- Tools -->
    <div class="tools-bar">
      <div class="colors">
        <div 
          class="tool-btn color-btn black" 
          :class="{ active: currentTool === 'pen' && currentColor === '#000000' }"
          @click="selectColor('#000000')"
        ></div>
        <div 
          class="tool-btn color-btn red" 
          :class="{ active: currentTool === 'pen' && currentColor === '#FF0000' }"
          @click="selectColor('#FF0000')"
        ></div>
        <div 
          class="tool-btn color-btn blue" 
          :class="{ active: currentTool === 'pen' && currentColor === '#0000FF' }"
          @click="selectColor('#0000FF')"
        ></div>
      </div>

      <div class="separator"></div>

      <div class="actions">
        <el-button 
          @click="selectEraser" 
          :type="currentTool === 'eraser' ? 'primary' : 'default'"
          circle
        >
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button @click="clearAll" circle>
          <el-icon><Delete /></el-icon>
        </el-button>
      </div>

       <div class="finish-section">
          <el-button type="primary" class="finish-btn">完成</el-button>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, onBeforeUpdate } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Edit, Delete } from '@element-plus/icons-vue'

const router = useRouter()

// State
const inputText = ref('你好') // Default text as per user request example
const characters = computed(() => inputText.value.split(''))
const currentTool = ref<'pen' | 'eraser'>('pen')
const currentColor = ref('#000000')
const isDrawing = ref(false)
const lastX = ref(0)
const lastY = ref(0)
const canvasRefs = ref<HTMLCanvasElement[]>([])

// Helper to collect canvas refs
const setCanvasRef = (el: any, index: number) => {
  if (el) {
    canvasRefs.value[index] = el as HTMLCanvasElement
    initCanvas(el as HTMLCanvasElement)
  }
}

// Clear refs before update to avoid stale references
onBeforeUpdate(() => {
  canvasRefs.value = []
})

// Canvas Initialization
const initCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  // Set dimensions based on computed style to avoid stretching
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
  
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
}

onMounted(() => {
  nextTick(() => {
    canvasRefs.value.forEach(initCanvas)
  })
  
  window.addEventListener('resize', handleResize)
})

const handleResize = () => {
   canvasRefs.value.forEach(initCanvas)
}

// Drawing Logic
const getCoordinates = (event: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
  const rect = canvas.getBoundingClientRect()
  let clientX, clientY
  
  if (event instanceof MouseEvent) {
    clientX = event.clientX
    clientY = event.clientY
  } else {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
  }
  
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  }
}

const startDrawing = (event: MouseEvent | TouchEvent, index: number) => {
  isDrawing.value = true
  const canvas = canvasRefs.value[index]
  const { x, y } = getCoordinates(event, canvas)
  lastX.value = x
  lastY.value = y
}

const draw = (event: MouseEvent | TouchEvent, index: number) => {
  if (!isDrawing.value) return
  
  const canvas = canvasRefs.value[index]
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const { x, y } = getCoordinates(event, canvas)
  
  ctx.beginPath()
  ctx.moveTo(lastX.value, lastY.value)
  ctx.lineTo(x, y)
  
  if (currentTool.value === 'pen') {
    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = currentColor.value
    ctx.lineWidth = 8 // Brush size
  } else {
    ctx.globalCompositeOperation = 'destination-out' // Eraser
    ctx.lineWidth = 20 // Eraser size
  }
  
  ctx.stroke()
  
  lastX.value = x
  lastY.value = y
}

const stopDrawing = () => {
  isDrawing.value = false
}

// Tool Selection
const selectColor = (color: string) => {
  currentTool.value = 'pen'
  currentColor.value = color
}

const selectEraser = () => {
  currentTool.value = 'eraser'
}

const clearAll = () => {
  canvasRefs.value.forEach(canvas => {
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  })
}
</script>

<style scoped>
.calligraphy-page {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.top-bar {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.text-input {
  width: 200px;
}

.label {
  font-size: 14px;
  color: #666;
}

.back-icon {
  margin-right: 4px;
}

.drawing-area {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  overflow-y: auto;
}

.character-block {
  position: relative;
  width: 300px;
  height: 300px;
  background: white;
  border: 4px solid #ddd;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.grid-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.line {
  position: absolute;
  background-color: #ddd;
}

.line.horizontal {
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  border-top: 1px dashed #e8e8e8;
  background: none;
}

.line.vertical {
  left: 50%;
  top: 0;
  height: 100%;
  width: 1px;
  border-left: 1px dashed #e8e8e8;
  background: none;
}

.line.diagonal-1 {
  top: 0;
  left: 0;
  width: 141.4%; /* sqrt(2) * 100% */
  height: 1px;
  border-top: 1px dashed #e8e8e8;
  transform-origin: 0 0;
  transform: rotate(45deg);
  background: none;
}

.line.diagonal-2 {
  top: 0;
  right: 0;
  width: 141.4%;
  height: 1px;
  border-top: 1px dashed #e8e8e8;
  transform-origin: 100% 0;
  transform: rotate(-45deg);
  background: none;
}

.guide-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'KaiTi', 'Kaiti SC', 'STKaiti', serif; /* Calligraphy font style */
  font-size: 200px;
  color: #e0e0e0;
  pointer-events: none;
  z-index: 1;
  user-select: none;
}

.drawing-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  cursor: crosshair;
  touch-action: none;
}

.tools-bar {
  padding: 20px;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.colors {
  display: flex;
  gap: 20px;
}

.tool-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.2s;
}

.tool-btn:hover {
  transform: scale(1.1);
}

.tool-btn.active {
  border-color: #666;
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.color-btn.black { background-color: #000; }
.color-btn.red { background-color: #f00; }
.color-btn.blue { background-color: #00f; }

.separator {
  width: 1px;
  height: 30px;
  background-color: #eee;
}

.actions {
  display: flex;
  gap: 16px;
}

.finish-section {
    margin-left: auto; /* Push to the right if needed, but centering looks good too */
}
</style>
