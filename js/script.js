var points = new Array();
var clonepoints = new Array();
class Point {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.num = options.num;
    }
}
function draw()
{
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var count = 1;
    canvas.addEventListener("click", function (event)
    {
      var xcoord = event.layerX;
      var ycoord = event.layerY;
      ctx.beginPath();
      ctx.arc(xcoord-30,ycoord-30,10,0,360);
      ctx.fill(); 
      const currentpoint = new Point({
          x: xcoord,
          y: ycoord,
          num: count
      });
      points[count-1] = currentpoint;
      clonepoints[count-1] = currentpoint;
      document.getElementById("amount").max = count;
      count++;
      console.log(currentpoint)
    })
}

function changelabel()
{
    document.getElementById("count").innerText = document.getElementById("amount").value + " ";
}

function clusters()
{
    var centroidsamount = parseInt(document.getElementById("amount").value);
    var centroids = new Array();
   // var clonepoints = points.slice(0);
    var clusters = new Array();
    for (var i = 0; i < centroidsamount;i++)
    {
        var cluster = new Array();
        let currentrandom = getRandomIntInclusive(0,clonepoints.length-1);
        centroids[i] = clonepoints[currentrandom];
        clonepoints.splice(currentrandom,1);
        cluster.push(centroids[i]);
        clusters.push(cluster);
        console.log("Центроиды:")
        console.log(centroids[i]);
    }
    for (var i = 0; i<clonepoints.length;i++)
    {
        var current = clonepoints[i];
        var mindist = 1500;
        for (var k = 0; k<centroids.length;k++)
        {
            if (mindist < distance(current[1],centroids[k][1],current[2],centroids[k][2]))
            {
                mindist = distance(current[1],centroids[k][1],current[2],centroids[k][2]);
                var wheremin = k;
            }
        }
        clusters[wheremin].push(current);
    }
    console.log(centroids);
    console.log(clusters);
}

function updateCentroids(clusters, centroids)
{
    centroids.splice(0,centroids.length);
    for (let i = 0; i<clusters.length;i++)
    {
        let sumdistx = 0;
        let sumdisty = 0;
        for (let k = 0; k <clusters[i].length;k++)
        {
            sumdistx += clusters[i][1];
            sumdisty += clusters[i][2];
        }
        midx = sumdistx / clusters[i].length;
        midy = sumdisty / clusters[i].length;
    }
}


function distance(x1,x2,y1,y2)
{
    let answer = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
    return answer;
}

function getRandomIntInclusive(min, max) { //Функция рандома, ибо Math.random в JS берёт число в промежутке 0-1
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }