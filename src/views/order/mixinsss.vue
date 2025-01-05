"bid": "b00002",
                    "bname": "人类简史",
                    "author": "尤瓦尔·赫拉利",
                    "price": 45.5,
                    "discount": 0.8,
                    "press": "中信出版社",
                    "edition": 2,
                    "pageNum": 450,
                    "wordNum": 140000,
                    "category": null,
                    "img": "/images/renleijianshi.jpg",
                    "thumimg": "https://img3m6.ddimg.cn/6/8/29824746-1_l_1733992045.jpg"
                }



                "data": {
                  "bid": "b00005",
                  "bname": "计算机网络",
                  "author": "谢希仁",
                  "price": 65.0,
                  "discount": 0.8,
                  "press": "清华大学出版社",
                  "edition": 4,
                  "pageNum": 500,
                  "wordNum": 180000,
                  "category": {
                      "cid": "c00003",
                      "cname": "科技",
                      "parent": null,
                      "description": "科学技术相关图书",
                      "children": null
                  },
                  "img": "/images/computernetworks.jpg",
                  "thumimg": "https://img3m9.ddimg.cn/0/0/29827809-1_l_1734398178.jpg"
              }


              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: null
                  }
                ]
              }



              <template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="图书编号">
        <span>1111</span>
      </el-form-item>
      <el-form-item label="图书名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="11" class="text-center">
          <el-form-item label="定价">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="text-center">
          <el-form-item label="折扣">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="出版社">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8" class="text-center">
          <el-form-item label="版次">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="text-center">
          <el-form-item label="总页数">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="text-center">
          <el-form-item label="总字数">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11" class="text-center">
          <el-form-item label="封面地址">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="text-center">
          <el-form-item label="缩略图地址">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
              
              <script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
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
              
              