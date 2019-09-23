<template>
    <Card>
        <div class="text-right mb10">
            <Button type="primary" @click="handleAdd">添加分类</Button>
        </div>
        <Table :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="action">
                <Button type="success" icon="ios-create-outline" class="mr5" @click="handleEdit(row)">编辑</Button>
                <Button type="error" icon="ios-trash-outline" @click="handleDelete(row)">删除</Button>
            </template>
        </Table>
        <Modal v-model="modalVisible" :title="modalTitle" width="400">
            <Form ref="categoryForm" :model="categoryForm">
                <FormItem prop="name" :rules="{required: true, trigger: 'blur', message: '请输入分类名称'}">
                    <Input placeholder="分类名称" v-model="categoryForm.name" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="default" @click="cancel">取消</Button>
                <Button type="primary" @click="confirm()">确定</Button>
            </div>
        </Modal>
    </Card>
</template>
<script>
    import { getCategoryList, addCategory, editCategory, deleteCategory } from '../../../api/category'

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
                data: [],
                modalVisible: false,
                categoryForm: {
                    name: ''
                },
                actionType: 'add'
            }
        },
        computed: {
          modalTitle() {
              return this.actionType === 'add' ? '添加' : '编辑'
          }
        },
        created() {
          this.fetchData()
        },
        methods: {
            fetchData() {
                getCategoryList().then(res => {
                    this.data = res.data;
                })
            },
            handleAdd() {
                this.actionType = 'add'
                this.modalVisible = true
            },
            handleEdit(row) {
                this.actionType = 'edit'
                this.currentCategory = row;
                this.categoryForm.name = row.name
                this.modalVisible = true
            },
            cancel() {
                this.modalVisible = false
                this.$refs.categoryForm.resetFields();
            },
            confirm() {
                this.$refs.categoryForm.validate((valid) => {
                    if (valid) {
                        if (this.actionType === 'add') {
                            this.addCategory();
                        } else if (this.actionType === 'edit') {
                            this.editCategory();
                        }
                    }
                })
            },
            addCategory() {
                addCategory({
                    ...this.categoryForm
                }).then(() => {
                    this.$Message.success('添加成功！')
                    this.fetchData()
                    this.cancel()
                })
            },
            editCategory() {
                editCategory({
                    id: this.currentCategory.id,
                    ...this.categoryForm
                }).then(() => {
                    this.$Message.success('修改成功！')
                    this.fetchData()
                    this.cancel()
                })
            },
            deleteCategory() {
                deleteCategory({
                    id: this.currentCategory.id
                }).then(() => {
                    this.$Message.success('删除成功！')
                    this.fetchData()
                })
            },
            handleDelete(row) {
                this.currentCategory = row;
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确定要删除此分类吗？',
                    onOk: () => {
                        this.deleteCategory();
                    }
                })
            }
        }
    }
</script>
