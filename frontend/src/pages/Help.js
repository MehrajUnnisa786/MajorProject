import React from "react";
import "../styles/help.css";

function Help() {
    const diseases = [{
            name: "Bacterial Blight",
            image: "/static/bacterial.jpg",
            desc: "Bacterial Blight is a serious cotton disease caused by Xanthomonas citri pv. malvacearum, spreading through infected seeds, rain splash, and contaminated tools. It thrives in warm, humid conditions and significantly reduces crop yield and fiber quality. Symptoms start as small, dark, water-soaked lesions on leaves, which enlarge into angular brown spots with yellow halos. As the infection worsens, stems develop black streaks, and bolls become hard, fail to open, and produce poor-quality fiber. To manage the disease, farmers should use resistant cotton varieties and treat seeds with copper-based bactericides before planting. If infection occurs, early application of bactericides and regular removal of infected plants help prevent further spread and minimize crop damage."
        },
        {
            name: "Curl Virus",
            image: "/static/curl.jpg",
            desc: "Cotton Leaf Curl Virus (CLCuV) is a viral disease transmitted by the whitefly (Bemisia tabaci), spreading rapidly in warm, humid conditions. It severely affects cotton plants by disrupting their growth and reducing fiber yield. Symptoms include upward curling and distortion of leaves, along with vein thickening, which restricts nutrient flow. As the infection progresses, plants become stunted, and boll production decreases, leading to significant yield losses. To manage the disease, farmers should use resistant cotton varieties and implement whitefly control measures such as insecticides and biological controls. If infection occurs, removing infected plants and practicing crop rotation help reduce virus spread and protect future crops."
        },
        {
            name: "Fussarium Wilt",
            image: "/static/fussarium.jpg",
            desc: "Fusarium Wilt is a fungal disease caused by Fusarium oxysporum f. sp. vasinfectum, which infects the cotton plant’s vascular system, blocking water and nutrient flow. It spreads through contaminated soil, water, and plant debris, persisting for years in the environment. Symptoms include wilting, yellowing of leaves, and premature leaf drop, leading to plant stunting and eventual death. As the infection progresses, vascular tissues turn brown, further restricting nutrient absorption. To manage the disease, farmers should use resistant cotton varieties and practice crop rotation with non-host plants. If infection occurs, soil fumigation and improving drainage can help limit disease severity and protect future crops."
        },
        {
            name: "Healthy",
            image: "/static/healthy.jpg",
            desc: "A healthy cotton plant has vibrant green leaves, strong stems, and uniform growth, indicating optimal development. It remains free from disease symptoms such as lesions, leaf curling, or yellowing, ensuring better fiber yield. Proper irrigation prevents water stress, while balanced nutrient management supports strong root and shoot growth. Effective pest control, including monitoring and timely intervention, protects the plant from insects and pathogens. By maintaining these conditions, farmers can ensure maximum productivity and high-quality cotton fiber."
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