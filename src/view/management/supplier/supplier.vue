<template>
    <Card>
        <div class="text-right mb10">
            <Button type="primary" @click="handleAdd">添加供应商</Button>
        </div>
        <Table :columns="columns" :data="data"></Table>
        <Modal v-model="supplierVisible" :title="modalTitle" width="400">
            <Form ref="supplierForm" :model="supplierForm" :rules="formValidate" :label-width="100">
                <FormItem label="供应商名称" prop="name">
                    <Input v-model="supplierForm.name" />
                </FormItem>
                <FormItem label="联系电话" prop="phone">
                    <Input v-model="supplierForm.phone" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit">确定</Button>
            </div>
        </Modal>
    </Card>
</template>
<script>
    import { addSupplier, getSupplierList } from '../../../api/supplier'

    export default {
        data () {
            return {
                columns: [
                    {
                        title: '供应商名称',
                        key: 'name'
                    },
                    {
                        title: '联系电话',
                        key: 'phone'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    }
                ],
                data: [],
                supplierForm: {
                    name: '',
                    phone: ''
                },
                formValidate: {
                    name: [
                        { required: true, message: '请输入供应商名称', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' }
                    ]
                },
                supplierVisible: false,
                actionType: 'add',
                start: 1,
                limit: 10,
                total: 0
            }
        },
        computed: {
            modalTitle () {
                return this.actionType === 'add' ? '添加' : '编辑'
            }
        },
        created () {
            this.fetchData();
        },
        methods: {
            fetchData () {
                getSupplierList({
                    start: (this.start - 1) * this.limit,
                    limit: this.limit
                }).then(res => {
                    this.data = res.data.list;
                    this.total = res.data.total;
                })
            },
            handleAdd () {
                this.open();
            },
            cancel () {
                this.supplierVisible = false
                this.$refs.supplierForm.resetFields()
            },
            open () {
                this.supplierVisible = true
            },
            submit () {
                this.$refs.supplierForm.validate(valid => {
                    if (valid) {
                        addSupplier({
                            ...this.supplierForm
                        }).then(() => {
                            this.$Message.success('添加成功！')

                            setTimeout(() => {
                                this.cancel();
                                this.fetchData();
                            }, 300)
                        })
                    }
                })
            },
        }
    }
</script>
