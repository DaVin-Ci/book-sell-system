<template>
  <div class="mixin-components-container">
    <el-row>
      <div class="order-info">
        订单号：<span class="order-oid">{{ this.orderInfo.oid }}</span>
        下单时间：<span class="order-time">{{ this.orderInfo.orderTime }}</span>
        <span class="order-status">{{ getStatus(orderInfo.status) }}</span>
      </div>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="top-title">收货人信息</span>
          <div class="detail-info">
            <span>{{ this.orderInfo.address }}</span>
            <span class="order-custom">{{ this.custom.nickname }}</span>
          </div>
        </div>
        <div style="margin-bottom: 30px">
          <el-table
            :data="orderlist"
            style="width: 100%"
            highlight-current-row
            header-cell-class-name="detail-row"
            cell-class-name="detail-row"
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
            <el-table-column prop="price" label="单价"> </el-table-column>
            <el-table-column prop="quantity" label="数量"> </el-table-column>
            <el-table-column prop="subtotal" label="小计"> </el-table-column>
          </el-table>
        </div>
        <div style="margin-bottom: 10px">
          <el-row :gutter="20">
            <el-col
              :span="6"
              :offset="18"
              class="text-center"
              style="margin-bottom: 10px"
            >
              <button
                :disabled="orderInfo.status !== 2"
                class="pan-btn pink-btn"
                @click="handleDeliver(orderInfo.oid)"
              >
                发货
              </button>
            </el-col>
            <el-col :span="6" :offset="18" class="text-center">
              <button
                :disabled="orderInfo.status !== 1"
                class="pan-btn light-blue-btn"
                @click="handleCancel(orderInfo.oid)"
              >
                取消
              </button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { map } from "lodash-es";
import { getOrderDetail, cancelOrder, deliverOrder } from "@/api/table";
import { Message } from "element-ui";

export default {
  name: "ComponentMixinDemo",
  directives: {
    waves,
  },
  data() {
    return {
      custom: {
        nickname: "收货人姓名",
      },
      orderInfo: {
        oid: "订单号",
        orderTime: "下单时间",
        total: "合计金额",
        address: "收货地址",
        status: "订单状态",
      },
      itemDetail: [
        {
          book: {
            bname: "商品名称",
            price: "单价",
          },
          quantity: "数量",
          subtotal: "小计",
          thumimg: "缩略图地址",
        },
      ],
    };
  },
  created() {
    this.fetchOrderDetail();
  },
  methods: {
    fetchOrderDetail() {
      // this.listLoading = true
      getOrderDetail(this.$route.params.oid).then((response) => {
        this.orderInfo = response.data.data;
        this.custom = this.orderInfo.owner;
        this.itemDetail = this.orderInfo.itemslist;
        console.log("this.itemDetail: ", this.itemDetail);
        // this.listLoading = false
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
    handleCancel(orderid) {
      // 处理取消操作的逻辑
      // console.log("取消操作", index, row);
      cancelOrder(orderid).then((response) => {
        this.orderInfo.status = 5;
        Message({
          message: response.message,
          type: "success",
          duration: 5 * 1000,
        });
      });
    },
    handleDeliver(orderid) {
      // 处理取消操作的逻辑
      deliverOrder(orderid).then((response) => {
        this.orderInfo.status = 3;
        Message({
          message: response.message,
          type: "success",
          duration: 5 * 1000,
        });
      });
    },
  },
  computed: {
    orderlist() {
      return map(this.itemDetail, (item) => {
        return {
          quantity: item.quantity,
          subtotal: item.subtotal,
          bname: item.book.bname,
          price: item.book.price,
          thumimg: item.book.thumimg,
          orderItemId: item.orderItemId,
        };
      });
    },
  },
};
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item {
  min-height: 100px;
}
.order-info {
  margin: 0 0 10px 20px;
}
.order-info .order-oid {
  /* background-color: red; */
  margin-right: 30px;
}
.top-title {
  /* background-color: blue; */
}
.detail-info {
  margin-top: 10px;
  padding-left: 30px;
  /* background-color: orange; */
  /* color: #666; */
}
.detail-info .order-custom {
  margin-left: 30px;
  color: #666;
  /* font-weight: 700; */
}
/deep/ .detail-row {
  /* color: red; */
  text-align: center;
}
.order-status {
  float: right;
  padding: 10px 15px;
  margin: 0 10px 5px 0;
  background-color: #fff;
  color: red;
  font-weight: 700;
}
</style>
