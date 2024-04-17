import React from "react";
import '../stylesheets/Banner.css';

function SiteBanner(){
    return (
        <section>
            <hr className="bannerTopBorder"></hr>
            <div className="bannerPlain">
                <div className="title">Fake Stack Overflow</div>
            </div>
            <hr className="bannerBottomBorder"></hr>
        </section>
    );
}

export default SiteBanner;