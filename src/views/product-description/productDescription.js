import { ref } from 'vue';
export const productDescriptionVariables = ref({
    shows: true,
    productName: '',
    keywords: '',
    instruction: '',
    selectedTone: 'Casual',
    hashtagData: false,
    emojiData: false,
    disabledButton: false,
    isLoading: false,
    toneType: '',
    toneTypeData: [
        { name: 'Casual', value: 'casual' },
        { name: 'Excited', value: 'Excited' },
        { name: 'Encouraging', value: 'Encouraging' },
        { name: 'Funny', value: 'Funny' },
        { name: 'Dramatic', value: 'Dramatic' },
        { name: 'Witty', value: 'Witty' },
        { name: 'Engaging', value: 'Engaging' },
        { name: 'Creative', value: 'Creative' },
        { name: 'Expert', value: 'Expert' },
        { name: 'Supportive', value: 'Supportive' },
        { name: 'Persuasive', value: 'Persuasive' },
        { name: 'Daring', value: 'Daring' },
        { name: 'Playful', value: 'Playful' },
        { name: 'Sophisticated', value: 'Sophisticated' },
        { name: 'Professional', value: 'Professional' },
    ],
    productData: '',
    generatedContent: false,
});
