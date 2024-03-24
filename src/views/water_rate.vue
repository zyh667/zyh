<template>
<div class="content">
    <header>
        <div class="top">
            <div class="back">
                    <img  @click="back" src="../assets/img/chevron-back-outline.svg">
            </div>
            水费查询
        </div>
    </header>
        <div class="content1">
            <h2>水费情况</h2>
            <div class="content1">
                <h3 v-for="d in rel2" :key="d.area">宿舍：{{ d.area }}{{ d.build }}{{ d.floor }}{{ d.number }}</h3>
                <h3 id="num">总用水量：{{volume}}吨</h3>
                <h3 id="num1"></h3>
            </div>
        </div>
        <div class="sidebar">
            <button class="one">
                <h2>使用情况</h2>
            </button>
            <ul class="two">
                    <ul class="three" v-for="w in rel5" :key="w.area">
                    <h3>时间：{{w.time}}</h3>
                    <h3>用水量：{{w.water}}吨</h3>
                    <h3 style="color: red">缴费状态：{{w.status}}</h3>
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
      volume:0
    };
  },created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },mounted:function(){
      this.water();//需要触发的函数
    this.water2();
    this.water3();
    },
  methods: {
    back(){
    window.history.back();
  },
    async water() {
      try {
        const response = await axios.post('/index/water_rate/',{
          studentID:this.rel
        });
        this.rel2=response.data
      } catch (error) {
        console.error(error);
      }
    },
    async water2() {
      try {
        const response = await axios.post('/index/water_rate2/',{
          studentID:this.rel
        });
        const waterFees = response.data.map(item => parseFloat(item.water));
        this.volume = waterFees.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        let d=0
        d=2*this.volume
        d=Math.floor(d * 100) / 100;
        document.getElementById("num1").innerText='需交水费：'+d+'元';
      } catch (error) {
        console.error(error);
      }
    },
    async water3() {
      try {
        const response = await axios.post('/index/water_rate3/',{
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