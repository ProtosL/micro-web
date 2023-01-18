import { ref } from 'vue';

export const loadingStatus = ref(false);

export const changeLoading = type => loadingStatus.value = type;