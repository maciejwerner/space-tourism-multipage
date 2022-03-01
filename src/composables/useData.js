import data from '@/assets/data/data.json';
import { ref } from 'vue';

export default function useData(page = 'destination') {
  const current = ref(0);
  const pageData = data[page];

  return {
    current,
    pageData,
  };
}
