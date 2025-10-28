const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      // Ek ayarlar buraya
      terserOptions: {
        compress: {
          drop_console: false, // Konsol loglarını kaldırmak için
        },
      },
      extractComments: false,  // Lisans yorumlarını ayırma
    })],
  },
};
