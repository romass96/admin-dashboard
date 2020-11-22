import store from '@/store/index'
import axios from 'axios'
import router from '@/router'

export default {
  authHeader() {
    const currentUser = store.state.AuthModule.user;
    if (currentUser && currentUser.token) {
      return { Authorization: 'Bearer ' + currentUser.token };
    } else {
      return {};
    }
  },

  axiosWithHeader() {
    const header = this.authHeader();
    const axiosClient = axios.create({
      headers:  header
    });

    axiosClient.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401 ) {
        router.push('/login');
      }
      return Promise.reject(error);
    });

    return axiosClient;
  }

}
