<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" class="text-center" style="margin-bottom: 10px">
        <cascader @target-category="getTargetCategoryBooks" />
      </el-col>
      <el-col :span="12" :offset="1" class="text-center">
        <search-box @search-condition="getTargetConditonBooks" />
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="商品名称" width="400">
        <template slot-scope="scope">
          <div style="display: flex; align-items: center">
            <img
              :src="scope.row.thumimg"
              alt="商品缩略图"
              style="max-width: 50px; max-height: 50px"
            />
            <span style="margin-left: 20px">{{ scope.row.bname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="press" label="出版社" width="120">
      </el-table-column>
      <el-table-column prop="price" label="单价" width="120"> </el-table-column>
      <el-table-column prop="discount" label="折扣" width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  getAllBookList,
  getBookListByCategory,
  getBookListByCondition,
} from "@/api/table";
import Pagination from "@/components/Pagination"; // 基于elementUI中的分页组件进行二次封装
import Cascader from "@/components/Cascader/cascader.vue"; // 级联选择器，用于分类查询图书
import SearchBox from "@/views/book/searchbox.vue"; // 二次封装的三个搜索框

export default {
  name: "ArticleList",
  components: { Pagination, Cascader, SearchBox },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getAllBookList({
        page: this.listQuery.page,
        size: this.listQuery.limit,
      }).then((response) => {
        this.list = response.data.data.records;
        this.total = response.data.data.total;
        this.listLoading = false;
      });
    },
    getTargetCategoryBooks(targetCid) {
      console.log("接受传递过来的value: ", targetCid);
      this.listLoading = true;
      getBookListByCategory({
        categoryId: targetCid,
        page: this.listQuery.page,
        size: this.listQuery.limit,
      }).then((response) => {
        // console.log("!!!!!!!response: ", response);
        this.list = response.data.data.records;
        this.total = response.data.data.total;
        this.listLoading = false;
      });
    },
    getTargetConditonBooks({ bname, author, press }) {
      let params = { bname, author, press };
      console.log("接受传递过来的params: ", params);
      this.listLoading = true;
      getBookListByCondition(params).then((response) => {
        // console.log("!!!!!!!response: ", response);
        this.list = response.data.data.records;
        this.total = response.data.data.total;
        this.listLoading = false;
      });
    },
    handleEdit(index, row) {
      this.$router.push("/book/add/" + row.bid);
    },
    handleDetail(index, row) {
      this.$router.push("/book/detail/" + row.bid);
    },
    handleDelete(index, row) {
      // 处理取消操作的逻辑
      deleteBook(row.oid).then((response) => {
        Message({
          message: response.message,
          type: "success",
          duration: 5 * 1000,
        });
      });
    },
  },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
