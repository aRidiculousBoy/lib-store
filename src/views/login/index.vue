<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form">
          <h2 class="title">Netdisk</h2>
          <div class="input-field">
            <i class="fas fa-user"></i><input type="text" placeholder="用户名" v-model="loginForm.username" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i><input type="password" placeholder="密码" v-model="loginForm.password" />
          </div>
          <input type="submit" value="登录" class="btn solid" @click.prevent="handleLogin" />
          <p class="social-text">或者使用第三方账号登录</p>
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
          <h2 class="title">Netdisk</h2>
          <div class="input-field">
            <i class="fas fa-user"></i><input type="text" placeholder="用户名" v-model="registerForm.username" />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i><input type="email" placeholder="Email" v-model="registerForm.email" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i><input type="password" placeholder="密码" v-model="registerForm.password" />
          </div>
          <input type="submit" class="btn" value="注册" @click.prevent="handleRegister" />
          <p class="social-text">或者使用第三方账号登录</p>
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
            Netdisk是一款纯净、简洁的云存储系统。在这里，您可以轻松、无障碍的使用它来管理你的文件资产。
          </p>
          <button class="btn transparent" id="sign-up-btn">注册</button>
        </div>
        <img src="img/log.svg" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3 style="color:#fff">欢迎加入</h3>
          <p>
          </p>
          <button class="btn transparent" id="sign-in-btn">登录</button>
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
        email: undefined
      }
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
          message: '校验失败,请重新填写信息',
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
    handleRegister() {
      console.log('register')
    }
  }
}
</script>

<style scoped src="./static/css/style.css">

</style>