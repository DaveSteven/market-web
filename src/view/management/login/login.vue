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
                        <Input v-model="loginForm.password">
                            <span slot="prepend">
                                <Icon type="md-lock"></Icon>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" long @click="handleLogin">登录</Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
    </Row>
</template>
<script>
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
            handleLogin() {
                this.$router.push({
                    path: '/admin/home'
                })
            }
        }
    }
</script>
<style lang="less" src="./login.less" scoped></style>
