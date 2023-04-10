import http from "@/http-client";

class DashboardService {
    getWidgets(): Promise<any> {
        return http.get("/dashboard/widgets");
    }

    getChart(): Promise<any> {
        return http.get(`/dashboard/chart`);
    }
}

export default new DashboardService();
