const { HttpsProxyAgent } = require('https-proxy-agent');
const { URL } = require('url');
const https = require('https')


// NOTE: This is a trimmed version containing only ProxyConnect.axiosAgent().
// It should be initialized with the return object from a non-trimmed version's init().
// The Certificate Authorities should have automatically been injected by using the non-trimmed version.
module.exports = class ProxyConnect {
  static proxyUrl;
  static excludeArray;

  static init(opts) {
    this.proxyUrl = opts?.proxyUrl;
    this.excludeArray = opts?.excludeArray;
  }

  static _isNotExcluded(url, baseURL) {
    if (baseURL === undefined && !url.includes('://')) {
      url = 'http://' + url; // Placeholder protocol to prevent errors
    }
    const { hostname } = new URL(url, baseURL);
    return this.excludeArray?.find(regex => regex.test(hostname)) === undefined;
  }

  /**
   * Creates a HttpsProxyAgent initialized with the proxyUrl.
   * @param opts Requires url and/or baseURL. Optionally accepts rejectUnauthorized.
   */
  static axiosAgent(opts) {
    if (this.proxyUrl && this._isNotExcluded(opts.url, opts.baseURL)) {
      const proxyAgent = new HttpsProxyAgent(this.proxyUrl);
      proxyAgent.options.rejectUnauthorized = opts.rejectUnauthorized;
      proxyAgent.keepAlive = true;
      return proxyAgent;
    } else {
      return new https.Agent({
        rejectUnauthorized: opts.rejectUnauthorized
      });
    }
  }
}
