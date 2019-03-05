<template>
<el-dialog
    title=" "
    :visible.sync="inData.show"
    :fullscreen="false"
    :before-close="norDocClose"
    append-to-body
>
    <div class="inData">
    <div class="doc-item">
        <div class="doc-item-content">
        <div>
            <el-select v-model="inData.nameSelectId" clearable placeholder="姓名" size="mini">
            <el-option
                v-for="(item,index) in inData.nameList"
                :key="index"
                :label="item.name"
                :value="item.id">
            </el-option>
            </el-select>
            <i class="iconfont doc-must-input">&#xe7b0;</i>
        </div>
        
        <div>
            <el-select v-model="inData.sexSelectId" clearable placeholder="性别" size="mini">
            <el-option
                v-for="(item,index) in inData.sexList"
                :key="index"
                :label="item.label"
                :value="item.value">
            </el-option>
            </el-select>
        </div>
        <!-- <div>
            <el-input
            placeholder="性别"
            v-model="inData.sex"
            size="mini"
            clearable>
            </el-input>
        </div> -->

        <div>
            <el-input
            placeholder="年龄"
            v-model="inData.age"
            size="mini"
            clearable>
            </el-input>
        </div>
        
        </div>
    </div>

    <div class="doc-item">
        <div class="doc-item-content">
        <el-input
            placeholder="家庭现住址"
            v-model="inData.addr"
            size="mini"
            clearable>
        </el-input>
        </div>
    </div>    
    </div>

    <div class="doc-item">
    <div class="doc-item-content">
        <el-input
        type="textarea"
        :rows="4"
        placeholder="诊断"
        v-model="inData.diagnosis">
        </el-input>
    </div>
    </div>

    <div class="doc-item">
    <div class="doc-item-content">
        <el-input
        type="textarea"
        :rows="4"
        placeholder="处理意见"
        v-model="inData.deal">
        </el-input>
    </div>
    </div>

    <div class="doc-item">
    <div class="doc-item-content">
        <el-button type="primary" @click="createinData">保存</el-button>
    </div>
    </div>          
</el-dialog>
</template>
<script>
    export default {
        props:[
            "inData"
        ],
        data() {
            return {
            };
        },
        methods:{
            createinData(){
                this.$emit("reback",this.inData);
                

                // memberId:this.norDoc.nameSelectId,
                // sex:this.norDoc.sexSelectId,
                // age:this.norDoc.age,
                // address:this.norDoc.addr,
                // diagnosis:this.norDoc.diagnosis,
                // opinion:this.norDoc.deal
            },
            norDocClose(){
                this.inData.show = false;
                this.inData.nameSelectId = '';
                this.inData.sexSelectId = 0;
                this.inData.age = '';
                this.inData.addr = '';
                this.inData.org = '';
                this.inData.diagnosis = '';
                this.inData.deal = '';
            }
        },
        created(){},
    }
</script>
<style scoped>
.doc-item{
  margin-bottom: 0.2rem;
}
.doc-item-content{
  display: flex;
  align-items: center;
}
.doc-item-content>div{
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  display: flex;
  align-items: center;
}
.doc-item-content>.el-button{
  margin: 0 auto;
}
.doc-must-input{
  font-size: var(--fontSize1);
  color: red;
}
</style>