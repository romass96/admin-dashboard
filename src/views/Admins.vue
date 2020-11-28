<template>
  <div>
    <div class="card shadow mb-4">
      <div
        class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
      >
        <h6 class="m-0 font-weight-bold text-primary">Админы</h6>
      </div>
      <div class="card-body">
        <DataTable :items="users" :fields="fields" :busy="isBusy">
          <template v-slot:cell(actions)="data">
            <span class="table-action-bar" v-if="data.item.role === 'MANAGER'">
              <button class="btn btn-danger btn-sm m-1 table-toolbar-btn" v-if="!data.item.locked"
               v-b-tooltip.hover title="Заблокировать" @click="lockManager(data.item.id)">
                <i class="fas fa-lock"></i>
              </button>
              <button class="btn btn-success btn-sm m-1 table-toolbar-btn" v-else
               v-b-tooltip.hover title="Разблокировать" @click="unlockManager(data.item.id)">
                <i class="fas fa-unlock"></i>
              </button>
            </span>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DataTable from '@/components/DataTable'

export default {
  components: {
    DataTable,
  },
  data: () => ({
    users: [],
    fields: [
      {
        key: "firstName",
        label: "Имя",
        sortable: true,
      },
      {
        key: "lastName",
        label: "Фамилия",
        sortable: true,
      },
      {
        key: "email",
        label: "Email",
        sortable: true,
      },
      {
        key: "role",
        label: "Роль",
        sortable: true,
        formatter: (value) => {
          return value === "ADMIN" ? "Администратор" : "Менеджер";
        },
        filterByFormatted: true,
      },
      {
        key: "actions",
        label: "Действия",
        sortable: false,
        thStyle: {
          width: '5%'
        }
      },
    ],
    isBusy: true,
  }),
  mounted: async function () {
    this.users = await this.$store.dispatch("fetchUsers");
    this.isBusy = false;
  },
  computed: {
    ...mapGetters(['allUsers'])
  },
  methods: {
    lockManager(userId) {
      this.$store
        .dispatch("lockUser", userId)
        .then(() => {
          return this.$swal({
            title: "Congratulations",
            text: "Пользователь успешно заблокирован",
            icon: "success"
          });
        })
        .then(() => this.$store.dispatch("fetchUsers"))
        .then(() => this.users = this.allUsers)
        .catch(() => {
          this.$swal({
              title: "Ошибка",
              text: "Что-то пошло не так!",
              icon: "error"
            });
        });
    },
    unlockManager(userId) {
      this.$store
        .dispatch("unlockUser", userId)
        .then(() => {
          return this.$swal({
            title: "Congratulations",
            text: "Пользователь успешно разблокирован",
            icon: "success"
          });
        })
        .then(() => this.$store.dispatch("fetchUsers"))
        .then(() => this.users = this.allUsers)
        .catch(() => {
          this.$swal({
              title: "Ошибка",
              text: "Что-то пошло не так!",
              icon: "error"
            });
        });
    }
  }
};
</script>
