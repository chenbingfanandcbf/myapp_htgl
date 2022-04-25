<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wro' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 -->
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              v-model="obj.query"
              class="input-with-select"
            /><el-button
              slot="append"
              icon="el-icon-search"
              @click="ss"
            ></el-button></div
        ></el-col>
        <el-col :span="12"
          ><div class="grid-content bg-purple-light">
            <el-button
              style="margin-left: 10px"
              type="primary"
              @click="flag = true"
              >添加用户</el-button
            >
          </div></el-col
        >
      </el-row>
      <!-- 搜索框 -->
      <!-- 列表 -->
      <el-table :data="user_lis" border style="width: 100%; margin-top: 20px">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="bj(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表 -->
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="obj.pagenum"
        :page-sizes="[2, 4, 6, 8, 10]"
        :page-size="obj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totai"
      >
      </el-pagination>
      <!-- 分页 -->
    </el-card>
    <!-- 卡片 -->
    <!-- 模态框 -->
    <div class="box" v-show="flag">
      <div class="con">
        <el-form
          :model="from"
          :rules="rules"
          ref="from"
          label-width="100px"
          class="demo-from"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="from.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="from.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="from.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="from.mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="adds">立即创建</el-button>
            <el-button @click="cz">重置</el-button>
            <el-button @click="flag = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 模态框 -->
    <div class="box" v-show="flag1">
      <div class="con">
        <el-form
          :model="from1"
          :rules="rules"
          ref="from1"
          label-width="100px"
          class="demo-from"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="from1.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="from1.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="from1.mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getbj">立即创建</el-button>
            <el-button @click="cz">重置</el-button>
            <el-button @click="flag1 = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 模态框 -->
  </div>
</template>

<script>
import { getUsers } from "@/uts/api.js";
import { getDel } from "../../uts/api";
import { getAdd } from "../../uts/api";
import { getBj } from "../../uts/api";
export default {
  data() {
    return {
      // id: 0,
      obj: {
        pagenum: 1,
        pagesize: 10,
        query: "",
      },
      from: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      from1: {
        username: "",
        email: "",
        mobile: "",
        id: 0,
      },
      rules: {
        username: [
          { required: true, message: "请添加用户名", trigger: "blur" },
        ],
        email: [{ required: true, message: "请添加邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请添加手机号", trigger: "blur" }],
        password: [{ required: true, message: "请添加密码", trigger: "blur" }],
      },
      word: "",
      totai: 0,
      user_lis: [],
      flag: false,
      flag1: false,
    };
  },
  mounted() {
    this.getuser();
    // this.getcj();
  },
  methods: {
    async getuser() {
      const res = await getUsers(this.obj);
      console.log(res);
      // const { totai, user_lis } = res;
      this.user_lis = res.users;
      this.totai = res.total;
    },
    handleSizeChange(val) {
      console.log(val);
      this.obj.pagesize = val;
      this.getuser();
    },
    handleCurrentChange(val) {
      this.obj.pagenum = val;
      this.getuser();
    },
    ss() {
      console.log(this.obj.query);
      this.getuser();
    },
    async adds() {
      const res = await getAdd(this.from);
      console.log(213, res);
      this.flag = false;
      this.getuser();
    },

    // async getcj() {

    // },
    cz() {
      this.from.username = "";
      this.from.password = "";
      this.from.mobile = "";
      this.from.email = "";
    },

    async del(id) {
      const res = await getDel(id);
      this.getuser();
    },
    bj(row) {
      this.flag1 = true;
      this.from1 = {
        username: row.username,
        mobile: row.mobile,
        email: row.email,
        id: row.id,
      };
    },
    async getbj() {
      const res = await getBj(this.from1.id, this.from1);
      console.log(res);
      this.getuser();
      // this.id = Number(this.from1.id);
      this.flag1 = false;
    },
    // gc() {
    //   this.from.username = this.from1[this.id].username;
    //   this.from.mobile = this.from1[this.id].mobile;
    //   this.from.email = this.from1[this.id].email;
    //   this.getuser();
    //   this.flag1 = false;
    // },
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 10px;
}
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
.box {
  width: 100%;
  height: 100%;
  background: rgb(77, 75, 75, 0.5);
  position: absolute;
  top: 0;
  left: 0;
}
.con {
  width: 600px;
  height: 500px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
