<template>
  <div>
    <el-container>
      <!-- title -->
      <el-header>
        <el-row>
          <el-col :span="1"
            ><div class="grid-content bg-purple">
              <img src="/img/1.jpg" alt="" /></div
          ></el-col>
          <el-col :span="11"
            ><div class="grid-content bg-purple-light">
              后台管理登录系统
            </div></el-col
          >
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <button>退出</button>
            </div></el-col
          >
        </el-row>
      </el-header>
      <!-- title -->
      <el-container>
        <!-- 左侧边栏 -->
        <el-aside width="200px">
          <el-menu
            :default-active="$route.name"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-submenu
              :index="item.id.toString()"
              v-for="(item, index) in msge"
              :key="index"
            >
              <template slot="title">
                <i :class="ic[index]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="item1.path"
                  :ind="item1.id.toString()"
                  v-for="(item1, index1) in item.children"
                  :key="index1"
                  > <i class="el-icon-menu"></i>{{ item1.authName }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 左侧边栏 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getMenus } from "@/uts/api.js";
export default {
  data() {
    return {
      msge:[],
      ic:["el-icon-user-solid","el-icon-star-on","el-icon-s-tools","el-icon-s-order","el-icon-s-marketing"]
    };
  },
  mounted() {
    this.getmasg()
  },
  methods: {
    async getmasg() {
      const res = await getMenus()
      console.log(res);
      this.msge=res
    },
  },
};
</script>

<style scoped lang="scss">
.el-header {
  background-color: rgb(84, 92, 100);
  color: #333;
  button {
    widows: 70px;
    height: 40px;
    float: right;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  // text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-row {
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 600;
  color: white;

  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  line-height: 20px;
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
