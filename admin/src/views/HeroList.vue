<template>
  <div class="about">
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="id" label="ID" width="220">
      </el-table-column>
      <el-table-column prop="categoryId" label="英雄分类">
      </el-table-column>
      <el-table-column prop="name" label="英雄名称">
      </el-table-column>
      <el-table-column prop="icon" label="头像">
        <template v-slot="scope">
          <img :src="scope.row.avtar" style="height: 3rem">
        </template>
      </el-table-column>
      <el-table-column
              fixed="right"
              label="操作"
              width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small"
                     @click="$router.push(`/heros/edit/${scope.row.id}`)">编辑
          </el-button>
          <el-button type="text" size="small"
                     @click="remove(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "ItemList",
    data() {
      return {
        items: []
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get('rest/heros');
        if (res.data.code == 200) {
          this.items = res.data.result;
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      },
      async remove(row){
        this.$confirm(`确定删除英雄"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res= await this.$http.delete(`rest/heros/${row.id}`);
          if(res.data.code==200){
            this.$message({
              type: 'success',
              message: res.data.message
            });
            this.fetch();
          }
        });
      }
    },
    created() {
      this.fetch();
    }
  }
</script>

<style scoped>

</style>