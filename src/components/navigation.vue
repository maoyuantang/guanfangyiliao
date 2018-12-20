<template>
<div class="navigation">
		<el-menu>
			<!--1st-->
			<el-submenu index="1">
		        <template slot="title">
		          <i class="el-icon-location"></i>
		          <span>导航一</span>
		        </template>
		        <el-menu-item-group>
		          <template slot="title">分组一</template>
		          <el-menu-item index="1-1" @click="goTotest">选项1</el-menu-item>
		          <el-menu-item index="1-2" @click="goTotestB">选项2</el-menu-item>
		        </el-menu-item-group>
		        <el-menu-item-group title="分组2">
		          <el-menu-item index="1-3" @click="goTotestC">选项3</el-menu-item>
		        </el-menu-item-group>
		        <el-submenu index="1-4">
		          <template slot="title">选项4</template>
		          <el-menu-item index="1-4-1">选项1</el-menu-item>
		        </el-submenu>
		    </el-submenu>
		    <!--2nd-->
		    <el-menu-item index="2">
		        <i class="el-icon-menu"></i>
		        <span slot="title">导航二</span>
		    </el-menu-item>
		    <!--3th-->
		    <el-menu-item index="3" disabled>
		        <i class="el-icon-document"></i>
		        <span slot="title">导航三</span>
		    </el-menu-item>
		</el-menu>
		
</div>
</template>

<script>
	export default {
		name : 'navigation',
		data(){
			return {
				msg:'navigation'
			}
		},
		methods:{
			goTotest(){
				this.$router.push({path:'/'})
			},
			goTotestB(){
				this.$router.push({path:'/testb'})
			},
			goTotestC(){
				this.$router.push({path:'/testc'})
			},
		}
	}
</script>

<style scoped>
	.navigation{
		/*background: black;*/
		/*color: white;*/
		color: var(--testColor);
		height: 1.5rem;
		font-size: 0.2rem;
	}
</style>