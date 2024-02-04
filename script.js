/*API Weather*/

const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "393706121dcb6dfc80a9c884f1195b34"
}
//console.log(api) //проверяем

const input = document.querySelector("#input"); //даем доступ к графе ввода

input.addEventListener("keypress", enter); //ставим прослушку на действие keypress, чтобы потом сработала функция enter которую прописываем ниже

function enter(e){
    if (e.keyCode === 13){ //если нажата кнопка 13*ентер, то выполни следующее
        getInfo(input.value)  
    }
}
//https://openweathermap.org/current
//эта функция для того, чтобы связаться с арi и получить в консоли данные. Чтобы потом видеть путь для их отражения в следующей функции
async function getInfo(data){  
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`); //это мы делаем из ссылки api :  http://api.openweathermap.org/data/2.5/weather?q=   London,uk & APPID=    6755dfc2a61ba1caca645b9c04598150   units=metric - это метрическая система
    console.log(res);
    const result = await res.json(); 
    console.log(result)
    displayResult(result);
}
//оражаем все, что получили
function displayResult(result){
    let city = document.querySelector("#city"); //город 
    city.textContent= `${result.name}`

    let temp = document.querySelector("#temp"); //температура
    temp.innerHTML = `${Math.round(result.main.temp)} <sup>°C</sup>`
}

/*логотип*/
gsap.fromTo(".logo",{
  y:-50,
  ease: "bounce",
  duration:4,  
  opacity:0,
},
{y:2,
  x:10,
  ease: "bounce",
  duration:4,
  scale:1.1,
  opacity:1,
})



/*BOOKS*/
const booksArray = [ 
  {name: "полумна лавгуд", photo:"https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/Black%20And%20Red%20Horror%20Movie%20Poster.jpg?v=1695574674185"} , 
  {name: "минерва макгонагл", photo:"https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/Black%20And%20White%20Horror%20Movie%20Poster%20.jpg?v=1695574678742"} ,
  {name: "северус снейп", photo:"https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/Blue%20And%20Black%20Fantasy%20Movie%20Poster%20.jpg?v=1695574691315"},
  {name: "джинни уизли", photo:"https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/Brown%20Mystery%20Movie%20Poster.jpg?v=1695574698711"},
  {name: "гарри поттер", photo:"https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/Dark%20grey%20simple%20samurai%20warrior%20action%20movies%20promotion%20poster.jpg?v=1695574703167"}, 
  {name: "рон уизли", photo:"https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/Orange%20And%20Black%20Mystery%20Movie%20Poster.jpg?v=1695574709248"}, 
  {name: "воландеморт", photo:"https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/Red%20And%20Black%20Action%20Movie%20Poster%20.jpg?v=1695574715514"},
  {name: "альбус дамблдор", photo:"https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/Red%20And%20Black%20Horror%20Movie%20Poster.jpg?v=1695574719248"},
  {name: "гермиона грейнджер", photo:"https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/Yellow%20And%20Black%20Action%20Movie%20Poster%20.jpg?v=1695574722920"}
  ];

const searchBook = document.querySelector("#search");
let iBooks = 0;

let flagBooksRotating = true

function searchBookRita(){

  searchBook.addEventListener("input", function(e) {
      const wordOfUser = e.target.value.toLowerCase().trim();
      const match = booksArray.find(match => match.name === wordOfUser)

      if (match !== undefined) {
          // Если мы здесь, то мы нашли книгу и ...
          // ... показываем её
          document.querySelector("#books").src = match.photo;
          console.log(match.photo)
          // и подаём сигнал остановить ротацию изображений
          flagBooksRotating = false
      }  

  })
}
searchBookRita()



function changeBooks(){

  if (!flagBooksRotating) {
    return 
  }

  iBooks++;
  if(iBooks>booksArray.length-1){
    iBooks=0
  }
  document.querySelector("#books").src = booksArray[iBooks].photo;

  setTimeout(changeBooks,1500)  
}

changeBooks()


/*Игра с сортировочной шляпой*/

const buttonSort = document.querySelector("#sortMeButton");
const inputFemale = document.querySelector("#inputFemale");
const inputMale = document.querySelector("#inputMale");

/*переключение между мальчиком и девочкой*/
inputMale.addEventListener("click", ()=>{
  document.getElementById("faceScholler").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/defaulMaleAvatar-removebg-preview.png?v=1695887233161";
})
inputFemale.addEventListener("click", ()=>{
  document.getElementById("faceScholler").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/defaulFeMaleAvatar-removebg-preview.png?v=1695887106945";
})

/*опускание сортировочной шлпяпы и срабатывание мальчика сортировка или девочка сортировка*/
buttonSort.addEventListener("click", sortIt)

function sortIt(e){
  e.preventDefault()

  setTimeout(function(){
  if (document.querySelector("#inputFemale").checked){
    playWithMe()
  }
  if (document.querySelector("#inputMale").checked){
    playWithMeM()
  }
  else{
    playWithMe()
  }
  },3000)
  
  /*Действия шляпы*/
  gsap.fromTo(".imgSortHut", {y: -400, opacity:1}, {y: 35,  scale:12, delay:1, duration:2, ease:  "power3"});

}

function playWithMe(){
  let randomChoisePlay = Math.floor(Math.random()*4)+1;
  console.log(randomChoisePlay)
  if (randomChoisePlay === 1){
    document.getElementById("playAiScholler").style.backgroundColor = "#ad0000";
    document.getElementById("sortMeButton").style.backgroundColor = "#ad0000";
    document.getElementById("faceScholler").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/1gryf.png?v=1695888092341";
    document.getElementById("myFacultyName").textContent = "Gryffindor!"
    facultyName()

  }
  if (randomChoisePlay === 2){
    document.getElementById("playAiScholler").style.backgroundColor = "#1e753d";
    document.getElementById("sortMeButton").style.backgroundColor = "#1e753d";
    document.getElementById("faceScholler").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/1slith.png?v=1695888118373";
    document.getElementById("myFacultyName").textContent = "Slytherin!"
    facultyName()

  }
  if (randomChoisePlay === 3){
    document.getElementById("playAiScholler").style.backgroundColor = "#eba921";
    document.getElementById("sortMeButton").style.backgroundColor = "#eba921";
    document.getElementById("faceScholler").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/1puf.png?v=1695888111489";
    document.getElementById("myFacultyName").textContent = "Hufflepuff!"
    facultyName()

  }
  if (randomChoisePlay === 4){
    document.getElementById("playAiScholler").style.backgroundColor = "#023780";
    document.getElementById("sortMeButton").style.backgroundColor = "#023780";
    document.getElementById("faceScholler").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/1kogt.png?v=1695888104383";
    document.getElementById("myFacultyName").textContent = "Ravenclaw!"
    facultyName()

  }
}

function playWithMeM(){
  let randomChoisePlay = Math.floor(Math.random()*4)+1;
  console.log(randomChoisePlay)
  if (randomChoisePlay === 1){
    document.getElementById("playAiScholler").style.backgroundColor = "#ad0000";
    document.getElementById("sortMeButton").style.backgroundColor = "#ad0000";
    document.getElementById("faceScholler").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/2gryf.png?v=1695888100964";
    document.getElementById("myFacultyName").textContent = "Gryffindor!"
    facultyName()
  }
  if (randomChoisePlay === 2){
    document.getElementById("playAiScholler").style.backgroundColor = "#1e753d";
    document.getElementById("sortMeButton").style.backgroundColor = "#1e753d";
    document.getElementById("faceScholler").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/2slith.png?v=1695888122025";
    document.getElementById("myFacultyName").textContent = "Slytherin!"
    facultyName()
  }
  if (randomChoisePlay === 3){
    document.getElementById("playAiScholler").style.backgroundColor = "#eba921";
    document.getElementById("sortMeButton").style.backgroundColor = "#eba921";
    document.getElementById("faceScholler").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/2puf.png?v=1695888114967";
    document.getElementById("myFacultyName").textContent = "Hufflepuff!"
    facultyName()
  }
  if (randomChoisePlay === 4){
    document.getElementById("playAiScholler").style.backgroundColor = "#023780";
    document.getElementById("sortMeButton").style.backgroundColor = "#023780";
    document.getElementById("faceScholler").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/2kogt.png?v=1695888108284";
    document.getElementById("myFacultyName").textContent = "Ravenclaw!"
    facultyName()
    
  }
}

/*Слово факультета*/
function facultyName(){
gsap.to("#myFacultyName", { 
  opacity:1,
  duration:2,
  scale:2,
  ease:"bounce",
})
}

/*eggs*/

/*постоянное движение яиц*/
gsap.to(".testeggs2",{
  y:5,
  y:-5,
  x:-5,
  x:5,
  ease:"bounce",
  yoyo:true,
  repeat:-1

})
gsap.to(".testeggs3",{
  x:-5,
  y:-5,
  y:5,
  x:5,
  ease:"bounce",
  yoyo:true,
  repeat:-1

})
gsap.to(".testeggs4",{
  y:5,
  x:5,
  x:-5,
  y:-5,
  ease:"bounce",
  yoyo:true,
  repeat:-1
})

/*действия при нажатию на кнопку яйца*/
const eggButtonOne = document.querySelector(".testeggs2");
const eggButtonTwo = document.querySelector(".testeggs3");
const eggButtonThree = document.querySelector(".testeggs4");

eggButtonOne.addEventListener("click",eggActionOne);

function eggActionOne(){
  document.querySelector(".testeggs2").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/6862951_28622__1_-removebg-preview.png?v=1695976153011";
}

eggButtonTwo.addEventListener("click",eggActionTwo);

function eggActionTwo(){
  document.querySelector(".testeggs3").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/dragon2.png?v=1695977498460";

}

eggButtonThree.addEventListener("click",eggActionThree);

/*появление %скидки*/
function eggActionThree(){
  document.querySelector(".testeggs4").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/proc.png?v=1695976753838";
  gsap.to(".testeggs4",{
  scale:1,
  rotationY:360,
  duration:6,
  repeat:-1
  })

  /*появление кода скидки*/
  document.querySelector(".codeSale").textContent = "CODE: WIZARD";
  gsap.fromTo(".codeSale", {opacity:0}, {opacity:1, delay:1, duration:2});
}

/*frog**/
const scrollMain = document.querySelector(".main3")

gsap.fromTo(".frogsInAction",{
  y:-50,
  x:150,
  ease: "steps(10)",
  duration:8,
},
{y:600,
  x:-50,
  ease: "steps(10)",

  duration:8,
  opacity:0,
  scrollTrigger: { /*лягушка при скроллинге вниз прыгает*/
    trigger: scrollMain,
    toggleActions: "restart none none none"
},
})

/*картотека летающих метел*/

const nimbusOne = document.querySelector("#nimbusOne");
const nimbusTwo = document.querySelector("#nimbusTwo");
const nimbusThree = document.querySelector("#nimbusThree");
const cometa = document.querySelector("#cometa");

nimbusOne.addEventListener("click", nimbus2001)
function nimbus2001(){
  document.querySelector(".broomstickImg").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/1nimb-removebg-preview%20(1).png?v=1696264327651";
  document.querySelector("#broomstickTextOne").textContent = "Nimbus Racing Broom Company";
  gsap.to("#speed",{
    text: "14,48 км/ч",
    duration:3,
    repeatDelay: .7,
    ease: "power.1in",
  }) 

  document.querySelector("#broomstickTextThree").textContent = "Создана для скоростной игры в Квиддитч";
  document.querySelector("#broomstickTextFour").textContent = "Драко Малфой";
  document.querySelector(".broomstickTextImg").style.backgroundImage = "url('https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/design-space-paper-textured-background1.jpg?v=1696264862761')";
  document.querySelector(".borderBroomstick").style.backgroundColor = "#B07925"
}

nimbusTwo.addEventListener("click", nimbus2000)
function nimbus2000(){
  document.querySelector(".broomstickImg").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/2nimb-removebg-preview%20(1).png?v=1696267804151";
  document.querySelector("#broomstickTextOne").textContent = "Nimbus Racing Broom Company";
  gsap.to("#speed",{
    text: "12,05 км/ч",
    duration:3,
    repeatDelay: .7,
    ease: "power.1in",
  }) 
  
  document.querySelector("#broomstickTextThree").textContent = "Создана для скоростной игры в Квиддитч";
  document.querySelector("#broomstickTextFour").textContent = "Гарри Поттер";
  document.querySelector(".broomstickTextImg").style.backgroundImage = "url('https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/design-space-paper-textured-background1.jpg?v=1696264862761')";
  document.querySelector(".borderBroomstick").style.backgroundColor = "#5B3A09"
}

nimbusThree.addEventListener("click", nimbus1700)
function nimbus1700(){
  document.querySelector(".broomstickImg").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/3nimb-removebg-preview%20(1).png?v=1696268038543";
  document.querySelector("#broomstickTextOne").textContent = "Nimbus Racing Broom Company";
  gsap.to("#speed",{
    text: "10,05 км/ч",
    duration:3,
    repeatDelay: .7,
    ease: "power.1in",
  }) 

  document.querySelector("#broomstickTextThree").textContent = "Создана для скоростной игры в Квиддитч";
  document.querySelector("#broomstickTextFour").textContent = "Эрика Рат";
  document.querySelector(".broomstickTextImg").style.backgroundImage = "url('https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/design-space-paper-textured-background1.jpg?v=1696264862761')";
  document.querySelector(".borderBroomstick").style.backgroundColor = "#7C330A"
}

cometa.addEventListener("click", cometaB)
function cometaB(){
  document.querySelector(".broomstickImg").src = "https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/290-removebg.png?v=1696268854142";
  document.querySelector("#broomstickTextOne").textContent = "Comet Trading Company";
  gsap.to("#speed",{
    text: "9,66 км/ч",
    duration:3,
    repeatDelay: .7,
    ease: "power.1in",
  }) 
  document.querySelector("#broomstickTextThree").textContent = "Создана для скоростной игры в Квиддитч";
  document.querySelector("#broomstickTextFour").textContent = "Пенелопа Фоули";
  document.querySelector(".broomstickTextImg").style.backgroundImage = "url('https://cdn.glitch.global/3e4b2c6a-4f15-49a3-a6b6-6dc52ca58d4f/design-space-paper-textured-background1.jpg?v=1696264862761')";
  document.querySelector(".borderBroomstick").style.backgroundColor = "#E0B004"
}

/*изменение скорости в карточке метлы*/
const scrollMainTwo = document.querySelector(".hut")

gsap.to("#speed",{
  text: "14,48 км/ч",
  duration:3,
  repeatDelay: .7,
  ease: "power.1in",
  scrollTrigger: { /*изменяется скороскть*/
    trigger: scrollMainTwo,
    toggleActions: "restart none none none"
    }
}) 

/*движение метлы*/
gsap.to(".broomstickImg",{
      ease:"bounce",
      rotation:10,
      duration:3,
      repeat:-1,
})

/*prediction*/
const buttonmagicBall = document.querySelector("#btnMagic");
const par = document.querySelector(".prediction");
const predict = ["Вскоре к вам явится кто-то неожиданный",

    "Ошибки не совершает только тот, кто не пробует",
    
    "Все люди кажутся нормальными, пока вы не узнаете их поближе",
    
    "Вывод — этот момент, в котором ты понял, что устал думать",
    
    "Все взрослые маскируются под ответственных людей",
    
    "Искушение — это не возможно. Не путайте!",
    
    "Нет большей ошибки, чем быть всегда правым",
    
    "Даже в пятницу на работе можно найти счастье",
    
    "Действия говорят громче, чем печенье с предсказаниями",
    
    "Ни одна снежинка не чувствует себя виновной в снегопаде",
    
    "Не ждите чудес, чудите сами!",
    
    "Не откладывай на завтра то, что не планируешь делать никогда",
    
    "Только ты можешь хвалить и ругать себя",
    
    "Не доверяй никому свою жизнь. Неси ответственность за нее самостоятельно",
    
    "Перекладывание ответственности на кого-то еще никого не спасло",
    
    "Не отказывай себе в удовольствии",
    
    "Сделай сегодня то, что не решался совершить долгое время",
    
    "Рискни! Судьба улыбается отчаянным",
    
    "Счастье есть! Но это не точно",
    
    "Выбор есть всегда!",
    
    "Ты можешь гораздо больше, чем думаешь",
    
    "Совершенствуйся — это лучшее вложение в будущее"]

buttonmagicBall.addEventListener("click", showPredict)

function showPredict(){
  let choosePredict = predict[Math.floor(Math.random() * predict.length)];
  par.textContent = choosePredict;
  gsap.to(".prediction",{
    x:28,
    duration:2,
    scale:1.2,
    ease:"bounce",
  })
}
 

/*исчезновение серого фильтра при наведении мыши*/
const filterOver = document.querySelectorAll(".greyFilter")

filterOver.forEach(i =>{
  i.addEventListener("mouseover",()=>{
    i.classList.remove("greyFilter")
  })
})




/*SNOW HOGWARTS*/
particlesJS("particles-js", {
    particles: {
      number: { value: 1000, density: { enable: true, value_area: 800 } },
      color: { value: "#fff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 }
      },
      opacity: {
        value: 0.9,
        random: true,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 10,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: false,
        distance: 500,
        color: "#ffffff",
        opacity: 0.4,
        width: 2
      },
      move: {
        enable: true,
        speed: 5,
        direction: "bottom",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: false, mode: "bubble" },
        onclick: { enable: true, mode: "repulse" },
        resize: true
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 0.5 } },
        bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true
  });
