<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="图书编号">
        <span>{{ form.bid }}</span>
        <!-- {{ isNewBook }} -->
      </el-form-item>
      <el-form-item label="图书名称">
        <el-input v-model="form.bname" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="11" class="text-center">
          <el-form-item label="定价">
            <el-input v-model="form.price" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="text-center">
          <el-form-item label="折扣">
            <el-input v-model="form.discount" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="分类(一级 - 二级)">
          <cascader />
        </el-form-item>
      </el-row>
      <el-form-item label="出版社">
        <el-input v-model="form.press" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8" class="text-center">
          <el-form-item label="版次">
            <el-input v-model="form.edition" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="text-center">
          <el-form-item label="总页数">
            <el-input v-model="form.pageNum" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="text-center">
          <el-form-item label="总字数">
            <el-input v-model="form.wordNum" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="11" class="text-center">
          <el-form-item label="封面地址">
            <el-input v-model="form.img" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="text-center">
          <el-form-item label="缩略图地址">
            <el-input v-model="form.thumimg" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{
          isNewBook ? "创建" : "修改"
        }}</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getBookDetail, editBookDetail, addBook } from "@/api/table";
import Cascader from "@/components/Cascader/cascader.vue"; // 级联选择器，用于分类查询图书
import { Message } from "element-ui";
import { omit } from "lodash-es";

export default {
  components: { Cascader },
  data() {
    return {
      form: {
        bid: "",
        bname: "",
        author: "",
        price: "",
        discount: "",
        press: "",
        edition: "",
        pageNum: "",
        wordNum: "",
        img: "",
        thumimg: "",
      },
    };
  },
  computed: {
    isNewBook() {
      // 为true时表示该表单是用来新创建图书的
      return this.form.bid == false;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    onSubmit() {
      if (this.isNewBook) {
        addBook(omit(this.form, ["category"])).then((response) => {
          Message({
            message: response.message,
            type: "success",
            duration: 5 * 1000,
          });
        });
      } else {
        editBookDetail(omit(this.form, ["category"])).then((response) => {
          Message({
            message: response.message,
            type: "success",
            duration: 5 * 1000,
          });
        });
      }
    },
    onCancel() {
      Message({
        message: "取消修改~",
        type: "warning",
        duration: 5 * 1000,
      });
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

