<template>
<header>
			<div class="top">
				<div class="back">
						<img @click="back" src="@/assets/img/chevron-back-outline.svg">
				</div>
				宿舍信息
			</div>
		</header>
		<div class="content">
      <div class="content1">
					<h1>学号：</h1>
					<input type="text" v-model="studentID" style="width: 25%;" disabled="disabled" />
					<h1>姓名：</h1>
					<input type="text" v-model="sname" style="width: 21%;" disabled="disabled"/>
				</div>
				<div class="content1">
					<h1>宿舍区域：</h1>
					<input type="text" v-model="area" style="width: 12%;" disabled="disabled"/>
					<h1>宿舍楼号：</h1>
					<input type="text" v-model="build" style="width: 12%;" disabled="disabled"/>
				</div>
				<div class="content1">
					<h1>宿舍楼层：</h1>
					<input type="text" v-model="floor" style="width: 12%;" disabled="disabled" />
					<h1>宿舍门牌：</h1>
					<input type="text" v-model="number" style="width: 12%;" disabled="disabled" />
				</div>

				<div class="content1">
					<h1>允许居住人数：</h1>
					<input type="text" v-model="residency" style="width: 21%;" disabled="disabled" value=""/>
				</div>

				<div class="content1">
					<h1>当前居住人数：</h1>
					<input type="text" id="num" v-model="num" style="width: 21%;" disabled="disabled">
				</div>

                <div class="sidebar">
                    <button class="one">
                        <h2>当前居住学生</h2>
                    </button>
                    <ul class="two">
                            <li class="li" v-for="r in rel4" :key="r.studentID">{{r.studentID}}  {{r.sname}}</li>
                    </ul>
                </div>
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
      area:'',
      build:'',
      floor:'',
      number:'',
      residency:'',
      num:'',
      rel:[],
      rel2:[],
      rel3:[],
      rel4:[],
    };
  },created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },
  mounted:function(){
      this.dormitory1();//需要触发的函数
    this.dormitory2();
    this.dormitory3();
    },
  methods: {
    back(){
    window.history.back();
  },
    async dormitory1() {
      try {
        const response = await axios.post('/index/dormitory/',{
          studentID:this.rel
        });
        this.rel2=response.data[0]
        this.studentID=this.rel2['studentID']
        this.sname=this.rel2['sname']
        this.area=this.rel2['area']
        this.build=this.rel2['build']
        this.floor=this.rel2['floor']
        this.number=this.rel2['number']
      } catch (error) {
        console.error(error);
      }
    },
    async dormitory2() {
      try {
        const response = await axios.post('/index/dormitory2/',{
          studentID:this.rel
        });
        this.rel3=response.data[0]
        this.residency=this.rel3['residency']
      } catch (error) {
        console.error(error);
      }
    },
    async dormitory3() {
      try {
        const response = await axios.post('/index/dormitory3/',{
          studentID:this.rel
        });
        this.rel4=response.data
        console.log(this.rel4)
        this.num = this.rel4.length+'人'
        document.getElementById("num").value=b+"人";
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
			width: 100%;
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
        .sidebar{
            text-align: center;
        }
        .sidebar .one{
            width: 70%;
        }
        .li{
            padding: 5px 0px;
            font-size: 20px;
            font-family:"楷体";
			font-weight: 600;
            color: crimson;
        }
</style>