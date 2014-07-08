Package.describe({
  summary: "A simple alert package using Famo.us"
});

Package.on_use(function (api, where) {
  api.use(['famono']);

  api.add_files('src/animatedAlert.js', 'client');

  api.export('AnimatedAlert', 'client');
});

Package.on_test(function (api) {
  api.use('animatedAlert');

  api.add_files('animatedAlert_tests.js', 'client');
});
