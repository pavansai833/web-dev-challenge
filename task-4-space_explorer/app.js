let para = document.querySelector('.para');
let image = document.getElementById('IMG');
let title = document.querySelector('.title');
let head = document.querySelector('.head');

// Load today's APOD automatically when page loads
window.addEventListener('load', async () => {
    let apidata = await todayIMg();
    displayAPOD(apidata, "Today's Image:");
});

async function todayIMg() {
    try {
        let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        return await response.json();
    } catch (err) {
        console.error(err);
        return {
            title: "Error loading data",
            explanation: "Failed to fetch APOD data.",
            url: "./asserts/Nasa_Isro.webp"
        };
    }
}

function  displayAPOD(apidata, heading) {
     if (apidata.media_type === "image") {
        image.classList.remove('show');
        setTimeout(() => {
            image.src = apidata.url;
            title.innerHTML = apidata.title;
            para.innerHTML = apidata.explanation;
            head.innerHTML = heading;
            image.classList.add('show');
        }, 2000);
    } else {
        image.src = "./asserts/Nasa_Isro.webp";
        para.innerHTML = `Today's APOD is a video: <a href="${apidata.url}" target="_blank">Watch here</a>`;
    }

}
