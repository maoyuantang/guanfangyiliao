<template>
    <!-- 远程会诊系统 -->

    <div class="consultationBox">
         
         <admin v-if="$store.state.user.viewRoot.now.name==='manager'"></admin>
       <doctor v-else></doctor>
       
    </div>
</template>
<script>
import doctor from "./consultation/doctor.vue";
import admin from "./consultation/admin.vue";
export default {
    components: {
        admin,
        doctor
    },
    data() {
        return {
        };
    },
    methods: {
    },
    async created() {
    },
    watch: {
        "$store.state.user.viewRoot.now.name": {
            handler(data) {
                // this.oUserType=data
                // alert(data)
                // if(data=='doctor')
                // {
                //      this.getDocList();
                // }else{
                //    this.getAdminList(); 
                // }
            }
        }
    }
};
</script>

<style>

</style>