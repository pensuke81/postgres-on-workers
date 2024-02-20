import { check } from "k6";
import http from "k6/http";

export const options = {
  // iterations: 100,
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(90)<2000"],
  },
};

export default function () {
  const res = http.get(`http://localhost:8787/${__ENV.DB}`);
  check(res, {
    is_status_200: (r) => r.status === 200,
  });
}
