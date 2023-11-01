/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
alert
//Variables to help keep track of food, how much per farm, and number of custom alerts
var ammount = 10;
var food = 10;
var done = false;
var num = 1;
//Load is executed as soon as the page loads
function load() {
  SpecialAlert(
    "Welcome to Dragon Master!<br /><br />This game is based on tapping, so if ever you don't know what to do, try tapping something! Good Luck!",
    "body",
    "document.getElementById('loadAlert').style.display = 'none'; document.getElementById('menu').style.display = 'inline'",
    "loadAlert"
  );
  //Loop runs as many times as you have owned dragons
  for (x = 0; x != ownedDragons.length; x++) {
    //Gets the dragon with the position in its Array as the times this loop has ran
    dragon = ownedDragons[x];
    //Adds that dragon's egg to the hatchery
    document.getElementById("hatcheryEggs").innerHTML +=
      "<div onclick='hatch(\"" +
      dragon[Name] +
      "\")' id='" +
      dragon[Name] +
      "' class='hatcheryEgg'><img class='hatcheryEggImage' src='" +
      dragon[egg] +
      "'></div>";
  }
}

function SpecialAlert(text, element, funct, id) {
  //Creates a custom alert asking for the text, function when ok is pressed, element to create it in, and the id for the alert box
  document.getElementById(element).innerHTML +=
    '<div class="alert" id="' +
    id +
    '">' +
    text +
    '<br /><br /><button id="ok" onclick="' +
    funct +
    '">OK!</button></div>';
}

function go(leave, to) {
  //Gets leave by id and makes its display none, and sets to to online
  document.getElementById(leave).style.display = "none";
  document.getElementById(to).style.display = "inline";
}
var currentFarms = [];
function farm(number) {
  if (currentFarms.includes(number) === false) {
    currentFarms.push(number);
    //Function asks for number so that the correct progress bar will be used
    var x = 0;
    //Sets the progress bars value to 0 before beginning
    document.getElementById("farmProg" + number).value = 0;
    var a = setInterval(function () {
      x++;
      //x is increased by one every time the interval runs and the progress bar's value is set to it
      document.getElementById("farmProg" + number).value = x;
      if (x == 100) {
        currentFarms.splice(currentFarms.indexOf(number), 1);
        //If x is equal to 100 (full bar), the interval is stopped, the progress bar reset to 0, and the food increased by the ammount
        document.getElementById("farmProg" + number).value = 0;
        clearInterval(a);
        food += ammount;
        document.getElementById("treatNumber").innerHTML = food;
        if (food >= 100 && done === false) {
          //If your food is greater than 100 for the first time, it alerts you to try and feed a dragon with it, and done is set to true to prevent another alert
          done = true;
          SpecialAlert(
            "Try to Feed A Dragon!<br /><br />",
            "body",
            "document.getElementById('feedDragon').style.display = 'none';",
            "feedDragon"
          );
        }
      }
    }, 1 * 60);
  } else {
    SpecialAlert(
      "OOPS!<br /><br />Looks like you are already growing food here!",
      "body",
      "document.getElementById('dragonAL" + num + "').style.display = 'none';",
      "dragonAL" + num + ""
    );
    num++;
  }
}

function dragonariumDragons() {
  //Sets the dragonarium to nothing to prevent multiple sets of the same thing
  document.getElementById("dragonariumDragons").innerHTML = "";
  for (x = 0; x != ownedDragons.length; x++) {
    //Gets the dragon with the Array position of the times this loop has ran
    dragon = ownedDragons[x];
    for (y = 0; y != 4; y++) {
      //Runs the loop 4 times and outputs the image with the same Array position as y
      document.getElementById("dragonariumDragons").innerHTML +=
        "<span class='dragonariumDragon' id='" +
        ownedDragons[x] +
        "'><img class='dragonariumImage' src='" +
        dragon[y] +
        "'></span>";
    }
    //Sets a line break so the images aren't crowded together
    document.getElementById("dragonariumDragons").innerHTML += "<br />";
  }
}
var hatching = false;
function hatch(id) {
  if (hatching === false) {
    hatching = true;
    var times = 0;
    //Gets the egg that was clicked and removes it from view
    document.getElementById(id).style.display = "none";
    var hatch = setInterval(function () {
      times++;
      //Sets the progress bar's position to the same as times, which is incremented with the interval
      document.getElementById("hatcheryProg").value = times;
      if (times >= 100) {
        hatching = false;
        //If times is greater than or equal to 100 (full bar), clear the interval, set the progress bar to 0, alert which dragon you have hatched, and set the baby dragon in the feeding area
        clearInterval(hatch);
        document.getElementById("hatcheryProg").value = 0;
        SpecialAlert(
          "You hatched a new egg!<br /><br />It is a " + id + " dragon!",
          "body",
          "document.getElementById('dragonAL" +
            num +
            "').style.display = 'none';",
          "dragonAL" + num + ""
        );
        num++;

        //-----------------------------------------------------------------------------------------------------

        var dragon = dragons[dragonsString.indexOf(id)];
        document.getElementById("dragonsFeed").innerHTML +=
          "<div><img id='" +
          id +
          "Feed' onclick='feed(" +
          id +
          ")' class='dragonsFeedImages' src='" +
          dragon[baby] +
          "'></div>";
      }
    }, 1 * 100);
  } else {
    SpecialAlert(
      "OOPS!<br /><br />You are already hatching a dragon!",
      "body",
      "document.getElementById('dragonAL" + num + "').style.display = 'none';",
      "dragonAL" + num + ""
    );
    num++;
  }
}

