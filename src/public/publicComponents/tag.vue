<template>
  <div class="self-tag">
    <span class="el-tag tag-title">{{inData.title}}:</span>
    <el-tag v-for="(item,index) in inData.more?inData.list.slice(0,5):inData.list" :key="index" :class="inData.select===index?'all':null" @click.native="selectItem(item,index)">
        {{item.label}}
    </el-tag>
    <el-tag @click.native="showMore" v-if="inData.more">更多…</el-tag>
  </div>
  <!-- @click.native.prevent="reBackFn(item,index)" -->
  <!-- @click.native="reBackFn(-1)" v-if="inData.more" -->
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods:{
    selectItem(item,index){
        this.$emit("reback",{item,index});
    },
    showMore(){
      this.inData.more = false;
    },
    isMore(){
      if(this.inData.list.length>5){
          this.inData.more = true;
        }
    },
  },
  props:[
      "inData"
  ],
  watch:{
    'inData.list':{
      handler(n){
        if(n.length>5){
          this.inData.more = true;
        }
      }
    }
  },
   created() {
     this.isMore();
  }
};
</script>

<style scoped>
.self-tag {
}
.self-tag > .tag-title {
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #646464 !important;
  font-weight: bold;
  width: .8rem;
  text-align: justify;
}
.tag-title::after{
  content: " "; display: inline-block; 
  /* width: 100%; */
  padding-left: 100%;
}
.self-tag > .all {
  color: #fba800 !important;
}
.self-tag > .el-tag {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: #0067ff;
  width: .7rem;
}
.self-tag .warning{
    color:red;/*!important*/
}

</style>
