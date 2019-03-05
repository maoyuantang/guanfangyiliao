<template>
<el-dialog
    title=" "
    :visible.sync="inData.show"
    :fullscreen="false"
    :before-close="pregnantWomanDocClose"
    append-to-body
>
<div class="norDoc">
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
        </div>
        <div>
            <el-input
            placeholder="丈夫"
            v-model="inData.husband"
            size="mini"
            clearable>
            </el-input>
        </div>
        <div>
            <el-input
            placeholder="联系电话"
            v-model="inData.phone"
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
    
    <div class="doc-item">
        <div class="doc-item-content">
        <el-date-picker
            v-model="inData.LastMenstrualPeriod"
            value-format="yyyy-MM-dd"
            size="mini"
            type="date"
            placeholder="末次月经">
        </el-date-picker>
        </div>
    </div>

    <div class="doc-item">
    <div class="doc-item-content">
        <el-button type="primary" @click="createPregnantWomanDoc">保存</el-button>
    </div>
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
            createPregnantWomanDoc(){
                this.$emit("reback",this.inData);
            },
            pregnantWomanDocClose(){
                this.inData.show = false;
                this.inData.nameSelectId = '';
                this.inData.husband = '';
                this.inData.phone = '';
                this.inData.addr = '';
                this.inData.LastMenstrualPeriod = null;
            },
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