
const BASE_RUL = 'https://api.github.com/users/'
const axios = require('./request');
async function getRepoList(params){ 
    return axios.request({
      url: `${BASE_RUL}sunly-9527/repos`,
      params,
      method: 'get'
    })
}
module.exports = { getRepoList }

