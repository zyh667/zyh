<template>
<div class="content">
            <header>
			<div class="top">
				<div class="back">
						<img @click="back" src="@/assets/img/chevron-back-outline.svg">
				</div>
				个人信息
			</div>
		</header>
			<from>
				<div class="content1">
					<h1>学&emsp;号：</h1>
					<input type="text" class="content1_1" v-model="studentID" placeholder="UID" style="width: 50%;" disabled="disabled" />
				</div>
				<div class="content1">
					<h1>姓&emsp;名：</h1>
					<input type="text" class="content1_1" v-model="sname" placeholder="姓名" style="width: 50%;" disabled="disabled" />
				</div>
				<div class="content1">
					<h1>手&emsp;机：</h1>
					<input type="text" class="content1_1" v-model="phone" placeholder="未绑定" style="width: 50%;" disabled="disabled" />
				</div>
				<div class="content1">
					<h1>性&emsp;别：</h1>
					<input type="text" class="content1_1" v-model="sex" placeholder="性别" style="width: 50%;" disabled="disabled"/>
				</div>
				<div class="content1">
					<h1>宿舍号：</h1>
					<input type="text" class="content1_1" v-model="dormitory" placeholder="未入住" style="width: 50%;" disabled="disabled"/>
				</div>
			</from>
		</div>
</template>
<script>
import axios from 'axios';
export default {

  data() {
    return {
      user: null,
      studentID: '',
      sname: '',
      phone:'',
      sex:'',
      dormitory:'',
      rel:[],
      rel2:[],
      rel3:[],
    };
  },created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },
  mounted:function(){
      this.personal();//需要触发的函数
    this.personal2();
    },
  methods: {
    back(){
    window.history.back();
  },
    async personal() {
      try {
        const response = await axios.post('/index/personal/',{
          studentID:this.rel
        });
        this.rel2=response.data[0]
        this.studentID=this.rel2['studentID']
        this.sname=this.rel2['sname']
        this.sex=this.rel2['sex']
        this.phone=this.rel2['phone']
      } catch (error) {
        console.error(error);
      }
    },
    async personal2() {
      try {
        const response = await axios.post('/index/personal2/',{
          studentID:this.rel
        });
        this.rel3=response.data[0]
        this.dormitory=this.rel3['area']+this.rel3['build']+this.rel3['floor']+this.rel3['number']
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
body{
			background-color: whitesmoke;
		}
		* {
			margin: 0;
			padding: 0;
		}
		.top {
			font-weight: bolder;
			font-size: 26px;
			text-align: center;
			background-color: white;
			width: 100%;
			height: 40px;
            padding-top: 40px;
		}
		.back{
			width: 10%;
			height: 37px;
			position: fixed;
			top: 39px;
		}
		.back img{
			width: 40px;
			height: 40px;
		}
		.content {
			background-color: white;
			position : absolute;
	        width : 100%;
	        height : 100%;
		}
		.content1{
			background-color: white;
			margin: 0.1rem 0px;
			height: 50px;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			box-shadow: 0px 0px 1px #bababa;
		}
		h1{
			font-family:"楷体";
			font-weight: 600;
			font-size: 20px;
			margin-left: 15px;
			flex-wrap: wrap;
			display: flex;
			align-content: center;
		}
		input{
			height: 50%;
		}
</style>