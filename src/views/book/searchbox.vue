<template>
  <div class="container">
    <el-row>
      <el-col :span="12">
        <div class="input-row top-input">
          <span class="input-label">书名：</span>
          <el-input
            v-model="bookName"
            placeholder="请输入书名"
            clearable
          ></el-input>
        </div>
        <div class="input-row">
          <span class="input-label">作者：</span>
          <el-input
            v-model="author"
            placeholder="请输入作者"
            clearable
          ></el-input>
        </div>
        <div class="input-row">
          <span class="input-label">出版社：</span>
          <el-input
            v-model="publisher"
            placeholder="请输入出版社"
            clearable
          ></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="button-row">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重新填写</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      bookName: "",
      author: "",
      publisher: "",
    };
  },
  methods: {
    search() {
      let searchCondition = {};
      this.bookName && (searchCondition.bname = this.bookName);
      this.author && (searchCondition.author = this.author);
      this.publisher && (searchCondition.press = this.publisher);
      console.log("searchCondition: ", searchCondition);
      this.$emit("search-condition", searchCondition);
    },
    reset() {
      this.bookName = "";
      this.author = "";
      this.publisher = "";
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  padding-top: 0;
}

.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-label {
  width: 100px;
  text-align: right;
  margin-right: 10px;
}

.button-row {
  margin-top: 50px;
  text-align: right;
}
</style>