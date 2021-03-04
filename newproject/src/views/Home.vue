<template>
  <div class="home">
    <h2 class="mt-4">Diari Jajan Februari 2021</h2>
    <p>Pengeluaran Bulan ini Rp {{total.toLocaleString('id-ID')}}</p>
    <button class="btn btn-color" data-bs-toggle="modal" data-bs-target="#formModal">TAMBAH ITEM</button>
    <div class="container mb-4">
      <div class="row">
        <Card
          class="d-flex justify-content-center"
          v-for="(item, i) in data"
          :key="i"
          :item="item"
        />
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="formModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog widthModal">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tambah Entry</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addEntry">
              <label>Nama</label><br>
              <input v-model="newEntry.name" class="input" type="text" placeholder="Bakso" required><br>
              <label>Harga</label><br>
              <input v-model="newEntry.cost" class="input" type="number" placeholder="10000" required><br>
              <div class="text-end mt-2">
                <button type="button" class="btn btn-cancel btn-secondary mx-2" data-bs-dismiss="modal">BATAL</button>
                <button type="submit" class="btn btn-color">KIRIM</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      newEntry: {
        name: '',
        cost: ''
      }
    }
  },
  components: {
    Card
  },
  methods: {
    fetchItem () {
      this.$store.dispatch('fetchItem')
    },
    addEntry () {
      const time = new Date().toTimeString().slice(0, 8)
      const date = `2021-02-19 ${time}` // fix date because its made at March 2021
      const payload = {
        name: this.newEntry.name,
        cost: +this.newEntry.cost,
        created_at: date
      }
      this.$store.dispatch('addEntry', payload)
        .then(() => {
          this.newEntry.name = ''
          this.newEntry.cost = ''
        })
    }
  },
  created () {
    this.fetchItem()
  },
  computed: {
    ...mapState([
      'total',
      'data'
    ])
  }
}
</script>

<style>
.center {
  text-align: center;
}
.btn-color {
  background-color: darkblue;
  color: white;
  font-size: 12px;
}
.btn-color:hover {
  border: 1px solid darkblue;
  background-color: white;
  color: darkblue;
  font-size: 12px;
}
.btn-cancel {
  font-size: 12px;
}
.input {
  width: 100%;
}
.widthModal {
  width: 300px
}
</style>
