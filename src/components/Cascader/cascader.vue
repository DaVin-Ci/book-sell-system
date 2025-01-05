<template>
  <div class="block">
    <el-cascader
      v-model="value"
      :options="newDatas"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>

<script>
import { getAllCategory } from "@/api/table";
import { parseOriginData } from "@/utils/parse";

export default {
  name: "Cascader",
  data() {
    return {
      value: [],
      options: [],
      originData: [],
      newDatas: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleChange(value) {
      let valueArr = Array.from(value);
      const targetCategory = valueArr[valueArr.length - 1];
      console.log("targetCategory: ", targetCategory);
      this.$emit("target-category", targetCategory);
    },
    getList() {
      getAllCategory().then((response) => {
        console.log("response: ", response.data.data);
        this.originData = response.data.data;
        // 注意转换结构的逻辑必须要在这里完成，因为一旦赋值给data中的属性，就会被Vue2响应式劫持，不再是纯粹的数组，这样进行cloneDeep方法只能得到空数组
        let res = parseOriginData(response.data.data);
        res.pop();
        this.newDatas = res;
        console.log("this.newDatas: ", this.newDatas);
      });
    },
  },
};
</script>
