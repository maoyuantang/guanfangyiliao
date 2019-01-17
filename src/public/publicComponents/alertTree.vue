<template>
  <div class="alert-tree" @click.stop>
    <Modal
        v-model="inData.show"
        :title="inData.title"
        @on-ok="ok"
        @on-cancel="cancel">
        <el-tree
            :data="inData.data"
            :show-checkbox="inData.canClick"
            node-key="id"
            ref="alertTree"
            @check="selectItem">
        </el-tree>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods:{
    ok(){
        this.$emit("reback",this.$refs.alertTree.getCheckedKeys());
    },
    cancel(){},
    selectItem(){
        this.$refs.alertTree.getCheckedKeys()
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
</style>