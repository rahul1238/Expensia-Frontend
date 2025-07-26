import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

interface QueueItem {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      if (
        originalRequest.url?.includes("/auth/login") ||
        originalRequest.url?.includes("/auth/refresh-token")
      ) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        await axios.post(
          `${api.defaults.baseURL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        processQueue(null);
        isRefreshing = false;

        return api(originalRequest);
      } catch (err) {
        processQueue(
          err instanceof Error ? err : new Error("Token refresh failed")
        );
        isRefreshing = false;

        if (!window.location.pathname.includes("/login")) {
          setTimeout(() => {
            window.location.href = "/login";
          }, 100);
        }
        return Promise.reject(
          new Error("Session expired. Please login again.")
        );
      }
    }
    return Promise.reject(error);
  }
);

export default api;
