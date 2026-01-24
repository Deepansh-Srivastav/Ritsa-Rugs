import { useSelector } from "react-redux";
import { API_PATHS } from "../../../services/apiPaths";
import SwiperCarousel from "../../../shared/components/carousel/Swiper.jsx";

const Home = () => {

    const token = useSelector((state) => state.auth.accessToken);

    console.log("ACCESS TOKEN IS - ", token);

    return (
        <section>
            <SwiperCarousel />
        </section>
    )
}

export default Home;