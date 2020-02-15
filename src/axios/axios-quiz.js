import Axios from "axios";

export default Axios.create({
  baseURL: 'https://react-quiz-dcac5.firebaseio.com/'
})