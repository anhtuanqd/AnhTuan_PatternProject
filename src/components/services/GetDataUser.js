import axios from './axios'

export const getUserList = (username, page) => {
  return axios.get(`/search/users?q=${username}&page=${page}`)
}
export const getUserDetail = (name) => {
  return axios.get(`/users/${name}/repos`)
}

export const getReadme = (username, repo) => {
  return axios.get(`/repos/${username}/${repo}/contents/README.md`)
}
