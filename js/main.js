/******************************
*********PARAMETERS************
******************************/

//System count & positions
var systemCount = 250;
var width = 800;
var height = 800;
var meanSeparation = 800;
var standardDev = 10;
var minimumDistanceX = 10;
var maximumDistanceX = 800;
var minimumDistanceY = 10;
var maximumDistanceY = 800;
var systemRadius = 2.5;

//System parameters
var systemTypes = {
	singular: {
		name: 'Solar',
		stars: 1,
		starAges: ['young', 'normal','old'],
		starTypes : {'blue' : 0.2, 'yellow' : 0.5, 'red' : 0.3},
		minPlanets : 1,
		maxPlanets : 10,
		planetTypes: {'asteroid' : 0.05, 'metallic' : 0.05, 'molten' : 0.1,'rocky': 0.2, 'terra': 0.1, 'oceanic' : 0.05,'icy' : 0.1, 'gaseous' : 0.35},
		frequency: 0.625
	},
	binary: {
		name: 'Binary',
		stars: 2,
		starAges: ['young', 'normal','old'],
		starTypes : {'blue' : 0.2, 'yellow' : 0.5, 'red' : 0.3},
		minPlanets : 1,
		maxPlanets : 7,
		planetTypes: {'asteroid' : 0.05, 'metallic' : 0.05, 'molten' : 0.1,'rocky': 0.2, 'terra': 0.1, 'oceanic' : 0.05,'icy' : 0.1, 'gaseous' : 0.35},
		frequency: 0.25
	},
	trinary: {
		name: 'Trinary',
		stars: 3,
		starAges: ['young', 'normal','old'],
		starTypes : {'blue' : 0.2, 'yellow' : 0.5, 'red' : 0.3},
		minPlanets : 1,
		maxPlanets : 7,
		planetTypes: {'asteroid' : 0.05, 'metallic' : 0.05, 'molten' : 0.1,'rocky': 0.1, 'terra': 0.05, 'oceanic' : 0.05,'icy' : 0.15, 'gaseous' : 0.45},
		frequency: 0.025
	},
	accreting: {
		//Special: Minerals
		name: 'Accreting',
		stars: 1,
		starAges: ['new'],
		starTypes : {'blue' : 0.5, 'yellow' : 0.5, 'red' : 0.1},
		minPlanets : 1,
		maxPlanets : 6,
		planetTypes: {'asteroid' : 0.2, 'rocky': 0.4, 'gaseous' : 0.4},
		frequency: 0.025
	},
	supernova: {
		//Special: Volatiles
		name: 'Supernova Remnant',
		stars: 1,
		starAges: [],
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
		starAges: [],
		starTypes : {'neutron' : 1},
		minPlanets : 1,
		maxPlanets : 6,
		planetTypes: {'metallic' : 0.2, 'rocky': 0.1, 'icy' : 0.3, 'gaseous' : 0.4},
		frequency: 0.025
	},
	blackhole: {
		//Special: Research & Energy
		name: 'Black Hole',
		stars: 0,
		starAges: [],
		starTypes : {},
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
var planetTypes = {
	asteroid: {
		name : 'Asteroids',
		sizeTypes : {'small' : 0.6, 'medium': 0.4},
		maxMoons : 0,
		minMoons : 0
	},
	metallic: {
		name : 'Metallic',
		sizeTypes : {'tiny': 0.1, 'small' : 0.2, 'medium': 0.4, 'large' : 0.2, 'massive': 0.1},
		maxMoons : 3,
		minMoons : 0
	},
	molten: {
		name : 'Molten',
		sizeTypes : {'tiny': 0.1, 'small' : 0.2, 'medium': 0.4, 'large' : 0.2, 'massive': 0.1},
		maxMoons : 3,
		minMoons : 0
	},
	rocky: {
		name : 'Rocky',
		sizeTypes : {'tiny': 0.1, 'small' : 0.2, 'medium': 0.4, 'large' : 0.2, 'massive': 0.1},
		maxMoons : 3,
		minMoons : 0
	},
	terra: {
		name : 'Terran',
		sizeTypes : {'small' : 0.2, 'medium': 0.6, 'large' : 0.2},
		maxMoons : 3,
		minMoons : 0
	},
	oceanic : {
		name : 'Oceanic',
		sizeTypes : {'medium': 0.4, 'large' : 0.4, 'massive': 0.2},
		maxMoons : 5,
		minMoons : 0
	},
	icy: {
		name : 'Icy',
		sizeTypes : {'tiny': 0.1, 'small' : 0.2, 'medium': 0.4, 'large' : 0.2, 'massive': 0.1},
		maxMoons : 5,
		minMoons : 0
	},
	gaseous: {
		name : 'Gaseous',
		sizeTypes : {'medium': 0.2, 'large' : 0.6, 'massive': 0.2},
		maxMoons : 10,
		minMoons : 0
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

/******************************
***********OBJECTS*************
******************************/

var System = function(x, y, f) {
	var systemIntervals = new ProbIntervals(systemFrequency);
	var planetIntervals;
    this.x = x;
    this.y = y;
    this.faction = f;
    this.name = generate_name('solar_systems');
	this.type = systemIntervals.pick();
	this.typeObject = Object.assign({},systemTypes[this.type]);
	this.typeName = this.typeObject.name;
	
	this.planetCount = Math.floor(map(Math.random(), 0, 1, this.typeObject.minPlanets, this.typeObject.maxPlanets+1));
	this.planets = []
	
	planetIntervals = new ProbIntervals(this.typeObject.planetTypes);
	for(var i=0;i<this.planetCount;i++){
		this.planets.push(new Planet(this.name, planetIntervals, i));
	}
}

var Planet = function(systemName, intervals, index){
	var sizeIntervals;
	this.name = systemName + " " + (index+1);
	this.type = intervals.pick();
	this.typeObject = Object.assign({}, planetTypes[this.type]);
	
	this.sizeIntervals = new ProbIntervals(this.typeObject.sizeTypes);
	this.size = this.sizeIntervals.pick();
	
	this.moonCount = Math.floor(map(Math.random(), 0, 1, this.typeObject.minMoons, this.typeObject.maxMoons+1));
}

var ProbIntervals = function(object){
	//Correction factor for floating point errors
	
	var cf = Math.pow(10, 5);
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

    for (var i = 0; i < count; i++) {
        var x = center.x + ~~map(Math.random(), 0, 1, minX, maxX) - maxX / 2;
        var y = center.y + ~~map(Math.random(), 0, 1, minY, maxY) - maxY / 2;
        var system = new System(x, y, 0);
        systems.push(system);
    }
    return systems;
}

function drawSystems(systems, r) {
    var g = document.querySelector("g");
    for (var i = 0; i < systems.length; i++) {
        g.innerHTML += '<circle cx="' + systems[i].x + '" cy="' + systems[i].y + '" r="' + r + '" stroke="white" stroke-width = "0" fill="white"/>';
    }
}

function createSystemList(systems){
	var list = document.querySelector("#systemList");
	var html = '';
	for(var system in systems){
		var s = systems[system];
		html += '<div class="systemWrapper"><div class="systemHeader"><h2>' + s.name + '</h2><h3>&nbsp; - &nbsp;' + s.typeName + ' System</h3><h4>&nbsp; - &nbsp;'+ s.typeObject.stars +' Stars</h4><h5>&nbsp; - &nbsp;' + s.planetCount + ' Planets</h5></div><ul class="planetList">'
		
		for(var i=0;i<s.planetCount;i++){
			var p = s.planets[i];
			html += '<li class="planet"><h3>' + p.name + '</h3><h4>&nbsp; - &nbsp;' + p.size.toProperCase() + ' ' + p.typeObject.name + ' Planet</h4><h5>&nbsp; - &nbsp;' + p.moonCount + ' Moons</h5></li>';
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
var newSystems = generateSystems(systemCount, width, height, minimumDistanceX, maximumDistanceX, minimumDistanceY, maximumDistanceY);
//drawSystems(newSystems, systemRadius);
createSystemList(newSystems);
var time2 = new Date().getTime();
console.log(time2 - time);