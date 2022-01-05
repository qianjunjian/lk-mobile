import { memo, useState } from "react";
import PropTypes from "prop-types";
import { LazyDetector } from "./lazyDetector";
import "./image.less";

const Image = ({src, alt, lazy, fit, ...otherProps}) => {
    const [loaded, setLoaded] = useState(false)
    const [failed, setFailed] = useState(false)
    const [initialized, setInitialized] = useState(!lazy)

    return <div className="dd-image">
        {
            lazy && !initialized && 
            <LazyDetector
                onActive={() => {
                    setInitialized(true)
                }}
            />
        }
        {
            failed ? <div className="dd-image-tip">
                <i className="icon"></i>
            </div> : <img
                className="dd-image-img"
                src={initialized ? src : undefined }
                alt={alt}
                onClick={otherProps?.onClick}
                onLoad={() => {
                    setLoaded(true)
                }}
                onError={e => {
                    setFailed(true)
                    otherProps.onError?.(e)
                }}
                style={{
                    objectFit: fit ?? "fill",
                    display: loaded ? "block" : "none"
                }}
            />
        }
    </div>
}

Image.propTypes = {
    lazy: PropTypes.bool,
    onClick: PropTypes.func,
    onError: PropTypes.func,
    alt: PropTypes.string,
    fit: PropTypes.string,
    src: PropTypes.string
}

export default memo(Image);