function feed(dragonName) {
  if (food >= 10) {
    //If you have enough food, it will subtract 10 from your food
    food -= 10;
    //Gets the dragon you're feeding
    var dragon = dragons[dragonsString.indexOf(dragonName[Name])];
    //Adds 10 to that dragon's ammount it has been fed
    dragon[fed] += 10;
    //Tests how much the dragon has been fed and sets its level compared to that
    if (dragon[fed] >= 40 && dragon[fed] < 80) {
      dragon[level] = 2;
    } else if (dragon[fed] >= 80 && dragon[fed] < 120) {
      dragon[level] = 3;
    } else if (dragon[fed] >= 120 && dragon[fed] < 160) {
      dragon[level] = 4;
    } else if (dragon[fed] >= 160 && dragon[fed] < 200) {
      //If the dragon's level is to be set to 5, it adds the dragon to the Array of level5+ dragons that can be used for breeding
      dragon[level] = 5;
      if (ownedDragons5.includes(dragon) === false) {
        ownedDragons5.push(dragon);
      }
    } else if (dragon[fed] >= 200 && dragon[fed] < 240) {
      dragon[level] = 6;
    } else if (dragon[fed] >= 240 && dragon[fed] < 280) {
      dragon[level] = 7;
    } else if (dragon[fed] >= 280 && dragon[fed] < 320) {
      dragon[level] = 8;
    } else if (dragon[fed] >= 320 && dragon[fed] < 360) {
      dragon[level] = 9;
    } else if (dragon[fed] >= 360 && dragon[fed] < 400) {
      dragon[level] = 10;
    }
    //Sets the dragons to their images: adult, juvenile, and baby based on their level
    if (dragon[level] >= 1 && dragon[level] < 3) {
      //Sets dragon to baby
      document.getElementById(dragon[Name] + "Feed").src = dragon[baby];
      document.getElementById(dragon[Name] + "Feed").style.borderColor =
        "black";
    } else if (dragon[level] >= 3 && dragon[level] < 6) {
      //Sets dragon to juvenile
      document.getElementById(dragon[Name] + "Feed").src = dragon[juvenile];
      document.getElementById(dragon[Name] + "Feed").style.borderColor =
        "silver";
    } else if (dragon[level] >= 6 && dragon[level] < 10) {
      //Sets dragon to adult
      document.getElementById(dragon[Name] + "Feed").src = dragon[adult];
      document.getElementById(dragon[Name] + "Feed").style.borderColor = "gold";
    } else {
      SpecialAlert(
        "OOPS!<br /><br />You have already gotten this dragon to the maximum level of 10!",
        "body",
        "document.getElementById('dragonAL" +
          num +
          "').style.display = 'none';",
        "dragonAL" + num + ""
      );
      num++;
      food += 10;
      document.getElementById(dragon[Name] + "Feed").style.borderColor = "gold";
    }
  } else {
    SpecialAlert(
      "OOPS!<br /><br />You don't seem to have enough food to feed this dragon!",
      "body",
      "document.getElementById('dragonAL" + num + "').style.display = 'none';",
      "dragonAL" + num + ""
    );
    num++;
  }
  document.getElementById("treatNumber").innerHTML = food;
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

function breedingCave() {
  document.getElementById("dragonsBreed").innerHTML = "";
  for (x = 0; x != ownedDragons5.length; x++) {
    var dragon = ownedDragons5[x];
    if (dragon[level] >= 3 && dragon[level] < 6) {
      //If the dragon is less than 6, it sets it to juvenile
      document.getElementById("dragonsBreed").innerHTML +=
        "<img onclick='breedDragons(" +
        dragon[Name] +
        ")' class='dragonsBreedImages' src='" +
        dragon[juvenile] +
        "'>";
    } else if (dragon[level] >= 6 && dragon[level] < 11) {
      //If the deagon is less than 11 it sets it to adult
      document.getElementById("dragonsBreed").innerHTML +=
        "<img onclick='breedDragons(" +
        dragon[Name] +
        ")' class='dragonsBreedImages' src='" +
        dragon[adult] +
        "'>";
    }
    document.getElementById("dragonsBreed").innerHTML += "<br />";
  }
}
//Variables to define first and second picked dragons and put them where they belong
var tries = 0;
var dragon1 = "";
var dragon2 = "";

function breedDragons(dragon) {
  document.getElementById("result").innerHTML = "";
  if (tries == 0) {
    //If tries is 0, dragon1 becomes the dragons element for deciding which egg
    //dragon1 = dragonElement[element];
    dragon1 =
      dragon[element][Math.floor(Math.random() * dragon[element].length)];
    document.getElementById("dragon1").innerHTML =
      "<img class='p100' src='" + dragon[adult] + "'>";
    tries++;
  } else {
    //If tries is 1, dragon2 becomes the dragons element for deciding which egg
    //dragon2 = dragonElement[element];
    dragon2 =
      dragon[element][Math.floor(Math.random() * dragon[element].length)];
    document.getElementById("dragon2").innerHTML =
      "<img class='p100' src='" + dragon[adult] + "'>";
    tries = 0;
  }
}

function breed() {
  if (dragon1 != dragon2) {
    if (Math.floor(Math.random() * 100) == 50) {
      finalDragon =
        galaxyDragons[Math.floor(Math.random() * galaxyDragons.length)];
    } else {
      //Creates a combo by putting together the two elements with no space
      var combo = dragon1 + dragon2;
      //Gets all possible dragons to breed by finding the Array that matches the elements
      var possibleDragons = breedingList[breedingListString.indexOf(combo)];
      //Gets the final dragon by picking a random dragon from the Array of choices
      finalDragon =
        possibleDragons[Math.floor(Math.random() * possibleDragons.length)];
    }
    //Sets the two slots for the breeding dragons to nothing
    document.getElementById("dragon1").innerHTML = "";
    document.getElementById("dragon2").innerHTML = "";
    //Creates an image with the egg as a result to the breeding
    document.getElementById("result").innerHTML =
      "<img class='p10' src='" + finalDragon[egg] + "'>";
    if (ownedDragons.includes(finalDragon) === false) {
      //Adds the dragon to ownedDragons so that you can't have multiple eggs
      ownedDragons.push(finalDragon);
      ownedDragonsString.push(finalDragon[Name]);
      //Adds the egg to the hatchery
      document.getElementById("hatcheryEggs").innerHTML +=
        "<div onclick='hatch(\"" +
        finalDragon[Name] +
        "\")' id='" +
        finalDragon[Name] +
        "' class='hatcheryEgg'><img class='hatcheryEggImage' src='" +
        finalDragon[egg] +
        "'></div>";
    } else {
      //Tells you if you already own the dragon
      SpecialAlert(
        "OOPS!<br /><br />You already have this dragon!",
        "body",
        "document.getElementById('dragonAL" +
          num +
          "').style.display = 'none';",
        "dragonAL" + num + ""
      );
      num++;
    }
  } else {
    document.getElementById("dragon1").innerHTML = "";
    document.getElementById("dragon2").innerHTML = "";
    SpecialAlert(
      "OOPS!<br /><br />You cant't breed dragons of the same species!",
      "body",
      "document.getElementById('dragonAL" + num + "').style.display = 'none';",
      "dragonAL" + num + ""
    );
    num++;
  }
}
var plant = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/7/7b/PlantDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603093243",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/bf/PlantDragonBaby.png/revision/latest/scale-to-width-down/145?cb=20160630002048",
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/10/PlantDragonJuvenile.png/revision/latest/scale-to-width-down/239?cb=20160630002115",
  "https://vignette.wikia.nocookie.net/dragonvale/images/7/75/PlantDragonAdult.png/revision/latest/scale-to-width-down/244?cb=20160909060436",
  1,
  "plant",
  0,
  ["plant"],
];
var fire = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/f5/FireDragonEgg.png/revision/latest/scale-to-width-down/131?cb=20140603133324",
  "https://vignette.wikia.nocookie.net/dragonvale/images/5/54/FireDragonBaby.png/revision/latest?cb=20150701114902",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/b5/FireDragonJuvenile.png/revision/latest?cb=20150609041631",
  "https://vignette.wikia.nocookie.net/dragonvale/images/7/72/FireDragonAdult.png/revision/latest?cb=20150609041443",
  1,
  "fire",
  0,
  ["fire"],
];
var earth = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/e2/EarthDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603120203",
  "https://vignette.wikia.nocookie.net/dragonvale/images/5/5c/EarthDragonBaby.png/revision/latest?cb=20160630004151",
  "https://vignette.wikia.nocookie.net/dragonvale/images/9/9a/EarthDragonJuvenile.png/revision/latest?cb=20160630004311",
  "https://vignette.wikia.nocookie.net/dragonvale/images/2/2c/EarthDragonAdult.png/revision/latest/scale-to-width-down/285?cb=20160630004236",
  1,
  "earth",
  0,
  ["earth"],
];
var cold = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/0/03/ColdDragonEgg.png/revision/latest/scale-to-width-down/131?cb=20140603135247",
  "https://vignette.wikia.nocookie.net/dragonvale/images/5/52/ColdDragonBaby.png/revision/latest?cb=20160630063457",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/e5/ColdDragonJuvenile.png/revision/latest?cb=20160630063606",
  "https://vignette.wikia.nocookie.net/dragonvale/images/2/2a/ColdDragonAdult.png/revision/latest/scale-to-width-down/245?cb=20160630063525",
  1,
  "cold",
  0,
  ["cold"],
];
var lightning = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/0/0e/LightningDragonEgg.png/revision/latest/scale-to-width-down/131?cb=20140603134841",
  "https://vignette.wikia.nocookie.net/dragonvale/images/3/3f/LightningDragonBaby.png/revision/latest/scale-to-width-down/152?cb=20160717122820",
  "https://vignette.wikia.nocookie.net/dragonvale/images/0/09/LightningDragonJuvenile.png/revision/latest/scale-to-width-down/233?cb=20160717122804",
  "https://vignette.wikia.nocookie.net/dragonvale/images/a/a6/LightningDragonAdult.png/revision/latest/scale-to-width-down/225?cb=20160630004443",
  1,
  "lightning",
  0,
  ["lightning"],
];
var water = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/3/32/WaterDragonEgg.png/revision/latest/scale-to-width-down/131?cb=20140603132047",
  "https://vignette.wikia.nocookie.net/dragonvale/images/4/47/WaterDragonBaby.png/revision/latest/scale-to-width-down/154?cb=20160630004658",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/e1/WaterDragonJuvenile.png/revision/latest/scale-to-width-down/159?cb=20160630004753",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/ef/WaterDragonAdult.png/revision/latest/scale-to-width-down/193?cb=20160630004637",
  1,
  "water",
  0,
  ["water"],
];
var bluefire = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/a/a5/BlueFireDragonEgg.png/revision/latest/scale-to-width-down/139?cb=20140603133428",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/e8/BlueFireDragonBaby.png/revision/latest?cb=20150701114903",
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/80/BlueFireDragonJuvenile.png/revision/latest?cb=20150609041745",
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/fa/BlueFireDragonAdult.png/revision/latest?cb=20150609041914",
  1,
  "bluefire",
  0,
  ["fire", "cold"],
];
var frostfire = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/ff/FrostfireDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603135352",
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/f2/FrostfireDragonBaby.png/revision/latest?cb=20160704195946",
  "https://vignette.wikia.nocookie.net/dragonvale/images/2/2d/FrostfireDragonJuvenile.png/revision/latest?cb=20160803155551",
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/86/FrostfireDragonAdult.png/revision/latest/scale-to-width-down/233?cb=20160704200123",
  1,
  "frostfire",
  0,
  ["fire", "cold"],
];
var flower = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/bd/FlowerDragonRiftEgg.png/revision/latest/scale-to-width-down/136?cb=20170913222416",
  "https://vignette.wikia.nocookie.net/dragonvale/images/3/33/FlowerDragonBaby.png/revision/latest?cb=20120905172327",
  "https://vignette.wikia.nocookie.net/dragonvale/images/a/a0/FlowerDragonJuvenile.png/revision/latest?cb=20120725112409",
  "https://vignette.wikia.nocookie.net/dragonvale/images/c/c9/FlowerDragonAdult.png/revision/latest/scale-to-width-down/165?cb=20120213052937",
  1,
  "flower",
  0,
  ["fire", "plant"],
];
var poison = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/2/29/PoisonDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603095224",
  "https://vignette.wikia.nocookie.net/dragonvale/images/2/22/PoisonDragonBaby.png/revision/latest?cb=20140624131154",
  "https://vignette.wikia.nocookie.net/dragonvale/images/d/da/PoisonDragonJuvenile.png/revision/latest?cb=20120822124325",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/b7/PoisonDragonAdult.png/revision/latest/scale-to-width-down/187?cb=20160817151118",
  1,
  "poison",
  0,
  ["fire", "plant"],
];
var lichen = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/d/d9/LichenDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603114703",
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/1c/LichenDragonBaby.png/revision/latest?cb=20140710125607",
  "https://vignette.wikia.nocookie.net/dragonvale/images/5/50/LichenDragonJuvenile.png/revision/latest?cb=20120724190747",
  "https://vignette.wikia.nocookie.net/dragonvale/images/6/65/LichenDragonAdult.png/revision/latest?cb=20120724190827",
  1,
  "lichen",
  0,
  ["plant", "cold"],
];
var evergreen = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/c/c2/EvergreenDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603133806",
  "https://vignette.wikia.nocookie.net/dragonvale/images/a/ad/EvergreenDragonBaby.png/revision/latest?cb=20120628085548",
  "https://vignette.wikia.nocookie.net/dragonvale/images/7/7b/EvergreenDragonJuvenile.png/revision/latest?cb=20120912054403",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/e2/EvergreenDragonAdult.png/revision/latest/scale-to-width-down/199?cb=20120627195029",
  1,
  "evergreen",
  0,
  ["plant", "cold"],
];
var lava = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/1c/LavaDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603120321",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/ed/LavaDragonBaby.png/revision/latest?cb=20160624220348",
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/8b/LavaDragonJuvenile.png/revision/latest?cb=20120904183632",
  "https://vignette.wikia.nocookie.net/dragonvale/images/4/48/LavaDragonAdult.png/revision/latest/scale-to-width-down/232?cb=20120213060708",
  1,
  "lava",
  0,
  ["fire", "earth"],
];
var obsidian = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/6/61/ObsidianDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603143746",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/e8/ObsidianDragonBaby.png/revision/latest?cb=20121025174929",
  "https://vignette.wikia.nocookie.net/dragonvale/images/2/2a/ObsidianDragonJuvenile.png/revision/latest/scale-to-width-down/217?cb=20171002204907",
  "https://vignette.wikia.nocookie.net/dragonvale/images/d/d4/ObsidianDragonAdult.png/revision/latest/scale-to-width-down/282?cb=20171002204850",
  1,
  "obsidian",
  0,
  ["fire", "earth"],
];
var moss = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/4/4b/MossDragonEgg.png/revision/latest/scale-to-width-down/141?cb=20140603094340",
  "https://vignette.wikia.nocookie.net/dragonvale/images/5/5c/MossDragonBaby.png/revision/latest?cb=20120905164234",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/b8/MossDragonJuvenile.png/revision/latest?cb=20130812172510",
  "https://vignette.wikia.nocookie.net/dragonvale/images/5/52/MossDragonAdult.png/revision/latest/scale-to-width-down/274?cb=20120718000315",
  1,
  "moss",
  0,
  ["plant", "earth"],
];
var tree = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/e5/TreeDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603120051",
  "https://vignette.wikia.nocookie.net/dragonvale/images/c/c7/TreeDragonBaby.png/revision/latest?cb=20120905172329",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/b4/TreeDragonJuvenile.png/revision/latest/scale-to-width-down/128?cb=20170225130032",
  "https://vignette.wikia.nocookie.net/dragonvale/images/5/5d/TreeDragonAdult.png/revision/latest/scale-to-width-down/149?cb=20170225130031",
  1,
  "tree",
  0,
  ["plant", "earth"],
];
var mountain = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/0/0b/MountainDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603120430",
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/f7/MountainDragonBaby.png/revision/latest?cb=20160705125524",
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/17/MountainDragonJuvenile.png/revision/latest?cb=20160705125533",
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/10/MountainDragonAdult.png/revision/latest/scale-to-width-down/332?cb=20160705125543",
  1,
  "mountain",
  0,
  ["earth", "cold"],
];
var glacier = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/2/28/GlacierDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603135656",
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/8a/GlacierDragonBaby.png/revision/latest?cb=20121207011240",
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/ff/GlacierDragonJuvenile.png/revision/latest?cb=20121207002210",
  "https://vignette.wikia.nocookie.net/dragonvale/images/0/0e/GlacierDragonAdult.png/revision/latest/scale-to-width-down/234?cb=20140925154523",
  1,
  "glacier",
  0,
  ["earth", "cold"],
];
var andromedan = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/a/ae/AndromedanDragonEgg.png/revision/latest/scale-to-width-down/139?cb=20150702132255",
  "https://vignette.wikia.nocookie.net/dragonvale/images/7/7f/AndromedanDragonBaby.png/revision/latest/scale-to-width-down/151?cb=20160903155227",
  "https://vignette.wikia.nocookie.net/dragonvale/images/d/d3/AndromedanDragonJuvenile.png/revision/latest/scale-to-width-down/288?cb=20150702132256",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/e8/AndromedanDragonAdult.png/revision/latest/scale-to-width-down/309?cb=20150702132256",
  1,
  "andromedan",
  0,
  ["earth", "water", "fire", "cold", "lightning", "water"],
];
var nova = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/ff/NovaDragonEgg.png/revision/latest/scale-to-width-down/137?cb=20170504185155",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/ee/NovaDragonBaby.png/revision/latest/scale-to-width-down/158?cb=20170504185005",
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/ff/NovaDragonJuvenile.png/revision/latest/scale-to-width-down/113?cb=20170504184907",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/e7/NovaDragonAdult.png/revision/latest/scale-to-width-down/163?cb=20170504184813",
  1,
  "nova",
  0,
  ["earth", "water", "fire", "cold", "lightning", "water"],
];
var cactus = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/3/3a/CactusDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603130025",
  "https://vignette.wikia.nocookie.net/dragonvale/images/7/77/CactusDragonBaby.png/revision/latest?cb=20120903210412",
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/fe/CactusDragonJuvenile.png/revision/latest?cb=20120724195336",
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/f7/CactusDragonAdult.png/revision/latest?cb=20120724195405",
  1,
  "cactus",
  0,
  ["plant", "lightning"],
];
var ash = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/a/a2/AshDragonEgg.png/revision/latest/scale-to-width-down/133?cb=20140603115003",
  "https://vignette.wikia.nocookie.net/dragonvale/images/4/42/AshDragonBaby.png/revision/latest/scale-to-width-down/149?cb=20160624164443",
  "https://vignette.wikia.nocookie.net/dragonvale/images/4/4e/AshDragonJuvenile.png/revision/latest?cb=20121005052700",
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/13/AshDragonAdult.png/revision/latest?cb=20121005052738",
  1,
  "ash",
  0,
  ["plant", "lightning"],
];
var firefly = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/2/2a/FireflyDragonEgg.png/revision/latest/scale-to-width-down/128?cb=20140603141453",
  "https://vignette.wikia.nocookie.net/dragonvale/images/0/07/FireflyDragonBabyFireflyFestival.png/revision/latest?cb=20160624171448",
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/89/FireflyDragonJuvenileFireflyFestival.png/revision/latest?cb=20140711223436",
  "https://vignette.wikia.nocookie.net/dragonvale/images/0/09/FireflyDragonAdultFireflyFestival.png/revision/latest/scale-to-width-down/184?cb=20140711223445",
  1,
  "firefly",
  0,
  ["fire", "lightning"],
];
var scorch = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/4/46/ScorchDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603133914",
  "https://vignette.wikia.nocookie.net/dragonvale/images/d/da/ScorchDragonBaby.png/revision/latest?cb=20160629004225",
  "https://vignette.wikia.nocookie.net/dragonvale/images/5/51/ScorchDragonJuvenile.png/revision/latest?cb=20171002205003",
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/fe/ScorchDragonAdult.png/revision/latest/scale-to-width-down/225?cb=20171002204947",
  1,
  "scorch",
  0,
  ["fire", "lightning"],
];
var quake = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/c/c4/QuakeDragonEgg.png/revision/latest/scale-to-width-down/141?cb=20140603125510",
  "https://vignette.wikia.nocookie.net/dragonvale/images/5/55/QuakeDragonBaby.png/revision/latest/scale-to-width-down/160?cb=20160704200243",
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/89/QuakeDragonJuvenile.png/revision/latest/scale-to-width-down/168?cb=20160704200253",
  "https://vignette.wikia.nocookie.net/dragonvale/images/9/9e/QuakeDragonAdult.png/revision/latest/scale-to-width-down/159?cb=20160704200302",
  1,
  "quake",
  0,
  ["earth", "lightning"],
];
var crystal = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/6/64/CrystalDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603120556",
  "https://vignette.wikia.nocookie.net/dragonvale/images/4/4d/CrystalDragonBaby.png/revision/latest?cb=20160730103526",
  "https://vignette.wikia.nocookie.net/dragonvale/images/9/97/CrystalDragonJuvenile.png/revision/latest?cb=20160730103525",
  "https://vignette.wikia.nocookie.net/dragonvale/images/3/36/CrystalDragonAdult.png/revision/latest/scale-to-width-down/236?cb=20160730103524",
  1,
  "crystal",
  0,
  ["earth", "lightning"],
];
var storm = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/7/78/StormDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603153402",
  "https://vignette.wikia.nocookie.net/dragonvale/images/0/0e/StormDragonBaby.png/revision/latest?cb=20160705125651",
  "https://vignette.wikia.nocookie.net/dragonvale/images/4/4d/StormDragonJuvenile.png/revision/latest/scale-to-width-down/222?cb=20160705125700",
  "https://vignette.wikia.nocookie.net/dragonvale/images/6/6c/StormDragonAdult.png/revision/latest/scale-to-width-down/253?cb=20160705125713",
  1,
  "hail",
  0,
  ["lightning", "cold"],
];
var hail = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/83/HailDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603135752",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/b4/HailDragonBaby.png/revision/latest?cb=20160629004637",
  "https://vignette.wikia.nocookie.net/dragonvale/images/0/05/HailDragonJuvenile.png/revision/latest?cb=20130204020355",
  "https://vignette.wikia.nocookie.net/dragonvale/images/c/c2/HailDragonAdult.png/revision/latest/scale-to-width-down/228?cb=20130204020403",
  1,
  "hail",
  0,
  ["lightning", "cold"],
];
var seaweed = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/89/SeaweedDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603115141",
  "https://vignette.wikia.nocookie.net/dragonvale/images/9/95/SeaweedDragonBaby.png/revision/latest?cb=20121006214313",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/b1/SeaweedDragonJuvenile.png/revision/latest?cb=20121006214314",
  "https://vignette.wikia.nocookie.net/dragonvale/images/a/a5/SeaweedDragonAdult.png/revision/latest/scale-to-width-down/159?cb=20121006214314",
  1,
  "seaweed",
  0,
  ["water", "plant"],
];
var swamp = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/16/SwampDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603142047",
  "https://vignette.wikia.nocookie.net/dragonvale/images/6/60/SwampDragonBaby.png/revision/latest?cb=20140626115849",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/ba/SwampDragonJuvenile.png/revision/latest/scale-to-width-down/190?cb=20130512185007",
  "https://vignette.wikia.nocookie.net/dragonvale/images/a/ae/SwampDragonAdult.png/revision/latest/scale-to-width-down/319?cb=20130512185033",
  1,
  "swamp",
  0,
  ["water", "plant"],
];
var coral = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/81/CoralDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603130716",
  "https://vignette.wikia.nocookie.net/dragonvale/images/c/c6/CoralDragonBaby.png/revision/latest?cb=20160624171859",
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/17/CoralDragonJuvenile.png/revision/latest/scale-to-width-down/170?cb=20130426153743",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/b2/CoralDragonAdult.png/revision/latest/scale-to-width-down/190?cb=20130426153752",
  1,
  "coral",
  0,
  ["water", "fire"],
];
var salamander = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/6/6a/SalamanderDragonEgg.png/revision/latest/scale-to-width-down/141?cb=20140603152308",
  "https://vignette.wikia.nocookie.net/dragonvale/images/0/05/SalamanderDragonBaby.png/revision/latest/scale-to-width-down/200?cb=20130426151656",
  "https://vignette.wikia.nocookie.net/dragonvale/images/c/c4/SalamanderDragonJuvenile.png/revision/latest/scale-to-width-down/200?cb=20130426151720",
  "https://vignette.wikia.nocookie.net/dragonvale/images/d/da/SalamanderDragonAdult.png/revision/latest/scale-to-width-down/250?cb=20130426152413",
  1,
  "salamander",
  0,
  ["water", "fire"],
];
var mud = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/b3/MudDragonEgg.png/revision/latest/scale-to-width-down/140?cb=20140603124758",
  "https://vignette.wikia.nocookie.net/dragonvale/images/9/93/MudDragonBaby.png/revision/latest?cb=20120906025232",
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/89/MudDragonJuvenile.png/revision/latest?cb=20120904184000",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/b3/MudDragonAdult.png/revision/latest?cb=20120905155443",
  1,
  "mud",
  0,
  ["water", "earth"],
];
var river = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/c/c4/RiverDragonEgg.png/revision/latest/scale-to-width-down/139?cb=20140603120707",
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/bc/RiverDragonBaby.png/revision/latest/scale-to-width-down/240?cb=20130222204908",
  "https://vignette.wikia.nocookie.net/dragonvale/images/3/33/RiverDragonJuvenile.png/revision/latest/scale-to-width-down/305?cb=20130222205042",
  "https://vignette.wikia.nocookie.net/dragonvale/images/2/2c/RiverDragonAdult.png/revision/latest/scale-to-width-down/267?cb=20130222204624",
  1,
  "river",
  0,
  ["water", "earth"],
];
var ice = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/b/bb/IceDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603135540",
  "https://vignette.wikia.nocookie.net/dragonvale/images/5/5d/IceDragonBaby.png/revision/latest?cb=20160629010156",
  "https://vignette.wikia.nocookie.net/dragonvale/images/6/68/IceDragonJuvenile.png/revision/latest?cb=20160827172539",
  "https://vignette.wikia.nocookie.net/dragonvale/images/6/6f/IceDragonAdult.png/revision/latest?cb=20160827172518",
  1,
  "ice",
  0,
  ["water", "cold"],
];
var iceberg = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/1a/IcebergDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603135454",
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/1b/IcebergDragonBaby.png/revision/latest?cb=20160624221620",
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/1e/IcebergDragonJuvenile.png/revision/latest?cb=20160827172849",
  "https://vignette.wikia.nocookie.net/dragonvale/images/f/f9/IcebergDragonAdult.png/revision/latest/scale-to-width-down/180?cb=20160827172832",
  1,
  "iceberg",
  0,
  ["water", "cold"],
];
var plasma = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/9/9d/PlasmaDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603145833",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/ed/PlasmaDragonBaby.png/revision/latest/scale-to-width-down/160?cb=20160705125552",
  "https://vignette.wikia.nocookie.net/dragonvale/images/1/16/PlasmaDragonJuvenile.png/revision/latest/scale-to-width-down/237?cb=20160705125600",
  "https://vignette.wikia.nocookie.net/dragonvale/images/7/7b/PlasmaDragonAdult.png/revision/latest/scale-to-width-down/237?cb=20160705125609",
  1,
  "plasma",
  0,
  ["water", "lightning"],
];
var current = [
  "https://vignette.wikia.nocookie.net/dragonvale/images/a/ae/CurrentDragonEgg.png/revision/latest/scale-to-width-down/132?cb=20140603130928",
  "https://vignette.wikia.nocookie.net/dragonvale/images/e/e5/CurrentDragonBaby.png/revision/latest/scale-to-width-down/152?cb=20160705125339",
  "https://vignette.wikia.nocookie.net/dragonvale/images/d/df/CurrentDragonJuvenile.png/revision/latest?cb=20160705125351",
  "https://vignette.wikia.nocookie.net/dragonvale/images/8/8d/CurrentDragonAdult.png/revision/latest/scale-to-width-down/188?cb=20160705125400",
  1,
  "current",
  0,
  ["water", "lightning"],
];
//Variables for hybrid dragons
var firecold = [bluefire, frostfire];
var fireplant = [flower, poison];
var fireearth = [lava, obsidian];
var coldplant = [lichen, evergreen];
var coldearth = [mountain, glacier];
var plantearth = [moss, tree];
var lightningplant = [cactus, ash];
var lightningfire = [firefly, scorch];
var lightningearth = [quake, crystal];
var lightningcold = [storm, hail];
var waterplant = [seaweed, swamp];
var waterfire = [coral, salamander];
var waterearth = [mud, river];
var watercold = [ice, iceberg];
var waterlightning = [plasma, current];
//All dragons possible to obtain
var dragons = [
  plant,
  fire,
  earth,
  cold,
  lightning,
  water,
  bluefire,
  frostfire,
  flower,
  poison,
  lichen,
  evergreen,
  lava,
  obsidian,
  moss,
  tree,
  mountain,
  glacier,
  andromedan,
  nova,
  cactus,
  ash,
  firefly,
  scorch,
  quake,
  crystal,
  storm,
  hail,
  seaweed,
  swamp,
  coral,
  salamander,
  mud,
  river,
  ice,
  iceberg,
  plasma,
  current,
];
//All owned dragons
var ownedDragons = [plant, fire, earth, cold, lightning, water];
//Owned dragons over level 5
var ownedDragons5 = [];
//All dragons possible to obtain in string form
var dragonsString = [
  "plant",
  "fire",
  "earth",
  "cold",
  "lightning",
  "water",
  "bluefire",
  "frostfire",
  "flower",
  "poison",
  "lichen",
  "evergreen",
  "lava",
  "obsidian",
  "moss",
  "tree",
  "mountain",
  "glacier",
  "andromedan",
  "nova",
  "cactus",
  "ash",
  "firefly",
  "scorch",
  "quake",
  "crystal",
  "storm",
  "hail",
  "seaweed",
  "swamp",
  "coral",
  "salamander",
  "mud",
  "river",
  "ice",
  "iceberg",
  "plasma",
  "current",
];
//All owned dragons in string form
var ownedDragonsString = [
  "plant",
  "fire",
  "earth",
  "cold",
  "lightning",
  "water",
];
//List of hybrid dragon variables to be referenced with the breedingListString
var breedingList = [
  firecold,
  firecold,
  fireplant,
  fireplant,
  coldplant,
  coldplant,
  fireearth,
  fireearth,
  plantearth,
  plantearth,
  coldearth,
  coldearth,
  lightningplant,
  lightningplant,
  lightningfire,
  lightningfire,
  lightningearth,
  lightningearth,
  lightningcold,
  lightningcold,
  waterplant,
  waterplant,
  waterfire,
  waterfire,
  waterearth,
  waterearth,
  watercold,
  watercold,
  waterlightning,
  waterlightning,
];
//All possible combinations for elements to add up to
var breedingListString = [
  "firecold",
  "coldfire",
  "plantfire",
  "fireplant",
  "coldplant",
  "plantcold",
  "fireearth",
  "earthfire",
  "plantearth",
  "earthplant",
  "coldearth",
  "earthcold",
  "lightningplant",
  "plantlightning",
  "firelightning",
  "lightningfire",
  "lightningearth",
  "earthlightning",
  "lightningcold",
  "coldlightning",
  "waterplant",
  "plantwater",
  "waterfire",
  "firewater",
  "waterearth",
  "earthwater",
  "watercold",
  "coldwater",
  "waterlightning",
  "lightningwater",
];
var galaxyDragons = [andromedan, nova];
//Variables to get dragon stats
var egg = 0;
var baby = 1;
var juvenile = 2;
var adult = 3;
var level = 4;
var Name = 5;
var fed = 6;
var element = 7;

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
