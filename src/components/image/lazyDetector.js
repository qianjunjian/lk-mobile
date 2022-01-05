import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useInViewport } from "../../use/use-in-viewport";

export const LazyDetector = ({ onActive }) => {
    const ref = useRef(null);
    const [ inViewport ] = useInViewport(ref);

    useEffect(() => {
        if (inViewport) {
            onActive()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inViewport])

    return <div ref={ref}></div>
}

LazyDetector.propTypes = {
    onActive: PropTypes.func.isRequired
}
