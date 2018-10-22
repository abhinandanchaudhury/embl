import axios from 'axios';

export default axios.create({
  baseURL: `http://rest.ensembl.org/`,
  timeout: 20000,
  headers: {'Content-Type': 'application/json'}
});