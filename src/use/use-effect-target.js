import { useRef, useEffect } from "react";
import { getTargetElement } from "../utils/getTargetElement";
import { depsIsSame } from "../utils/depsIsSame";

export const useEffectTarget = (effect, target) => {
    const hasInitRef = useRef(false);
    const lastElementRef = useRef([]);
    const unLoadRef = useRef();

    useEffect(() => {
        const targets = Array.isArray(target) ? target : [target];
        const els = targets.map((item) => getTargetElement(item));

        if (!hasInitRef.current) {
            hasInitRef.current = true;
            lastElementRef.current = els;
            unLoadRef.current = effect();
        }

        if (els.length !== lastElementRef.current.length || !depsIsSame(els, lastElementRef.current)) {
            unLoadRef.current?.();
            lastElementRef.current = els;
            unLoadRef.current = effect();
        }
    })

    useEffect(() => {
        // 卸载时销毁
        return () => {
            unLoadRef.current?.();
            hasInitRef.current = false;
        }
    }, []);
}