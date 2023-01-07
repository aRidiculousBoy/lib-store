<template>
  <div class="standard-form">
    <a-card>
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item ref="name" label="姓名" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item ref="email" label="邮箱地址" prop="email">
          <a-input v-model="form.email" />
        </a-form-model-item>
        <a-form-model-item label="城市" prop="city">
          <a-select v-model="form.city" placeholder="请选择城市">
            <a-select-option value="shanghai">
              上海
            </a-select-option>
            <a-select-option value="beijing">
              北京
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="出生日期" required prop="birthday">
          <a-date-picker v-model="form.birthday" show-time type="date" placeholder="请选择出生日期" style="width: 100%;" />
        </a-form-model-item>
        <a-form-model-item label="是否毕业" prop="isGraduate">
          <a-switch v-model="form.isGraduate" />
        </a-form-model-item>
        <a-form-model-item label="性别" prop="gender">
          <a-radio-group v-model="form.gender">
            <a-radio value="man">
              男
            </a-radio>
            <a-radio value="woman">
              女
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="兴趣爱好" prop="likes">
          <a-checkbox-group v-model="form.likes">
            <a-checkbox value="eating" name="type">
              吃
            </a-checkbox>
            <a-checkbox value="sleeping" name="type">
              睡
            </a-checkbox>
            <a-checkbox value="running" name="type">
              跑
            </a-checkbox>
            <a-checkbox value="coding" name="type">
              编程
            </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="个人简介" prop="desc">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit" :loading="submitting">
            提交
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import 'moment/locale/zh-cn';
export default {
  name: 'standard-form',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: undefined,
        email: undefined,
        city: undefined,
        birthday: undefined,
        isGraduate: false,
        likes: [],
        desc: undefined,
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        email: [{ required: true, validator: this.emailValidator, trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
        likes: [
          {
            type: 'array',
            required: true,
            validator: this.likesValidator,
            trigger: 'change',
          },
        ],
        desc: [
          { required: true, message: '请输入个人简介', trigger: 'blur' },
          { min: 20, message: '个人简介不少于20字', trigger: 'blur' }
        ],
      },
      submitting: false
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.submitting = true
          setTimeout(() => {
            this.$message.success('提交成功')
            this.submitting = false
          }, 1000)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    emailValidator(rule, value, callback) {
      const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!emailReg.test(value)) {
        return callback(new Error('邮箱格式不正确'))
      }
      callback()
    },
    likesValidator(rule, value, callback) {
      if (!value.length) {
        return callback(new Error('请至少选择一项兴趣爱好'))
      }
      callback()
    }
  },
};
</script >
</script>

<style scoped lang="less">
.standard-form {
  padding: 24px;
}
</style>
