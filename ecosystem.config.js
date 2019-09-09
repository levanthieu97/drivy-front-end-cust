var LOG_DIR = '/home/ec2-user/logs/drivy-front-end-cust';

module.exports = {
  apps : [{
    name: 'drivy-cust',
    script: 'npx',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file
    args: 'serve build -s -l 3000',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    source_map_support: true,

    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production'
    },

    error_file: `${LOG_DIR}/err.log`,
    out_file: `${LOG_DIR}/out.log`,
    log_file: `${LOG_DIR}/combined.log`,
    time: true
  }]
};
