let para = document.querySelector('.para');
let image = document.getElementById('IMG');
let video = document.getElementById('VIDEO');
let title = document.querySelector('.title');
let head = document.querySelector('.head');

window.addEventListener('load', async () => {
    let apidata = await todayIMg();
    displayAPOD(apidata, "Today's Image:");
});

async function todayIMg() {
    try {
        let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=USvmS9oZFDINzIWxrTA6oXPdVQORaIoMzP0Bwne6');
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

function displayAPOD(apidata, heading) {
    if (apidata.media_type === "image") {
        // Show Image
        video.style.display = 'none';
        image.style.display = 'block';
        image.src = apidata.url;
        title.innerHTML = apidata.title;
        para.innerHTML = apidata.explanation;
        head.innerHTML = heading;
    } else if (apidata.media_type === "video") {
        // Show Video
        image.style.display = 'none';
        video.style.display = 'block';
        video.src = apidata.url;
        title.innerHTML = apidata.title;
        para.innerHTML = apidata.explanation;
        head.innerHTML = heading;
    } else {
        title.innerHTML = "Unsupported Media Type";
        para.innerHTML = "The APOD returned an unsupported media type.";
    }
}
