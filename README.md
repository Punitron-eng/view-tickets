This template should help get you started developing with Vue 3 in Vite.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Components

-   [SwitchComponent](src/components/responsiveSwitch/README.md)
-   [BaseButton](src/components/BaseComponentReadMe/BaseButtonReadME.md)
-   [BaseCheckBox](src/components/BaseComponentReadMe/BaseCheckBoxReadME.md)
-   [BaseInput](src/components/BaseComponentReadMe/BaseInputReadMe.md)
-   [FileUpload](src/components/BaseComponentReadMe/BaseFileUploadReadMe.md)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

BaseFileUpload - Base Component

fileID: File ID reference.

fileType: Allowed file types (CSV, Image, \*).

maxFileSize: Maximum file size limit.

twClasses: Tailwind CSS classes used.

inputTypeFileUpload: file upload design if not default.

defaultValueName: Name of pre-selected default value.

allowedExtensions: This is an array specifying which file extensions are permitted for upload and fileType should be '\*'.
