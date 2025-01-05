<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item>
        <div style="font-weight:700, color:red">修改一级分类</div>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="form.cname" />
      </el-form-item>
      <el-form-item label="分类描述">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getBookDetail } from "@/api/table";
import Cascader from "@/components/Cascader/cascader.vue"; // 级联选择器，用于分类查询图书
import { Message } from "element-ui";

export default {
  components: { Cascader },
  data() {
    return {
      form: {
        cid: "",
        cname: "",
        desc: "",
      },
    };
  },
  created() {
    // this.fetchData();
  },
  methods: {
    onSubmit() {},
    onCancel() {
      Message({
        message: "取消修改~",
        type: "warning",
        duration: 5 * 1000,
      });
      this.$router.push("/category/list");
    },
    fetchData() {},
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

