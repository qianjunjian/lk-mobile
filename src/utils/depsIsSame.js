export function depsIsSame(oldDeps, deps) {
    if (oldDeps === deps) {
        return true;
    }
    for (let i = 0; i < oldDeps.length; i++) {
        if (!Object.is(oldDeps[i], deps[i])) {
            return false;
        }
    }
    return true;
}