import axios from 'axios';

// Ortam değişkenini kullanarak temel API URL'sini alıyoruz.
const apiUrl = import.meta.env.VITE_API_URL;

// Axios istemcisini (client) bu temel URL ile yapılandırıyoruz.
const apiClient = axios.create({
  baseURL: apiUrl,
  // Burada timeout, headers gibi diğer genel ayarları da yapabilirsiniz.
  // headers: {
  //   'Content-Type': 'application/json',
  // }
});

// Artık tüm API isteklerinde bu 'apiClient' nesnesini kullanacağız.
// Bu sayede her seferinde tam URL yazmak zorunda kalmayacağız.
export default apiClient;