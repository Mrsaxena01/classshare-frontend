import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30000,
});

// ---- Upload ----
export async function uploadFile(formData) {
    const response = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
}

// ---- Preview (check code, see if password needed) ----
export async function previewFile(code) {
    const response = await api.get(`/api/files/${code}`);
    return response.data;
}

// ---- Download (verify password if needed, get signed URL) ----
export async function downloadFile(code, password = null) {
    const response = await api.post(`/api/files/${code}/download`, {
        password,
    });
    return response.data;
}

export default api;
