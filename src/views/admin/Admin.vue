<template>
  <div class=" bg-gradient-to-b from-white via-blue-200 via-45% to-white to-90%">
    <AdminHeader />
    <AdminHome />
    <AdminFooter />
  </div>
</template>

<script setup>
import AdminHeader from '@/components/adminComponents/AdminHeader.vue';
import AdminHome from './AdminHome.vue';
import AdminFooter from '@/components/adminComponents/AdminFooter.vue';
</script>
