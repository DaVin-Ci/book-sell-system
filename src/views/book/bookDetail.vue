<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="图书编号">
        <span>{{ form.bid }}</span>
      </el-form-item>
      <el-form-item label="图书名称">
        <span>{{ form.bname }}</span>
      </el-form-item>
      <el-form-item label="作者">
        <span>{{ form.author }}</span>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="11" class="text-center">
          <el-form-item label="定价">
            <span>{{ form.price }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="text-center">
          <el-form-item label="折扣">
            <span>{{ form.discount }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="出版社">
        <span>{{ form.press }}</span>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8" class="text-center">
          <el-form-item label="版次">
            <span>{{ form.edition }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="text-center">
          <el-form-item label="总页数">
            <span>{{ form.pageNum }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="text-center">
          <el-form-item label="总字数">
            <span>{{ form.wordNum }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11" class="text-center">
          <el-form-item label="封面地址">
            <span>{{ form.img }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="text-center">
          <el-form-item label="缩略图地址">
            <span>{{ form.thumimg }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onEdit">修改</el-button>
        <el-button @click="onReturn">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getBookDetail } from "@/api/table";

export default {
  data() {
    return {
      form: {
        bid: "默认编号",
        bname: "默认书名",
        author: "默认作者",
        price: "默认定价",
        discount: "默认折扣",
        press: "默认出版社",
        edition: "默认版次",
        pageNum: "默认页数",
        wordNum: "默认总字数",
        img: "默认封面图",
        thumimg: "默认缩略图",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    onEdit() {
      this.$router.push("/book/add/" + this.form.bid);
    },
    onReturn() {
      this.$router.push("/book/list");
    },
    fetchData() {
      this.listLoading = true;
      getBookDetail(this.$route.params.bid).then((response) => {
        this.form = response.data.data;
        console.log("this.form: ", this.form);
        this.listLoading = false;
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

