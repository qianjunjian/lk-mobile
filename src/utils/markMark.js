export const makeMark = ({
    gapX = 24, 
    gapY = 48,
    width = 120,
    height = 64,
    content = "",
    fontSize = 14,
    fontFamily = "sans-serif",
    fontStyle = "normal",
    fontWeight = "normal",
    fontColor = "rgba(0,0,0,.15)",
    imageUrl = "",
    rotate = 20
}) => {
    return new Promise((resolve, reject) => {

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d");

        const ratio = window.devicePixelRatio;

        const canvasWidth = `${(gapX + width) * ratio}px`
        const canvasHeight = `${(gapY + height) * ratio}px`

        const markWidth = width * ratio
        const markHeight = height * ratio

        canvas.setAttribute("width", canvasWidth)
        canvas.setAttribute("height", canvasHeight)

        if (ctx) {
            if (imageUrl) {
                // 绕中心旋转
                ctx.translate(markWidth / 2, markHeight / 2)
                ctx.rotate(Math.PI / 180 * Number(rotate))

                const img = new Image()
                img.crossOrigin = "anonymous"
                img.referrerPolicy = "no-referrer"
                img.src = imageUrl
                img.onload = () => {
                    ctx.drawImage(
                        img,
                        -width * ratio / 2,
                        -height * ratio / 2,
                        width * ratio,
                        height * ratio
                    )
                    ctx.restore()
                    resolve(canvas.toDataURL())
                }
            } else if (content) {
                ctx.textBaseline = "middle"
                ctx.textAlign = "center"
                // 文字绕中间旋转
                ctx.translate(markWidth / 2, markHeight / 2)
                ctx.rotate(Math.PI / 180 * Number(rotate))

                const markSize = Number(fontSize) * ratio
                ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`
                ctx.fillStyle = fontColor

                ctx.fillText(content, 0, 0)
                ctx.restore()
                resolve(canvas.toDataURL())
            } else {
                reject("未设置imageUrl或者content参数")
            }
        } else {
            reject("当前环境不支持Canvas")
        }
    })
}