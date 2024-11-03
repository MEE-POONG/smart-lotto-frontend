import { api } from "../utils/api";

export const uploadImage = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('image', file);
  
  const { data } = await api.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return data;
}; 