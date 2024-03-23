export const injectWatchers = (store) => {
    const context = require.context('.', true, /^.*\.ts$/, 'sync')

    context.keys().forEach((key) => {
        if (key === './index.ts') {
            return
        }

        const watchersDict = context(key)

        if (!watchersDict) {
            console.warn(`Warning: file "${key}" has no exported watchers`)
            return
        }

        Object.values(watchersDict).forEach((watcher) => watcher(store))
    })
}