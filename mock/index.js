import widgetData  from '/mock/json/serverWidgetsData.json'
import chartData  from '/mock/json/serverChartData.json'

export default {
    'GET /api/dashboard/widgets': widgetData,
    'GET /api/dashboard/chart': chartData,
}
