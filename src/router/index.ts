import { createRouter, createWebHistory } from 'vue-router';
import ListTabel from '../components/tablelist.vue';
import Detail from '../components/detail.vue';
import edittable from '@/components/edit_table.vue';
import addtable from '@/components/add_table.vue';


import AddProduct from '../components/add_product.vue';
import ProductList from "@/components/Product.vue";
import detailproduct from "@/components/detail_product.vue";
import editproduct from "@/components/edit_product.vue";

const routes = [
    { path: '/list', component: ListTabel },
    { path: '/detailtable/:name', component: Detail },
    { path: '/edittable/:name', component: edittable },
    { path: '/addtable', component: addtable },


    { path: '/product', component: ProductList },
    { path: '/detailproduct/:id', component: detailproduct },
    { path: '/add', component: AddProduct },
    { path: '/editproduct/:id', component: editproduct },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
