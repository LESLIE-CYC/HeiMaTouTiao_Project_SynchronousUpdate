<!-- 唉，请注意看好了：当前是Lonin.vue登录展示页面 -->
<template>
  <div class="login">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- you hou mi -->
        <hminput
          placeholder="请输入用户名/手机号"
          :rules="/^(\d{5,6})$|^(1\d{10})$/"
          msg="用户名或者手机号输入不正确"
          :value="users.username"
          @input="handleinput"
        ></hminput>
        <hminput
          placeholder="请输入密码"
          :rules="/^\S{3,16}$/"
          msg="请输入3-16位的密码"
          v-model="users.password"
        ></hminput>
      </div>
      <p class="tips">
        有没有账号啊？
        <a href="#/register" class>去注册</a>
      </p>
      <hmbutton @click="login">登录</hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hmbutton.vue'
import hminput from '@/components/hminput.vue'
import { login } from '@/apis/user.js'

export default {
  components: {
    hmbutton,
    hminput
  },
  data () {
    return {
      users: {
        username: '10086',
        password: '123'
      }
    }
  },
  methods: {
    async login () {
      if (/^(\d{5,6})$|^(1\d{10})$/.test(this.users.username) && /^\S{3,16}$/.test(this.users.password)) {
        let res = await login(this.users)
        // console.log(res)
        if (res.data.message === '用户不存在') {
        // 给出用户提示
          this.$toast.fail(res.data.message)
        } else {
          // 将当前接收的token实现本地存储
          localStorage.setItem('toutiao_41_token', res.data.data.token)
          // 为了后期的方便操作的话，就把当前用户数据也存储到本地
          localStorage.setItem('toutiao_41_userInfo', JSON.stringify(res.data.data.user))
          // 实现页面的跳转
          this.$router.push({ path: `/persona/${res.data.data.user.id}` })
        }
      } else {
        this.$toast.fail('用户数据输入不合法')
      }
    },
    handleinput (data) {
      this.users.usersname = data
    }
  }

}
</script>

<style lang='less' scoped>
.btn{
  background-color: green;
}
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}

</style>
