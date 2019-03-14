class PopupWindow {
  static open(id: string, url: string, options: any = {}) {
    const popup = new this(id, url, options);

    popup.open();
    popup.poll();

    return popup;
  }

  id: string;
  url: string;
  options: any;
  window?: Window;
  _iid?: number;
  promise?: Promise<any>;

  constructor(id: string, url: string, options: any = {}) {
    this.id = id;
    this.url = url;
    this.options = options;
  }

  open() {
    this.window = window.open(this.url, this.id, toQuery(this.options, ","))!!;
  }

  close() {
    this.cancel();
    if (this.window) this.window.close();
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this._iid = window.setInterval(() => {
        try {
          const popup = this.window;

          if (!popup || popup.closed) {
            this.close();

            reject(new Error("The popup was closed"));

            return;
          }

          if (
            popup.location.href === this.url ||
            popup.location.pathname === "blank"
          ) {
            return;
          }

          const params = toParams(popup.location.search.replace(/^\?/, ""));

          resolve(params);

          this.close();
        } catch (error) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame.
           */
        }
      }, 500);
    });
  }

  cancel() {
    if (this._iid) {
      window.clearInterval(this._iid);
      this._iid = undefined;
    }
  }

  then(...args: any): Promise<any> {
    return this.promise!!.then(...args);
  }

  catch(...args: any): Promise<any> {
    return this.promise!!.then(...args);
  }
}

function toParams(query: string) {
  const q = query.replace(/^\??\//, "");

  return q.split("&").reduce((values: any, param) => {
    const [key, value] = param.split("=");

    values[key] = value;

    return values;
  }, {});
}

function toQuery(params: any, delimiter: string = "&") {
  const keys = Object.keys(params);

  return keys.reduce((str: string, key: string, index: number) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, "");
}

export default PopupWindow;
