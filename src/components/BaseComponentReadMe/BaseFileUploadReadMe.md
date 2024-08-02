# FileUpload

`FileUpload` is a customizable Vue 3 component designed to handle file uploads with support for different file types, validation, and drag-and-drop functionality.

![File Upload](https://example.com/file-upload-component.png)

## Props

### `fileID`

-   **Type**: `String`
-   **Default**: `''`
-   **Description**: The `id` of the file input element. This prop is used to identify the file input for clearing the file.

### `fileType`

-   **Type**: `String`
-   **Default**: `''`
-   **Validator**: Must be one of '\*', 'Image', 'CSV'
-   **Description**: Specifies the type of files allowed. Options include:
    -   `*`: All file types
    -   `Image`: Image files only (PNG/JPG)
    -   `CSV`: CSV files only

### `maxFileSize`

-   **Type**: `Number`
-   **Default**: `0`
-   **Description**: The maximum file size allowed in megabytes. If not specified, there is no limit.

### `twClasses`

-   **Type**: `String`
-   **Default**: `''`
-   **Description**: Additional Tailwind CSS classes for custom styling of the file upload area.

### `otherParams`

-   **Type**: `Object`
-   **Default**: `{}`
-   **Description**: Additional parameters for further customization.

### `inputTypeFileUpload`

-   **Type**: `Boolean`
-   **Default**: `false`
-   **Description**: If `true`, a simple file input will be used instead of the drag-and-drop area.

### `defaultValueName`

-   **Type**: `String`
-   **Default**: `''`
-   **Description**: The default text shown in the file upload area when no file is selected.

### `allowedExtensions`

-   **Type**: `Array`
-   **Default**: `['pdf', 'doc', 'docx', 'csv', 'xls', 'xlsx', 'wav', 'mp3', 'mp4', 'jpg', 'jpeg', 'png']`
-   **Description**: List of allowed file extensions. If provided, only files with these extensions can be uploaded.

## Events

### `listenFileUploadChange`

-   **Parameters**: `File`
-   **Description**: Emitted when a file is selected or dropped.

### `clearFile`

-   **Parameters**: `null`
-   **Description**: Emitted when the file is cleared.

## Usage

### Import the Component

Import `FileUpload` into the parent component where you want to use it.

```vue
<script setup>
import FileUpload from './components/FileUpload.vue';
</script>

<template>
    <div>
        <FileUpload
            fileID="file-upload"
            fileType="Image"
            :maxFileSize="5"
            twClasses="custom-class"
            inputTypeFileUpload="{false}"
            defaultValueName="Upload an Image"
            :allowedExtensions="['jpg', 'jpeg', 'png']"
            @listenFileUploadChange="handleFileChange"
            @clearFile="handleClearFile"
        />
    </div>
</template>
```

### BaseFile.vue

```
<template>
  <div v-if="!inputTypeFileUpload">
    <div
      ref="dropZoneRef"
      v-if="!fileInfo"
      :class="[props?.twClasses || defaultClasses, isOverDropZone ? 'bg-slate-100' : '']"
      class="flex justify-center items-center"
    >
      <div class="flex flex-col items-center">
        <img src="@/assets/images/file-upload.svg" alt="File Upload" class="w-10 h-10 mt-3" />
        <div class="text-[14px] text-[#344563] dark:text-[#dfdfdf] font-semibold mt-3 text-center">
          Drag and drop the file, or
          <span @click="browseImage" class="cursor-pointer text-[#1279ff]">Browse</span>
        </div>
        <div v-if="props.maxFileSize" class="text-[12px] text-[#344563] dark:text-[#dfdfdf] mt-2 text-center">
          Max {{ props.maxFileSize }} MB ({{ props.fileType == 'CSV' ? 'CSV' : props.fileType == 'Image' ? 'PNG / JPG' : props.allowedExtensions ? props.allowedExtensions.map(ele => ele).join(', ') : 'Only PDF, DOC, DOCX, XLS, XLSX, WAV, MP3, MP4, JPG, JPEG or PNG' }} format only)
        </div>
      </div>
    </div>
    <input
      @change="onFileSelect"
      type="file"
      :accept="props.fileType.toLowerCase()"
      ref="fileInput"
      class="hidden"
      :id="props.fileID"
    />
    <div
      v-if="fileInfo"
      class="md:w-full border-[2px] border-[#d1d5db] dark:border-[#8d8d8d] border-dashed rounded-[8px] items-center justify-between bg-[#d4ecd5] dark:bg-[#4d4d4d] flex flex-row p-4"
    >
      <div class="flex items-center justify-between gap-3">
        <template v-if="fileInfo.type == 'text/csv'">
          <img src="@/assets/images/bulk-csv-icon.svg" :alt="fileInfo.name" />
          <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
        </template>
        <template v-else-if="fileInfo.type == 'application/pdf'">
          <img src="@/assets/images/pdf-icon.svg" :alt="fileInfo.name" />
          <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
        </template>
        <template
          v-else-if="fileInfo.type == 'application/msword' || fileInfo.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
        >
          <img src="@/assets/images/doc-icon.svg" :alt="fileInfo.name" />
          <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
        </template>
        <template
          v-else-if="fileInfo.type == 'image/png' || fileInfo.type == 'image/jpg' || fileInfo.type == 'image/jpeg'"
        >
          <div class="relative flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            <img :src="selectedImage" :alt="fileInfo.name" class="md:w-[150px]" />
            <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[250px]">{{ fileInfo.name }}</div>
          </div>
        </template>
        <template v-else-if="fileInfo.type == 'audio/wav' || fileInfo.type == 'audio/mpeg'">
          <img src="@/assets/images/mp3-icon.svg" :alt="fileInfo.name" />
          <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
        </template>
        <template v-else-if="fileInfo.type == 'video/mp4'">
          <img src="@/assets/images/mp4-icon.svg" :alt="fileInfo.name" />
          <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
        </template>
        <template
          v-else-if="fileInfo.type == 'application/vnd.ms-excel' || fileInfo.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
        >
          <img src="@/assets/images/xls-icon.svg" :alt="fileInfo.name" />
          <div class="text-[#000] dark:text-[#fff] truncate w-[30vw] md:w-[auto]">{{ fileInfo.name }}</div>
        </template>
      </div>
      <img v-if="!darkModeVal" class="cursor-pointer" @click="clearFile" src="@/assets/images/close_icon_mobile.svg" alt="Remove File" :class="{ 'relative bottom-[86px] right-[-10px] md:static': fileInfo.type.startsWith('image/') }" />
      <img v-else class="cursor-pointer" @click="clearFile" src="@/assets/images/dark-mode/dark-close_icon_mobile.svg" alt="Remove File" :class="{ 'relative bottom-[86px] right-[-10px] md:static': fileInfo.type.startsWith('image/') }" />
    </div>
  </div>
  <!-- csv file upload component design -->
  <div class="relative cursor-pointer" :class="props?.twClasses || defaultFileClasses" v-if="inputTypeFileUpload" v-tooltip.top="tooltipValue">
    <div v-if="!fileInfo" @click="browseImage()" class="flex items-center gap-2 w-[100%]">
      <img :src="getImg('upload-icon', darkModeVal)" @click="clearFile" class="hover:cursor-pointer" />
      <div class="ml-3 text-[#8c8c8c] dark:text-[#b5b5b5] text-center text-[12px]">
        {{ defaultValueName }}
      </div>
    </div>
    <input
      @change="onFileSelect"
      type="file"
      :accept="props.fileType.toLowerCase()"
      ref="fileInput"
      class="absolute inset-0 w-full h-full cursor-pointer opacity-0"
      :id="props.fileID"
    />
  </div>
</template>
```
