<template>
    <Row class="login-wrapper">
        <div class="login-content">
            <Card>
                <p slot="title">欢迎登录</p>
                <Form :model="loginForm">
                    <FormItem prop="username">
                        <Input v-model="loginForm.username">
                            <span slot="prepend">
                                <Icon type="md-person"></Icon>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input v-model="loginForm.password" type="password">
                            <span slot="prepend">
                                <Icon type="md-lock"></Icon>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" long @click="handleSubmit">登录</Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
    </Row>
</template>
<script>
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions([
                'handleLogin',
                'getUserInfo'
            ]),
            handleSubmit() {
                this.handleLogin({
                    ...this.loginForm
                }).then(res => {
                    this.getUserInfo().then(res => {
                        this.$router.push({
                            name: this.$config.homeName
                        })
                    })
                })
            }
        }
    }
</script>
<style lang="less" src="./login.less" scoped></style>
