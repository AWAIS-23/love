setInterval(function() {
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;
    
    var heart = document.createElement("div");
    heart.className = "heart";
    heart.style.width = r_size + "px";
    heart.style.height = r_size + "px";
    heart.style.left = r_left + "%";
    heart.style.background = `rgba(255, ${r_bg - 25}, ${r_bg}, 1)`;
    heart.style.animation = `love ${r_time}s ease-in infinite`;
    
    document.querySelector(".bg_heart").appendChild(heart);
    
    setTimeout(() => { heart.remove(); }, r_time * 1000);
}, 500);

var i = 0;
var txt = "Hi SweetHeart.....! << Now I want to say something special to you. <<< So, Please read everything carefully...! > When I saw you for the first time < You seemed special to me. << As the days went by, you got closer to me....! << I don't know why, but your thoughts always resonate in my mind...! > Everything about you is always interesting to me...! << I am somewhat nervous because I haven't said these words to anyone, and I won’t say them to anyone in the future...! > I Love my beautiful wife Ayesha Kiran more than anything else in this world....! << Now you are the only person I love equally with my parents....! >I Love You < SweetHeart.....! | <<<< I love you so so so much...!";
var speed = 50;

function typeWriter() {
    if (i < txt.length) {
        let textElement = document.getElementById("text1");
        if (txt.charAt(i) === '<') {
            textElement.innerHTML += '<br>';
        } else if (txt.charAt(i) === '>') {
            textElement.innerHTML = '';
        } else {
            textElement.innerHTML += txt.charAt(i);
        }
        i++;
        setTimeout(typeWriter, speed);
    }
}
typeWriter();
