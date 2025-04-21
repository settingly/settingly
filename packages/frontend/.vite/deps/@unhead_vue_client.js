import {
  createHooks
} from "./chunk-MUTG6RCZ.js";
import {
  getCurrentInstance,
  hasInjectionContext,
  inject,
  isRef,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  ref,
  toValue,
  watchEffect
} from "./chunk-WW2ZKW4Y.js";

// node_modules/.pnpm/unhead@2.0.8/node_modules/unhead/dist/shared/unhead.yem5I2v_.mjs
var DupeableTags = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
var TagsWithInnerContent = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
var HasElementTags = /* @__PURE__ */ new Set([
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
var ValidHeadTags = /* @__PURE__ */ new Set([
  "title",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
var UniqueTags = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
var TagConfigKeys = /* @__PURE__ */ new Set(["key", "tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"]);
var UsesMergeStrategy = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
var MetaTagsArrayable = /* @__PURE__ */ new Set([
  "theme-color",
  "google-site-verification",
  "og",
  "article",
  "book",
  "profile",
  "twitter",
  "author"
]);

// node_modules/.pnpm/unhead@2.0.8/node_modules/unhead/dist/shared/unhead.Cp0iF6eN.mjs
var allowedMetaProperties = ["name", "property", "http-equiv"];
function isMetaArrayDupeKey(v) {
  const k = v.split(":")[1];
  return MetaTagsArrayable.has(k);
}
function dedupeKey(tag) {
  const { props, tag: name } = tag;
  if (UniqueTags.has(name))
    return name;
  if (name === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  if (tag.tag === "meta") {
    for (const n of allowedMetaProperties) {
      if (props[n] !== void 0) {
        return `${name}:${props[n]}`;
      }
    }
  }
  if (tag.key) {
    return `${name}:key:${tag.key}`;
  }
  if (props.id) {
    return `${name}:id:${props.id}`;
  }
  if (TagsWithInnerContent.has(name)) {
    const v = tag.textContent || tag.innerHTML;
    if (v) {
      return `${name}:content:${v}`;
    }
  }
}
function hashTag(tag) {
  const dedupe = tag._h || tag._d;
  if (dedupe)
    return dedupe;
  const inner = tag.textContent || tag.innerHTML;
  if (inner)
    return inner;
  return `${tag.tag}:${Object.entries(tag.props).map(([k, v]) => `${k}:${String(v)}`).join(",")}`;
}
function walkResolver(val, resolve, key) {
  const type = typeof val;
  if (type === "function") {
    if (!key || key !== "titleTemplate" && !(key[0] === "o" && key[1] === "n")) {
      val = val();
    }
  }
  let v;
  if (resolve) {
    v = resolve(key, val);
  }
  if (Array.isArray(v)) {
    return v.map((r) => walkResolver(r, resolve));
  }
  if ((v == null ? void 0 : v.constructor) === Object) {
    const next = {};
    for (const key2 of Object.keys(v)) {
      next[key2] = walkResolver(v[key2], resolve, key2);
    }
    return next;
  }
  return v;
}
function normalizeStyleClassProps(key, value) {
  const store = key === "style" ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set();
  function processValue(rawValue) {
    const value2 = rawValue.trim();
    if (!value2)
      return;
    if (key === "style") {
      const [k, ...v] = value2.split(":").map((s) => s.trim());
      if (k && v.length)
        store.set(k, v.join(":"));
    } else {
      value2.split(" ").filter(Boolean).forEach((c) => store.add(c));
    }
  }
  if (typeof value === "string") {
    key === "style" ? value.split(";").forEach(processValue) : processValue(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => processValue(item));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([k, v]) => {
      if (v && v !== "false") {
        key === "style" ? store.set(k.trim(), v) : processValue(k);
      }
    });
  }
  return store;
}
function normalizeProps(tag, input) {
  tag.props = tag.props || {};
  if (!input) {
    return tag;
  }
  Object.entries(input).forEach(([key, value]) => {
    if (value === null) {
      tag.props[key] = null;
      return;
    }
    if (key === "class" || key === "style") {
      tag.props[key] = normalizeStyleClassProps(key, value);
      return;
    }
    if (TagConfigKeys.has(key)) {
      if (["textContent", "innerHTML"].includes(key) && typeof value === "object") {
        let type = input.type;
        if (!input.type) {
          type = "application/json";
        }
        if (!(type == null ? void 0 : type.endsWith("json")) && type !== "speculationrules") {
          return;
        }
        input.type = type;
        tag.props.type = type;
        tag[key] = JSON.stringify(value);
      } else {
        tag[key] = value;
      }
      return;
    }
    const strValue = String(value);
    const isDataKey = key.startsWith("data-");
    if (strValue === "true" || strValue === "") {
      tag.props[key] = isDataKey ? strValue : true;
    } else if (!value && isDataKey && strValue === "false") {
      tag.props[key] = "false";
    } else if (value !== void 0) {
      tag.props[key] = value;
    }
  });
  return tag;
}
function normalizeTag(tagName, _input) {
  const input = typeof _input === "object" && typeof _input !== "function" ? _input : { [tagName === "script" || tagName === "noscript" || tagName === "style" ? "innerHTML" : "textContent"]: _input };
  const tag = normalizeProps({ tag: tagName, props: {} }, input);
  if (tag.key && DupeableTags.has(tag.tag)) {
    tag.props["data-hid"] = tag._h = tag.key;
  }
  if (tag.tag === "script" && typeof tag.innerHTML === "object") {
    tag.innerHTML = JSON.stringify(tag.innerHTML);
    tag.props.type = tag.props.type || "application/json";
  }
  return Array.isArray(tag.props.content) ? tag.props.content.map((v) => ({ ...tag, props: { ...tag.props, content: v } })) : tag;
}
function normalizeEntryToTags(input, propResolvers) {
  if (!input) {
    return [];
  }
  if (typeof input === "function") {
    input = input();
  }
  const resolvers = (key, val) => {
    for (let i = 0; i < propResolvers.length; i++) {
      val = propResolvers[i](key, val);
    }
    return val;
  };
  input = resolvers(void 0, input);
  const tags = [];
  input = walkResolver(input, resolvers);
  Object.entries(input || {}).forEach(([key, value]) => {
    if (value === void 0)
      return;
    for (const v of Array.isArray(value) ? value : [value])
      tags.push(normalizeTag(key, v));
  });
  return tags.flat();
}

// node_modules/.pnpm/unhead@2.0.8/node_modules/unhead/dist/shared/unhead.DZbvapt-.mjs
var sortTags = (a, b) => a._w === b._w ? a._p - b._p : a._w - b._w;
var TAG_WEIGHTS = {
  base: -10,
  title: 10
};
var TAG_ALIASES = {
  critical: -8,
  high: -1,
  low: 2
};
var WEIGHT_MAP = {
  meta: {
    "content-security-policy": -30,
    "charset": -20,
    "viewport": -15
  },
  link: {
    "preconnect": 20,
    "stylesheet": 60,
    "preload": 70,
    "modulepreload": 70,
    "prefetch": 90,
    "dns-prefetch": 90,
    "prerender": 90
  },
  script: {
    async: 30,
    defer: 80,
    sync: 50
  },
  style: {
    imported: 40,
    sync: 60
  }
};
var ImportStyleRe = /@import/;
var isTruthy = (val) => val === "" || val === true;
function tagWeight(head, tag) {
  var _a;
  if (typeof tag.tagPriority === "number")
    return tag.tagPriority;
  let weight = 100;
  const offset = TAG_ALIASES[tag.tagPriority] || 0;
  const weightMap = head.resolvedOptions.disableCapoSorting ? {
    link: {},
    script: {},
    style: {}
  } : WEIGHT_MAP;
  if (tag.tag in TAG_WEIGHTS) {
    weight = TAG_WEIGHTS[tag.tag];
  } else if (tag.tag === "meta") {
    const metaType = tag.props["http-equiv"] === "content-security-policy" ? "content-security-policy" : tag.props.charset ? "charset" : tag.props.name === "viewport" ? "viewport" : null;
    if (metaType)
      weight = WEIGHT_MAP.meta[metaType];
  } else if (tag.tag === "link" && tag.props.rel) {
    weight = weightMap.link[tag.props.rel];
  } else if (tag.tag === "script") {
    if (isTruthy(tag.props.async)) {
      weight = weightMap.script.async;
    } else if (tag.props.src && !isTruthy(tag.props.defer) && !isTruthy(tag.props.async) && tag.props.type !== "module" && !((_a = tag.props.type) == null ? void 0 : _a.endsWith("json"))) {
      weight = weightMap.script.sync;
    } else if (isTruthy(tag.props.defer) && tag.props.src && !isTruthy(tag.props.async)) {
      weight = weightMap.script.defer;
    }
  } else if (tag.tag === "style") {
    weight = tag.innerHTML && ImportStyleRe.test(tag.innerHTML) ? weightMap.style.imported : weightMap.style.sync;
  }
  return (weight || 100) + offset;
}

// node_modules/.pnpm/unhead@2.0.8/node_modules/unhead/dist/shared/unhead.DGkFBTYv.mjs
function registerPlugin(head, p) {
  const plugin = typeof p === "function" ? p(head) : p;
  const key = plugin.key || String(head.plugins.size + 1);
  const exists = head.plugins.get(key);
  if (!exists) {
    head.plugins.set(key, plugin);
    head.hooks.addHooks(plugin.hooks || {});
  }
}
function createUnhead(resolvedOptions = {}) {
  var _a;
  const hooks = createHooks();
  hooks.addHooks(resolvedOptions.hooks || {});
  const ssr = !resolvedOptions.document;
  const entries = /* @__PURE__ */ new Map();
  const plugins = /* @__PURE__ */ new Map();
  const normalizeQueue = [];
  const head = {
    _entryCount: 1,
    // 0 is reserved for internal use
    plugins,
    dirty: false,
    resolvedOptions,
    hooks,
    ssr,
    entries,
    headEntries() {
      return [...entries.values()];
    },
    use: (p) => registerPlugin(head, p),
    push(input, _options) {
      const options = { ..._options || {} };
      delete options.head;
      const _i = options._index ?? head._entryCount++;
      const inst = { _i, input, options };
      const _ = {
        _poll(rm = false) {
          head.dirty = true;
          !rm && normalizeQueue.push(_i);
          hooks.callHook("entries:updated", head);
        },
        dispose() {
          if (entries.delete(_i)) {
            _._poll(true);
          }
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input2) {
          if (!options.mode || options.mode === "server" && ssr || options.mode === "client" && !ssr) {
            inst.input = input2;
            entries.set(_i, inst);
            _._poll();
          }
        }
      };
      _.patch(input);
      return _;
    },
    async resolveTags() {
      var _a2;
      const ctx = {
        tagMap: /* @__PURE__ */ new Map(),
        tags: [],
        entries: [...head.entries.values()]
      };
      await hooks.callHook("entries:resolve", ctx);
      while (normalizeQueue.length) {
        const i = normalizeQueue.shift();
        const e = entries.get(i);
        if (e) {
          const normalizeCtx = {
            tags: normalizeEntryToTags(e.input, resolvedOptions.propResolvers || []).map((t) => Object.assign(t, e.options)),
            entry: e
          };
          await hooks.callHook("entries:normalize", normalizeCtx);
          e._tags = normalizeCtx.tags.map((t, i2) => {
            t._w = tagWeight(head, t);
            t._p = (e._i << 10) + i2;
            t._d = dedupeKey(t);
            return t;
          });
        }
      }
      let hasFlatMeta = false;
      ctx.entries.flatMap((e) => (e._tags || []).map((t) => ({ ...t, props: { ...t.props } }))).sort(sortTags).reduce((acc, next) => {
        const k = String(next._d || next._p);
        if (!acc.has(k))
          return acc.set(k, next);
        const prev = acc.get(k);
        const strategy = (next == null ? void 0 : next.tagDuplicateStrategy) || (UsesMergeStrategy.has(next.tag) ? "merge" : null) || (next.key && next.key === prev.key ? "merge" : null);
        if (strategy === "merge") {
          const newProps = { ...prev.props };
          Object.entries(next.props).forEach(([p, v]) => (
            // @ts-expect-error untyped
            newProps[p] = p === "style" ? new Map([...prev.props.style || /* @__PURE__ */ new Map(), ...v]) : p === "class" ? /* @__PURE__ */ new Set([...prev.props.class || /* @__PURE__ */ new Set(), ...v]) : v
          ));
          acc.set(k, { ...next, props: newProps });
        } else if (next._p >> 10 === prev._p >> 10 && isMetaArrayDupeKey(next._d)) {
          acc.set(k, Object.assign([...Array.isArray(prev) ? prev : [prev], next], next));
          hasFlatMeta = true;
        } else if (next._w === prev._w ? next._p > prev._p : (next == null ? void 0 : next._w) < (prev == null ? void 0 : prev._w)) {
          acc.set(k, next);
        }
        return acc;
      }, ctx.tagMap);
      const title = ctx.tagMap.get("title");
      const titleTemplate = ctx.tagMap.get("titleTemplate");
      head._title = title == null ? void 0 : title.textContent;
      if (titleTemplate) {
        const titleTemplateFn = titleTemplate == null ? void 0 : titleTemplate.textContent;
        head._titleTemplate = titleTemplateFn;
        if (titleTemplateFn) {
          let newTitle = typeof titleTemplateFn === "function" ? titleTemplateFn(title == null ? void 0 : title.textContent) : titleTemplateFn;
          if (typeof newTitle === "string" && !head.plugins.has("template-params")) {
            newTitle = newTitle.replace("%s", (title == null ? void 0 : title.textContent) || "");
          }
          if (title) {
            newTitle === null ? ctx.tagMap.delete("title") : ctx.tagMap.set("title", { ...title, textContent: newTitle });
          } else {
            titleTemplate.tag = "title";
            titleTemplate.textContent = newTitle;
          }
        }
      }
      ctx.tags = Array.from(ctx.tagMap.values());
      if (hasFlatMeta) {
        ctx.tags = ctx.tags.flat().sort(sortTags);
      }
      await hooks.callHook("tags:beforeResolve", ctx);
      await hooks.callHook("tags:resolve", ctx);
      await hooks.callHook("tags:afterResolve", ctx);
      const finalTags = [];
      for (const t of ctx.tags) {
        const { innerHTML, tag, props } = t;
        if (!ValidHeadTags.has(tag)) {
          continue;
        }
        if (Object.keys(props).length === 0 && !t.innerHTML && !t.textContent) {
          continue;
        }
        if (tag === "meta" && !props.content && !props["http-equiv"] && !props.charset) {
          continue;
        }
        if (tag === "script" && innerHTML) {
          if ((_a2 = props.type) == null ? void 0 : _a2.endsWith("json")) {
            const v = typeof innerHTML === "string" ? innerHTML : JSON.stringify(innerHTML);
            t.innerHTML = v.replace(/</g, "\\u003C");
          } else if (typeof innerHTML === "string") {
            t.innerHTML = innerHTML.replace(new RegExp(`</${tag}`, "g"), `<\\/${tag}`);
          }
          t._d = dedupeKey(t);
        }
        finalTags.push(t);
      }
      return finalTags;
    }
  };
  ((resolvedOptions == null ? void 0 : resolvedOptions.plugins) || []).forEach((p) => registerPlugin(head, p));
  head.hooks.callHook("init", head);
  (_a = resolvedOptions.init) == null ? void 0 : _a.forEach((e) => e && head.push(e));
  return head;
}

// node_modules/.pnpm/unhead@2.0.8/node_modules/unhead/dist/client.mjs
async function renderDOMHead(head, options = {}) {
  const dom = options.document || head.resolvedOptions.document;
  if (!dom || !head.dirty)
    return;
  const beforeRenderCtx = { shouldRender: true, tags: [] };
  await head.hooks.callHook("dom:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender)
    return;
  if (head._domUpdatePromise) {
    return head._domUpdatePromise;
  }
  head._domUpdatePromise = new Promise(async (resolve) => {
    var _a;
    const dupeKeyCounter = /* @__PURE__ */ new Map();
    const resolveTagPromise = new Promise((resolve2) => {
      head.resolveTags().then((tags2) => {
        resolve2(
          tags2.map((tag) => {
            const count = dupeKeyCounter.get(tag._d) || 0;
            const res = {
              tag,
              id: (count ? `${tag._d}:${count}` : tag._d) || hashTag(tag),
              shouldRender: true
            };
            if (tag._d && isMetaArrayDupeKey(tag._d)) {
              dupeKeyCounter.set(tag._d, count + 1);
            }
            return res;
          })
        );
      });
    });
    let state = head._dom;
    if (!state) {
      state = {
        title: dom.title,
        elMap: (/* @__PURE__ */ new Map()).set("htmlAttrs", dom.documentElement).set("bodyAttrs", dom.body)
      };
      for (const key of ["body", "head"]) {
        const children = (_a = dom[key]) == null ? void 0 : _a.children;
        for (const c of children) {
          const tag = c.tagName.toLowerCase();
          if (!HasElementTags.has(tag)) {
            continue;
          }
          const next = normalizeProps({ tag, props: {} }, {
            innerHTML: c.innerHTML,
            ...c.getAttributeNames().reduce((props, name) => {
              props[name] = c.getAttribute(name);
              return props;
            }, {}) || {}
          });
          next.key = c.getAttribute("data-hid") || void 0;
          next._d = dedupeKey(next) || hashTag(next);
          if (state.elMap.has(next._d)) {
            let count = 1;
            let k = next._d;
            while (state.elMap.has(k)) {
              k = `${next._d}:${count++}`;
            }
            state.elMap.set(k, c);
          } else {
            state.elMap.set(next._d, c);
          }
        }
      }
    }
    state.pendingSideEffects = { ...state.sideEffects };
    state.sideEffects = {};
    function track(id, scope, fn) {
      const k = `${id}:${scope}`;
      state.sideEffects[k] = fn;
      delete state.pendingSideEffects[k];
    }
    function trackCtx({ id, $el, tag }) {
      const isAttrTag = tag.tag.endsWith("Attrs");
      state.elMap.set(id, $el);
      if (!isAttrTag) {
        if (tag.textContent && tag.textContent !== $el.textContent) {
          $el.textContent = tag.textContent;
        }
        if (tag.innerHTML && tag.innerHTML !== $el.innerHTML) {
          $el.innerHTML = tag.innerHTML;
        }
        track(id, "el", () => {
          $el == null ? void 0 : $el.remove();
          state.elMap.delete(id);
        });
      }
      for (const k in tag.props) {
        if (!Object.prototype.hasOwnProperty.call(tag.props, k))
          continue;
        const value = tag.props[k];
        if (k.startsWith("on") && typeof value === "function") {
          const dataset = $el == null ? void 0 : $el.dataset;
          if (dataset && dataset[`${k}fired`]) {
            const ek = k.slice(0, -5);
            value.call($el, new Event(ek.substring(2)));
          }
          if ($el.getAttribute(`data-${k}`) !== "") {
            (tag.tag === "bodyAttrs" ? dom.defaultView : $el).addEventListener(
              // onload -> load
              k.substring(2),
              value.bind($el)
            );
            $el.setAttribute(`data-${k}`, "");
          }
          continue;
        }
        const ck = `attr:${k}`;
        if (k === "class") {
          if (!value) {
            continue;
          }
          for (const c of value) {
            isAttrTag && track(id, `${ck}:${c}`, () => $el.classList.remove(c));
            !$el.classList.contains(c) && $el.classList.add(c);
          }
        } else if (k === "style") {
          if (!value) {
            continue;
          }
          for (const [k2, v] of value) {
            track(id, `${ck}:${k2}`, () => {
              $el.style.removeProperty(k2);
            });
            $el.style.setProperty(k2, v);
          }
        } else if (value !== false && value !== null) {
          $el.getAttribute(k) !== value && $el.setAttribute(k, value === true ? "" : String(value));
          isAttrTag && track(id, ck, () => $el.removeAttribute(k));
        }
      }
    }
    const pending = [];
    const frag = {
      bodyClose: void 0,
      bodyOpen: void 0,
      head: void 0
    };
    const tags = await resolveTagPromise;
    for (const ctx of tags) {
      const { tag, shouldRender, id } = ctx;
      if (!shouldRender)
        continue;
      if (tag.tag === "title") {
        dom.title = tag.textContent;
        track("title", "", () => dom.title = state.title);
        continue;
      }
      ctx.$el = ctx.$el || state.elMap.get(id);
      if (ctx.$el) {
        trackCtx(ctx);
      } else if (HasElementTags.has(tag.tag)) {
        pending.push(ctx);
      }
    }
    for (const ctx of pending) {
      const pos = ctx.tag.tagPosition || "head";
      ctx.$el = dom.createElement(ctx.tag.tag);
      trackCtx(ctx);
      frag[pos] = frag[pos] || dom.createDocumentFragment();
      frag[pos].appendChild(ctx.$el);
    }
    for (const ctx of tags)
      await head.hooks.callHook("dom:renderTag", ctx, dom, track);
    frag.head && dom.head.appendChild(frag.head);
    frag.bodyOpen && dom.body.insertBefore(frag.bodyOpen, dom.body.firstChild);
    frag.bodyClose && dom.body.appendChild(frag.bodyClose);
    for (const k in state.pendingSideEffects) {
      state.pendingSideEffects[k]();
    }
    head._dom = state;
    await head.hooks.callHook("dom:rendered", { renders: tags });
    resolve();
  }).finally(() => {
    head._domUpdatePromise = void 0;
    head.dirty = false;
  });
  return head._domUpdatePromise;
}
function createHead(options = {}) {
  var _a, _b, _c;
  const render = ((_a = options.domOptions) == null ? void 0 : _a.render) || renderDOMHead;
  options.document = options.document || (typeof window !== "undefined" ? document : void 0);
  const initialPayload = ((_c = (_b = options.document) == null ? void 0 : _b.head.querySelector('script[id="unhead:payload"]')) == null ? void 0 : _c.innerHTML) || false;
  return createUnhead({
    ...options,
    plugins: [
      ...options.plugins || [],
      {
        key: "client",
        hooks: {
          "entries:updated": render
        }
      }
    ],
    init: [
      initialPayload ? JSON.parse(initialPayload) : false,
      ...options.init || []
    ]
  });
}
function createDebouncedFn(callee, delayer) {
  let ctxId = 0;
  return () => {
    const delayFnCtxId = ++ctxId;
    delayer(() => {
      if (ctxId === delayFnCtxId) {
        callee();
      }
    });
  };
}

// node_modules/.pnpm/unhead@2.0.8/node_modules/unhead/dist/shared/unhead.DQc16pHI.mjs
var NAMESPACES = {
  META: /* @__PURE__ */ new Set(["twitter"]),
  OG: /* @__PURE__ */ new Set(["og", "book", "article", "profile", "fb"]),
  MEDIA: /* @__PURE__ */ new Set(["ogImage", "ogVideo", "ogAudio", "twitterImage"]),
  HTTP_EQUIV: /* @__PURE__ */ new Set(["contentType", "defaultStyle", "xUaCompatible"])
};
var META_ALIASES = {
  articleExpirationTime: "article:expiration_time",
  articleModifiedTime: "article:modified_time",
  articlePublishedTime: "article:published_time",
  bookReleaseDate: "book:release_date",
  fbAppId: "fb:app_id",
  ogAudioSecureUrl: "og:audio:secure_url",
  ogAudioUrl: "og:audio",
  ogImageSecureUrl: "og:image:secure_url",
  ogImageUrl: "og:image",
  ogSiteName: "og:site_name",
  ogVideoSecureUrl: "og:video:secure_url",
  ogVideoUrl: "og:video",
  profileFirstName: "profile:first_name",
  profileLastName: "profile:last_name",
  profileUsername: "profile:username",
  msapplicationConfig: "msapplication-Config",
  msapplicationTileColor: "msapplication-TileColor",
  msapplicationTileImage: "msapplication-TileImage"
};
var MetaPackingSchema = {
  appleItunesApp: {
    unpack: {
      entrySeparator: ", ",
      // @ts-expect-error untyped
      resolve: ({ key, value }) => `${fixKeyCase(key)}=${value}`
    }
  },
  refresh: {
    metaKey: "http-equiv",
    unpack: {
      entrySeparator: ";",
      // @ts-expect-error untyped
      resolve: ({ key, value }) => key === "seconds" ? `${value}` : void 0
    }
  },
  robots: {
    unpack: {
      entrySeparator: ", ",
      // @ts-expect-error untyped
      resolve: ({ key, value }) => typeof value === "boolean" ? fixKeyCase(key) : `${fixKeyCase(key)}:${value}`
    }
  },
  contentSecurityPolicy: {
    metaKey: "http-equiv",
    unpack: {
      entrySeparator: "; ",
      // @ts-expect-error untyped
      resolve: ({ key, value }) => `${fixKeyCase(key)} ${value}`
    }
  },
  charset: {}
};
function fixKeyCase(key) {
  const updated = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const prefixIndex = updated.indexOf("-");
  return prefixIndex === -1 ? updated : NAMESPACES.META.has(updated.slice(0, prefixIndex)) || NAMESPACES.OG.has(updated.slice(0, prefixIndex)) ? key.replace(/([A-Z])/g, ":$1").toLowerCase() : updated;
}
function sanitizeObject(input) {
  return Object.fromEntries(Object.entries(input).filter(([k, v]) => String(v) !== "false" && k));
}
function transformObject(obj) {
  return Array.isArray(obj) ? obj.map(transformObject) : !obj || typeof obj !== "object" ? obj : Object.fromEntries(Object.entries(obj).map(([k, v]) => [fixKeyCase(k), transformObject(v)]));
}
function unpackToString(value, options = {}) {
  const { entrySeparator = "", keyValueSeparator = "", wrapValue, resolve } = options;
  return Object.entries(value).map(([key, val]) => {
    if (resolve) {
      const resolved = resolve({ key, value: val });
      if (resolved !== void 0)
        return resolved;
    }
    const processedVal = typeof val === "object" ? unpackToString(val, options) : typeof val === "number" ? val.toString() : typeof val === "string" && wrapValue ? `${wrapValue}${val.replace(new RegExp(wrapValue, "g"), `\\${wrapValue}`)}${wrapValue}` : val;
    return `${key}${keyValueSeparator}${processedVal}`;
  }).join(entrySeparator);
}
function handleObjectEntry(key, value) {
  const sanitizedValue = sanitizeObject(value);
  const fixedKey = fixKeyCase(key);
  const attr = resolveMetaKeyType(fixedKey);
  if (!MetaTagsArrayable.has(fixedKey)) {
    return [{ [attr]: fixedKey, ...sanitizedValue }];
  }
  const input = Object.fromEntries(
    Object.entries(sanitizedValue).map(([k, v]) => [`${key}${k === "url" ? "" : `${k[0].toUpperCase()}${k.slice(1)}`}`, v])
  );
  return unpackMeta(input || {}).sort((a, b) => {
    var _a, _b;
    return (((_a = a[attr]) == null ? void 0 : _a.length) || 0) - (((_b = b[attr]) == null ? void 0 : _b.length) || 0);
  });
}
function resolveMetaKeyType(key) {
  var _a;
  if (((_a = MetaPackingSchema[key]) == null ? void 0 : _a.metaKey) === "http-equiv" || NAMESPACES.HTTP_EQUIV.has(key)) {
    return "http-equiv";
  }
  const fixed = fixKeyCase(key);
  const colonIndex = fixed.indexOf(":");
  return colonIndex === -1 ? "name" : NAMESPACES.OG.has(fixed.slice(0, colonIndex)) ? "property" : "name";
}
function resolveMetaKeyValue(key) {
  return META_ALIASES[key] || fixKeyCase(key);
}
function resolvePackedMetaObjectValue(value, key) {
  var _a;
  if (key === "refresh")
    return `${value.seconds};url=${value.url}`;
  return unpackToString(transformObject(value), {
    keyValueSeparator: "=",
    entrySeparator: ", ",
    resolve: ({ value: value2, key: key2 }) => value2 === null ? "" : typeof value2 === "boolean" ? key2 : void 0,
    // @ts-expect-error untyped
    ...(_a = MetaPackingSchema[key]) == null ? void 0 : _a.unpack
  });
}
function unpackMeta(input) {
  const extras = [];
  const primitives = {};
  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      if (key === "themeColor") {
        value.forEach((v) => {
          if (typeof v === "object" && v !== null) {
            extras.push({ name: "theme-color", ...v });
          }
        });
        continue;
      }
      for (const v of value) {
        if (typeof v === "object" && v !== null) {
          const urlProps = [];
          const otherProps = [];
          for (const [propKey, propValue] of Object.entries(v)) {
            const metaKey = `${key}${propKey === "url" ? "" : `:${propKey}`}`;
            const meta2 = unpackMeta({ [metaKey]: propValue });
            (propKey === "url" ? urlProps : otherProps).push(...meta2);
          }
          extras.push(...urlProps, ...otherProps);
        } else {
          extras.push(...typeof v === "string" ? unpackMeta({ [key]: v }) : handleObjectEntry(key, v));
        }
      }
      continue;
    }
    if (typeof value === "object" && value) {
      if (NAMESPACES.MEDIA.has(key)) {
        const prefix = key.startsWith("twitter") ? "twitter" : "og";
        const type = key.replace(/^(og|twitter)/, "").toLowerCase();
        const metaKey = prefix === "twitter" ? "name" : "property";
        if (value.url) {
          extras.push({
            [metaKey]: `${prefix}:${type}`,
            content: value.url
          });
        }
        if (value.secureUrl) {
          extras.push({
            [metaKey]: `${prefix}:${type}:secure_url`,
            content: value.secureUrl
          });
        }
        for (const [propKey, propValue] of Object.entries(value)) {
          if (propKey !== "url" && propKey !== "secureUrl") {
            extras.push({
              [metaKey]: `${prefix}:${type}:${propKey}`,
              // @ts-expect-error untyped
              content: propValue
            });
          }
        }
      } else if (MetaTagsArrayable.has(fixKeyCase(key))) {
        extras.push(...handleObjectEntry(key, value));
      } else {
        primitives[key] = sanitizeObject(value);
      }
    } else {
      primitives[key] = value;
    }
  }
  const meta = Object.entries(primitives).map(([key, value]) => {
    if (key === "charset")
      return { charset: value === null ? "_null" : value };
    const metaKey = resolveMetaKeyType(key);
    const keyValue = resolveMetaKeyValue(key);
    const processedValue = value === null ? "_null" : typeof value === "object" ? resolvePackedMetaObjectValue(value, key) : typeof value === "number" ? value.toString() : value;
    return metaKey === "http-equiv" ? { "http-equiv": keyValue, "content": processedValue } : { [metaKey]: keyValue, content: processedValue };
  });
  return [...extras, ...meta].map(
    (m) => !("content" in m) ? m : m.content === "_null" ? { ...m, content: null } : m
  );
}

// node_modules/.pnpm/unhead@2.0.8/node_modules/unhead/dist/shared/unhead.CApf5sj3.mjs
function defineHeadPlugin(plugin) {
  return plugin;
}
var FlatMetaPlugin = defineHeadPlugin({
  key: "flatMeta",
  hooks: {
    "entries:normalize": (ctx) => {
      const tagsToAdd = [];
      ctx.tags = ctx.tags.map((t) => {
        if (t.tag !== "_flatMeta") {
          return t;
        }
        tagsToAdd.push(unpackMeta(t.props).map((p) => ({
          ...t,
          tag: "meta",
          props: p
        })));
        return false;
      }).filter(Boolean).concat(...tagsToAdd);
    }
  }
});
var WhitelistAttributes = {
  htmlAttrs: /* @__PURE__ */ new Set(["class", "style", "lang", "dir"]),
  bodyAttrs: /* @__PURE__ */ new Set(["class", "style"]),
  meta: /* @__PURE__ */ new Set(["name", "property", "charset", "content", "media"]),
  noscript: /* @__PURE__ */ new Set(["textContent"]),
  style: /* @__PURE__ */ new Set(["media", "textContent", "nonce", "title", "blocking"]),
  script: /* @__PURE__ */ new Set(["type", "textContent", "nonce", "blocking"]),
  link: /* @__PURE__ */ new Set(["color", "crossorigin", "fetchpriority", "href", "hreflang", "imagesrcset", "imagesizes", "integrity", "media", "referrerpolicy", "rel", "sizes", "type"])
};
function acceptDataAttrs(value) {
  return Object.fromEntries(
    Object.entries(value || {}).filter(([key]) => key === "id" || key.startsWith("data-"))
  );
}
function makeTagSafe(tag) {
  var _a;
  let next = {};
  const { tag: type, props: prev } = tag;
  switch (type) {
    // always safe
    case "title":
    case "titleTemplate":
    case "templateParams":
      next = prev;
      break;
    case "htmlAttrs":
    case "bodyAttrs":
      WhitelistAttributes[type].forEach((attr) => {
        if (prev[attr]) {
          next[attr] = prev[attr];
        }
      });
      break;
    case "style":
      next = acceptDataAttrs(prev);
      WhitelistAttributes.style.forEach((key) => {
        if (prev[key]) {
          next[key] = prev[key];
        }
      });
      break;
    // meta is safe, except for http-equiv
    case "meta":
      WhitelistAttributes.meta.forEach((key) => {
        if (prev[key]) {
          next[key] = prev[key];
        }
      });
      break;
    // link tags we don't allow stylesheets, scripts, preloading, prerendering, prefetching, etc
    case "link":
      WhitelistAttributes.link.forEach((key) => {
        const val = prev[key];
        if (!val) {
          return;
        }
        if (key === "rel" && (val === "canonical" || val === "modulepreload" || val === "prerender" || val === "preload" || val === "prefetch")) {
          return;
        }
        if (key === "href") {
          if (val.includes("javascript:") || val.includes("data:")) {
            return;
          }
          next[key] = val;
        } else if (val) {
          next[key] = val;
        }
      });
      if (!next.href && !next.imagesrcset || !next.rel) {
        return false;
      }
      break;
    case "noscript":
      WhitelistAttributes.noscript.forEach((key) => {
        if (prev[key]) {
          next[key] = prev[key];
        }
      });
      break;
    // we only allow JSON in scripts
    case "script":
      if (!tag.textContent || !((_a = prev.type) == null ? void 0 : _a.endsWith("json"))) {
        return false;
      }
      WhitelistAttributes.script.forEach((s) => {
        if (prev[s] === "textContent") {
          try {
            const jsonVal = typeof prev[s] === "string" ? JSON.parse(prev[s]) : prev[s];
            next[s] = JSON.stringify(jsonVal, null, 0);
          } catch {
          }
        } else if (prev[s]) {
          next[s] = prev[s];
        }
      });
      break;
  }
  if (!Object.keys(next).length && !tag.tag.endsWith("Attrs")) {
    return false;
  }
  tag.props = { ...acceptDataAttrs(prev), ...next };
  return tag;
}
var SafeInputPlugin = (
  /* @PURE */
  defineHeadPlugin({
    key: "safe",
    hooks: {
      "entries:normalize": (ctx) => {
        var _a;
        if ((_a = ctx.entry.options) == null ? void 0 : _a._safe) {
          ctx.tags = ctx.tags.reduce((acc, tag) => {
            const safeTag = makeTagSafe(tag);
            if (safeTag)
              acc.push(safeTag);
            return acc;
          }, []);
        }
      }
    }
  })
);

// node_modules/.pnpm/unhead@2.0.8/node_modules/unhead/dist/shared/unhead.C13swrCa.mjs
var SepSub = "%separator";
var SepSubRE = new RegExp(`${SepSub}(?:\\s*${SepSub})*`, "g");
function sub(p, token, isJson = false) {
  var _a;
  let val;
  if (token === "s" || token === "pageTitle") {
    val = p.pageTitle;
  } else if (token.includes(".")) {
    const dotIndex = token.indexOf(".");
    val = (_a = p[token.substring(0, dotIndex)]) == null ? void 0 : _a[token.substring(dotIndex + 1)];
  } else {
    val = p[token];
  }
  if (val !== void 0) {
    return isJson ? (val || "").replace(/\\/g, "\\\\").replace(/</g, "\\u003C").replace(/"/g, '\\"') : val || "";
  }
  return void 0;
}
function processTemplateParams(s, p, sep, isJson = false) {
  if (typeof s !== "string" || !s.includes("%"))
    return s;
  let decoded = s;
  try {
    decoded = decodeURI(s);
  } catch {
  }
  const tokens = decoded.match(/%\w+(?:\.\w+)?/g);
  if (!tokens) {
    return s;
  }
  const hasSepSub = s.includes(SepSub);
  s = s.replace(/%\w+(?:\.\w+)?/g, (token) => {
    if (token === SepSub || !tokens.includes(token)) {
      return token;
    }
    const re = sub(p, token.slice(1), isJson);
    return re !== void 0 ? re : token;
  }).trim();
  if (hasSepSub) {
    if (s.endsWith(SepSub))
      s = s.slice(0, -SepSub.length);
    if (s.startsWith(SepSub))
      s = s.slice(SepSub.length);
    s = s.replace(SepSubRE, sep || "").trim();
  }
  return s;
}

// node_modules/.pnpm/unhead@2.0.8/node_modules/unhead/dist/shared/unhead.DeCxexjU.mjs
var formatKey = (k) => !k.includes(":key") ? k.split(":").join(":key:") : k;
var AliasSortingPlugin = defineHeadPlugin({
  key: "aliasSorting",
  hooks: {
    "tags:resolve": (ctx) => {
      let m = false;
      for (const t of ctx.tags) {
        const p = t.tagPriority;
        if (!p)
          continue;
        const s = String(p);
        if (s.startsWith("before:")) {
          const k = formatKey(s.slice(7));
          const l = ctx.tagMap.get(k);
          if (l) {
            if (typeof l.tagPriority === "number")
              t.tagPriority = l.tagPriority;
            t._p = l._p - 1;
            m = true;
          }
        } else if (s.startsWith("after:")) {
          const k = formatKey(s.slice(6));
          const l = ctx.tagMap.get(k);
          if (l) {
            if (typeof l.tagPriority === "number")
              t.tagPriority = l.tagPriority;
            t._p = l._p + 1;
            m = true;
          }
        }
      }
      if (m)
        ctx.tags = ctx.tags.sort(sortTags);
    }
  }
});
var DeprecationsPlugin = defineHeadPlugin({
  key: "deprecations",
  hooks: {
    "entries:normalize": ({ tags }) => {
      for (const tag of tags) {
        if (tag.props.children) {
          tag.innerHTML = tag.props.children;
          delete tag.props.children;
        }
        if (tag.props.hid) {
          tag.key = tag.props.hid;
          delete tag.props.hid;
        }
        if (tag.props.vmid) {
          tag.key = tag.props.vmid;
          delete tag.props.vmid;
        }
        if (tag.props.body) {
          tag.tagPosition = "bodyClose";
          delete tag.props.body;
        }
      }
    }
  }
});
async function walkPromises(v) {
  const type = typeof v;
  if (type === "function") {
    return v;
  }
  if (v instanceof Promise) {
    return await v;
  }
  if (Array.isArray(v)) {
    return await Promise.all(v.map((r) => walkPromises(r)));
  }
  if ((v == null ? void 0 : v.constructor) === Object) {
    const next = {};
    for (const key of Object.keys(v)) {
      next[key] = await walkPromises(v[key]);
    }
    return next;
  }
  return v;
}
var PromisesPlugin = defineHeadPlugin({
  key: "promises",
  hooks: {
    "entries:resolve": async (ctx) => {
      const promises = [];
      for (const k in ctx.entries) {
        if (!ctx.entries[k]._promisesProcessed) {
          promises.push(
            walkPromises(ctx.entries[k].input).then((val) => {
              ctx.entries[k].input = val;
              ctx.entries[k]._promisesProcessed = true;
            })
          );
        }
      }
      await Promise.all(promises);
    }
  }
});
var SupportedAttrs = {
  meta: "content",
  link: "href",
  htmlAttrs: "lang"
};
var contentAttrs = ["innerHTML", "textContent"];
var TemplateParamsPlugin = defineHeadPlugin((head) => {
  return {
    key: "template-params",
    hooks: {
      "entries:normalize": (ctx) => {
        var _a, _b, _c;
        const params = ((_b = (_a = ctx.tags.filter((t) => t.tag === "templateParams" && t.mode === "server")) == null ? void 0 : _a[0]) == null ? void 0 : _b.props) || {};
        if (Object.keys(params).length) {
          head._ssrPayload = {
            templateParams: {
              ...((_c = head._ssrPayload) == null ? void 0 : _c.templateParams) || {},
              ...params
            }
          };
        }
      },
      "tags:resolve": ({ tagMap, tags }) => {
        var _a;
        const params = ((_a = tagMap.get("templateParams")) == null ? void 0 : _a.props) || {};
        const sep = params.separator || "|";
        delete params.separator;
        params.pageTitle = processTemplateParams(
          // find templateParams
          params.pageTitle || head._title || "",
          params,
          sep
        );
        for (const tag of tags) {
          if (tag.processTemplateParams === false) {
            continue;
          }
          const v = SupportedAttrs[tag.tag];
          if (v && typeof tag.props[v] === "string") {
            tag.props[v] = processTemplateParams(tag.props[v], params, sep);
          } else if (tag.processTemplateParams || tag.tag === "titleTemplate" || tag.tag === "title") {
            for (const p of contentAttrs) {
              if (typeof tag[p] === "string")
                tag[p] = processTemplateParams(tag[p], params, sep, tag.tag === "script" && tag.props.type.endsWith("json"));
            }
          }
        }
        head._templateParams = params;
        head._separator = sep;
      },
      "tags:afterResolve": ({ tagMap }) => {
        const title = tagMap.get("title");
        if ((title == null ? void 0 : title.textContent) && title.processTemplateParams !== false) {
          title.textContent = processTemplateParams(title.textContent, head._templateParams, head._separator);
        }
      }
    }
  };
});

// node_modules/.pnpm/@unhead+vue@2.0.8_vue@3.5.13_typescript@5.8.3_/node_modules/@unhead/vue/dist/shared/vue.N9zWjxoK.mjs
var VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

// node_modules/.pnpm/@unhead+vue@2.0.8_vue@3.5.13_typescript@5.8.3_/node_modules/@unhead/vue/dist/shared/vue.BYLJNEcq.mjs
var headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}
function injectHead() {
  if (hasInjectionContext()) {
    const instance = inject(headSymbol);
    if (!instance) {
      throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
    }
    return instance;
  }
  throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  let entry;
  watchEffect(() => {
    const i = deactivated.value ? {} : walkResolver(input, VueResolver);
    if (entry) {
      entry.patch(i);
    } else {
      entry = head.push(i, options);
    }
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}

// node_modules/.pnpm/@unhead+vue@2.0.8_vue@3.5.13_typescript@5.8.3_/node_modules/@unhead/vue/dist/shared/vue.nvpYXC6D.mjs
var VueHeadMixin = {
  created() {
    let source = false;
    const instance = getCurrentInstance();
    if (!instance)
      return;
    const options = instance.type;
    if (!options || !("head" in options))
      return;
    source = typeof options.head === "function" ? () => options.head.call(instance.proxy) : options.head;
    source && useHead(source);
  }
};

// node_modules/.pnpm/@unhead+vue@2.0.8_vue@3.5.13_typescript@5.8.3_/node_modules/@unhead/vue/dist/client.mjs
function createHead2(options = {}) {
  const head = createHead({
    domOptions: {
      render: createDebouncedFn(() => renderDOMHead(head), (fn) => setTimeout(fn, 0))
    },
    ...options
  });
  head.install = vueInstall(head);
  return head;
}
export {
  VueHeadMixin,
  createHead2 as createHead,
  renderDOMHead
};
//# sourceMappingURL=@unhead_vue_client.js.map
