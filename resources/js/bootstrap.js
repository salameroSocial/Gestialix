// import axios from 'axios';
// window.axios = axios;

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
import axios from 'axios';

const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
} else {
    console.error('CSRF token not found. Check your Blade template.');
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default axios;
