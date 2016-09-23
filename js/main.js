/******************************
*********PARAMETERS************
******************************/

//System count & positions
var systemCount = 2500;
var width = 8000;
var height = 8000;
var meanSeparation = 800;
var standardDev = 10;
var minimumDistanceX = 10;
var maximumDistanceX = 8000;
var minimumDistanceY = 10;
var maximumDistanceY = 8000;
var systemRadius = 2.5;

//System parameters
var systemTypes = {
	singular: {
		name: 'Solar',
		stars: 1,
		starTypes : {'blue' : 0.2, 'yellow' : 0.5, 'red' : 0.275, 'neutron': 0.025},
		minPlanets : 1,
		maxPlanets : 10,
		planetTypes: {'asteroid' : 0.05, 'metallic' : 0.05, 'molten' : 0.1,'rocky': 0.2, 'terra': 0.1, 'oceanic' : 0.05,'icy' : 0.1, 'gaseous' : 0.35},
		frequency: 0.625
	},
	binary: {
		name: 'Binary',
		stars: 2,
		starTypes : {'blue' : 0.2, 'yellow' : 0.5, 'red' : 0.275, 'neutron': 0.025},
		minPlanets : 1,
		maxPlanets : 7,
		planetTypes: {'asteroid' : 0.05, 'metallic' : 0.05, 'molten' : 0.1,'rocky': 0.2, 'terra': 0.1, 'oceanic' : 0.05,'icy' : 0.1, 'gaseous' : 0.35},
		frequency: 0.25
	},
	trinary: {
		name: 'Trinary',
		stars: 3,
		starTypes : {'blue' : 0.2, 'yellow' : 0.5, 'red' : 0.275, 'neutron': 0.025},
		minPlanets : 1,
		maxPlanets : 7,
		planetTypes: {'asteroid' : 0.05, 'metallic' : 0.05, 'molten' : 0.1,'rocky': 0.1, 'terra': 0.05, 'oceanic' : 0.05,'icy' : 0.15, 'gaseous' : 0.45},
		frequency: 0.025
	},
	nascent: {
		//Special: Minerals
		name: 'Accreting',
		stars: 1,
		starTypes : {'blue' : 0.4, 'yellow' : 0.5, 'red' : 0.1},
		minPlanets : 1,
		maxPlanets : 6,
		planetTypes: {'asteroid' : 0.2, 'rocky': 0.4, 'gaseous' : 0.4},
		frequency: 0.025
	},
	supernova: {
		//Special: Volatiles
		name: 'Supernova Remnant',
		stars: 1,
		starTypes : {'neutron' : 0.3, 'white' : 0.7},
		minPlanets : 1,
		maxPlanets : 6,
		planetTypes: {'metallic' : 0.2, 'rocky': 0.1, 'icy' : 0.3, 'gaseous' : 0.4},
		frequency: 0.025
	},
	pulsar: {
		//Special: Scanning
		name: 'Pulsar',
		stars: 1,
		starTypes : {'neutron' : 1},
		minPlanets : 1,
		maxPlanets : 6,
		planetTypes: {'metallic' : 0.2, 'rocky': 0.1, 'icy' : 0.3, 'gaseous' : 0.4},
		frequency: 0.025
	},
	blackhole: {
		//Special: Research & Energy
		name: 'Black Hole',
		stars: 1,
		starTypes : {'blackhole' : 1},
		minPlanets : 1,
		maxPlanets : 3,
		planetTypes: {'metallic' : 0.2, 'icy' : 0.2, 'gaseous' : 0.6},
		frequency: 0.025
	}
	
}
var systemFrequency = {};
for(var systemType in systemTypes){
	systemFrequency[systemType] = systemTypes[systemType].frequency;
}

