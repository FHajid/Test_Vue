import TableList from '../components/tablelist.vue';

const routes = [
  {
    path: '/list',
    name: 'TableList',
    component: TableList,
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
  },
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;