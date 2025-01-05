import { cloneDeep } from 'lodash-es';

// let originData = [ // 用于测试方法的数据
//   {
//     "cid": "c00001",
//     "cname": "小说",
//     "parent": null,
//     "description": "包括长篇小说、短篇小说",
//     "children": [
//       {
//         "cid": "c00006",
//         "cname": "外国小说",
//         "parent": null,
//         "description": "外国作者写的小说",
//         "children": null
//       },
//       {
//         "cid": "c00007",
//         "cname": "国内近代小说",
//         "parent": null,
//         "description": "国内近代作者写的小说",
//         "children": null
//       }
//     ]
//   },
//   {
//     "cid": "c00002",
//     "cname": "历史",
//     "parent": null,
//     "description": "历史类图书",
//     "children": []
//   },
//   {
//     "cid": "c00003",
//     "cname": "科技",
//     "parent": null,
//     "description": "科学技术相关图书",
//     "children": []
//   },
//   {
//     "cid": "c00004",
//     "cname": "自然",
//     "parent": null,
//     "description": "自然科学类图书",
//     "children": [
//       {
//         "cid": "c00008",
//         "cname": "生物医学",
//         "parent": null,
//         "description": "生物医学相关社科书籍",
//         "children": null
//       }
//     ]
//   },
//   {
//     "cid": "c00005",
//     "cname": "教育",
//     "parent": null,
//     "description": "教育教学相关图书",
//     "children": []
//   }
// ];

export function parseOriginData(originData1) {
  // console.log('originData1: ', originData1);
  let newData = cloneDeep(originData1);
  // console.log('newData: ', newData);

  // 对 originData 进行转换为符合要求的结构
  newData.forEach(item => {
    item.value = item.cid;
    item.label = item.cname;
    if (item.children && item.children.length) { // 注意要有length 不为0 的条件，否则空数组经过布尔判断也为true
      item.children = item.children.map(child => ({ value: child.cid, label: child.cname }));
    } else {
      delete item.children;
    }
    // item.children = item.children ? item.children.map(child => ({ value: child.cid, label: child.cname })) : null;
    delete item.cid;
    delete item.cname;
    delete item.parent;
    delete item.description;
  });

  return newData
}

// let result = parseOriginData(originData); // 测试方法的结果是否正确

// export default result;