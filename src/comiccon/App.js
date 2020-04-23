import React, { Component } from 'react';

import Carousel from './components/carousel/carousel';
import Categories from './components/categories/categories';
import Planets from './components/planets/planets';
import Dialog from './components/dialog/dialog';


import Stars from './stars'
import Shine from './shine';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const car= [
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/retaillabs/2019/11/14/cfad6c2a-5656-4fe6-b40c-baad962fe6a91573729577769-PPG.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/retaillabs/2019/11/14/992058de-3d5b-4647-923e-ed47726ef4961573729578595-Minnie.png",
                "link":""
            },
            {
                "imgSrc": "https://assets.myntassets.com/assets/images/retaillabs/2019/11/14/14738d73-2cdf-44a3-9b3e-9cfc4a97d0fb1573729579181-Mickey.png",
                "link":""
            }
        ] 

        const cat = [
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/f3e0c8d2-5678-4da5-9782-3f565f69cbc31573677256390-categories-Tops.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/c626c480-1b28-4a6a-a980-d43f93d75e7c1573677256564-categories-Bottoms.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/55c56493-1530-485c-b006-6912d5373c6e1573677256532-categories-Dresses.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/6a0a1ee1-f6fa-4a47-b8a4-d32bb70458db1573677256463-categories-Jackets.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/fa29953d-fb63-42d7-b996-2cc58a287e091573677256500-categories-Figuriens.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/54986b64-ab78-4e07-bb6f-c094fc8ee80a1573677256425-categories-Kids.png",
                "link":""
            }
        ]

        const planets = [
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/73b627f1-081a-424d-8241-64d9005e84de1573681597412-1-JL_01.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/5d84471f-e186-4ac7-aae3-a0aa94ec3be01573681597375-1-JL_02.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/e768f002-7509-4026-b609-a98bcc48b4d71573681333517-2-Avengers.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/82f7af42-23b7-42da-8a36-c4bfec9dd62d1573681333485-3-Starwar.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/ba1622a3-9c29-4021-a7c1-5ef0786b0ead1573681333451-4-Cartoon.png",
                "link":""
            },
            {
                "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/f44b9f31-a64e-4492-826f-8914e1ea4a5f1573681333416-5-dummy.png",
                "link":""
            }
        ]
        return ( 
            <div style={{background: 'cadetblue' }}>
                <Shine></Shine>
                <div style={{height: '400px'}}>
                    hello world
                    <h1>Welllcommeeee</h1>
                    <Stars />
                </div>
                <Carousel data={car}></Carousel>
                <Categories data={cat}></Categories>
                <Planets data={planets} background={'url(https://assets.myntassets.com/assets/images/banners/2019/11/14/1924ef15-7f6b-4af6-910e-10c73367465a1573681910096-BG.jpg)'}></Planets>
                <Planets data={planets}></Planets>
                <Dialog
                    height='100px'
                    width='200px'
                    color='blue'
                    background= 'url(https://assets.myntassets.com/assets/images/retaillabs/2019/11/13/a09b0c19-391e-4f78-ad48-a4e627e2f9391573648940674-speech-bubble.png)'
                    text='hello world'
                />
                <Dialog
                    color='black'
                    text='asdfghjkl dfghjk fghjkl dfghjkl dfghjkl'
                />
            </div>
         );
    }
}
 
export default App;