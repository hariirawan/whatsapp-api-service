module.exports = {
  apps: [
    {
      name: "whatsapp-service",
      script: "bun",
      args: "start",
      env: {
        NODE_ENV: "development",
        PORT: 3000, // Port untuk development
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3004, // Port untuk production
      },
      log_file: "/dev/null", // Matikan logging
      error_file: "/dev/null",
      out_file: "/dev/null",
      merge_logs: false,
    },
  ],
};
