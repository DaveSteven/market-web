<template>
    <Card>
        <div class="text-right mb10">
            <Button type="primary" @click="handleAdd">添加分类</Button>
        </div>
        <Table :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="action">
                <Button type="success" class="mr5">编辑</Button>
                <Button type="error">删除</Button>
            </template>
        </Table>
        <Modal v-model="modalVisible" title="添加分类" width="400">
            <Form ref="categoryForm" :model="categoryForm">
                <FormItem prop="name" :rules="{required: true, trigger: 'blur', message: '请输入分类名称'}">
                    <Input placeholder="分类名称" v-model="categoryForm.name" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="default" @click="cancel">取消</Button>
                <Button type="primary" @click="addConfirm">确定</Button>
            </div>
        </Modal>
    </Card>
</template>
<script>
    import { addCategory } from '../../../api/category'

    export default {
        data() {
            return {
                columns: [
                    {
                        title: '分类名称',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [
                    {
                        name: '生活用品'
                    }
                ],
                modalVisible: false,
                categoryForm: {
                    name: ''
                }
            }
        },
        methods: {
            handleAdd() {
                this.modalVisible = true;
            },
            cancel() {
                this.modalVisible = false;
                this.$refs.categoryForm.resetFields();
            },

            addConfirm() {
                this.$refs.categoryForm.validate((valid) => {
                    if (valid) {
                        addCategory({
                            ...this.categoryForm
                        }).then(() => {
                            this.$Message.success('添加成功！');
                            this.cancel();
                        })
                    }
                })
            }
        }
    }
</script>
