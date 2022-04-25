<template>
    <div class="box">
      <div class="login">
        <h2>电商管理后台</h2>
        <el-form ref="rules_login" :model="form" :rules="rules_login" label-width="80px">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="form.password"></el-input>
        </el-form-item>
        </el-form>
        <el-button type="info" @click="resetForm">重置</el-button>
        <el-button type="primary" @click="dl">登录</el-button>
      </div>
    </div>
</template>

<script>
import { LoginApi } from "../uts/api";
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456",
      },
      rules_login: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 5, max: 6, message: "长度在 5 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入正确密码", trigger: "blur" },
          { min: 5, max: 6, message: "长度在 5 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    dl() {
      this.$refs["rules_login"].validate(async (valid) => {
        if (!valid) return false;
        const res = await LoginApi(this.form);
        console.log("是否登录成功", res);
          this.$router.push("/about")
      });
    },
      resetForm() {
        this.$refs["rules_login"].resetFields();
      }
  },
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100vh;
  background: #2b4b6b;
}
.login {
  width: 600px;
  height: 350px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h2 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.el-button {
  float: right;
  margin: 5px;
}
</style>
