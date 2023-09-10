//@ts-ignore
export const saveImage = (divId, fileName) => {
  //@ts-ignore
  const chartElement = document.getElementById(divId)
  if (chartElement) {
    //@ts-ignore
    const svgData = chartElement.querySelector('svg')?.outerHTML
    if (svgData) {
      //@ts-ignore
      const blob = new Blob([svgData], {type: 'image/svg+xml'})
      //@ts-ignore
      const url = URL.createObjectURL(blob)
      //@ts-ignore
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()
      URL.revokeObjectURL(url)
    }
  }
}
