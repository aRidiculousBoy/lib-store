<template>
  <div class="step-form">
    <a-card>
      <div>
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="steps-content">
          <a-form-model ref="formModelRef" v-show="current === 0" :model="form" :rules="rules" layout="horizontal"
            :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="付款账户" prop="payAccount">
              <a-input v-model="form.payAccount" />
            </a-form-model-item>
            <a-form-model-item label="收款账户" prop="receiptAccount">
              <a-input v-model="form.receiptAccount" />
            </a-form-model-item>
            <a-form-model-item label="收款人姓名" prop="receiptName">
              <a-input v-model="form.receiptName" />
            </a-form-model-item>
            <a-form-model-item label="转账金额" prop="payment">
              <a-input-number v-model="form.payment" />
            </a-form-model-item>
          </a-form-model>

          <div v-show="current === 1" class="step-1">
            <a-alert message="确认转账后，资金将直接打入对方账户，无法退回。" type="success" show-icon closable>
            </a-alert>
            <div class="pay-item">付款账户: {{ form.payAccount }}</div>
            <div class="pay-item">收款账户: {{ form.receiptAccount }}</div>
            <div class="pay-item">收款人姓名: {{ form.receiptName }}</div>
            <div class="pay-item">转账金额: {{ form.payment }}</div>
            <a-form-model-item label="支付密码" prop="password">
              <a-input-password v-model="form.password"></a-input-password>
            </a-form-model-item>
          </div>
          <div v-show="current === 2">
            <a-result status="success" title="操作成功" sub-title="转账成功，预计在两小时内到账">
              <template #extra>
                <a-button key="console" type="primary">
                  再转一笔
                </a-button>
                <a-button-group>
                  <a-button>查看账单</a-button>
                  <a-button type="primary">
                    打印
                  </a-button>
                </a-button-group>
              </template>
            </a-result>
          </div>
        </div>
        <div class="steps-action">
          <a-button v-if="current < steps.length - 2" type="primary" @click="next">
            下一步
          </a-button>
          <a-button v-if="current === steps.length - 2" type="primary" @click="handleSubmit">
            提交
          </a-button>
          <a-button v-if="current !== steps.length - 1 && current > 0" style="margin-left: 8px" @click="prev">
            上一步
          </a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'step-form',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      current: 0,
      form: {
        payAccount: 'example@example.com',
        receiptAccount: 'zhangsan@example.com',
        receiptName: 'Zhang San',
        payment: 1000,
        password: 'undefined'
      },
      steps: [
        {
          title: '填写转账信息'
        },
        {
          title: '确认转账信息'
        },
        {
          title: '完成转账操作'
        },
      ],
      rules: {
        payAccount: [
          {
            required: true,
            message: '请输入付款账户信息',
            trigger: 'blur'
          }
        ],
        receiptAccount: [
          {
            required: true,
            message: '请输入收款账户信息',
            trigger: 'blur'
          }
        ],
        receiptName: [
          {
            required: true,
            message: '请输入收款人信息',
            trigger: 'blur'
          }
        ],
        payment: [
          {
            required: true,
            message: '请输入转账金额信息',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    next() {
      this.$refs.formModelRef?.validate(valid => {
        if (valid) {
          this.current++;
        }
      })
    },
    prev() {
      this.current--;
    },
    handleSubmit() {
      this.current = 2
    }
  },
};
</script>

<style scoped lang="less">
.step-form {
  padding: 24px;

  .steps-content {
    margin-top: 24px;
  }

  .step-1 {
    margin-left: 50%;
    transform: translateX(-50%);
  }
}

.pay-item {
  padding: 12px 0;
  color: #595959;
}
</style>
