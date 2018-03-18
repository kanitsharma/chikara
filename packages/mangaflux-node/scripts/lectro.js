const EnhancerCommonutils = require('@lectro/enhancer-commonutils');
const EnhancerFlowruntime = require('@lectro/enhancer-flowruntime');

const lectro = EnhancerFlowruntime.combine(new EnhancerCommonutils())
  .provide('config', require.resolve('../.env'));
module.exports = lectro;
