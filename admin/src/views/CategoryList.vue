<template>
  <div class="about">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="id" label="ID" width="220">
      </el-table-column>
      <el-table-column prop="name" label="分类名称">
      </el-table-column>
      <el-table-column
              fixed="right"
              label="操作"
              width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small"
                     @click="$router.push(`/categories/edit/${scope.row.id}`)">编辑
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
    name: "CategoryList",
    data() {
      return {
        items: []
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get('rest/categories');
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
        this.$confirm(`确定删除分类"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res= await this.$http.delete(`rest/categories/${row.id}`);
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