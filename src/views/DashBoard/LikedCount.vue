<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { reactive, ref } from 'vue'
import Layout from '@/layout/Layout.vue'




const chartData = reactive({
  series: [
    {
      name: 'Lượt Yêu Thích',
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
    },
  ],
  chartOptions: {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: 'zoom',
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {

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
    },
    yaxis: {
      title: {
        text: 'LƯỢT YÊU THÍCH',
        style: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: '14px',
        }
      },
    },
  },
})
</script>

<template>
  <Layout>
    <div><h2 class="text-center">TOP 10 BÀI HÁT ĐƯỢC YÊU THÍCH NHẤT</h2></div>
    <div id="chart" class="container">
      <vue-apex-charts
        type="bar"
        height="600"
        :options="chartData.chartOptions"
        :series="chartData.series"
      ></vue-apex-charts>
    </div>
  </Layout>
</template>

<style scoped></style>
