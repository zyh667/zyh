<template>
<div class="content">
    <header>
        <div class="top">
            <div class="back">
                    <img  @click="back" src="../assets/img/chevron-back-outline.svg">
            </div>
            电费查询
        </div>
    </header>
        <div class="content1">
            <h2>电费情况</h2>
            <div class="content1">
                <h3 v-for="d in rel2" :key="d.area">宿舍：{{ d.area }}{{ d.build }}{{ d.floor }}{{ d.number }}</h3>
                <h3 id="num">总用电量：{{consumption}}度</h3>
                <h3 id="num1"></h3>
            </div>
        </div>
        <div class="sidebar">
            <button class="one">
                <h2>使用情况</h2>
            </button>
            <ul class="two">
                    <ul class="three" v-for="e in rel5" :key="e.area">
                    <h3>时间：{{e.time}}</h3>
                    <h3>用电量：{{e.electric}}吨</h3>
                    <h3 style="color: red">缴费状态：{{e.status}}</h3>
                    </ul>
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
      area:'',
      build:'',
      floor:'',
      number:'',
      rel:[],
      rel2:[],
      rel3:[],
      rel4:[],
      rel5:[],
      consumption:0
    };
  },created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },mounted:function(){
      this.electric();//需要触发的函数
    this.electric2();
    this.electric3();
    },
  methods: {
    back(){
    window.history.back();
  },
    async electric() {
      try {
        const response = await axios.post('/index/electric_rate/',{
          studentID:this.rel
        });
        this.rel2=response.data
      } catch (error) {
        console.error(error);
      }
    },
    async electric2() {
      try {
        const response = await axios.post('/index/electric_rate2/',{
          studentID:this.rel
        });
        const electricFees = response.data.map(item => parseFloat(item.electric));
        this.consumption = electricFees.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        let d=0
        d=0.539*this.consumption
        d=Math.floor(d * 100) / 100;
        document.getElementById("num1").innerText='需交电费：'+d+'元';
      } catch (error) {
        console.error(error);
      }
    },
    async electric3() {
      try {
        const response = await axios.post('/index/electric_rate3/',{
          studentID:this.rel
        });
        this.rel5=response.data
      } catch (error) {
        console.error(error);
      }
    },
  }
}
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
            box-shadow:0px 1px #afacac;
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
            margin-top: 15px;
            background-color: whitesmoke;
			width: 80%;
            left: 10%;
            position: relative;
        }
        h2{
            font-family:"楷体";
			font-weight: 400;
            padding: 5px 0px;
            text-align: center;
            background: #e3e2e2;
        }
        h3{
            padding: 5px 0px;
            font-family:"楷体";
			font-weight: 400;
        }
        .sidebar{
            text-align: center;
            margin-top: 15px;
        }
        .sidebar .one{
            width: 70%;
            height: 40px;
        }
        .sidebar .three{
            background: white;
            width: 70%;
            left: 15%;
            position: relative;
            margin: 0px 0px 5px 0px;
            box-shadow: 0px 0px 0px 1px #5d5c5c;
        }
</style>