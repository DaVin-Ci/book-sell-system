<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="订单编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.oid }}
        </template>
      </el-table-column>
      <el-table-column label="总计金额" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            getStatus(scope.row.status)
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="下单时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.orderTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="success"
            :disabled="scope.row.status !== 2"
            @click="handleDeliver(scope.$index, scope.row)"
            >发货</el-button
          >
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.status !== 1"
            @click="handleCancel(scope.$index, scope.row)"
            >取消</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, cancelOrder, deliverOrder } from "@/api/table";
import { MessageBox, Message } from "element-ui";

export default {
  filters: {
    statusFilter(status) {
      // 1未付款, 2已付款但未发货, 3已发货未确认收货, 4确认收货了交易成功, 5已取消(未付款的订单才能取消
      const getStatus = (statusCode) => {
        switch (statusCode) {
          case 1:
            return "已付款";
          case 2:
            return "未发货";
          case 3:
            return "已发货";
          case 4:
            return "确认收货";
          case 5:
            return "已取消";
          default:
            return "default";
        }
      };
      const statusMap = {
        确认收货: "success",
        已付款: "gray",
        已取消: "gray",
        已发货: "gray",
        未发货: "danger",
      };
      return statusMap[getStatus(status)];
    },
  },
  data() {
    return {
      list: null,
      listLoading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.data.records;
        this.listLoading = false;
      });
    },
    // 1未付款, 2已付款但未发货, 3已发货未确认收货, 4确认收货了交易成功, 5已取消(未付款的订单才能取消
    getStatus(statusCode) {
      switch (statusCode) {
        case 1:
          return "已付款";
        case 2:
          return "未发货";
        case 3:
          return "已发货";
        case 4:
          return "确认收货";
        case 5:
          return "已取消";
        default:
          return "default";
      }
    },
    handleCancel(index, row) {
      // 处理取消操作的逻辑
      // console.log("取消操作", index, row);
      cancelOrder(row.oid).then((response) => {
        Message({
          message: response.message,
          type: "success",
          duration: 5 * 1000,
        });
      });
    },
    handleDeliver(index, row) {
      // 处理取消操作的逻辑
      deliverOrder(row.oid).then((response) => {
        Message({
          message: response.message,
          type: "success",
          duration: 5 * 1000,
        });
      });
    },
    handleDetail(index, row) {
      this.$router.push("/order/detail/" + row.oid);
      // console.log('this.$router: ', this.$router);
      // console.log('this.$route: ', this.$route);
    },
  },
};
</script>