var starTypes = {
	blue : {
		name : 'Blue',
		sizeTypes : {'dwarf': 0.025, 'medium' : 0.75 , 'giant': 0.2, 'hypergiant' : 0.025}
	},
	yellow : {
		name : 'Yellow',
		sizeTypes : {'medium' : 1}
	},
	red : {
		name : 'Red',
		sizeTypes : {'dwarf': 0.2, 'medium' : 0.3, 'giant': 0.4, 'hypergiant' : 0.1}
	},
	nascent : {
		name : 'Nascent',
		sizeTypes : {'dwarf': 0.025, 'medium' : 0.75 , 'giant': 0.2, 'hypergiant' : 0.025}
	},
	neutron : {
		name : 'Neutron',
		sizeTypes : {'massive' : 1}
	},
	white: {
		name : 'White',
		sizeTypes : {'dwarf': 1}
	},
	blackhole: {
		name : 'Black Hole',
		sizeTypes : {'stellar mass': 0.4, 'intermediate mass' : 0.3 , 'supermassive': 0.2, 'gargantuan' : 0.1}
	}
	
}
var planetTypes = {
	asteroid: {
		name : 'Asteroid Belt',
		sizeTypes : {'small' : 0.6, 'medium': 0.4},
		maxMoons : 0,
		minMoons : 0,
		minerals: [1,1.5],
		volatiles: [0.75, 1],
		energy: [0.5, 0.75],
		research: [0.75, 1.25],
		distance: [4, 350]
	},
	metallic: {
		name : 'Metallic',
		sizeTypes : {'tiny': 0.1, 'small' : 0.2, 'medium': 0.4, 'large' : 0.2, 'massive': 0.1},
		maxMoons : 3,
		minMoons : 0,
		minerals: [1.25, 2.5],
		volatiles: [0.5, 0.75],
		energy: [0.5, 0.75],
		research: [0.75, 1.5],
		distance: [0.1, 0.25]
	},
	molten: {
		name : 'Molten',
		sizeTypes : {'tiny': 0.1, 'small' : 0.2, 'medium': 0.4, 'large' : 0.2, 'massive': 0.1},
		maxMoons : 3,
		minMoons : 0,
		minerals: [1,1.5],
		volatiles: [0.5, 0.75],
		energy: [1, 1.5],
		research: [0.5, 1],
		distance: [0.1, 0.5]
	},
	rocky: {
		name : 'Rocky',
		sizeTypes : {'tiny': 0.1, 'small' : 0.2, 'medium': 0.4, 'large' : 0.2, 'massive': 0.1},
		maxMoons : 3,
		minMoons : 0,
		minerals: [1,1.5],
		volatiles: [0.5, 1],
		energy: [0.5, 0.75],
		research: [0.5, 0.75],
		distance: [0.25, 2]
	},
	terra: {
		name : 'Terran',
		sizeTypes : {'small' : 0.2, 'medium': 0.6, 'large' : 0.2},
		maxMoons : 3,
		minMoons : 0,
		minerals: [0.75,1.5],
		volatiles: [0.75, 1.5],
		energy: [0.5, 0.75],
		research: [0.75, 1.75],
		distance: [0.75, 2]
	},
	oceanic : {
		name : 'Oceanic',
		sizeTypes : {'medium': 0.4, 'large' : 0.4, 'massive': 0.2},
		maxMoons : 5,
		minMoons : 0,
		minerals: [0.5,0.75],
		volatiles: [0.75, 1.5],
		energy: [0.75, 1.25],
		research: [0.75, 1.25],
		distance: [0.5, 2]
	},
	icy: {
		name : 'Icy',
		sizeTypes : {'tiny': 0.1, 'small' : 0.2, 'medium': 0.4, 'large' : 0.2, 'massive': 0.1},
		maxMoons : 5,
		minMoons : 0,
		minerals: [0.5,1],
		volatiles: [0.75, 1.5],
		energy: [0.5, 0.75],
		research: [0.75, 1.25],
		distance: [5, 350]
	},
	gaseous: {
		name : 'Gaseous',
		sizeTypes : {'medium': 0.2, 'large' : 0.6, 'massive': 0.2},
		maxMoons : 10,
		minMoons : 0,
		minerals: [0,0.5],
		volatiles: [1, 3],
		energy: [0.75, 1.5],
		research: [0.75, 1.5],
		distance: [0.25, 350]
	}
}

var game = {
	resources: {
		mineral: 0,
		volatiles: 0,
		energy: 0,
		research: 0
	}
}
	

//General
var svg = document.querySelector("#systems");

//svg.width.baseVal.value = width;
//svg.height.baseVal.value = height;

/******************************
***********OBJECTS*************
******************************/

