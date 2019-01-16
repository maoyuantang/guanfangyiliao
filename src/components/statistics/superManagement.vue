<template>
	<div class="super-management">
		超级管理员
		<div>
			<search></search>
		</div>
		<div>
			<ul>
				<li>
					<div class="docLi-head">
						<h5></h5>
						<span></span>
						<span></span>
					</div>
					<div>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div>
						<!-- <publicList :tableData=""></publicList> -->
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { fetchHospitalList } from "../../api/apiAll.js";
import { mapState } from "vuex";
import search from "../../public/publicComponents/search.vue";
import publicList from "../../public/publicComponents/publicList.vue";
export default {
    components: {
        search,
        publicList
    },
    data() {
        return {
            msg: "superManagement"
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        //创建会话框
        async getHosList() {
            const options = {
                token: this.userState.token,
                search: "",
                pageNum: 1,
                pageSize: 10
            };
            const res = await fetchHospitalList(options);
            if (res.data && res.data.errCode === 0) {
                // alert("dd");
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        }
    },
    async created() {
        this.getHosList();
    }
};
</script>

<style scoped>
.super-management {
}
</style>
<!--
    超级管理员界面
-->