import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-dc4bd.firebaseio.com'
});

export default instance;
