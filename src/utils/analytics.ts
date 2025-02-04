export const reportWebVitals = (metric: any) => {
  if (metric.label === 'web-vital') {
    console.log(metric); // Replace with your analytics service
  }
}; 