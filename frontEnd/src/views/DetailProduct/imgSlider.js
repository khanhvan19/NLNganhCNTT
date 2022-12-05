import Slider from 'react-slick';

import styles from './Detail.module.css'

function ImgSlider({data = []}) {
    const settings = {
        customPaging: function(i) {
            return (
                <span><img src={data[i]} alt="..."/></span>
            );
        },
        dots: true,
        className: "custom-slick-slider",
        dotsClass: "custom-slick-dots",
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    return (
        <Slider {...settings}>
            {data.map((item, index) => (
                <img src={item} alt={index} key={index} className={styles.imgProdSlide}/>
            ))}
        </Slider>
    );
}

export default ImgSlider;