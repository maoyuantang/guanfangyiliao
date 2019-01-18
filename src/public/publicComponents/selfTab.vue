<template>
  <div class="self-tab" @click.stop>
    <table class="self-tab-table">
        <thead>
            <tr class="table-tr table-thead-tr">
                <th v-for="(item,index) in inData.head" :key="item.name" @click="clickItem(item)">
                    <span>
                        {{item.name}}
                    </span>
                </th>
                <th>
                    <span>
                        操作
                    </span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in inData.body" :key="index" class="table-tr">
                <th v-for="(v,k) in item" :key="k">
                    <span>
                        {{v}}
                    </span>
                </th>
                <th>
                    <span class="operating"  v-for="(v,k) in inData.operating" :key="v.name" @click="operatingItem(item,v)">
                        {{v.name}}
                    </span>
                </th>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        data:{
            
        }
    };
  },
  methods:{
    ok(){
        this.$emit("reback",this.$refs.alertTree.getCheckedKeys());
    },
    clickItem(item){
        this.$emit("reback",item);
    },
    operatingItem(item,v){
         this.$emit("reback",{
            tag:v,
            row:item
         });
    }
  },
  props:[
    'inData'
  ],
  created() {
  },
  beforeDestroy(){
  }
};
</script>

<style scoped>
.self-tab{

}
.self-tab-table{
    width: 100%;
}
.table-tr{
    border-bottom: 1px solid #E6EAEE;
    height: 40px;
    color: #5e6875;
}
.table-thead-tr{
    font-weight: bold;
}
.table-thead-tr span{
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
}
.operating{
    cursor: pointer;
    color: #66b1ff;
}
</style>