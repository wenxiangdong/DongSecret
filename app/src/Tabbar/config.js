import Home from '../pages/index/home';
import Me from '../pages/index/me';

const config = {
    pages: [
        {
            name: 'home',
            component: Home,
            icon: 'home-o',
        },
        {
            name: 'me',
            component: Me,
            icon: 'star-o',
        },
    ],
    selectedColor: "#07c160",
    baseUrl: "/pages/index/index"
}

export default config;