import "intersection-observer";
import { useState } from "react";
import { getTargetElement } from "../utils/getTargetElement";
import { useEffectTarget } from "./use-effect-target";

export const useInViewport = (target, options) => {
    // 是否可见
    const [state, setState] = useState();
    const [ratio, setRatio] = useState();
    useEffectTarget(() => {
        const el = getTargetElement(target);
        if (el) {
            const observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        setRatio(entry.intersectionRatio);
                        if (entry.isIntersecting) {
                            setState(true);
                        } else {
                            setState(false);
                        }
                    }
                },
                {
                    ...options,
                    root: getTargetElement(options?.root)
                }
            );
    
            observer.observe(el);
    
            return () => {
                observer.disconnect();
            };
        }
        return () => {}
    }, target)

    return [state, ratio]
}