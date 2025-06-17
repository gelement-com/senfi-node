const { HttpsProxyAgent } = require('https-proxy-agent');
const { URL } = require('url');
const http = require('http');
const https = require('https');


// NOTE: This is a trimmed version containing only ProxyConnect.axiosAgent().
// It should be initialized with the return object from a non-trimmed version's getConfig().
// The Certificate Authorities should have automatically been injected by using the non-trimmed version.
class ProxyConnect {
  static config = {
    proxyUrl: undefined,
    excludeUrlArray: undefined
  };

  static init(config) {
    this.config = config;
  }

  static _isNotExcluded(url, baseURL) {
    if (baseURL === undefined && !url.includes('://')) {
      url = 'http://' + url; // Placeholder protocol to prevent errors
    }
    const { hostname } = new URL(url, baseURL);
    return this.config.excludeUrlArray?.find(regex => regex.test(hostname)) === undefined;
  }

  /**
   * Creates a HttpsProxyAgent initialized with the proxyUrl.
   * Requires `proxy: false` to be set in axios config to prevent axios' proxy implementation from interfering with `HttpsProxyAgent`.
   * @param opts Requires url and/or baseURL. Optionally accepts rejectUnauthorized and isHttp.
   */
  static axiosAgent(opts) {
    if (this.config.proxyUrl && this._isNotExcluded(opts.url, opts.baseURL)) {
      const proxyAgent = new HttpsProxyAgent(this.config.proxyUrl);
      proxyAgent.options.rejectUnauthorized = opts.rejectUnauthorized;
      proxyAgent.keepAlive = true;
      return proxyAgent;
    } else if (opts.isHttp === true || opts.baseURL?.startsWith('http:') || opts.url?.startsWith('http:')) {
      return new http.Agent({
        rejectUnauthorized: opts.rejectUnauthorized
      });
    } else { // Defaults to https
      return new https.Agent({
        rejectUnauthorized: opts.rejectUnauthorized
      });
    }
  }
}
module.exports = { ProxyConnect };