//SYSTEM
var System = function(x, y, f) {
	var systemIntervals = new ProbIntervals(systemFrequency);
	var starIntervals;
	var planetIntervals;
    this.x = x;
    this.y = y;
    this.faction = f;
	
	this.distance = Math.round(Math.sqrt(this.x**2 + this.y**2)*100)/100;
	
	//Generation related
    this.name = generate_name('solar_systems');
	this.type = systemIntervals.pick();
	this.typeObject = Object.assign({},systemTypes[this.type]);
	this.typeName = this.typeObject.name;
	
	this.starCount = this.typeObject.stars;
	this.stars = [];
	
	starIntervals = new ProbIntervals(this.typeObject.starTypes);
	for(var i=0;i<this.starCount;i++){
		this.stars.push(new Star(this.name, starIntervals, i));
	}
	
	this.planetCount = Math.floor(map(Math.random(), 0, 1, this.typeObject.minPlanets, this.typeObject.maxPlanets+1));
	this.planets = [];
	
	planetIntervals = new ProbIntervals(this.typeObject.planetTypes);
	for(var i=0;i<this.planetCount;i++){
		this.planets.push(new Planet(this.name, planetIntervals, i));
	}
	
	this.moonCount = 0;
	for(var i=0;i<this.planets.length;i++){
		this.moonCount += this.planets[i].moonCount;
	}
	
	this.planets.sort(function(a,b){ return a.distance - b.distance; });
}

//STAR
var Star = function(systemName, intervals, index){
	var sizeIntervals;
	this.name = systemName + ' ' + ('ABC'[index]);
	this.type = intervals.pick();
	this.typeObject = Object.assign({}, starTypes[this.type]);
	
	this.sizeIntervals = new ProbIntervals(this.typeObject.sizeTypes);
	this.size = this.sizeIntervals.pick();
}

//PLANET
var Planet = function(systemName, intervals, index){
	var sizeIntervals;
	this.name = systemName + " " + (index+1);
	this.type = intervals.pick();
	this.typeObject = Object.assign({}, planetTypes[this.type]);
	
	this.sizeIntervals = new ProbIntervals(this.typeObject.sizeTypes);
	this.size = this.sizeIntervals.pick();
	
	this.moonCount = Math.floor(map(Math.random(), 0, 1, this.typeObject.minMoons, this.typeObject.maxMoons+1));
	
	this.resources = {
		minerals: Math.floor(map(Math.random(), 0, 1, this.typeObject.minerals[0], this.typeObject.minerals[1])*10000)/10000,
		volatiles: Math.floor(map(Math.random(), 0, 1, this.typeObject.volatiles[0], this.typeObject.volatiles[1])*10000)/10000,
		energy: Math.floor(map(Math.random(), 0, 1, this.typeObject.energy[0], this.typeObject.energy[1])*10000)/10000,
		research: Math.floor(map(Math.random(), 0, 1, this.typeObject.research[0], this.typeObject.research[1])*10000)/10000
	}
	
	this.distance =  Math.floor(map(Math.random(), 0, 1, this.typeObject.distance[0], this.typeObject.distance[1])*10000)/10000
}

