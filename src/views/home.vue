<template>
<header>
		<div class="top">
			首页
		</div>
	</header>
    <div class="sidebar">
        <button class="toggle">
                <img :src="imageUrl" alt="">
        </button>
        <ul class="menu">
            <li>{{sname}}</li>
            <li>个人中心</li>
            <li>学校官网</li>
            <li id="exit">退出</li>
        </ul>
    </div>
	<div class="content">
    <div class="carousel-inner">
      <div class="carousel-item" v-for="(image, index) in images" :key="index">
        <img :src="image" alt="">
      </div>
    </div>
  </div>

    <div class="box">
       <router-view>

         </router-view>
        <div id="nav">
            <ul>
                <li class="checked" style="--b:rgba(255,0,0,0.2)">
                    <router-link to="/home/menjin">门禁</router-link>
                </li>
                <li class="no-checked" style="--b:rgba(0,102,255,0.2)">
                    <router-link to="/home/suse">宿舍</router-link>
                </li>
                <li class="no-checked" style="--b:rgba(85,0,255,0.2)">
                    <router-link to="/home/jiaofei">缴费</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      studentID: '',
      rel:[],
      sname:'',
      imageUrl:'',
      images: [
        require('@/assets/notice/1.jpg'),
        require('@/assets/notice/2.jpg'),
        require('@/assets/notice/3.jpg'),
        // Add more image URLs here
    ],
      dynamicstyle: "", //动态样式
      currentSlide: 0, //播放序号
      interval: Object,
      user: null,
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },
  mounted:function(){
    this.startCarousel();
    this.menjin();
    this.menu();
    this.home();
  },
  methods: {
    menu(){
      let toggle = document.querySelector('.toggle')
        let sidebar = document.querySelector('.sidebar')
        let menus = document.querySelector('.menu').children
        let isOpenSidebar = false
        toggle.onclick = () => {
            if (isOpenSidebar) {
                sidebar.classList.remove('sidebar-active')
            } else {
                sidebar.classList.add('sidebar-active')
            }
            isOpenSidebar = !isOpenSidebar
        }
        for (let i = 0; i < menus.length; i++) {
            menus[i].onclick = () => {
                for (let j = 0; j < menus.length; j++) {
					switch(i){
                        case 1:location='/my_panel/';break;
                        case 2:location='https://cuc.fjnu.edu.cn/';break;
                        case 3:this.$router.push({name:'login'});break;
					}
                }

            }
        }
    },
    menjin(){
      this.$router.push({name:'menjin'})
    },
     setStyle() {
      this.dynamicstyle = `translatex(-${this.currentSlide*100}%)`
    },
    // 定时器
    startCarousel() {
      this.interval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
        this.setStyle();
      }, 1000)
    },
    async home() {
      try {
        const response = await axios.post('/index/home/',{
          studentID:this.rel,
        });
        this.rel=response.data[0]
        this.sname=this.rel.sname
        this.imageUrl=this.rel.avatar
        this.imageUrl='http://127.0.0.1:8000'+this.imageUrl
        console.log(this.imageUrl)
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
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

.content {
	background-color: white;
	width: 100%;
	height: 30%;
	position: absolute;
	overflow: hidden;
	display: flex;
	align-items: center;
	margin: 0 auto;

}
.carousel-inner {
  border-radius: 10px;
	width: 300%;
	height: 95%;
	margin: 0;
	padding: 0;
	position: absolute;
	left: 0;
	display: flex;
  transition: transform 0.5s ease-in-out;
}
.carousel-item {
	text-align: center;
	flex: 1;
	list-style: none;
	margin: 0;
	padding: 0;
	z-index: 98;
}

.carousel-item img {
  box-shadow: 0px 0px 13px #f8c0c0;
	border-radius: 20px;
	width: 90%;
	height: 100%;
  object-fit: cover;
}

.box {
	justify-content: center;
    display: flex;
    background: white;
    width: 100%;
    height: 55%;
    padding: 13px 0px;
    position: absolute;
    bottom: 0px;
    overflow: hidden;
    border-radius: 20px;
}




.box .page {
	width: 80%;
    display: flex;
    height:75%;
    position: absolute;
    justify-content: center;
}


#nav {
    box-shadow: 0px 0px 13px #ababab;
    border-radius: 40px 40px 40px 40px;
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
}

#nav ul {
	display: flex;
	justify-content: center;
	align-items: center;
}

#nav ul>li {
	padding: 0 15px;
	box-sizing: border-box;
	border-radius: 30px;
	height: 35px;
	margin: 0 5px;
	list-style-type: none;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 0.5s;
}

#nav li>ion-icon {
	padding-right: 5px;
	font-size: 18px;
}

#nav li>span {
	word-break: break-all;
	white-space: nowrap;
	user-select: none;
	overflow: hidden;
	font-size: 15px;
	transition: 0.5s;
}

.checked {
	background: var(--b);
}

.checked>span {
	width: 30px;
	opacity: 1;
}

.no-checked>span {
	width: 0;
	opacity: 0;
}
.sidebar {
    width: 20%;
    height: 30%;
    background-color: white;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    padding-top: 60px;
    transition: all .5s;
    left: -25%;
	z-index: 99;
	box-shadow: 0px 0px 13px #969696;
	border-radius: 0px 0px 40px 0px;
}
.sidebar .toggle img{
	width: 40px;
    height: 40px;
    z-index: 99;
	border-radius: 20px;
    position: absolute;
}.sidebar .menu img{
	width: 40px;
    height: 40px;
    z-index: 99;
}

.sidebar-active {
    left: 0;
	top:4%;
}

.sidebar>.toggle {
    border: none;
    outline: none;
    background: transparent;
    position: fixed;
    left: 5%;
    top: 40px;
}
.sidebar .menu{
	width: 100%;
}
.sidebar>.menu>li {
    width: 100%;
    height: 15%;
    color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-bottom: 8px;
    transition: all .3s;
	z-index: 99;
}
.sidebar>.menu>li:hover {
    color: #ffffff;
    background-color: rgba(121, 159, 255, 0.71);
	z-index: 99;
}

</style>