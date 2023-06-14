<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form">
          <h2 class="title">Lib-Store</h2>
          <div class="input-field">
            <i class="fas fa-user"></i><input type="text" placeholder="用户名" v-model="loginForm.username" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i><input type="password" placeholder="密码" v-model="loginForm.password" />
          </div>
          <input type="submit" value="登录" class="btn solid" @click.prevent="handleLogin" />
          <p class="social-text">第三方账户登录</p>
          <div class="social-media">
            <a-tooltip overlayClassName="overlay">
              <template slot="title">
                功能开发中...
              </template>
              <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                功能开发中...
              </template>
              <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                功能开发中...
              </template>
              <a href="#" class="social-icon"><i class="fab fa-google"></i></a>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                功能开发中...
              </template>
              <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
            </a-tooltip>
          </div>
        </form>
        <form action="#" class="sign-up-form">
          <h2 class="title">Lib-Store</h2>
          <div class="input-field">
            <i class="fas fa-user"></i><input type="text" placeholder="用户名" v-model="registerForm.username" ref="inputRef"/>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i><input type="password" placeholder="密码" v-model="registerForm.password" />
          </div>
          <input type="submit" class="btn" value="注册" @click.prevent="handleRegister" />
          <p class="social-text">第三方账户登录</p>
          <div class="social-media">
            <a-tooltip overlayClassName="overlay">
              <template slot="title">
                功能开发中...
              </template>
              <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                功能开发中...
              </template>
              <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                功能开发中...
              </template>
              <a href="#" class="social-icon"><i class="fab fa-google"></i></a>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                功能开发中...
              </template>
              <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
            </a-tooltip>
          </div>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3 style="color:#fff">欢迎回来</h3>
          <p>
            Lib-Store是一款纯净、简洁的存储系统。在这里，您可以轻松、无障碍的使用它来管理你的文件资产。
          </p>
          <button class="btn transparent" id="sign-up-btn">注册</button>
        </div>
        <img src="img/log.svg" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3 style="color:#fff">欢迎加入 Lib-Store</h3>
          <p>
          </p>
          <button class="btn transparent" id="sign-in-btn" ref="toggleLoginRef">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import './static/js/64d58efce2.js'

export default {
  name: 'login',
  mounted() {
    import('./static/js/script.js')
  },
  data() {
    return {
      loginForm: {
        username: undefined,
        password: undefined
      },
      registerForm: {
        username: undefined,
        password: undefined,
      },
      userIsExist: false
    }
  },
  methods: {
    async handleLogin() {
      const isValid =
        this.loginForm.username !== undefined && this.loginForm.username?.trim() !== ''
        &&
        this.loginForm.password !== undefined && this.loginForm.password?.trim() !== ''

      if (!isValid) {
        return this.$notification.error({
          message: '校验失败,请重新填写登录信息',
          description: '用户名和密码不能为空',
          duration: 1
        })
      }

      store.dispatch('user/appLogin', this.loginForm).
        then(data => {
          this.$notification.success({
            message: '登录成功',
            description: '即将进入应用',
            duration: 1
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
        ).
        catch()
    },
    async handleRegister() {
      const isValid =
        this.registerForm.username !== undefined && this.registerForm.username?.trim() !== ''
        &&
        this.registerForm.password !== undefined && this.registerForm.password?.trim() !== ''

      if (!isValid) {
        return this.$notification.error({
          message: '校验失败,请重新填写注册信息',
          description: '用户名和密码不能为空',
          duration: 1
        })
      }

      const { username, password } = this.registerForm
      const payload = {
        userName: username,
        password
      }
      const userIsExist = await this.$store.dispatch('user/checkUserIsExist', {
        userName: username
      })

      this.userIsExist = userIsExist
      if (!userIsExist) {
        this.$store.dispatch('user/appRegister', payload).then(response => {
          this.$notification.success({
            message: '注册成功',
            description: '欢迎成为Lib Store的一员'
          })
          // 注册成功后手动触发切换到登录表单
          this.$refs.toggleLoginRef?.click()
        })
      }
      else {
        this.registerForm.username = undefined
        this.$notification.error({
          message: '校验失败,请重新填写注册信息',
          description: '该用户名已被注册，请重新输入用户名',
          duration: 1
        })
        this.$refs.inputRef.focus()
      }
    },
  }
}
</script>

<style scoped src="./static/css/style.css">

</style>
<style>
.input-field {
  margin: 16px !important;
}

.register-username-error {
  text-align: left;
  padding: 2px 0;
}
</style>