//PROB INTERVAL
var ProbIntervals = function(object){
	//Correction factor for floating point errors
	
	var cf = 10**5;
	var obj = {};
	Object.assign(obj, object);
	var keys = Object.keys(obj);
	var l = keys.length;
	var x = 0;
	for(var i=0;i<keys.length;i++){
		x += obj[keys[i]]*cf;
	}
	
	//Check if probabilities add up to 1
	if(x === cf){
		var x = 0;
		for(i=l-1;i>=0;i--){	
			this[keys[i]] = [x, ((x*cf) + (obj[keys[i]]*cf))/cf]
			x += obj[keys[i]];
		}
	}
}
ProbIntervals.prototype.pick = function(){
	random = Math.random(); 
	for(var interval in this){ 
		if(this[interval][0] <= random && random <= this[interval][1]){ 
			return interval;
		}
	}
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
/******************************
**********FUNCTIONS************
******************************/
function generateSystems(count, w, h, minX, maxX, minY, maxY) {
    var systems = [];
    var center = {
        x: w / 2,
        y: h / 2
    };
	
	systems.push(new System(0, 0, 1));
	
    for (var i = 0; i < count; i++) {
        var x = center.x + ~~map(Math.random(), 0, 1, minX, maxX) - maxX / 2;
        var y = center.y + ~~map(Math.random(), 0, 1, minY, maxY) - maxY / 2;
        var system = new System(x-center.x, y-center.y, 0);
        systems.push(system);
    }
    return systems;
}

function drawSystems(systems, r) {
    var g = document.querySelector("g");
	var html = '';
    for (var i = 0; i < systems.length; i++) {
        html += '<circle cx="' + systems[i].x + '" cy="' + systems[i].y + '" r="' + r + '" stroke="white" stroke-width = "0" fill="white"/>';
    }
	g.innerHTML += html;
}

function createSystemList(systems){
	var list = document.querySelector("#systemList");
	var html = '';
	for(var system in systems){
		var s = systems[system];
		html += '<div class="systemWrapper"><div class="systemHeader"><h2>' + s.name + '</h2><h3>&nbsp; - &nbsp;' + s.typeName + ' System</h3><h3>&nbsp; - &nbsp;' + (s.distance/10).toFixed(2) + ' Light Years Away</h3><h4>&nbsp; - &nbsp;'+ s.starCount +' Star(s)</h4><h5>&nbsp; - &nbsp;' + s.planetCount + ' Planet(s)</h5><h6>&nbsp; - &nbsp;' + s.moonCount + ' Moon(s)</h6></div></div><ul class="starList"><b><u>Stars</b></u>';

		for(var i=0;i<s.starCount;i++){
			var st = s.stars[i];
			html += '<li class="star"><h3>' + st.name + '</h3><h4>&nbsp; - &nbsp;';
			
			if(st.type === 'neutron'){
				html += st.size.toProperCase() +  ' ' + st.typeObject.name +' Star' ;
			}
			else if (st.type === 'white'){
				html += st.typeObject.name + ' '+ st.size.toProperCase();
			}
			else if (st.size === 'giant' || st.size === 'hypergiant'){
				html += st.typeObject.name + ' '+ st.size.toProperCase();
			}
			else{
				html += st.size.toProperCase() + ' ' + st.typeObject.name +  ' Star' ;
			}
			
			html +='</h4></li>';
		}
		
		
		html += '</ul><ul class="planetList"><b><u>Planets</b></u>'
		
		for(var i=0;i<s.planetCount;i++){
			var p = s.planets[i];
			
			if(p.type === 'asteroid'){
				html += '<li class="planet"><h3>' + p.name + '</h3><h4>&nbsp; - &nbsp;' + p.size.toProperCase() + ' ' + p.typeObject.name + '</h4><h4>&nbsp; - &nbsp;' + p.distance.toFixed(2) + ' AU</h4><h5>&nbsp; - &nbsp;' + p.moonCount + ' Moons</h5>';
			}
			else{
				html += '<li class="planet"><h3>' + p.name + '</h3><h4>&nbsp; - &nbsp;' + p.size.toProperCase() + ' ' + p.typeObject.name + ' Planet</h4><h4>&nbsp; - &nbsp;' + p.distance.toFixed(2) + ' AU</h4><h5>&nbsp; - &nbsp;' + p.moonCount + ' Moons</h5>';
			}
			
			
			html += '<br><ul><li>' + (p.resources.minerals*100).toFixed(2) +'% Minerals &nbsp;|&nbsp;'  + (p.resources.volatiles*100).toFixed(2) + '% Volatiles &nbsp;|&nbsp;' + (p.resources.energy * 100).toFixed(2) + '% Energy &nbsp;|&nbsp;' + (p.resources.research*100).toFixed(2) + '% Research</li></ul></li>';
		}
		
		html += '</ul><hr></div>'
	}
	list.innerHTML = html;
}

function gaussian(mean, dev) {
    var y2;
    var last = false;

    var y1;
    if (last) {
        y1 = y2;
        last = false;
    } else {
        var x1, x2, w;
        do {
            x1 = 2 * Math.random() - 1;
            x2 = 2 * Math.random() - 1;
            w = x1 * x1 + x2 * x2;
        } while (w >= 1);
        w = Math.sqrt((-2 * Math.log(w)) / w);
        y1 = x1 * w;
        y2 = x2 * w;
        last = true;

        var val = mean + dev * y1;
        if (val > 0)
            return val;
        return -val;
    }
}

function map(x, inmin, inmax, outmin, outmax) {
    return ((x - inmin) / (inmax - inmin)) * (outmax - outmin) + outmin;
}

var time = new Date().getTime();
var systems = generateSystems(systemCount, width, height, minimumDistanceX, maximumDistanceX, minimumDistanceY, maximumDistanceY);
systems.sort(function(a,b){ return a.distance-b.distance})
//drawSystems(newSystems, systemRadius);
createSystemList(systems);
var time2 = new Date().getTime();
console.log(time2 - time);