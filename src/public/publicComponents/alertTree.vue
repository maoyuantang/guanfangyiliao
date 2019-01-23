<template>
  <div class="alert-tree" @click.stop>
    <Modal
        v-model="inData.show"
        :title="inData.title"
        :styles="{width:'323px'}"
        @on-ok="ok"
        @on-cancel="cancel">
        <el-tree
            :data="inData.data"
            :show-checkbox="inData.canClick"
            :default-checked-keys="selectIdList"
            node-key="id"
            ref="alertTree"
            @check="selectItem">
        </el-tree>
    </Modal>
  </div>
</template>

<script>
export default {
  watch:{
    inData(n){
        console.log(n)
        this.findSelect();
    }
  },
  data() {
    return {
        selectIdList:[]
    };
  },
  methods:{
    ok(){
        // console.log(this.$refs.alertTree.getCheckedNodes())
        this.$emit("reback",{
            select:this.$refs.alertTree.getCheckedNodes(false,true),
            tag:this.inData.tag
        });
    },
    cancel(){},
    selectItem(){
        this.$refs.alertTree.getCheckedKeys();
    },
    findSelect(){
        this.selectIdList = [];
        this.inData.data.forEach(i=>i.check?this.selectIdList.push(i.id):null);
        console.log(this.selectIdList)
    }
  },
  props:[
    'inData'
  ],
  created() {
    this.findSelect();
    console.log(this.selectIdList)
  },
  beforeDestroy(){
  }
};
</script>

<style scoped>
</style>