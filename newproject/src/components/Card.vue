<template>
  <div class="mt-3 col-md-3 col-sm-6 center">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title" style="text-align: left; font-weight: bold">{{date}}</h5>
        <table class="table-style">
          <tbody>
            <tr
              v-for="list in sortingItem"
              :key="list.id"
            >
              <td class="size">{{(list.created_at).slice(11, 16)}}</td>
              <td>{{(list.name)}}</td>
              <td>Rp {{(list.cost).toLocaleString('id-ID')}}</td>
            </tr>
            <tr class="bold">
              <th></th>
              <th style="text-align: right">Total</th>
              <th>Rp {{totalCost.toLocaleString('id-ID')}}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['item'],
  computed: {
    sortingItem () {
      function compare (a, b) {
        if (a.created_at < b.created_at) {
          return -1
        }
        if (a.created_at > b.created_at) {
          return 1
        }
        return 0
      }
      const items = [...this.item.items]
      return items.sort(compare)
    },
    totalCost () {
      const total = this.item.items.reduce((currentTotal, item) => {
        return item.cost + currentTotal
      }, 0)
      return total
    },
    date () {
      const months = {
        0: 'Januari',
        1: 'Februari',
        2: 'Maret',
        3: 'April',
        4: 'Mei',
        5: 'Juni',
        6: 'Juli',
        7: 'Agustus',
        8: 'September',
        9: 'Oktober',
        10: 'November',
        11: 'Desember'
      }
      const d = new Date(this.item.date)
      const date = d.getDate() // 23
      const monthName = months[d.getMonth()]
      const formatted = `${date} ${monthName}`
      return (formatted)
    }
  }
}
</script>

<style>
.center {
  text-align: center;
}
th {
  font-size: 14px;
}
td {
  font-size: 14px;
  border-bottom: 1px solid #999;
  border-top: 1px solid #999;
}
.bold {
  border-top: 2px solid #444;
}
.table-style {
  width: 100%;
  text-align: left;
}
</style>
