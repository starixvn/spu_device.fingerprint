import { getResult } from '../src/fingerprint/index';

(async function() {
    await getResult(function(res) { return res;});
})();