import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeMark } from "../../utils/markMark";
import "./waterMark.less";

const WaterMark = ({
    gapX = 20, 
    gapY = 40,
    width = 120,
    height = 60,
    content = "",
    fontSize = 14,
    fontFamily = "sans-serif",
    fontStyle = "normal",
    fontWeight = "normal",
    fontColor = "rgba(0,0,0,.15)",
    imageUrl = "",
    rotate = -20,
    zIndex = 1000
}) => {
    const [data, setData] = useState("");

    useEffect(() => {
        makeMark({
            gapX, 
            gapY,
            width,
            height,
            content,
            fontSize,
            fontFamily,
            fontStyle,
            fontWeight,
            fontColor,
            imageUrl,
            rotate
        }).then(data => {
            setData(data)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, imageUrl])

    return <div 
        className="dd-water-mark"
        style={{
            zIndex,
            backgroundImage: `url('${data}')`
        }}
    >
    </div>
}

WaterMark.propTypes = {
    gapX: PropTypes.number, // 水印之间的水平距离
    gapY: PropTypes.number, // 水印之间的垂直距离
    width: PropTypes.number, // 水印宽度
    height: PropTypes.number, // 水印高度
    content: PropTypes.string, // 文本内容
    fontFamily: PropTypes.string, // 字体
    fontSize: PropTypes.number, // 字号
    fontStyle: PropTypes.string, // 规定字体样式: normal | italic | oblique
    fontWeight: PropTypes.string, // 字体的粗细
    fontColor: PropTypes.string, // 字体的颜色
    imageUrl: PropTypes.string, // 图片地址
    rotate: PropTypes.number, // 旋转角度
    zIndex: PropTypes.number
}

export default memo(WaterMark);