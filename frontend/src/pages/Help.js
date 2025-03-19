import React from "react";
import "../styles/help.css";

function Help() {
    const diseases = [{
            name: "Bacterial Blight",
            image: "/static/bacterial.jpg",
            desc: "Bacterial Blight is a serious bacterial disease affecting cotton plants, caused by Xanthomonas citri pv. malvacearum. It leads to dark, water-soaked lesions on leaves, stems, and bolls, which later turn brown and necrotic. Severe infections can cause defoliation, stunted growth, and reduced yield."
        },
        {
            name: "Curl Virus",
            image: "/static/curl.jpg",
            desc: "Cotton Leaf Curl Virus (CLCuV) is a viral disease transmitted by the whitefly (Bemisia tabaci). It causes upward curling and distortion of leaves, along with vein thickening and stunted plant growth. Infected plants produce fewer bolls, leading to a significant loss in fiber yield."
        },
        {
            name: "Fussarium Wilt",
            image: "/static/fussarium.jpg",
            desc: "Fussarium Wilt is a fungal disease caused by Fussarium oxysporum f. sp. vasinfectum, which attacks the cotton plant’s vascular system. The disease results in wilting, yellowing, and premature leaf drop, eventually leading to plant death. It spreads through contaminated soil, water, and plant debris."
        },
        {
            name: "Healthy",
            image: "/static/healthy.jpg",
            desc: "A healthy cotton plant exhibits vibrant green leaves, strong stems, and uniform growth. It is free from any signs of disease, such as lesions, curling, or yellowing. Proper irrigation, nutrient management, and pest control are essential for maintaining plant health and ensuring maximum productivity."
        }
    ];

    return ( <
        div className = "help-container" >
        <
        h1 className = "help-title" > Cotton Plant Diseases < /h1> <
        div className = "table-wrapper" >
        <
        table className = "disease-table" >
        <
        thead >
        <
        tr >
        <
        th > Disease Name < /th> <
        th > Image < /th> <
        th > Description < /th> <
        /tr> <
        /thead> <
        tbody > {
            diseases.map((disease, index) => ( <
                tr key = { index } >
                <
                td className = "disease-name" > < strong > { disease.name } < /strong></td >
                <
                td >
                <
                img src = { disease.image }
                alt = { disease.name }
                className = "disease-image" /
                >
                <
                /td> <
                td className = "disease-description" > { disease.desc } < /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div> <
        /div>
    );
}

export default Help;