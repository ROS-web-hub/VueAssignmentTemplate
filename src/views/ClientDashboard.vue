<template>
  <div>
    <div class="kpi">
      <div>Total offers sent: {{ totalOffers }}</div>
      <div>Total repeaters (experimental group): {{ repeatersExp }}</div>
      <div>Total repeaters (control group): {{ repeatersCtrl }}</div>
      <div>Total CLV (experimental group): {{ clvExp }}</div>
      <div>Total CLV (control group): {{ clvCtrl }}</div>
    </div>
    <div class="chart">
      <canvas ref="myChart"></canvas>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Chart from 'chart.js';
import 'chartjs-adapter-date-fns';
const mockData = {
  totalOffers: 5000,
  repeaters: {
    experimental: 1200,
    control: 900,
  },
  clv: {
    experimental: 1500,
    control: 1200,
  },
  trend: {
    dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05'],
    experimental: [1200, 1400, 1800, 1500, 1800],
    control: [900, 1100, 1000, 1200, 1500],
  },
};
export default defineComponent({
  name: 'DataVisualization',
  setup() {
    const totalOffers = ref(mockData.totalOffers);
    const repeatersExp = ref(mockData.repeaters.experimental);
    const repeatersCtrl = ref(mockData.repeaters.control);
    const clvExp = ref(mockData.clv.experimental);
    const clvCtrl = ref(mockData.clv.control);
    const chart = ref<Chart | null>(null);
    const refreshData = () => {
      // Fetch data from mock server
      const data = mockData;
      // Update chart data
      if (chart.value) {
        chart.value.data.labels = data.trend.dates;
        chart.value.data.datasets[0].data = data.trend.experimental;
        chart.value.data.datasets[1].data = data.trend.control;
        chart.value.update();
      }
      // Update KPIs
      totalOffers.value = data.totalOffers;
      repeatersExp.value = data.repeaters.experimental;
      repeatersCtrl.value = data.repeaters.control;
      clvExp.value = data.clv.experimental;
      clvCtrl.value = data.clv.control;
    };
    const initChart = () => {
      const ctx = (this.$refs.myChart as HTMLCanvasElement).getContext('2d');
      if (ctx) {
        chart.value = new Chart(ctx, {
          type: 'line',
          data: {
            labels: mockData.trend.dates,
            datasets: [
              {
                label: 'Experimental Group',
                data: mockData.trend.experimental,
                fill: false,
                borderColor: '#4e89ae',
              },
              {
                label: 'Control Group',
                data: mockData.trend.control,
                fill: false,
                borderColor: '#f9d5e5',
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  type: 'time',
                  time: {
                    unit: 'day',
                  },
                },
              ],
            },
          },
        });
      }
    };
    onMounted(() => {
      initChart();
    });
    return {
      totalOffers,
      repeatersExp,
      repeatersCtrl,
      clvExp,
      clvCtrl,
      refreshData,
    };
  },
});
</script>