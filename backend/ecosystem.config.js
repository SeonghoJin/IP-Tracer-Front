module.exports = [
  {
    script: 'dist/main.js',
    name: 'ip-tracer',
    exec_mode: 'cluster',
    instances: 2,
  },
];
