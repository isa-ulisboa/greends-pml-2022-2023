# Manuel Campagnolo 2023
# run in earth engine

var ponto_em_vez_de_poligono=true 

if (ponto_em_vez_de_poligono)
{
  // for the case where ponto_em_vez_de_poligono is true
  var LAT= 39.860916//37.5676055900
  var LONG = -8.139106 //-7.6666100800
  
  var regiao=ee.Geometry.Point([LONG, LAT]).buffer(10)
}

var Buf=500;

print(LONG,LAT);
Map.setCenter(LONG,LAT,16); //zoom

// opções de output
var plot_map=1;
var plot_chart=1;
var create_video=0;
// outras opções
var s2version='2A'; //1C available march2016 on for Portugal) or 2A (only available recently)
var date_start = '2016-01-01';
var now = Date.now();
var eeNow = ee.Date(now);
var date_end= eeNow //ee.Date('2017-12-31') // eeNow; //; ee.Date('2016-08-31') //
//var date_end= ee.Date('2019-06-09') // eeNow; //; ee.Date('2016-08-31') //
var perc_nuvens=10;
var dias_para_tras=-30;
var label = ee.String('long').cat(ee.Number(LONG).round().int()).cat('lat').cat(ee.Number(LAT).round().int()).getInfo();//mudar o nome para proba


 // aplicar máscara de nuvens
function filterS2_level2A(image) { // input: S2 image  Sentinel-2 MSI: MultiSpectral Instrument, Level-2A
  var SCL = image.select('SCL');
  var mask01 = ee.Image(0).where(
    SCL.lt(8).and(SCL.gt(3))
   ,1);   //Put a 1 on good pixels
  return image.updateMask(mask01);
}  

function filterS2_level1C(image) { // input: Sentinel-2 MSI: MultiSpectral Instrument, Level-1C -- 2015-06-23T00:00:00 - Present
  var qa = image.select('QA60');
  var b8=image.select("B8");
  
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  
  // Both flags should be set to zero, indicating clear conditions.
  var mask01 = ee.Image(0).where(
    (qa.bitwiseAnd(cloudBitMask).eq(0)  //0: No opaque clouds
    .and(qa.bitwiseAnd(cirrusBitMask).eq(0))//.and(b8.lt(3000))),  //0: No cirrus clouds
    ),1);   //Put a 1 on good pixels
  return image.updateMask(mask01);
} 

if (s2version=='2A') 
{
  var S2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED") // S2 version 2A (surface reflectance)
  .filterBounds(regiao)
  .filterDate(date_start,date_end); 
  
  var S2filtered= S2.map(filterS2_level2A); 
}

// Sentinel-2 MSI: MultiSpectral Instrument, 
if (s2version=='1C') 
{
  var S2 = ee.ImageCollection('COPERNICUS/S2') //.filterDate('2015-06-23', date_end) // when S2 became available <<<<<<<<<  level 1-C
  .filterBounds(regiao)
  .filterDate(date_start,date_end); //ee.Date.fromYMD(year+1,12,31))
  
  var S2filtered= S2.map(filterS2_level1C); 

}

// max ndvi composite
function calcular_ndvi(image) {
  var ndvi=image.normalizedDifference(['B8','B4']);
  return image.select(['B2','B3','B4','B8']).addBands(ndvi.select([0],['ndvi']));
}

var withNDVI=S2filtered.map(calcular_ndvi)

var maxNDVI=withNDVI.filterDate(date_end.advance(dias_para_tras, 'day'),date_end).qualityMosaic('ndvi')

// clip to regiao
var myS2=maxNDVI.clip(regiao.buffer(Buf))


print('S2',S2);
print('S2 filtered',S2filtered);


// RGB cor verdadeira
print('imagem mais recente S2 com nuvens',S2.sort('system:time_start',false).first());


var rgbVis = { min: 0.0, max: 2500,  bands: ['B4', 'B3', 'B2']};
//if (plot_map) Map.addLayer(S2.sort('system:time_start',false).first(), rgbVis, 'RGB=432 data mais recente');  // 


// RGB=432 mediano - cor verdadeira
var rgbVis = { min: 0.0, max: 2500,  bands: ['B4', 'B3', 'B2']};
//Map.addLayer(S2.median(), rgbVis, 'RGB=432 mediano');  // min para elimimnar nuvens



// RGB=432 mínimo - cor verdadeira
// var rgbVis = { min: 0.0, max: 1000,  bands: ['B4', 'B3', 'B2']};
//if (plot_map) Map.addLayer(S2.min(), rgbVis, 'RGB=432 minimo');  // min para elimimnar nuvens

print('date',date_end.advance(dias_para_tras, 'day'));

// RGB=432 mediano com máscara de nuvens - cor verdadeira
// var rgbVis = { min: 0.0, max: 2500,  bands: ['B4', 'B3', 'B2']};
// (plot_map) Map.addLayer(S2filtered.filterDate(date_end.advance(dias_para_tras, 'day'),date_end).median(), rgbVis, 'RGB=432 mediano máscara nuvens');  //


// RGB mediano com máscara de nuvens - falsa cor
var rgbVis = { min: 0.0, max: [6500,3000,3000],  bands: ['B8', 'B4', 'B3']};
// if (plot_map) Map.addLayer(S2filtered.filterDate(date_end.advance(dias_para_tras, 'day'),date_end).median(), rgbVis, 'RGB=843 mediano máscara nuvens');  //
if (plot_map) Map.addLayer(myS2, rgbVis, 'RGB=843 max ndvi  máscara nuvens');  //

var main = {title: 'vermelho (B4) e infravermelho próximo (B8)', hAxis: {title: 'time'}, vAxis: {title: 'reflectância'}, };
if (plot_chart) print(ui.Chart.image.series(S2filtered.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',perc_nuvens)).select(['B4','B8']),regiao,ee.Reducer.mean(),10).setOptions(main));

var main = {title: 'região espectral do azul (B2)', hAxis: {title: 'time'}, vAxis: {title: 'reflectância'}, };
//if (plot_chart) print(ui.Chart.image.series(S2filtered.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',perc_nuvens)).select(['B2']),regiao,ee.Reducer.mean(),10).setOptions(main));

var main = {title: 'ndvi ', hAxis: {title: 'Time'}, vAxis: {title: 'NDVI'}, };
if (plot_chart) print('ndvi',ui.Chart.image.series(S2filtered.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',perc_nuvens)).map(calcular_ndvi).select(['ndvi']),regiao,ee.Reducer.mean(),10).setOptions(main));

if (create_video)
{
  // criar video RGB=843 (com nuvens)
  // Make it a 8 bit format.
  var coll4Video = S2
    .map(function(image){
    return image.visualize({bands: ['B4', 'B3', 'B2'], min:0.0 ,max: [5000,2500,2500]});  //.select(['B4','B3','B2'])
    // Need to make the data 3 bands at 8-bit.
    //.map(function(image) { return image.multiply(512).uint8();
    });
    
  print(coll4Video);
  var nomeVideo = ee.String(label).cat("-RGB843-5m").getInfo(); 
  
  //Export the video to your drive
  Export.video.toDrive({
      collection: coll4Video,
      description: nomeVideo,
      folder: 'videos',
      scale: 5,
      //dimensions: 1080,
      framesPerSecond: 1,
      region: regiao,
      maxPixels : 1e10
  });
}


/*
end
*/
