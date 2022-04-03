import { useEffect, useState } from "react"

export const SuccessBanner = ({isSuccess}) => {

    const [bannerClassName, setIsBannerClassName] = useState('success-banner-hidden')

    useEffect(() => {
        if (isSuccess) {
            setIsBannerClassName('success-banner-showing')
        } else {
            setIsBannerClassName('success-banner-hidden')
        }
    }, [isSuccess])
    
    return (
        <div className="banners">
            <span className={bannerClassName}>
                <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' width='28' height='12'><g><path d='M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z' fill='rgba(255, 255, 255, 1)' /></g></svg>" alt="tick" className="inline-svg" />
                Changes have been saved successfully
            </span>
        </div>
    )
}