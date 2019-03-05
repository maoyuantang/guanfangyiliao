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
            node-key="identification"
            ref="alertTree"
            @check="selectItem">
        </el-tree>
    </Modal>
  </div>
</template>

<script>
// node-key="id"
// import createUUID from '../publicJs/createUUID.js'
export default {
  watch:{
    'inData.data':{
      handler(n){
        this.findSelect();
      }
    }
  },
  data() {
    return {
        selectIdList:[]
    };
  },
  methods:{
    ok(){
      // $.each(olist,function(index,text){
      //   text.hosptail="hosptail"
      //   $.each(text.children,function(index1,text1){
      //     text1.odoctorPId=text.id;
      //     $.each(text.children,function(index2,text2){
      //     text2.oid1=text.id;
      //     text2.oid2=text1.id
          
      //   })
      //   })

      // })

      // console.log(this.$refs.alertTree.getCheckedNodes(false,true));
      // // return;
      //   console.log(this.$refs.alertTree.getCheckedNodes());
      //   return;
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
      console.log(this.inData)
        this.selectIdList = [];
        const findSelect = arr =>{
          for(const i of arr){
            if(i.check){
              // const Identification = createUUID()+ new Date().getTime();//先前用的后端返回的id做node-key，但是这id有一些是重复的，用uuid和当前时间生成一个新的键，哎，前面的又要修改了
              // i.Identification = Identification;
              this.selectIdList.push(i.identification);
              // this.selectIdList.push(i.id);
            }
            if(i.children && i.children.length>0){
              findSelect(i.children)
            }
          }
        }
        findSelect(this.inData.data);
        // this.inData.data.forEach(i=>i.check?this.selectIdList.push(i.id):null);
        console.log(this.selectIdList);
    }
  },
  props:[
    'inData'
  ],
  created() {
    // console.log(createUUID()+ new Date().getTime())
    this.findSelect();
    console.log(this.selectIdList)
  },
  beforeDestroy(){
  }
};
</script>

<style scoped>
</style>