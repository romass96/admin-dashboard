import store from '@/store/index'
import axios from 'axios'

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
    return axios.create({
      headers:  header
    });
  }

}
