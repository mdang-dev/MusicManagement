<script setup>

import VueApexCharts from 'vue3-apexcharts'
import { inject, onMounted, reactive, ref } from 'vue'
import Layout from '@/layout/Layout.vue'
import axios from 'axios'

const data = ref([]);
const names = ref();
const loginState = inject('loginState');
const fetchData = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/top10songs`);
    let titles =  response.data.map(song => song?.name);
    names.value = [titles[0], titles[1], titles[2], titles[3], titles[4], titles[5], titles[6], titles[7], titles[8], titles[9], titles[10]];
    data.value = response.data.map(song => song?.plays);
  }catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  console.log(loginState?.user);
  fetchData();
})

const chartData = reactive({
  series: [{
    name: 'Luợt Nghe',
    data: data,
  }],
  chartOptions: {
    annotations: {
      // points: [{
      //   x: 'Bananas',
      //   seriesIndex: 0,
      //   label: {
      //     borderColor: '#775DD0',
      //     offsetY: 0,
      //     style: {
      //       color: '#fff',
      //       background: '#775DD0',
      //     },
      //     text: 'Bananas are good',
      //   },
      // }],
    },
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    grid: {
      row: {
        colors: ['#fff', '#f2f2f2'],
      },
    },
    xaxis: {
      labels: {
        rotate: -45,
      },
      categories: [
        "Despacito",
        "Shape of You",
        "See You Again",
        "Uptown Funk",
        "Gangnam Style",
        "Sugar",
        "Roar",
        "Sorry",
        "Baby Shark",
        "Shallow",
      ],
      tickPlacement: 'on',
    },
    yaxis: {
      title: {
        text: 'LƯỢT NGHE',
        style: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: '14px',
        }
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  },
});

</script>

<template>
  <Layout>
    <div><h2 class="text-center">TOP 10 BÀI HÁT CÓ LƯỢT NGHE NHIỀU NHẤT</h2></div>
  <div id="chart" class="container">
    <vue-apex-charts  type="bar" height="600" :options="chartData.chartOptions" :series="chartData.series"></vue-apex-charts>
  </div>
  </Layout>
</template>

<style scoped>

</style>
