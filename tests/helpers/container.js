export function stubResolver(app, name, factory) {
  app.__container__.registry._resolveCache[name] = factory;
}

export function stubLookup(app, name, instance) {
  app.__container__._cache[name] = instance;
}
