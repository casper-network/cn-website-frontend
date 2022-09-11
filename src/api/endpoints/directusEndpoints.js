import dummyData from '@/assets/test.json';
import { axiosClient } from '../directusAPIClient';

export function getPage() {
  return axiosClient.get('/pages/1');
}

export function getArticle(id) {
  return axiosClient.get(`/article/${id}`);
}

export function getDummyPage() {
  return dummyData;
}
