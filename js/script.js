var points = new Array();
var clonepoints = new Array();
var centroids = new Array();
class Point {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.num = options.num;
        this.disttocentroid = options.disttocentroid;
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
      clonepoints.push(currentpoint);
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
    var clusters = new Array();
    //Выбираю центроиды
    for (let i = 0; i<parseInt(document.getElementById("amount").value);i++)
    {
        var cluster = new Array();
        let randomindex = getRandomIntInclusive(0,clonepoints.length-1);
        centroids.push(clonepoints[randomindex]);
        cluster.push(clonepoints[randomindex]);
        clonepoints.splice(randomindex,1);
        clusters[i] = cluster;
    }
    for (var i = 0; i<clonepoints.length;i++)
    {
        var mindist = 1500; //Здесь 1500 потому что канвас 1000х1000
        current = clonepoints[i];
        for (var k = 0; k<centroids.length;k++)
        {
            if (distance(centroids[k].x, current.x, centroids[k].y, current.y) < mindist)
            {
                mindist = distance(centroids[k].x, current.x, centroids[k].y, current.y);
                var whereto = k;
            }
        }
        clusters[whereto].push(clonepoints[i]);
    } 
    //updateCentroids(clusters, centroids)
    
    for (let f = 0; f<100; f++)
    {
       updateCentroids(clusters,centroids); //Обновляю центроиды
       clusters.splice(0,clusters.length);  //Очищаю кластеры
       for (let i = 0; i<parseInt(document.getElementById("amount").value);i++) //Очищаю кластеры, вроде норм
       {
           var internalcluster = Array();
           clusters.push(internalcluster);
       }
       for (let i = 0; i<points.length;i++) //Прохожусь по всем точкам
       {
        var mindist = 1500; //Здесь 1500 потому что канвас 1000х1000
        current = points[i];
        for (var k = 0; k<centroids.length;k++)
        {
            if (distance(centroids[k].x, current.x, centroids[k].y, current.y) <= mindist)
            {
                mindist = distance(centroids[k].x, current.x, centroids[k].y, current.y);
                whereto = k;
            }
        }
        clusters[whereto].push(current);
       } 
    } 
    console.log(clusters);
    console.log(centroids)
}

function updateCentroids(clusters, centroids)
{
    centroids.splice(0,centroids.length);
    for (let i = 0; i<clusters.length;i++)
    {
        var newcentroidindex = 0;
        var sumdistx = 0;
        var sumdisty = 0;
        for (let k = 0; k < clusters[i].length;k++)
        {
            sumdistx += clusters[i][1];
            sumdisty += clusters[i][2];
        }
        midx = sumdistx / clusters[i].length;
        midy = sumdisty / clusters[i].length;
        var mindistance = 1500;
        for (let k = 0; k<clusters[i].length;k++)
        {
            if (distance(clusters[i][k].x, midx, clusters[i][k].y, midy) < mindistance)
            {
                mindistance = distance(clusters[i][k].x, midx, clusters[k][k].y, midy);
                newcentroidindex = k; 
            }
        }
        centroids.push(clusters[i][newcentroidindex]);
        //clusters[i].splice(newcentroidindex,1);
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