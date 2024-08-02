const getImg = (iconName: string, isDarkMode?: boolean, folderName?: string) => {
    if (iconName) {
        if (isDarkMode) {
            if (folderName) {
                return new URL(`../assets/images/${folderName}/dark-mode/dark-${iconName}.svg`, import.meta.url).href;
            } else {
                return new URL(`../assets/images/dark-mode/dark-${iconName}.svg`, import.meta.url).href;
            }
        } else {
            if (folderName) {
                return new URL(`../assets/images/${folderName}/${iconName}.svg`, import.meta.url).href;
            } else {
                return new URL(`../assets/images/${iconName}.svg`, import.meta.url).href;
            }
        }
    } else {
        return new URL(`../assets/images/default_logics_2.svg`, import.meta.url).href;
    }
};

// export default getImg;
// this is the new for the folder wise images
// const getImg = (iconName: string, isDarkMode?: boolean, category?: string) => {
//     const basePath = isDarkMode ? '../assets/images/dark-mode' : '../assets/images';
//     const categoryPath = category ? `/${category}` : '';
//     const darkPrefix = isDarkMode ? 'dark-' : '';

//     return new URL(`${basePath}${categoryPath}/${darkPrefix}${iconName}.svg`, import.meta.url).href;
// };

export default getImg;
