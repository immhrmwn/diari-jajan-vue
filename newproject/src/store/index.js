import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: 0,
    data: []
  },
  mutations: {
    setTotal (state, payload) {
      let totalCost = 0
      payload.forEach(el => {
        totalCost += (el.cost)
      })
      state.total = totalCost
    },
    setData (state, payload) {
      const dataPerMonths = []
      payload.forEach(item => {
        const createdDate = item.created_at.slice(0, 10)
        let flag = false
        dataPerMonths.find(el => {
          if (el.date === createdDate) {
            el.items.push(item)
            flag = true
          }
        })
        if (flag === false) {
          dataPerMonths.push({
            date: createdDate,
            items: [item]
          })
        }
      })
      function compare (a, b) {
        if (a.date < b.date) {
          return 1
        }
        if (a.date > b.date) {
          return -1
        }
        return 0
      }
      dataPerMonths.sort(compare)
      state.data = dataPerMonths
    }
  },
  actions: {
    fetchItem (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/items'
      })
        .then(({ data }) => {
          context.commit('setTotal', data)
          context.commit('setData', data)
        })
        .catch(err => console.log(err))
    },
    addEntry (context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/items',
        data: payload
      })
        .then(({ data }) => {
          context.dispatch('fetchItem')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
